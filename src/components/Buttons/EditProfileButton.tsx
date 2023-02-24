import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../constants';

type Props = {
  onPress: () => void;
};

const EditButton = ({onPress}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <MaterialCommunityIcons name="account-edit" size={30} color="white" />
    </TouchableOpacity>
  );
};
export default EditButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    width: 50,
    height: 50,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20, //TODO fix positioning should be at the top or placed at the bottoms
    right: 20,
    // flex: 1,
    zIndex: 5,
  },
});
