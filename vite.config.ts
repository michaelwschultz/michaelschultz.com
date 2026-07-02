import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, type Plugin, type PluginOption } from 'vite';

const root = path.dirname(fileURLToPath(import.meta.url));
const pagefindDir = path.join(root, 'build', 'client', 'pagefind');
const pagefindIndexBuilt = fs.existsSync(path.join(pagefindDir, 'pagefind-entry.json'));

const mimeTypes: Record<string, string> = {
	'.js': 'application/javascript',
	'.css': 'text/css',
	'.wasm': 'application/wasm',
	'.json': 'application/json',
	'.pf_meta': 'application/octet-stream'
};

function pagefindDevPlugin(): Plugin {
	return {
		name: 'pagefind-dev',
		configureServer(server) {
			server.middlewares.use((req, res, next) => {
				const url = req.url?.split('?')[0] ?? '';
				if (!url.startsWith('/pagefind/')) {
					next();
					return;
				}

				if (!fs.existsSync(pagefindDir)) {
					next();
					return;
				}

				const relative = url.slice('/pagefind/'.length);
				const filePath = path.join(pagefindDir, relative);

				if (!filePath.startsWith(pagefindDir) || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
					next();
					return;
				}

				const ext = path.extname(filePath);
				res.setHeader('Content-Type', mimeTypes[ext] ?? 'application/octet-stream');
				fs.createReadStream(filePath).pipe(res);
			});
		}
	};
}

export default defineConfig(({ mode }) => ({
	plugins: [tailwindcss(), sveltekit(), pagefindDevPlugin()] as PluginOption[],
	define: {
		__PAGEFIND_INDEX_BUILT__: JSON.stringify(mode === 'production' ? true : pagefindIndexBuilt)
	},
	ssr: {
		external: ['better-sqlite3']
	}
}));
