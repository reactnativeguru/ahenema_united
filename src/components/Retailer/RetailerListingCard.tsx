import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import {SIZES, COLORS, FONTS} from '../../constants';
import {scale} from 'react-native-size-matters';
import {IconAntDesign} from '../../components';

const RetailerListingCard = ({item, onPress}: any) => {
  const {title, image, retailersCity, retailersCategory, retailersCurrency} =
    item;
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={onPress}>
      <Image style={styles.contentImage} source={{uri: image}} />
      <View style={styles.categoryTextContainer}>
        <Text style={styles.categoryText}>{retailersCategory.name}</Text>
      </View>
      <View style={styles.textContainer}>
        <View style={[styles.rowContainer, styles.enviroment]}>
          <View style={styles.rowContainer}>
            <IconAntDesign name={'tags'} size={20} color={COLORS.gray} />
            <Text style={styles.title}>{title}</Text>
          </View>
          <View>
            <Text style={styles.text}>{retailersCurrency.name}</Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <IconAntDesign name={'enviroment'} size={20} color={COLORS.gray} />
          <Text style={styles.title}>{retailersCity.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default RetailerListingCard;

const styles = StyleSheet.create({
  container: {
    marginBottom: scale(10),
    marginTop: scale(5),
    // padding:scale(5)
  },
  contentImage: {
    width: undefined,
    height: scale(200),
    borderTopLeftRadius: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
    overflow: 'hidden',
  },
  categoryTextContainer: {
    backgroundColor: COLORS.transparentBlack2,
    borderTopLeftRadius: SIZES.radius,
    borderBottomRightRadius: SIZES.radius,
    // borderTopRightRadius: SIZES.radius,
    // borderBottomLeftRadius:SIZES.radius,
    paddingVertical: scale(5),
    paddingHorizontal: scale(8),
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    // right: 0,
  },
  categoryText: {
    ...FONTS.body5,
    color: COLORS.white,
  },
  textContainer: {
    backgroundColor: COLORS.offWhite,
    borderBottomLeftRadius: SIZES.radius / 1.5,
    borderBottomRightRadius: SIZES.radius / 1.5,
    paddingHorizontal: scale(SIZES.paddingLeft / 2),
    paddingVertical: scale(5),
  },
  rowContainer: {flex: 1, flexDirection: 'row', alignItems: 'center'},
  enviroment: {justifyContent: 'space-between'},
  title: {
    ...FONTS.body5,
    // fontWeight: 'bold',
    marginHorizontal: scale(5),
    color: COLORS.gray,
  },
  text: {
    ...FONTS.body5,
    marginHorizontal: scale(5),
    color: COLORS.gray,
  },
});
