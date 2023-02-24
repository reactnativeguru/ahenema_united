import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import options from './options';
import routes from '../routes';
import RetailerScreen from '../../screens/RetailerScreen/RetailerScreen';
import RetailerListScreen from '../../screens/RetailerListScreen/RetailerListScreen';
import RetailerListDetailScreen from '../../screens/RetailerListDetailScreen/RetailerListDetailScreen';
const Stack = createNativeStackNavigator();

const RetailerStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={options}
        name={routes.RETAILER_SCREEN}
        component={RetailerScreen}
      />
      <Stack.Screen
        options={options}
        name={routes.RETAILER_LISTING_SCREEN}
        component={RetailerListScreen}
      />
      <Stack.Screen
        options={options}
        name={routes.RETAILER_LISTING_DETAIL_SCREEN}
        component={RetailerListDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default RetailerStack;
