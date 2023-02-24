import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {COLORS, SIZES} from '../../constants';

type Props = {
  color?: string;
  size?: number;
};

const LoadingIndicator = ({color, size}: Props) => (
  <View style={styles.container}>
    <ActivityIndicator
      color={color ? color : COLORS.white}
      size={size ? size : SIZES.h2}
    />
  </View>
);
export default LoadingIndicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
