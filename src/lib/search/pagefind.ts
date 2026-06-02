type PagefindModal = HTMLElement & {
	open: () => void;
	close: () => void;
	readonly isOpen: boolean;
};

let loadPromise: Promise<void> | null = null;

export function loadPagefindComponentUi(): Promise<void> {
	if (!loadPromise) {
		loadPromise = new Promise((resolve, reject) => {
			if (typeof document === 'undefined') {
				reject(new Error('No document'));
				return;
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
				customElements.whenDefined('pagefind-modal').then(() => resolve()).catch(reject);
				return;
			}

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
	}

	return loadPromise;
}

const RESULT_LINK_SELECTOR =
	'a.pf-result-link, a.pf-searchbox-result, a.pf-heading-link, a.pf-searchbox-subresult';

/** Close the search modal when the user follows a result link (click or Enter). */
export function attachCloseOnResultNavigate(modal: PagefindModal): () => void {
	const closeIfResultLink = (target: EventTarget | null) => {
		if (!(target instanceof Element)) return;
		const link = target.closest(RESULT_LINK_SELECTOR);
		if (!link || !modal.contains(link)) return;
		const href = link.getAttribute('href');
		if (!href || href === '#' || href.startsWith('javascript:')) return;
		modal.close();
	};

	const onClick = (event: MouseEvent) => closeIfResultLink(event.target);
	const onKeydown = (event: KeyboardEvent) => {
		if (event.key !== 'Enter') return;
		closeIfResultLink(event.target);
	};

	modal.addEventListener('click', onClick);
	modal.addEventListener('keydown', onKeydown);
	return () => {
		modal.removeEventListener('click', onClick);
		modal.removeEventListener('keydown', onKeydown);
	};
}

export type { PagefindModal };
