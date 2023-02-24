import React, {FC} from 'react';
import {View, FlatList, StyleSheet, Text, Platform} from 'react-native';
import {HeaderBar, PerspectiveCard, LoadingIndicator} from '../../components';
import {globalStyles, SIZES, COLORS, FONTS, routes} from '../../constants';
import {verticalScale} from 'react-native-size-matters';
import {GET_PERSPECTIVES} from '../../graphql/subscriptions';
import AIcon from 'react-native-vector-icons/AntDesign';
import {useSubscription} from '@apollo/client';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  PerspectiveScreen: undefined;
};

type PerspectiveScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PerspectiveScreen'
>;

const PerspectiveScreen: FC<PerspectiveScreenProps> = ({navigation}) => {
  const {data, loading} = useSubscription(GET_PERSPECTIVES);

  const joinClick = () => {
    navigation.navigate('GlobalModal', {
      screen: routes.ADD_POSTS_SCREEN,
    });
  };

  return (
    <View style={styles.container}>
      <HeaderBar
        title={'Perspective'}
        height={verticalScale(Platform.OS === 'ios' ? 100 : 80)}
        showDrawer
        rightPress={() => joinClick()}
        rightIcon={<AIcon name="plus" size={25} color={COLORS.white} />}
      />
      <View style={globalStyles.scrollViewContentStyle}>
        <View style={globalStyles.contentContainerStyle}>
          {!loading ? (
            <FlatList
              data={data?.perspectives}
              contentContainerStyle={globalStyles.container}
              renderItem={({item}) => <PerspectiveCard item={item} />}
              keyExtractor={(item, ind) => ind.toString()}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => (
                <Text style={styles.notFound}>No Holla found</Text>
              )}
            />
          ) : (
            <View style={styles.loadingContainer}>
              <LoadingIndicator color={COLORS.primary} size={35} />
            </View>
          )}
        </View>
      </View>
      {/* {isFilter ? (
        <HollaFilterModal
          heading={'Select hola category'}
          labels={[{label: 'All'}, ...categoryData.category]}
          value={category}
          _OnPress={text => ChangeCategory(text)}
        />
      ) : (
        false
      )} */}
    </View>
  );
};
export default PerspectiveScreen;

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
