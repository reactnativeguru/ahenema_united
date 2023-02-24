import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { IconAntDesign } from '../../components';
import { COLORS } from '../../constants';
import {
  Activity, EditPhoto
} from '../../screens/ProfileScreen/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function ProfileTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color, size}) => {
          let iconName = '';
          if (route.name === 'EditBio') {
            iconName = 'profile';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          } else if (route.name === 'Activity') {
            iconName = 'addusergroup';
          } else if (route.name === 'EditSkills') {
            iconName = 'tags';
          }
          return <IconAntDesign name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.lightGray4,
      })}
    >
      <Tab.Screen name="Activity" component={Activity} />
      {/* <Tab.Screen name="EditSkills" component={EditSkills} />
      <Tab.Screen name="EditBio" component={EditBio} /> */}
      <Tab.Screen name="Profile" component={EditPhoto} />
    </Tab.Navigator>
  );
}
