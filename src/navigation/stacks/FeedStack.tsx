import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import options from './options';
import routes from '../routes';
import FeedScreen from '../../screens/FeedScreen/FeedScreen';
const Stack = createNativeStackNavigator();

const FeedStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={options}
        name={routes.FEED_SCREEN}
        component={FeedScreen}
      />
    </Stack.Navigator>
  );
};

export default FeedStack;
