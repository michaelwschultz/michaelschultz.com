import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..');

execSync('pagefind --site build/prerendered --output-path build/client/pagefind', {
	stdio: 'inherit',
	cwd: projectRoot
});

console.log('Pagefind index generated.');
