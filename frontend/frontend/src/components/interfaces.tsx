export interface Model {
  title: string;
  shaper: string;
  visible: boolean;
  imgLink: string;
  description: string;
  category: string;
  urlString: string;
}

export interface SearchResult {
  title: string;
  shaper: string;
  urlString: string;
  _id: string;
}
