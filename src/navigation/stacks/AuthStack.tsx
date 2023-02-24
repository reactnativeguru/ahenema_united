import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from '../routes';
import {
  SignInScreen,
  WelcomeScreen,
  SignUpScreen,
  ResetPassword,
  ForgotPasswordScreen,
  ConfirmationScreen,
} from '../../screens/AuthScreens';
import OnboardStack from './OnBoardStack';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      presentation: 'fullScreenModal',
    }}
  >
    <Stack.Screen name={routes.AUTH_WELCOME_SCREEN} component={WelcomeScreen} />
    <Stack.Screen name={routes.SIGN_IN_SCREEN} component={SignInScreen} />
    <Stack.Screen name={routes.SIGN_UP_SCREEN} component={SignUpScreen} />
    <Stack.Screen name={routes.CONFIRM_SCREEN} component={ConfirmationScreen} />
    <Stack.Screen
      name={routes.FORGOT_PASSWORD_SCREEN}
      component={ForgotPasswordScreen}
    />
    <Stack.Screen
      name={routes.RESET_PASSWORD_SCREEN}
      component={ResetPassword}
    />
    <Stack.Screen name={routes.ON_BOARDING_SCREEN_1} component={OnboardStack} />
  </Stack.Navigator>
);

export default AuthStack;
