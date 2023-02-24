import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, Linking } from 'react-native';
import { SIZES, COLORS, FONTS } from '../../constants';
import { scale } from 'react-native-size-matters';
import {
  IconAntDesign,
} from '../../components';
import RetailerPostMapScreen from '../../screens/RetailerListScreen/RetailerPostMapScreen';

const RetailerListingDetailCard = ({ item }: any) => {
  const {
    image,
    retailersCity,
    phone,
    website,
    retailersCategory,
    retailersCurrency,
    priceFrom,
    priceTo,
    description,
  } = item;
  console.log(item,"itemmm")
  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Image style={styles.contentImage} source={{ uri: image }} />
        {/* <View >
          <Text style={styles.title}>{description}</Text>
          <Text style={styles.text2}>{retailersCategory.name}</Text>
        </View> */}
      </View>
      <Text style={styles.title} >Category</Text>
      <Text style={styles.text2}>{retailersCategory?.name}</Text>
      
      <Text style={styles.title} >Description</Text>
      <Text style={styles.text2}>{description}</Text>
      
      <Text style={styles.title} >Phone No</Text>
        <TouchableOpacity
          onPress={() => Linking.openURL(`tel:${phone}`)}
          activeOpacity={0.5} style={styles.rowContainer2}
          >
            <Text style={styles.text2}>{phone}</Text>
          <IconAntDesign name={'phone'} size={20} color={'#0086e6'} />
        </TouchableOpacity>

      <Text style={styles.title} >Website Link</Text>
        <TouchableOpacity
          onPress={() => Linking.openURL(`mailto:${website}`)}
          activeOpacity={0.5} style={styles.rowContainer2}
          >
            <Text style={styles.text2}>{website}</Text>
          <IconAntDesign name={'link'} size={20} color={'#0086e6'} />
        </TouchableOpacity>

        <Text style={styles.title} >Currency Name</Text>
        <Text style={styles.text2}>{retailersCurrency?.name}</Text>

        <Text style={styles.title} >Price Range</Text>
        <Text style={styles.text2}>{priceFrom} to {priceTo}</Text>

        <Text style={styles.title} >City</Text>
        <Text style={styles.text2}>{retailersCity?.name}</Text>
        <View style={styles.ViewMap} >
          <RetailerPostMapScreen
            locations={[]}
          />
        </View>
      {/* <TouchableOpacity
        onPress={() => Linking.openURL(`tel:${phone}`)}
        activeOpacity={0.5}
        style={styles.rowContainer}>
        <IconAntDesign name={'phone'} size={25} color={COLORS.lightGray2} />
        <Text style={styles.text}>{phone}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => Linking.openURL(`mailto:${website}`)}
        activeOpacity={0.5}
        style={styles.rowContainer}>
        <IconAntDesign name={'link'} size={25} color={COLORS.lightGray2} />
        <Text style={styles.text}>{website}</Text>
      </TouchableOpacity>
      {/* <View style={styles.rowContainer}>
        <IconAntDesign name={'tago'} size={20} color={COLORS.lightGray2} />
        <Text style={styles.text}>{retailersCategory.name}</Text>
      </View> 
      <View style={styles.rowContainer}>
        <MaterialCommunityIcons
          name={'currency-gbp'}
          size={25}
          color={COLORS.lightGray2}
        />
        <Text style={styles.text}>{retailersCurrency.name}</Text>
      </View>
      <View style={styles.rowContainer}>
        <IconIonicon
          name={'ios-pricetags-outline'}
          size={25}
          color={COLORS.lightGray2}
        />
        <Text style={styles.text}>{priceFrom}</Text>
      </View>
      <View style={styles.rowContainer}>
        <IconIonicon
          name={'ios-pricetags-outline'}
          size={25}
          color={COLORS.lightGray2}
        />
        <Text style={styles.text}>{priceTo}</Text>
      </View>
      {/* <View style={styles.rowContainer}>
        <MaterialCommunityIcons
          name={'account-details-outline'}
          size={20}
          color={COLORS.lightGray2}
        />
        <Text style={styles.text}>{description}</Text>
      </View> 
      <View style={styles.rowContainer}>
        <IconAntDesign name={'enviromento'} size={25} color={COLORS.lightGray2} />
        <Text style={styles.text}>{retailersCity.name}</Text>
      </View>
      <View style={styles.ViewMap} >
        <RetailerPostMapScreen
          locations={[]}
        />
      </View> */}
    </View>
  );
};
export default RetailerListingDetailCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: scale(10),
  },
  contentImage: {
    width: '100%',
    height: scale(200),
    borderRadius: 20,
    // marginRight: SIZES.paddingLeft,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(8),
    borderWidth: scale(1),
    borderRadius:20,
    marginBottom:8,
    borderColor: COLORS.borderColor,
    elevation:2,
    backgroundColor:COLORS.white
  },
  rowContainer2:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginRight:8
  },
  text: {
    ...FONTS.body5,
    marginHorizontal: scale(5),
    // color:COLORS.lightGray2
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.paddingLeft
  },
  title: {
    ...FONTS.h4,
    color: COLORS.primary,
    fontWeight: '600',
    // flexWrap:'wrap',
    // backgroundColor:'red',
    // flex:1
  },
  text2: {
    ...FONTS.body6,
    color: COLORS.lightGray2,
    marginVertical:5,
    // textAlign:'center'
    // alignSelf:'center',
    // marginLeft:5
  },
  ViewMap: {
    marginTop:20,
    height: 300,
    marginVertical: SIZES.paddingLeft
  }
});
