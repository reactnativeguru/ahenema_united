import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, SIZES, FONTS} from '../../constants';
import {IconMaterialIcon, IconAntDesign} from '../index';

const ActionModal = ({onPress, userType}) => {
  return (
    <View style={styles.actionContainer}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Actions</Text>
      </View>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => onPress('holla')}
        activeOpacity={0.9}
      >
        <IconAntDesign
          color={COLORS.primary}
          name={'plussquareo'}
          size={SIZES.h2}
        />
        <Text style={styles.buttonText}>Create a Holla</Text>
      </TouchableOpacity>

      {userType && userType === 'Mentor' ? (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onPress('mentring')}
          activeOpacity={0.9}
        >
          <IconMaterialIcon
            color={COLORS.primary}
            name={'post-add'}
            size={SIZES.h2}
          />
          <Text style={styles.buttonText}>Create Mentoring Session</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
export default ActionModal;

const styles = StyleSheet.create({
  actionContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.transparent,
  },
  heading: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    ...FONTS.h3,
    borderBottomWidth: 3,
    color: COLORS.primary,
  },
  actionButton: {
    width: '100%',
    height: 50,
    paddingHorizontal: SIZES.paddingLeft * 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    ...FONTS.h4,
    paddingLeft: SIZES.paddingLeft,
    color: COLORS.primary,
  },
});
