import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SIZES, COLORS, FONTS} from '../../constants';
import FIcon from 'react-native-vector-icons/Feather';

type Item = {
  id: number;
  title: string;
  detail: boolean;
};

type Props = {
  item: Item;
  handleClick: (e: number) => void;
  isDetail: boolean;
};

const FaqsList = ({item, handleClick, isDetail}: Props) => {
  const {id, title, detail} = item;

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleClick(id)}
          style={styles.iconView}
        >
          <FIcon
            name={isDetail ? 'minus' : 'plus'}
            size={24}
            color={isDetail ? COLORS.lightGreen : COLORS.lightGray4}
          />
        </TouchableOpacity>
      </View>
      {isDetail ? (
        <View>
          <Text style={styles.text}>{detail}</Text>
        </View>
      ) : null}
    </View>
  );
};
export default FaqsList;

const styles = StyleSheet.create({
  container: {flex: 1},
  subContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderTopWidth: 1,
    borderColor: COLORS.lightGray4,
    paddingVertical: 14,
  },
  iconView: {padding: 6},
  title: {
    fontSize: SIZES.h3,
    color: COLORS.primary,
  },
  text: {
    ...FONTS.body5,
    color: COLORS.lightGray2,
    paddingBottom: 14,
  },
});
