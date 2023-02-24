import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
// import MainTab from './mainTab';
import options from '../stacks/options';
import TabNavigation from '../TabNavigation/TabNavigation';
import FAQScreen from '../../screens/FAQScreen';
import AboutScreen from '../../screens/AboutScreen/AboutScreen';
import ProfileTabNavigation from '../TabNavigation/ProfileTabNavigation';
import FeedStack from '../stacks/FeedStack';
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        options={options}
        name="TabNavigation"
        component={TabNavigation}
      />
      <Drawer.Screen options={options} name="FAQScreen" component={FAQScreen} />
      <Drawer.Screen
        options={options}
        name="ProfileScreen"
        component={ProfileTabNavigation}
      />
      <Drawer.Screen
        options={options}
        name={'FeedScreen'}
        component={FeedStack}
      />
      <Drawer.Screen
        options={options}
        name="AboutScreen"
        component={AboutScreen}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
