import React from 'react';
import {View, StyleSheet} from 'react-native';
import Spinner from 'react-native-spinkit';
import {COLORS} from '../../constants';

type Data = {
  index: number;
  types: any;
  size: number;
  color: string;
  isVisible: boolean;
};

const LoadingIndicatorView = () => {
  const data = {
    index: 13,
    types: [
      'CircleFlip',
      'Bounce',
      'Wave',
      'WanderingCubes',
      'Pulse',
      'ChasingDots',
      'ThreeBounce',
      'Circle',
      '9CubeGrid',
      'WordPress',
      'FadingCircle',
      'FadingCircleAlt',
      'Arc',
      'ArcAlt',
    ],
    size: 100,
    color: COLORS.white,
    isVisible: true,
  } as Data;
  return (
    <View style={styles.container}>
      <Spinner
        isVisible={data.isVisible}
        size={data.size}
        type={data.types[data.index]}
        color={data.color}
      />
    </View>
  );
};
export default LoadingIndicatorView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
});
