/** Parse YYYY-MM-DD as a calendar date (not UTC midnight). */
function parseDateOnly(date: string): Date {
	const [year, month, day] = date.split('-').map(Number);
	return new Date(year, month - 1, day);
}

export function formatDate(date: string, locale = 'en-US') {
	return parseDateOnly(date).toLocaleDateString(locale, {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
}

export function formatDateLong(date: string, locale = 'en-US') {
	return parseDateOnly(date).toLocaleDateString(locale, {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}
