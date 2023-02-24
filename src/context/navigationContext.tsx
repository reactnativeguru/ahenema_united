import ACTION_TYPES from './actionTypes/navigationActions';
import createDataContext from './createDataContext';
import initialState from './initialStates/navigationState';

// https://docs.aws.amazon.com/cognito/latest/developerguide/signing-up-users-in-your-app.html
// reducer to change state dispatched by react
const navigationReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_POINT: {
      const name = action.payload;
      return {
        ...state,
        SCREEN_NAME: name,
      };
    }

    default:
      return state;
  }
};

const goToScreen = dispatch => {
  return async (name: string) => {
    dispatch({type: ACTION_TYPES.GOTO_SCREEN, payload: name});
  };
};

export const {Provider, Context} = createDataContext(
  navigationReducer,
  {
    goToScreen,
  },
  initialState,
);
