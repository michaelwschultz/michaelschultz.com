import { getListeningData } from '$lib/listening/sync';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const listening = await getListeningData({ syncIfEmpty: true });
	return { listening };
};
