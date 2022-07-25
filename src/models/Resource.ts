type ResourceId = string;

export const ResourceTypeValues = {
  book: "book",
  periodical: "periodical",
} as const;
// as const prevents changing or adding values;

export type ResourceType =
  typeof ResourceTypeValues[keyof typeof ResourceTypeValues];

export const validResourceTypes = Object.values(ResourceTypeValues);

export interface Resource {
  resourceId: ResourceId;
  resourceTypeCode: ResourceType;
  callNumber: CallNumber;
  lendableFlag: boolean;
  resourceTitle: string;
  publisherName: string; // relationship in the future
  publishedDate: Date;
}

export interface Book {
  resourceId: ResourceId;
  authorName: string;
  seriesName: string;
  volumeNumber: number;
  ISBN: string;
}

export interface Periodical {
  resourceId: ResourceId;
  volumeNumber: number;
  issueNumber: number;
  ISSN: string;
}

// Call numbers
export const CallNumberTypeValues = {
  LC: "lc",
  Dewey: "dewey",
} as const;
// as const prevents changing or adding values;

export type CallNumberType =
  typeof CallNumberTypeValues[keyof typeof CallNumberTypeValues];

export const validCallNumberTypes = Object.values(CallNumberTypeValues);

export interface CallNumber {
  callNumberType: CallNumberType;
  locationCode?: string; // REF, Juv, etc.; values TBD, so leave it like this for now
  lcCallNumber?: LCCallNumber;
  ddCallNumber?: DDCallNumber;
}

export interface LCCallNumber {
  subjectCode: string;
  classificationNumber: number;
  cutterNumber: string;
  publicationYear?: number;
  copyNumber?: number;
}

export interface DDCallNumber {
  callNumber: string;
  cutterNumber: string;
}
