export const booleanToYesNo = (b: boolean) => (b ? 'Yes' : 'No');

export const dateAsDate = (d: Date | string) =>
	// TODO: handle errors if d:string isn't a valid date string
	typeof d === 'string' ? new Date(d) : d;

export const formatDate_MMM_YYYY = (date: Date | string, locale = 'en-US') =>
	new Intl.DateTimeFormat(locale, {
		month: 'short',
		year: 'numeric',
	}).format(dateAsDate(dateAsDate(date)));
