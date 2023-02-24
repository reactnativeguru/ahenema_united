import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import EIcon from 'react-native-vector-icons/Entypo';
import {COLORS} from '../../constants';

type Props = {
  icon: string;
  onPress: () => void;
  width?: number;
  border?: boolean;
  style?: any;
  size?: boolean;
};

const PhotoPicker = ({icon, onPress, style, width, border, size}: Props) => (
  <TouchableOpacity
    style={[
      style,
      // globalStyles.hollaFormImageView,
      width ? {width, height: width, borderRadius: width / 2} : {},
      border ? styles.borderContainer : {},
    ]}
    activeOpacity={0.5}
    onPress={onPress}
  >
    <EIcon name={icon} size={size ? size : 40} color={COLORS.black} />
  </TouchableOpacity>
);
export default PhotoPicker;

const styles = StyleSheet.create({
  borderContainer: {borderWidth: 1, borderColor: COLORS.lightGray3},
});
