interface IBasicInfo {
  _id: string;
  username: string;
}

export interface IPost {
  schemaType: number;
  _id: string;
  createdAt: Date;
  img: string;
  desc: string;
  userId: {
    avatar: string;
  } & IBasicInfo;
  comments?: {
    text: string;
    userId: IBasicInfo;
    _id: string;
  }[];
  username?: string;
  tags?: string[];
  location?: string[];
  likes?: IBasicInfo[];
}

export interface IPostState {
  myPosts: IPost[];
  allPosts: IPost[];
  feedPosts: IPost[];
}

export enum PostActEnums {
  ADD_POST = 'ADD_POST',
  DELETE_POST = 'DELETE_POST',
  GET_ALL_POSTS = 'GET_ALL_POSTS',
  FAVOURITE_POST = 'FAVOURITE_POST',
  UNFAVOURITE_POST = 'UNFAVOURITE_POST',
  GET_FEED = 'GET_FEED',
}

export interface PostActions {
  type: PostActEnums;
  payload: IPost[] | Partial<IPost>;
}

export const initialPostsState: IPostState = {
  myPosts: [],
  allPosts: [],
  feedPosts: [],
};

export function postReducer(
  state: typeof initialPostsState,
  action: PostActions
): IPostState {
  const { type, payload } = action;
  switch (type) {
    case PostActEnums.GET_FEED:
      return {
        ...state,
        feedPosts: payload as IPost[],
      };
    case PostActEnums.FAVOURITE_POST:
      console.log('test');
      const {
        userId: { _id, username },
      } = payload as IPost;
      let newState = state;
      return newState;
  }
  return {} as IPostState;
}
