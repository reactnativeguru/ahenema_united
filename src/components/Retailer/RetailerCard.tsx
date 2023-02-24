import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import {SIZES, COLORS, FONTS} from '../../constants';
import {scale} from 'react-native-size-matters';

const RetailerCard = ({item, onPress}: any) => {
  const {name, image, listings_aggregate} = item;
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={onPress}
    >
      <Image style={styles.contentImage} source={{uri: image}} />
      <View style={styles.contentData}>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.itemSeparator}></View>
      <Text
        style={styles.name}
      >{`${listings_aggregate.aggregate.count} Listings`}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default RetailerCard;

const styles = StyleSheet.create({
  container: {
    marginBottom: scale(10),
    overflow:'hidden',
    // padding:0,
    elevation: 3,
    // padding:1,
    borderRadius: SIZES.radius,
    // borderColor:COLORS.black,
    backgroundColor: COLORS.white,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: scale(50 / 50),
  },
  name: {
    ...FONTS.body4,
    color: COLORS.white,
    // position: 'absolute',
    // bottom: 35,
    textAlign: 'center',
    // width: '90%',
    // marginHorizontal: '5%',
    // backgroundColor:'red'
  },
  // list: {
  //   ...FONTS.body5,
  //   color: COLORS.white,
  //   position: 'absolute',
  //   bottom: 10,
  //   textAlign: 'center',
  //   width: '90%',
  //   marginHorizontal: '5%',
  // },
  contentImage: {
    width: undefined,
    height: scale(200),
    borderRadius: SIZES.radius / 1.5,
    // marginTop: scale(5),
  },
  contentData:{
    width:'100%',
    flexDirection:'row',
    position: 'absolute',
    bottom: 0,
    backgroundColor:COLORS.transparentBlack,
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:15,
  },
  itemSeparator:{
    width:1,
    height:'100%',
    marginHorizontal:10,
    backgroundColor:COLORS.white
  }
});
