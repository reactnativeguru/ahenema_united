import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import IIcon from 'react-native-vector-icons/Ionicons';
import {SIZES, COLORS} from '../../constants';

const ShowImageModal = ({isImageExist, isVisible, close}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={() => close()}
      backdropColor={COLORS.black}
      backdropOpacity={1}
      deviceWidth={SIZES.width}
      deviceHeight={SIZES.height}
      style={styles.viewImageModal}
      animationInTiming={10}
      onSwipeComplete={() => close()}
      swipeDirection={['up', 'down']}
    >
      <View style={{height: SIZES.statusbarHeight}} />

      <View>
        <Image
          style={styles.image}
          source={{
            uri: isImageExist,
          }}
          resizeMode={'contain'}
        />
      </View>
      <TouchableOpacity
        style={styles.imgClose}
        activeOpacity={0.8}
        onPress={() => close()}
      >
        <IIcon name={'ios-close-circle'} size={28} color={COLORS.offWhite} />
      </TouchableOpacity>
    </Modal>
  );
};

export default ShowImageModal;

const styles = StyleSheet.create({
  viewImageModal: {
    flex: 1,
    margin: 0,
  },
  imgClose: {
    padding: SIZES.radius,
    position: 'absolute',
    top: Platform.OS === 'ios' ? SIZES.statusbarHeight : 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5.46,
    elevation: 5,
  },
  image: {width: '100%', height: '90%'},
});
