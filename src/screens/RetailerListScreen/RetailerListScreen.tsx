import React, {FC, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {
  HeaderBar,
  RetailerListingCard,
  LoadingIndicator,
} from '../../components';
import {globalStyles, SIZES, COLORS, FONTS, routes} from '../../constants';
import {verticalScale} from 'react-native-size-matters';
import {GET_RETAILER_LISTING} from '../../graphql/subscriptions';
import FIcon from 'react-native-vector-icons/Feather';
import {useSubscription} from '@apollo/client';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RetailerPostMapScreen from './RetailerPostMapScreen';

type RootStackParamList = {
  RetailerScreen: undefined;
};

type RetailerScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'RetailerScreen'
>;

const RetailerScreen: FC<RetailerScreenProps> = ({navigation, route}) => {
  const {id, name} = route && route.params ? route.params : {id: '', name: ''};
  const [isShowingMap, setIsShowingMap] = useState(false);
  const {data, loading} = useSubscription(GET_RETAILER_LISTING, {
    variables: {categoryId: id},
  });

  const addRetailer = () => {
    navigation.navigate('GlobalModal', {
      screen: routes.ADD_RETAILER_POSTS_SCREEN,
      params: {id, name},
    });
  };

  const changeView = () => {
    setIsShowingMap(!isShowingMap);
  };

  const retailerListDetail = item => {
    navigation.navigate(routes.RETAILER_LISTING_DETAIL_SCREEN, item);
  };

  return (
    <View style={styles.container}>
      <HeaderBar
        title={name}
        height={verticalScale(Platform.OS === 'ios' ? 100 : 80)}
        showBackIcon
        rightPress={() => changeView()}
        rightIcon={
          <FIcon
            name={isShowingMap ? 'list' : 'map-pin'}
            size={25}
            color={COLORS.white}
          />
        }
      />
      <View style={globalStyles.scrollViewContentStyle}>
        <View style={globalStyles.contentContainerStyle}>
          {/* eslint-disable-next-line no-nested-ternary */}
          {!loading ? (
            isShowingMap ? (
              <RetailerPostMapScreen
                currentUser={null}
                locations={data?.listings ? data.listings : []}
                onPress={retailerListDetail}
              />
            ) : (
              <FlatList
                data={data?.listings ? data.listings : []}
                contentContainerStyle={globalStyles.container}
                renderItem={({item}) => (
                  <RetailerListingCard
                    item={item}
                    onPress={() => retailerListDetail(item)}
                  />
                )}
                keyExtractor={(item, ind) => ind.toString()}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                  <Text style={styles.notFound}>No list found</Text>
                )}
              />
            )
          ) : (
            <View style={styles.loadingContainer}>
              <LoadingIndicator color={COLORS.primary} size={35} />
            </View>
          )}
        </View>
      </View>
      <TouchableOpacity
        onPress={addRetailer}
        activeOpacity={0.7}
        style={styles.addIconView}
      >
        <FIcon name={'plus'} size={25} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};
export default RetailerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  addIconView: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: SIZES.paddingLeft,
    bottom: SIZES.paddingLeft / 2,
  },
});
