import React, {FC, useContext, useEffect} from 'react';
import {View, StyleSheet, Text, Platform, FlatList} from 'react-native';
import {COLORS, FONTS, globalStyles, routes, SIZES} from '../../constants';
import {HeaderBar, LoadingIndicator, NetworkCard} from '../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {verticalScale} from 'react-native-size-matters';
import {useSubscription} from '@apollo/client';
import {GET_USERS_PROFILE, GET_FOLLOW} from '../../graphql/subscriptions';
import {Context as ChatContext} from '../../context/chatContext';

type RootStackParamList = {
  NetworkScreen: undefined;
};

type NetworkScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'NetworkScreen'
>;

const NetworkScreen: FC<NetworkScreenProps> = ({navigation}) => {
  const user_id = '9e832a38-2dca-47b0-8afa-6a18a57cd87b';
  const {data, loading} = useSubscription(GET_USERS_PROFILE, {
    variables: {id: user_id},
  });
  const {data: followData} = useSubscription(GET_FOLLOW, {
    variables: {id: user_id},
  });
  const {setChatRoom} = useContext(ChatContext);

  useEffect(() => {
    console.warn({followData});
  }, [followData, data]);

  const userDetail = (id: string) => {
    let isFollowing;
    if (followData?.follow) {
      isFollowing = followData.follow.find(
        (follow: any) =>
          follow.user_id === user_id && follow.follower_id === id,
      );
    }
    navigation.navigate(routes.USER_PROFILE_SCREEN, {
      id,
      isFollowing,
    });
  };

  const ChatClick = item => {
    const ChatData = {
      latestMessage: {
        createdAt: 1611750005404,
        text: 'Now',
      },
      name: 'another one',
    };

    setChatRoom({...ChatData, _id: item.id});
    navigation.navigate('GlobalModal', {
      screen: routes.CHAT_SCREEN,
      params: {thread: item},
    });
  };
  return (
    <View style={styles.container} testID="NetworkScreen-container">
      <HeaderBar
        title={'Network'}
        height={verticalScale(Platform.OS === 'ios' ? 100 : 80)}
        showDrawer
      />
      <View style={globalStyles.scrollViewContentStyle}>
        <View style={globalStyles.contentContainerStyle}>
          {!loading ? (
            <FlatList
              data={[...data.users]}
              numColumns={2}
              // ItemSeparatorComponent={()=><View style={{height:10}}></View>}
              keyExtractor={(item, ind) => ind.toString()}
              columnWrapperStyle={styles.containerStyle}
              renderItem={({item}) => {
                return (
                  <NetworkCard
                    item={item}
                    id={item.id}
                    followData={followData?.follow ? followData.follow : []}
                    onPress={() => userDetail(item._id)}
                    navigation={navigation}
                    handleChatPress={() => ChatClick(item)}
                  />
                );
              }}
              ListEmptyComponent={() => (
                <Text style={styles.notFound}>No Network found</Text>
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
  containerStyle: {
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
});

export default NetworkScreen;
