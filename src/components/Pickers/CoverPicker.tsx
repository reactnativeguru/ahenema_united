import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {globalStyles, COLORS} from '../../constants';
import EIcon from 'react-native-vector-icons/Entypo';

type Props = {
  icon: string;
  onPress: () => void;
};

const CoverPicker = ({icon, onPress}: Props) => (
  <TouchableOpacity
    style={globalStyles.coverImage}
    activeOpacity={0.5}
    onPress={onPress}
  >
    <EIcon name={icon} size={24} color={COLORS.primary} style={styles.icon} />
  </TouchableOpacity>
);
export default CoverPicker;

const styles = StyleSheet.create({
  icon: {paddingBottom: 16},
});
