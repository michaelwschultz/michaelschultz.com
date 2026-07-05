import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const thoughtsDir = join(root, 'src/content/thoughts');
const prerenderedDir = join(root, 'build/prerendered/thoughts');
const wellKnownPath = join(root, 'static/.well-known/site.standard.publication');

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---/;

function didFromWellKnown() {
	const raw = readFileSync(wellKnownPath, 'utf8').trim();
	const match = raw.match(/^at:\/\/(did:[^/]+)\//);
	if (!match) {
		throw new Error(`Could not parse DID from ${wellKnownPath}`);
	}
	return match[1];
}

function atprotoRkeyFromMarkdown(path) {
	const raw = readFileSync(path, 'utf8');
	const match = raw.match(FRONTMATTER_RE);
	if (!match) return null;
	const data = yaml.load(match[1]);
	return typeof data?.atprotoRkey === 'string' ? data.atprotoRkey : null;
}

function injectLink(html, atUri) {
	const tag = `<link rel="site.standard.document" href="${atUri}">`;
	if (html.includes('rel="site.standard.document"')) {
		return html.replace(
			/<link\s+rel="site\.standard\.document"\s+href="[^"]*"\s*\/?>/i,
			tag
		);
	}
	return html.replace('</head>', `\t${tag}\n</head>`);
}

const did = didFromWellKnown();
let injected = 0;

for (const file of readdirSync(thoughtsDir)) {
	if (!file.endsWith('.md')) continue;

	const slug = file.replace(/\.md$/, '');
	const rkey = atprotoRkeyFromMarkdown(join(thoughtsDir, file));
	if (!rkey) continue;

	const htmlPath = join(prerenderedDir, slug, 'index.html');
	if (!existsSync(htmlPath)) {
		console.warn(`Skipping ${slug}: no prerendered HTML at ${htmlPath}`);
		continue;
	}

	const atUri = `at://${did}/site.standard.document/${rkey}`;
	const html = readFileSync(htmlPath, 'utf8');
	writeFileSync(htmlPath, injectLink(html, atUri), 'utf8');
	injected += 1;
}

console.log(`Injected site.standard.document link tags into ${injected} thought page(s).`);
