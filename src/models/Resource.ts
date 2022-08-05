type ResourceId = string;

export interface Resource {
	resourceId: string;
	title: string;
	subtitle?: string;
	authors?: Author[];
	lcCallNumber?: string;
	ddCallNumber?: string;
	isbn?: string;
	abstract?: string;
	subjects?: string[];
	publisherName?: string;
	publishedDate?: string | Date;
}

export interface Author {
	authorName: string;
	roleTerm: RoleTermType;
}

export type RoleTermType = string;

// Keeping section below because I may convert it to a roleTerms type replacing string above

// // Role terms
// export const RoleTermTypeValues = {
// 	Creator: 'creator',
// 	Author: 'author',
//    None: '',
//    Translator: 'translator',
//    IntroWriter: 'writer of introduction',
//    Publisher: 'publisher', // why would they put a publisher in the authors data?
//    Illustrator: 'illustrator'
// } as const;
// // as const prevents changing or adding values;

// export type RoleTermType =
// 	typeof RoleTermTypeValues[keyof typeof RoleTermTypeValues];

// export const validRoleTermTypes = Object.values(RoleTermTypeValues);
