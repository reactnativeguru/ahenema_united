import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS} from '../../constants';

type Props = {
  title?: string;
  handleClick: () => void;
  icon: boolean;
};

const AboutList = (props: Props) => {
  const {title, handleClick, icon} = props;

  return (
    <TouchableOpacity
      style={[styles.container]}
      onPress={() => handleClick()}
      activeOpacity={0.8}
    >
      <View style={styles.subContainer}>
        <Icon color={COLORS.primary} name={'ios-image'} size={24} />
        <Text numberOfLines={1} style={[styles.title]}>
          {`${title ? title : ''}`}
        </Text>
      </View>

      <View style={styles.iconView}>
        {icon && (
          <Icon
            color={COLORS.primary}
            name={'ios-chevron-forward-outline'}
            size={24}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.offWhite,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray4,
  },
  subContainer: {width: '85%', flexDirection: 'row', alignItems: 'center'},
  text: {
    paddingVertical: 4,
    color: COLORS.lightGray2,
    ...FONTS.body5,
  },
  title: {
    color: COLORS.black,
    paddingVertical: 4,
    paddingLeft: 4,
    ...FONTS.body5,
  },
  iconView: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
});

export default AboutList;
