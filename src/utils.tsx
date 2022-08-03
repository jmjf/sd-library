import { Author } from './models/Resource';

export const booleanToYesNo = (b: boolean) => (b ? 'Yes' : 'No');

export const dateAsDate = (d: Date | string | undefined) =>
	// TODO: handle errors if d:string isn't a valid date string
	typeof d === 'string' ? new Date(d) : d;

export const formatDate_MMM_YYYY = (
	date: Date | string | undefined,
	locale = 'en-US'
) => {
	//
	if (date instanceof Date) {
		return isNaN(date.valueOf())
			? 'unknown'
			: new Intl.DateTimeFormat(locale, {
					month: 'short',
					year: 'numeric',
			  }).format(dateAsDate(dateAsDate(date)));
	}

	return date ? date.toString() : '';
};

export const getFirstAuthorName = (authors: Author[] | undefined) => {
	return authors && authors.length > 0 ? authors[0].authorName : 'none listed';
};
