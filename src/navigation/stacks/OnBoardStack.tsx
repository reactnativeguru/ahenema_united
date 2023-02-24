import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  OnboardScreenOne,
  OnboardScreenTwo,
  OnboardScreenThree,
  OnboardScreenFour,
  OnboardScreenFive,
} from '../../screens/OnBoardingScreens/OnBoardingScreens';

import options from './options';
import routes from '../routes';

const Stack = createNativeStackNavigator();

const OnBoardStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, presentation: 'containedModal'}}
    >
      <Stack.Screen
        options={options}
        name={routes.ON_BOARDING_SCREEN_1}
        component={OnboardScreenOne}
      />
      <Stack.Screen
        options={options}
        name={routes.ON_BOARDING_SCREEN_2}
        component={OnboardScreenTwo}
      />
      <Stack.Screen
        options={options}
        name={routes.ON_BOARDING_SCREEN_3}
        component={OnboardScreenThree}
      />
      <Stack.Screen
        options={options}
        name={routes.ON_BOARDING_SCREEN_4}
        component={OnboardScreenFour}
      />
      <Stack.Screen
        options={options}
        name={routes.ON_BOARDING_SCREEN_5}
        component={OnboardScreenFive}
      />
    </Stack.Navigator>
  );
};

export default OnBoardStack;
