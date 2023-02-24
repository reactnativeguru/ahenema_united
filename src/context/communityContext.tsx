import ACTION_TYPES from './actionTypes';
import createDataContext from './createDataContext';

// https://docs.aws.amazon.com/cognito/latest/developerguide/signing-up-users-in-your-app.html
// reducer to change state dispatched by react
const communityReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SELECT_COMMUNITY: {
      return action.payload;
    }
    default:
      return state;
  }
};

const selectCommunity = dispatch => {
  return async community => {
    dispatch({
      type: ACTION_TYPES.SELECT_COMMUNITY,
      payload: community,
    });
  };
};

const initialState = {
  community: null,
};

// provider and context
export const {Provider, Context} = createDataContext(
  // reducers
  communityReducer,

  // action objects
  {
    selectCommunity,
  },

  // initial state
  initialState,
);
