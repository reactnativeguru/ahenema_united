import ACTION_TYPES from './actionTypes';
// import create data context
import createDataContext from './createDataContext';

const chatReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_CHAT_ROOM: {
      return {
        ...state,
        chatRoom: action.payload,
      };
    }

    case ACTION_TYPES.GET_CHAT_ROOM: {
      return {
        ...state.chatRoom,
      };
    }

    default:
      return state;
  }
};

const setChatRoom = dispatch => {
  return async chatRoom => {
    dispatch({type: ACTION_TYPES.SET_CHAT_ROOM, payload: chatRoom});
  };
};

const getChatRoom = dispatch => {
  return async () => {
    dispatch({type: ACTION_TYPES.GET_CHAT_ROOM, payload: {}});
  };
};

const initialState = {
  chatRoom: null,
};

// provider and context
export const {Provider, Context} = createDataContext(
  // reducers
  chatReducer,

  // action objects
  {
    setChatRoom,
    getChatRoom,
  },

  // initial state
  initialState,
);
