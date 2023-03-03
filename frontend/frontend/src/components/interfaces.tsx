export interface Model {
  title: string;
  shaper: string;
  visible: boolean;
  imgLink: string;
  description: string;
  category: string;
  urlString: string;
  _id: string;
}

export interface SearchResult {
  title: string;
  shaper: string;
  urlString: string;
  _id: string;
}

export interface UserInterface {
  // admin?: boolean;
  // username?: string;
  // _id?: string;
  _id: string;
  username: string;
  password: string;
  email: string;
  __v?: number;
}

export interface UserState {
  user: UserInterface | null;
}

export interface UserDocument {
  _id: string;
  username: string;
  password: string;
  email: string;
  __v?: number;
}

export enum IsActive {
  'home',
  'account',
  'activity',
}

export interface Comment {
  user: UserInterface;
  postId: Model;
  date: Date;
  visible: boolean;
  content: string;
}

export interface FilteredComment {
  date: Date;
  comment: string;
  modelName: string;
  shaper: string;
  username: string;
  urlString: string;
}
