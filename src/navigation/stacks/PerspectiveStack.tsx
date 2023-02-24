import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PerspectiveScreen from '../../screens/PerspectiveScreen/PerspectiveScreen';
import options from './options';
import routes from '../routes';

const Stack = createNativeStackNavigator();

const PerspectiveStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={options}
        name={routes.HOLLA_SCREEN}
        component={PerspectiveScreen}
      />
    </Stack.Navigator>
  );
};

export default PerspectiveStack;
