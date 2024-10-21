export interface QuoteTypes {
  _id: number | string;
  quote: string;
  anime: string;
  author: string;
}

export interface QuoteZen {
  q: string; // The quote text
  a: string; // The author of the quote
  h: string; // The HTML formatted version of the quote
}

export interface Quotable {
  _id: string;
  content: string;
  author: string;
  tags: [string];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}
