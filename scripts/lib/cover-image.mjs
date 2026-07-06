import { existsSync, readFileSync } from 'node:fs';
import { extname, join } from 'node:path';

const MAX_COVER_BYTES = 1_000_000;

const MIME_BY_EXT = {
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.png': 'image/png',
	'.webp': 'image/webp',
	'.gif': 'image/gif'
};

/**
 * Map a site hero path (/static/images/...) to a file under the repo `static/` tree.
 * Assets are stored at static/static/... so URLs stay /static/...
 */
export function heroPathToFile(hero, rootDir) {
	if (!hero?.trim()) return null;

	const trimmed = hero.trim();
	if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
		return null;
	}

	const relative = trimmed.replace(/^\//, '');
	return join(rootDir, 'static', relative);
}

export async function uploadCoverImage(publisher, hero, rootDir) {
	const filePath = heroPathToFile(hero, rootDir);
	if (!filePath) return undefined;

	if (!existsSync(filePath)) {
		console.warn(`Hero image not found on disk: ${hero} (looked for ${filePath})`);
		return undefined;
	}

	const bytes = readFileSync(filePath);
	if (bytes.length > MAX_COVER_BYTES) {
		throw new Error(
			`Hero image exceeds the 1MB standard.site coverImage limit (${bytes.length} bytes): ${hero}`
		);
	}

	const encoding = MIME_BY_EXT[extname(filePath).toLowerCase()];
	if (!encoding) {
		throw new Error(`Unsupported hero image type for cover upload: ${filePath}`);
	}

	const agent = publisher.getAtpAgent();
	const { data } = await agent.com.atproto.repo.uploadBlob(bytes, { encoding });
	return data.blob;
}
