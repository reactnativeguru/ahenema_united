import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, FONTS} from '../../constants';
import {LoadingIndicator} from '..';
import {scale} from 'react-native-size-matters';

type Props = {
  title: string;
  onPress: () => void;
  loader?: boolean;
  disable?: boolean;
  bgColor?: string;
  fgColor?: string;
  btnStyle?: any;
};

const RoundButton = ({
  title,
  onPress,
  loader,
  disable,
  bgColor,
  fgColor,
  btnStyle,
}: Props) => (
  <TouchableOpacity
    style={[
      styles.container,
      btnStyle,
      disable && {backgroundColor: COLORS.lightGray4},
      bgColor ? {backgroundColor: bgColor} : {},
    ]}
    onPress={onPress}
    disabled={loader || disable}
    activeOpacity={0.9}
  >
    {loader ? (
      <LoadingIndicator />
    ) : (
      <Text style={[styles.title, fgColor ? {color: fgColor} : {}]}>
        {title}
      </Text>
    )}
  </TouchableOpacity>
);
export default RoundButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: scale(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(25),
    backgroundColor: COLORS.primary,
  },
  title: {
    ...FONTS.body3,
    color: COLORS.white,
  },
});
