import React, {useRef} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import {Host} from 'react-native-portalize';

import FlashMessage from 'react-native-flash-message';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './RootNavigation';
import {ApplicationProvider} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

const RootAppNavigation = () => {
  const navigationRef = useRef();
  const routeNameRef = useRef();

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <ApplicationProvider
        {...eva}
        theme={{...eva.light}}
        // customMapping={mapping}
      >
        <NavigationContainer
        // theme={LightTheme}
        // ref={navigationRef}
        // onReady={() =>
        //   (routeNameRef.current =
        //     navigationRef?.current?.getCurrentRoute().name)
        // }
        // onStateChange={async () => {
        //   const previousRouteName = routeNameRef.current;
        //   const currentRouteName =
        //     navigationRef?.current?.getCurrentRoute().name;
        //   console.log(previousRouteName + ' ->> ' + currentRouteName);
        //   routeNameRef.current = currentRouteName;
        // }}
        >
          <Host>
            <FlashMessage position="top" />
            <RootNavigation />
          </Host>
        </NavigationContainer>
      </ApplicationProvider>
    </SafeAreaProvider>
  );
};

export default RootAppNavigation;
