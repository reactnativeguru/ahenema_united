import React from 'react';
import {Animated, StyleSheet} from 'react-native';

type Props = {
  children: any;
  style: object;
};

export const Layout = ({children, style}: Props) => (
  <Animated.View style={[s.app, style]}>{children}</Animated.View>
);

const s = StyleSheet.create({
  app: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    padding: 15,

    backgroundColor: '#fafafa',
  },
});
