import React, { FC } from 'react';
import { View, StyleSheet, Platform, ScrollView } from 'react-native';
import {
  HeaderBar,
  RetailerListingDetailCard,
  LoadingIndicator,
} from '../../components';
import { globalStyles, SIZES, COLORS, FONTS } from '../../constants';
import { verticalScale } from 'react-native-size-matters';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const emptyDetail = {
  description: '',
  id: '',
  priceTo: '',
  image: '',
  phone: '',
  priceFrom: '',
  retailer: {
    id: '',
    image: '',
    name: '',
  },
  retailersCategory: {
    id: '',
    name: '',
  },
  retailersCurrency: {
    id: '',
    name: '',
  },
  retailersCity: {
    id: '',
    name: '',
  },
  title: '',
  website: '',
  user: {
    id: '',
    lastname: '',
    firstname: '',
    username: '',
  },
};

type RootStackParamList = {
  RetailerListDetailScreen: undefined;
};

type RetailerListDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'RetailerListDetailScreen'
>;

const RetailerListDetailScreen: FC<RetailerListDetailScreenProps> = ({
  route,
}) => {
  const detail = route?.params ? route.params : emptyDetail;
  // const [loader, setLoader] = useState<boolean>(false);
  const loader = false;
// console.log(detail,"deeeeetaaaails")
  return (
    <View style={styles.container}>
      <HeaderBar
        title={detail.title}
        height={verticalScale(Platform.OS === 'ios' ? 100 : 80)}
        showBackIcon
      />
      <View style={globalStyles.scrollViewContentStyle}>
        <ScrollView>
          <View
            style={[
              globalStyles.contentContainerStyle,
              styles.contentContainerStyle,
            ]}
          >
            {!loader ? (
              <RetailerListingDetailCard item={detail} />
            ) : (
              <View style={styles.loadingContainer}>
                <LoadingIndicator color={COLORS.primary} size={35} />
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
export default RetailerListDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    flex: 1,
    marginTop:20,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 2 * SIZES.paddingLeft,
  },
  notFound: {
    ...FONTS.h3,
    alignSelf: 'center',
  },
});
