import { goto } from '$app/navigation';

type PagefindModal = HTMLElement & {
	open: () => void;
	close: () => void;
	readonly isOpen: boolean;
};

let loadPromise: Promise<void> | null = null;

declare const __PAGEFIND_INDEX_BUILT__: boolean;

async function pagefindIndexAvailable(): Promise<boolean> {
	if (import.meta.env.DEV && !__PAGEFIND_INDEX_BUILT__) {
		return false;
	}

	try {
		const response = await fetch('/pagefind/pagefind-entry.json', { method: 'HEAD' });
		return response.ok;
	} catch {
		return false;
	}
}

export function loadPagefindComponentUi(): Promise<void> {
	if (!loadPromise) {
		loadPromise = (async () => {
			if (typeof document === 'undefined') {
				throw new Error('No document');
			}

			if (!(await pagefindIndexAvailable())) {
				throw new Error('Pagefind index not found');
			}

			if (!document.querySelector('link[data-pagefind-ui-css]')) {
				const link = document.createElement('link');
				link.rel = 'stylesheet';
				link.href = '/pagefind/pagefind-component-ui.css';
				link.dataset.pagefindUiCss = '';
				document.head.appendChild(link);
			}

			const existing = document.querySelector('script[data-pagefind-ui-js]');
			if (existing) {
				await customElements.whenDefined('pagefind-modal');
				return;
			}

			await new Promise<void>((resolve, reject) => {
				const script = document.createElement('script');
				script.type = 'module';
				script.src = '/pagefind/pagefind-component-ui.js';
				script.dataset.pagefindUiJs = '';
				script.onload = () => {
					customElements.whenDefined('pagefind-modal').then(() => resolve()).catch(reject);
				};
				script.onerror = () => reject(new Error('Failed to load Pagefind UI'));
				document.head.appendChild(script);
			});
		})();
	}

	return loadPromise;
}

const RESULT_LINK_SELECTOR =
	'a.pf-result-link, a.pf-searchbox-result, a.pf-heading-link, a.pf-searchbox-subresult';

function withTrailingSlash(pathname: string): string {
	if (pathname === '/') return '/';
	return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

function resolveInternalPath(href: string): string | null {
	try {
		const url = new URL(href, window.location.origin);
		if (url.origin !== window.location.origin) return null;
		return withTrailingSlash(url.pathname) + url.search + url.hash;
	} catch {
		return null;
	}
}

function findResultLink(target: EventTarget | null, modal: PagefindModal): HTMLAnchorElement | null {
	if (!(target instanceof Element)) return null;
	const link = target.closest(RESULT_LINK_SELECTOR);
	if (!(link instanceof HTMLAnchorElement) || !modal.contains(link)) return null;
	return link;
}

function followResultLink(link: HTMLAnchorElement, modal: PagefindModal): void {
	const href = link.getAttribute('href');
	if (!href || href === '#' || href.startsWith('javascript:')) return;

	modal.close();

	const internalPath = resolveInternalPath(href);
	if (internalPath !== null) {
		void goto(internalPath);
		return;
	}

	window.location.assign(href);
}

/** Close the search modal when the user follows a result link (click or Enter). */
export function attachCloseOnResultNavigate(modal: PagefindModal): () => void {
	const onClick = (event: MouseEvent) => {
		if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
			return;
		}

		const link = findResultLink(event.target, modal);
		if (!link) return;

		event.preventDefault();
		followResultLink(link, modal);
	};

	const onKeydown = (event: KeyboardEvent) => {
		if (event.key !== 'Enter') return;

		const link = findResultLink(event.target, modal);
		if (!link) return;

		event.preventDefault();
		followResultLink(link, modal);
	};

	modal.addEventListener('click', onClick);
	modal.addEventListener('keydown', onKeydown);
	return () => {
		modal.removeEventListener('click', onClick);
		modal.removeEventListener('keydown', onKeydown);
	};
}

export type { PagefindModal };
