import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {SIZES, COLORS} from '../../constants';

const ImagePickerModal = ({actions, isVisible, setIsVisible}) => {
  return (
    <Modal isVisible={isVisible}>
      <TouchableOpacity
        style={styles.modalContainer}
        onPress={() =>
          setIsVisible
            ? setIsVisible()
            : console.log('setIsVisible function is not there')
        }
        activeOpacity={1}
      >
        <View style={styles.buttonContainerStyle}>
          {actions.map((action, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={[styles.button, index === 0 && styles.actionView]}
                onPress={action.callback}
              >
                <Text style={[styles.buttonText]}>{action.text}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ImagePickerModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainerStyle: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    height: 200,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  buttonText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: SIZES.h2,
  },
  actionView: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
});
