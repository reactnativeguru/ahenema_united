import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import NetworkScreen from '../../screens/NetworkScreen/NetworkScreen';
import options from './options';
import routes from '../routes';
import UserProfileScreen from '../../screens/UserProfileScreen/UserProfileScreen';
const Stack = createNativeStackNavigator();

const NetworkStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={options}
        name={routes.NETWORK_SCREEN}
        component={NetworkScreen}
      />
      <Stack.Screen
        options={options}
        name={routes.USER_PROFILE_SCREEN}
        component={UserProfileScreen}
      />
    </Stack.Navigator>
  );
};

export default NetworkStack;
