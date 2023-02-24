import ACTION_TYPES from './actionTypes';
import createDataContext from './createDataContext';
import {API_ENDPOINTS} from '../api/wp';
import {API_REQUEST_HANDLER} from '../utils/index';
import {PostContextStateType, Perspective, Action} from '../utils/interfaces';
// https://docs.aws.amazon.com/cognito/latest/developerguide/signing-up-users-in-your-app.html
// reducer to change state dispatched by react
const postsReducer = (state: PostContextStateType, action: Action) => {
  switch (action.type) {
    case ACTION_TYPES.CREATE_POST: {
      const newPost = action.payload;
      return {
        posts: [newPost, ...state.posts],
      };
    }
    case ACTION_TYPES.GET_POST: {
      return {
        posts: [...state.posts, ...action.payload],
      };
    }
    case ACTION_TYPES.GET_POST_CATEGORY: {
      return {
        postCategories: [...state.postCategories, ...action.payload],
      };
    }
    case ACTION_TYPES.DELETE_POST: {
      const deletedPostId = action.payload;
      return {
        posts: state.posts.filter(
          (post: Perspective) => post.id !== deletedPostId,
        ),
      };
    }

    default:
      return state;
  }
};

const getPost = (dispatch: any) => {
  return async () => {
    const response = await API_REQUEST_HANDLER(API_ENDPOINTS.posts, 'get');
    console.warn({response});
    if (response) {
      dispatch({type: ACTION_TYPES.GET_POST, payload: response});
      return response;
    } else {
      return false;
    }
  };
};

const getPostCategories = () => {
  return async () => {
    const response = await API_REQUEST_HANDLER(API_ENDPOINTS.categories, 'get');
    console.warn({response});
    if (response) {
      return response;
    } else {
      return false;
    }
  };
};

const createPost = (dispatch: any) => {
  return async (post: object) => {
    dispatch({type: ACTION_TYPES.CREATE_POST, payload: post});
  };
};

const deletePost = (dispatch: any) => {
  return async (id: string) => {
    dispatch({type: ACTION_TYPES.DELETE_POST, payload: id});
  };
};

const initialState = {
  posts: [],
  postCategories: [],
};

export const {Provider, Context} = createDataContext(
  postsReducer,
  {
    getPost,
    getPostCategories,
    createPost,
    deletePost,
  },
  initialState,
);
