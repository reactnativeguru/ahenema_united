import AsyncStorage from '@react-native-async-storage/async-storage';
import {Auth} from 'aws-amplify';
import ACTION_TYPES from './actionTypes';
import {FlashMessage} from '../components';
import createDataContext from './createDataContext';
import {AuthContextStateType, Action} from '../utils/interfaces';

// https://docs.aws.amazon.com/cognito/latest/developerguide/signing-up-users-in-your-app.html
// reducer to change state dispatched by react
const authReducer = (state: AuthContextStateType, action: Action) => {
  switch (action.type) {
    case ACTION_TYPES.RESTORE_TOKEN:
      return {
        ...state,
        JWTToken: action.payload,
      };

    case ACTION_TYPES.PROFILE_NOT_COMPLETED:
      console.log('PROFILE_NOT_COMPLETED');
      return {
        ...state,
        profileComplete: null,
      };
    case 'profile_completed':
      return {
        ...state,
        profileComplete: true,
        profileIsComplete: 'completed',
      };
    case 'firebase_user':
      return {
        ...state,
        firebaseUser: action.payload,
      };

    case ACTION_TYPES.RESTORE_USER:
      console.log('Payload: ', action.payload);
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
        userLogin: true,
      };
    case 'saveJWTToken':
      return {
        ...state,
        JWTToken: action.payload,
      };
    case 'saveRefreshToken':
      return {
        ...state,
        refreshToken: action.payload,
      };
    case 'saveUser':
      console.log('Payload: ', action.payload);
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
        userLogin: true,
      };

    case 'email_error':
      return {
        ...state,
        emailError: action.payload,
      };
    case 'reset_state':
      return {
        ...state,
        state: action.payload, // TODO check with Edrian to reset entire state
      };
    case 'email_error':
      return {
        ...state,
        emailError: action.payload,
      };
    case 'password_error':
      return {
        ...state,
        passwordError: action.payload,
      };
    case 'add_error':
      return {
        ...state,
        errorMessage: action.payload,
      };

    case 'signin':
      // TODO: api.defaults.headers.common.Authorization = action.payload
      return {
        // reset any errors, save token in state
        ...state,
        errorMessage: '',
        token: action.payload,
      };
    case 'signup':
      return {
        // reset any errors, save token in state
        ...state,
        errorMessage: '',
        token: action.payload,
      };
    case 'language':
      return {
        ...state,
        language: action.payload,
      };
    case 'sign_out':
      return {
        ...state,
        token: null,
        profile: null,
        // user: {},
        userLogin: false,
      };

    case 'profile':
      return {
        ...state,
        profile: action.payload,
      };

    case 'code_not_confirmed':
      return {
        ...state,
        errorMessage: action.payload,
      };

    case 'update_profile':
      console.log('@@@ REDUCER UPDATE PROFILE', action.payload);
      return {
        ...state,
        profile: {...action.payload, ...state.profile},
      };

    case 'loading':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'schedule_start_time':
      return {
        ...state,
        scheduleStartTime: action.payload,
      };

    case 'skip':
      return {
        ...state,
        skip: action.payload,
      };

    case 'clear_error_message':
      if (action.payload) {
        if (action.payload === 'email') {
          return {...state, emailError: null};
        } else if (action.payload === 'password') {
          return {...state, passwordError: null};
        }
      } else {
        return {...state, errorMessage: ''};
      }
      break;
    default:
      return state;
  }
};

// action functions - function called with dispatch that returns a function
const signup = (dispatch: any) => {
  // email, password from react form
  return async () => {
    // api request
    try {
      dispatch({type: 'loading', payload: true});
      // const form = {
      //   ...formData,
      //   email: formData.email.toLowerCase(),
      // };

      dispatch({type: 'loading', payload: false});
      return true;
    } catch (err) {
      dispatch({type: 'loading', payload: false});
    }
    return false;
  };
};

const signOut = (dispatch: any) => {
  // email, password from react form
  return async () => {
    dispatch({type: 'sign_out'});
    dispatch({type: 'skip', payload: false});
  };
};

const initPasswordReset = (dispatch: any) => async () => {
  try {
    dispatch({type: 'loading', payload: true});
  } catch (error) {
    dispatch({type: 'loading', payload: false});
  }
  return false;
};

const dispatchError = (dispatch: any) => (error: string, message: string) => {
  dispatch({type: error + '_error', payload: message});
};

const clearErrorMessage = (dispatch: any) => (type: any) => {
  dispatch({type: 'clear_error_message', payload: type});
};

const signUserIn = (dispatch: any) => {
  return async (username: string, password: string) => {
    //    console.log('dispatching::', username, password);
    return await Auth.signIn(username, password)
      .then(user => {
        const session = user.signInUserSession;

        checkProfileComplete(dispatch);
        // alert(JSON.stringify(session));
        const {idToken, refreshToken} = session;
        dispatch({type: 'saveJWTToken', payload: idToken.jwtToken});
        dispatch({type: 'saveRefreshToken', payload: refreshToken.token});
        dispatch({type: 'saveUser', payload: user});
        AsyncStorage.setItem('token', idToken.jwtToken);
        AsyncStorage.setItem('user', JSON.stringify(user));
        //  console.log('tokens saved::', idToken);
        FlashMessage({
          message: 'Success',
          description: 'Successfully signed in',
          type: 'success',
        });
      })
      .catch(err => {
        if (err.code === 'UserNotConfirmedException') {
          console.log('Error when signing in: ', err.code);
          dispatch({type: 'code_not_confirmed', payload: err.code});
          FlashMessage({
            message: 'Ooops',
            description: 'You have to confirm your code!!',
            type: 'danger',
          });
          // RootNavigation.navigate(routes.SIGN_UP_SCREEN); //TODO navigation from action context not working
          return err.code;
        } else {
          alert('Error when signing in: ' + err.message);
          console.log('Error when signing in: ', err.message);
          FlashMessage({
            message: err.message,
            description: 'Error when signing in!',
            type: 'danger',
          });
        }
      });

    // try {
    //     auth()
    //         .signInAnonymously()
    //         .then(({ user }) => {
    //             console.log(
    //                 '%c Firebase user =====>',
    //                 'color: white; background-color: #E59F09',
    //                 user,
    //             );
    //             dispatch({ type: 'firebase_user', payload: user });

    //             const fbUser = user.updateProfile({
    //                 displayName: username,
    //             });
    //         });
    // } catch (e) {
    //     console.warn({ signInAnonymously: e });
    // }
  };
};

// code: ""
//
// message: "User is not confirmed."
//
// name: "UserNotConfirmedException"

const clearAppData = async function () {
  try {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    console.error('Error clearing app data.');
  }
};

const userSignOut = (dispatch: any) => {
  return async () => {
    //cognito
    await Auth.signOut()

      .then(() => {
        clearAppData();

        // console.log('Sign out complete');
        // deleteToken();
        dispatch({type: 'sign_out'});
        dispatch({type: 'skip', payload: false});
      })
      .catch(err => console.log('Error while signing out!', err));
  };
};

const restoreToken = (dispatch: any) => {
  return async (token: string) => {
    console.log('restoring token...');
    dispatch({type: ACTION_TYPES.RESTORE_TOKEN, payload: token});
    // dispatch({type: 'saveRefreshToken', payload: refreshToken.token});
    // dispatch({type: 'saveUser', payload: user.attributes});
  };
};
const restoreUser = (dispatch: any) => {
  return async user => {
    console.log('restoring user...');
    dispatch({type: ACTION_TYPES.RESTORE_USER, payload: user});
    const scheduleSettingData = await AsyncStorage.getItem('scheduleSetting');
    if (scheduleSettingData) {
      const {hour, day, week} = JSON.parse(scheduleSettingData);
      const schedule_start_time = {
        hour: hour ? Number(hour) : 0,
        day: day ? Number(day) : 0,
        week: week ? Number(week) : 0,
      };
      dispatch({type: 'schedule_start_time', payload: schedule_start_time});
    }
    // dispatch({type: 'saveRefreshToken', payload: refreshToken.token});
    // dispatch({type: 'saveUser', payload: user.attributes});
  };
};

const checkProfileComplete = (dispatch: any) => {
  return async () => {
    try {
      const value = await AsyncStorage.getItem('@profileCompleted');
      if (value !== null) {
        // value previously stored

        dispatch({type: 'profile_complete', payload: value});
      } else {
        console.log('profile not complete::  ', value);
        dispatch({type: 'profile_not_complete', payload: null});
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const updateProfile = (dispatch: any) => {
  console.log('updating');

  return userProfile => {
    const profile = userProfile;

    console.log('updating dispatch...');
    console.log('updateProfile:: => ', profile);
    dispatch({type: 'update_profile', payload: profile});
  };
};

const reset = (dispatch: any) => {
  console.log('resetting...');

  return () => {
    dispatch({type: 'reset_state', payload: initialState});
  };
};

const getStarted = (dispatch: any) => {
  return () => {
    dispatch({type: 'skip', payload: true});
  };
};

const profileCompleted = (dispatch: any) => {
  return async () => {
    //  await saveAsync('profileCompleted', 'completed');
    await AsyncStorage.setItem('@profileComplete', JSON.stringify(true));
    //  SInfo.setItem('profile', 'complete', {});
    dispatch({type: 'profile_completed', payload: true});
  };
};

const setScheduleSetting = (dispatch: any) => {
  return ({hour, day, week}) => {
    console.log({scheduleSettingData: {hour, day, week}});
    const schedule_start_time = {
      hour: hour ? Number(hour) : 0,
      day: day ? Number(day) : 0,
      week: week ? Number(week) : 0,
    };
    dispatch({type: 'schedule_start_time', payload: schedule_start_time});
  };
};

// global state object
const initialState = {
  token: null,
  errorMessage: '',
  emailError: '',
  passwordError: '',
  email: '',
  password: '',
  isLoading: false,
  language: 'en',
  JWTToken: null,
  refreshToken: null,
  firebaseUser: null,
  user: null,
  profileComplete: false,
  profileIsComplete: '',
  profile: {
    first_name: 'Wasi',
    last_name: 'Ayub',
    username: 'Wasi Ayub',
    userId: '68b0992a-6606-42d2-8c31-7931b69466ef',
    gender: '',
    image_uri:
      'https://s3-eu-west-2.amazonaws.com/mentring75967c211cbe40fc8b53613ae5252839144640-dev/uploads%2Fjmentee%2F1622540210772.jpg',
    profileUrl: '',
    dob: '',
    interests: '',
    whyBecomeMentor: '',
    expertise: '',
    company: '',
    jobTitle: '',
    bio: '',
  },
  userLogin: false,
  scheduleStartTime: {
    hour: 0,
    day: 0,
    week: 0,
  },
  skip: false,
};

// const initLanguagePreference = () => {};

// const updateLanguagePreference = () => {};

export const {Provider, Context} = createDataContext(
  authReducer,
  {
    restoreToken,
    restoreUser,
    userSignOut,
    signUserIn,
    signOut,
    signup,
    clearErrorMessage,
    dispatchError,
    // initLanguagePreference,
    // updateLanguagePreference,
    initPasswordReset,
    checkProfileComplete,
    updateProfile,
    reset,
    getStarted,
    profileCompleted,
    setScheduleSetting,
  },
  initialState,
);
