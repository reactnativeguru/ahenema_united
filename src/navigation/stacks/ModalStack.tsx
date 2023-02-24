import React from 'react';
import {Easing} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeDetailScreen from '../../screens/HomeScreen/HomeDetailScreen';
import PerspectivePostScreen from '../../screens/PerspectivePostScreen/PerspectivePostScreen';
import FAQScreen from '../../screens/FAQScreen';
import AboutScreen from '../../screens/AboutScreen/AboutScreen';
import TermAndConditionScreen from '../../screens/AboutScreen/TermAndConditionScreen';
import PrivacyPolicyScreen from '../../screens/AboutScreen/PrivacyPolicyScreen';
import AppInfoScreen from '../../screens/AboutScreen/AppInfoScreen';
import options from './options';
import routes from '../routes';
import RetailerPostScreen from '../../screens/RetailerPostScreen/RetailerPostScreen';
import ChatScreen from '../../screens/ChatScreen/ChatScreen';

const Stack = createNativeStackNavigator();

export const iosTransitionSpec = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 10,
    restSpeedThreshold: 10,
  },
};

export const FadeInFromBottomAndroidSpec = {
  animation: 'timing',
  config: {
    duration: 350,
    easing: Easing.out(Easing.poly(5)),
  },
};

export const FadeOutToBottomAndroidSpec = {
  animation: 'timing',
  config: {
    duration: 150,
    easing: Easing.in(Easing.linear),
  },
};

const ModalStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, presentation: 'modal'}}
    >
      <Stack.Screen
        // options={options}
        name={routes.FAQS_SCREEN}
        component={FAQScreen}
      />
      <Stack.Screen
        options={options}
        name={routes.ADD_POSTS_SCREEN}
        component={PerspectivePostScreen}
      />
      <Stack.Screen
        options={options}
        name={routes.ADD_RETAILER_POSTS_SCREEN}
        component={RetailerPostScreen}
      />

      <Stack.Screen
        options={options}
        name={routes.HOME_DETAIL_SCREEN}
        component={HomeDetailScreen}
      />
      <Stack.Screen
        options={options}
        name={routes.ABOUT_SCREEN}
        component={AboutScreen}
      />
      <Stack.Screen
        options={options}
        name={routes.TERMS_CONDITIONS_SCREEN}
        component={TermAndConditionScreen}
      />
      <Stack.Screen
        options={options}
        name={routes.PRIVACY_POLICY_SCREEN}
        component={PrivacyPolicyScreen}
      />
      <Stack.Screen
        options={options}
        name={routes.APP_INFO}
        component={AppInfoScreen}
      />

      <Stack.Screen
        options={options}
        name={routes.CHAT_SCREEN}
        component={ChatScreen}
      />
    </Stack.Navigator>
  );
};

export default ModalStack;
