export const booleanToYesNo = (b: boolean) => (b ? 'Yes' : 'No');

export const dateAsDate = (d: Date | string) =>
	// TODO: handle errors if d:string isn't a valid date string
	typeof d === 'string' ? new Date(d) : d;
