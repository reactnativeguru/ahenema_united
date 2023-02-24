import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IconAntDesign} from '../../components';
import {HomeStack, PerspectiveStack, NetworkStack} from '../stacks';
import {COLORS} from '../../constants';
import RetailerStack from '../stacks/RetailerStack';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color, size}) => {
          let iconName = '';
          if (route.name === 'Perspective') {
            iconName = 'profile';
          } else if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Network') {
            iconName = 'addusergroup';
          } else if (route.name === 'Retailer') {
            iconName = 'tags';
          }
          return <IconAntDesign name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.lightGray4,
      })}
    >
      <Tab.Screen name="Perspective" component={PerspectiveStack} />
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Network" component={NetworkStack} />
      <Tab.Screen name="Retailer" component={RetailerStack} />
    </Tab.Navigator>
  );
}
