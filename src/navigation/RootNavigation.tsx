import React, {useEffect, useState, useContext} from 'react';
import {LoadingIndicatorView} from '../components';
import {Context as AuthContext} from '../context/authContext';
import {CHECK_PROFILE_QUERY} from '../graphql/queries';
import {useLazyQuery} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from './routes';
import DrawerNavigation from './DrawerNavigation/DrawerNavigation';
import {OnBoardStack, AuthStack, ModalStack} from './stacks';

const Stack = createNativeStackNavigator();

const SplashAuth = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={routes.INTRO_SCREEN}
        component={LoadingIndicatorView}
      />
      {/* <Stack.Screen name={routes.INTRO_SCREEN} component={SplashStack} /> */}
    </Stack.Navigator>
  );
};

const AppAuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="Onboard" component={OnBoardStack} />
    </Stack.Navigator>
  );
};
const RootNavStack = () => {
  // setup check for intro shown in async storage
  // const [introShown, setIntroShown] = useState(false);
  const [loader, setLoader] = useState(true);
  const [stackName, setStackName] = useState('');

  const {
    state,
    restoreToken,
    restoreUser,
    checkProfileComplete,
    updateProfile,
  } = useContext(AuthContext);
  const [getProfile, {data, error}] = useLazyQuery(CHECK_PROFILE_QUERY);

  const _bootStrapAsync = async () => {
    let userToken;
    let savedUser;
    try {
      userToken = await AsyncStorage.getItem('token');
      savedUser = await AsyncStorage.getItem('user');

      if (savedUser !== null) {
        const restoredUser = JSON.parse(savedUser);
        restoreUser(restoredUser);
        checkProfileComplete();
        setTimeout(() => {
          setLoader(false);
        }, 5000);
      }

      if (userToken !== null) {
        restoreToken(userToken);
        setTimeout(() => {
          setLoader(false);
        }, 5000);
      } else {
        setTimeout(() => {
          setLoader(false);
        }, 5000);
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    _bootStrapAsync();
  }, []);

  useEffect(() => {
    setLoader(false);
    if (state.skip) {
      setStackName('skip');
    } else if (!state.userLogin) {
      setStackName('auth');
    } else if (
      state.userLogin &&
      data &&
      data.profile.length &&
      !data.profile[0].profile_complete
    ) {
      setStackName('onboard');
    } else if (
      state.userLogin &&
      data &&
      data.profile.length &&
      data.profile[0].profile_complete
    ) {
      setStackName('home');
    } else {
      // console.log({data, state});
    }
  }, [data, state]);

  useEffect(() => {
    if (data && data.profile.length !== 0) {
      console.log({useEffect: data.profile[0]});
      updateProfile(data.profile[0]);
    }
  }, [data]);

  //check for db user
  useEffect(() => {
    if (state.user !== null) {
      console.log({user: state.user});
      getProfile({variables: {username: state.user.username}});
    }
  }, [state]);

  if (loader) {
    return <SplashAuth />;
  }

  if (stackName === 'auth') {
    return <AppAuthStack />;
  }

  if (stackName === 'onboard') {
    return <OnBoardStack />;
  }

  if (stackName === 'home' || stackName === 'skip') {
    return <DrawerNavigation />;
  }

  return <AppAuthStack />;
};

const RootNavigation = () => {
  return (
    <>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="root" component={RootNavStack} />
        <Stack.Screen name="GlobalModal" component={ModalStack} />
        <Stack.Screen name="OnBoardingModal" component={OnBoardStack} />
      </Stack.Navigator>
    </>
  );
};

export default RootNavigation;
