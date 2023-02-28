import React, {FC, useEffect, useState, useContext} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {
  HeaderBar,
  Input,
  RoundButton,
  PhotoPicker,
  ImagePickerModal,
  Avatar,
  FlashMessage,
} from '../../components';
import {
  globalStyles,
  SIZES,
  COLORS,
  FONTS,
  WIDTH,
  routes,
} from '../../constants';
import {verticalScale} from 'react-native-size-matters';
import ImagePicker from 'react-native-image-crop-picker';
import {Select, SelectItem} from '@ui-kitten/components';
import {useMutation, useQuery} from '@apollo/client';
import {Context as AuthContext} from '../../context/authContext';
import {CREATE_LISTING} from '../../graphql/mutations';
import {
  GET_RETAILERS_CITY,
  GET_RETAILERS_CURRENCY,
  GET_RETAILERS_CATEGORY,
} from '../../graphql/queries';
import {fileUploadPostImageToS3} from '../../services/media';
import {
  AuthContextType,
  ImagePickerAction,
  Listings,
} from '../../utils/interfaces';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {GetCurrentLocation} from '../../utils/location';

const IMAGEPICKEROBJ = {
  width: WIDTH,
  cropping: true,
  multiple: false,
  compressImageQuality: 1,
};

type Location = {
  longitude: number;
  latitude: number;
};

type RootStackParamList = {
  RetailerPostScreen: undefined;
};

type RetailerPostScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'RetailerPostScreen'
>;

const RetailerPostScreen: FC<RetailerPostScreenProps> = ({
  navigation,
  route,
}) => {
  const {id, name} = route && route.params ? route.params : {id: '', name: ''};
  const {state} = useContext(AuthContext) as AuthContextType;
  const user = state?.user?.username ? state.user.username : 'John';
  const [InsertListings] = useMutation(CREATE_LISTING);
  const {data: retailerCities} = useQuery(GET_RETAILERS_CITY);
  const {data: retailerCurrencies} = useQuery(GET_RETAILERS_CURRENCY);
  const {data: retailerCategories} = useQuery(GET_RETAILERS_CATEGORY);
  const [title, setTitle] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [currency, setCurrency] = useState<string>('');
  const [priceFrom, setPriceFrom] = useState<string>('');
  const [priceTo, setPriceTo] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [actions, setActions] = useState<ImagePickerAction>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [cityId, setCityId] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [currencyId, setCurrencyId] = useState<string>('');
  const [coords, setCoords] = useState<any>({latitude: null, longitude: null});

  useEffect(() => {
    const subscribe = async () => {
      const location = (await GetCurrentLocation()) as null | Location;
      if (location?.latitude) {
        setCoords(location);
      } else {
        navigation.goBack();
        FlashMessage({
          message: 'Location',
          description: 'Location access failed',
          type: 'danger',
        });
      }
    };
    return subscribe();
  }, [navigation]);

  const takeImageHandler = async () => {
    setIsVisible(true);
    const imageData = [
      {
        text: 'Camera',
        callback: async () => {
          const response = await ImagePicker.openCamera(IMAGEPICKEROBJ);
          setSelectedImage(response.path);
          setIsVisible(false);
        },
      },
      {
        text: 'Gallery',
        callback: async () => {
          const response = await ImagePicker.openPicker(IMAGEPICKEROBJ);
          setSelectedImage(response.path);
          setIsVisible(false);
        },
      },
    ];
    setActions(imageData);
  };

  const SaveHolla = async () => {
    if (!title) {
      setIsError(true);
      return;
    }
    setLoader(true);
    const listing = {
      userId: 'aa1a6da9-2a05-4a86-a961-9463a292e95e',
      category: categoryId,
      city: cityId,
      currency: currencyId,
      description: description,
      image: '',
      phone: phone,
      priceFrom: priceFrom,
      priceTo: priceTo,
      retailerId: id,
      title: title,
      website: website,
      longitude: coords.longitude,
      latitude: coords.latitude,
    } as Listings;
    let imageUrl;

    if (selectedImage) {
      imageUrl = await fileUploadPostImageToS3({
        image: selectedImage,
        name: user,
      });
      if (imageUrl) {
        listing.image = imageUrl;
      }
    }
    InsertListings({
      variables: listing,
    })
      .then(() => {
        navigation.navigate(routes.RETAILER_SCREEN, {id, name});
        FlashMessage({
          message: 'Listing',
          description: 'Listing posted',
          type: 'success',
        });
        setLoader(false);
      })
      .catch(error => {
        setLoader(false);
        console.log({error});
        FlashMessage({
          message: 'Listing',
          description: 'Listing failed',
          type: 'danger',
        });
      });
  };

  return (
    <View style={styles.container}>
      <HeaderBar
        title={'Create a Business'}
        height={verticalScale(100)}
        showBackIcon
      />
      <ScrollView
        style={globalStyles.scrollViewContentStyle}
        contentContainerStyle={styles.scrollViewContent}>
        <View style={globalStyles.contentContainerStyle}>
          <View style={globalStyles.spacing}>
            <Text style={globalStyles.label}>Listing Title</Text>
            <Input
              placeholder={'Listing Title'}
              onChangeText={(text: string) => setTitle(text)}
              value={title}
              maxLength={250}
            />
            {isError && !title ? (
              <View style={styles.contentView}>
                <Text style={[globalStyles.errorText]}>
                  Please write post content
                </Text>
              </View>
            ) : null}
          </View>
          <View style={globalStyles.spacing}>
            <Text style={globalStyles.label}>Select City</Text>
            {retailerCities?.retailersCity ? (
              <Select
                placeholder={'Select City'}
                value={city}
                style={styles.select}
                onSelect={index => {
                  setCity(retailerCities.retailersCity[index - 1].name);
                  setCityId(retailerCities.retailersCity[index - 1].id);
                }}>
                {retailerCities.retailersCity.map((item, index: number) => {
                  return <SelectItem key={index} title={item.name} />;
                })}
              </Select>
            ) : null}
          </View>
          <View style={globalStyles.spacing}>
            <Text style={globalStyles.label}>Phone</Text>
            <Input
              placeholder={'Phone'}
              onChangeText={(text: string) => setPhone(text)}
              value={phone}
              maxLength={250}
            />
            {isError && !phone ? (
              <View style={styles.contentView}>
                <Text style={[globalStyles.errorText]}>
                  Please write post content
                </Text>
              </View>
            ) : null}
          </View>

          <View style={globalStyles.spacing}>
            <Text style={globalStyles.label}>Website</Text>
            <Input
              placeholder={'Website'}
              onChangeText={(text: string) => setWebsite(text)}
              value={website}
              maxLength={250}
            />
            {isError && !website ? (
              <View style={styles.contentView}>
                <Text style={[globalStyles.errorText]}>
                  Please write post content
                </Text>
              </View>
            ) : null}
          </View>

          <View style={globalStyles.spacing}>
            <Text style={globalStyles.label}>Category</Text>
            {retailerCategories?.retailersCategory ? (
              <Select
                placeholder={'Select Category'}
                value={category}
                style={styles.select}
                onSelect={index => {
                  setCategory(
                    retailerCategories.retailersCategory[index - 1].name,
                  );
                  setCategoryId(
                    retailerCategories.retailersCategory[index - 1].id,
                  );
                }}>
                {retailerCategories.retailersCategory.map(
                  (item, index: number) => {
                    return <SelectItem key={index} title={item.name} />;
                  },
                )}
              </Select>
            ) : null}
          </View>

          <View style={globalStyles.spacing}>
            <Text style={globalStyles.label}>Select Currency</Text>
            {retailerCurrencies?.retailersCurrency ? (
              <Select
                placeholder={'Select Currency'}
                value={currency}
                style={styles.select}
                onSelect={index => {
                  setCurrency(
                    retailerCurrencies.retailersCurrency[index - 1].name,
                  );
                  setCurrencyId(
                    retailerCurrencies.retailersCurrency[index - 1].id,
                  );
                }}>
                {retailerCurrencies.retailersCurrency.map(
                  (item, index: number) => {
                    return <SelectItem key={index} title={item.name} />;
                  },
                )}
              </Select>
            ) : null}
          </View>
          <View style={globalStyles.spacing}>
            <Text style={globalStyles.label}>Price From</Text>
            <Input
              placeholder={'Price From'}
              onChangeText={(text: string) => setPriceFrom(text)}
              value={priceFrom}
              maxLength={250}
            />
            {isError && !priceFrom ? (
              <View style={styles.contentView}>
                <Text style={[globalStyles.errorText]}>
                  Please write post content
                </Text>
              </View>
            ) : null}
          </View>

          <View style={globalStyles.spacing}>
            <Text style={globalStyles.label}>Price To</Text>
            <Input
              placeholder={'Price To'}
              onChangeText={(text: string) => setPriceTo(text)}
              value={priceTo}
              maxLength={250}
            />
            {isError && !priceTo ? (
              <View style={styles.contentView}>
                <Text style={[globalStyles.errorText]}>
                  Please write post content
                </Text>
              </View>
            ) : null}
          </View>

          <View style={globalStyles.spacing}>
            <Text style={globalStyles.label}>Description</Text>
            <Input
              textarea={true}
              placeholder={'Description'}
              onChangeText={(text: string) => setDescription(text)}
              value={description}
              maxLength={250}
            />
            {isError && !description ? (
              <View style={styles.contentView}>
                <Text style={[globalStyles.errorText]}>
                  Please write post content
                </Text>
              </View>
            ) : null}
          </View>
          <View style={[globalStyles.spacing, styles.ImageContainer]}>
            <PhotoPicker icon={'camera'} onPress={() => takeImageHandler()} />
            {selectedImage ? (
              <Avatar
                url={selectedImage}
                style={{...globalStyles.hollaFormImageView}}
              />
            ) : null}
          </View>
        </View>
      </ScrollView>
      <View style={styles.btns}>
        <RoundButton
          title={'SAVE'}
          loader={loader}
          disable={loader || !categoryId || !title || !selectedImage}
          onPress={SaveHolla}
        />
      </View>
      <ImagePickerModal
        isVisible={isVisible}
        setIsVisible={() => setIsVisible(false)}
        actions={actions}
      />
    </View>
  );
};
export default RetailerPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  postContainer: {},
  ImageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dropdownText: {
    ...FONTS.h5,
    textAlign: 'left',
    color: COLORS.primary,
  },
  btns: {
    width: '100%',
    position: 'absolute',
    bottom: 2 * SIZES.paddingLeft,
    alignSelf: 'center',
    paddingHorizontal: SIZES.paddingLeft,
  },
  select: {width: '100%', backgroundColor: '#fff'},
  contentView: {flexDirection: 'row', justifyContent: 'space-between'},
  scrollViewContent: {paddingBottom: 100},
});
