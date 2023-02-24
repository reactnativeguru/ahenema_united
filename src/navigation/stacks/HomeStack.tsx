import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../screens/HomeScreen/Home';

import options from './options';
import routes from '../routes';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={options}
        name={routes.HOME_SCREEN1}
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
