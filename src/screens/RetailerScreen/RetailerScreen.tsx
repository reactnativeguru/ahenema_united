import React, {FC} from 'react';
import {View, FlatList, StyleSheet, Text, Platform} from 'react-native';
import {HeaderBar, RetailerCard, LoadingIndicator} from '../../components';
import {globalStyles, SIZES, COLORS, FONTS, routes} from '../../constants';
import {verticalScale} from 'react-native-size-matters';
import {GET_RETAILERS} from '../../graphql/subscriptions';
import {useSubscription} from '@apollo/client';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  RetailerScreen: undefined;
};

type RetailerScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'RetailerScreen'
>;

const RetailerScreen: FC<RetailerScreenProps> = ({navigation}) => {
  const {data, loading} = useSubscription(GET_RETAILERS);

  const retailerListing = (id: string, name: string) => {
    navigation.navigate(routes.RETAILER_LISTING_SCREEN, {id, name});
  };

  return (
    <View style={styles.container}>
      <HeaderBar
        title={'Business'}
        height={verticalScale(Platform.OS === 'ios' ? 100 : 80)}
        showDrawer
      />
      <View style={globalStyles.scrollViewContentStyle}>
        <View style={globalStyles.contentContainerStyle}>
          {!loading ? (
            <FlatList
              data={data?.retailers || {}}
              contentContainerStyle={globalStyles.container}
              renderItem={({item}) => (
                <RetailerCard
                  item={item}
                  onPress={() => retailerListing(item.id, item.name)}
                />
              )}
              keyExtractor={(item, ind) => ind.toString()}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => (
                <Text style={styles.notFound}>No retailer found</Text>
              )}
            />
          ) : (
            <View style={styles.loadingContainer}>
              <LoadingIndicator color={COLORS.primary} size={35} />
            </View>
          )}
        </View>
      </View>
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
});
