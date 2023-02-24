import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import HollaPostScreen from '../../screens/PerspectivePostScreen/PerspectivePostScreen';
// import options from './options';
// import routes from '../routes';

const Stack = createNativeStackNavigator();

const ActionStack = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        options={options}
        name={routes.ADD_POSTS_SCREEN}
        component={HollaPostScreen}
      /> */}
    </Stack.Navigator>
  );
};

export default ActionStack;
