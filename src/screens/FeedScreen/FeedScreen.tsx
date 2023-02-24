import { useSubscription } from '@apollo/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC, useContext, useState } from 'react';
import {
  FlatList, Platform, StyleSheet, Text,
  TouchableOpacity, View
} from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import {
  FeedChats,
  FeedPeoples, HeaderBar, LoadingIndicator, MainAppContainer
} from '../../components';
import {
  COLORS,
  FONTS, globalStyles, routes, SIZES
} from '../../constants';
import { Context as ChatContext } from '../../context/chatContext';
import { GET_USERS_PROFILE } from '../../graphql/subscriptions';


type RootStackParamList = {
  FeedScreen: undefined;
};

type FeedScreenProps = NativeStackScreenProps<RootStackParamList, 'FeedScreen'>;

const FeedScreen: FC<FeedScreenProps> = ({navigation}) => {
  const [type, setType] = useState('chat');
  const {data, loading, error} = useSubscription(GET_USERS_PROFILE, {
    variables: {id: '9e832a38-2dca-47b0-8afa-6a18a57cd87b'},
  });
  const {setChatRoom} = useContext(ChatContext);
  const ChatData = {
    latestMessage: {
      createdAt: 1611750005404,
      text: 'Now',
    },
    name: 'another one',
  };

  const feedChatClick = (item: Object) => {
    setChatRoom({...ChatData, _id: item.id});
    navigation.navigate('GlobalModal', {
      screen: routes.CHAT_SCREEN,
      params: {thread: item},
    });
  };

  const FeedPeoplesClick = (item: Object) => {
    setChatRoom({...ChatData, _id: item.id});
    navigation.navigate('GlobalModal', {
      screen: routes.CHAT_SCREEN,
      params: {thread: item},
    });
  };

  return (
    <MainAppContainer>
      <View style={styles.container}>
        <HeaderBar
          title={'Feed'}
          height={verticalScale(Platform.OS === 'ios' ? 100 : 80)}
          //   showBackIcon
          showDrawer
        />
        <View style={globalStyles.scrollViewContentStyle}>
          <View style={globalStyles.contentContainerStyle}>
            <View
              style={styles.feedHeader}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setType('chat')}
                style={{
                  ...styles.chatTab,
                  backgroundColor:
                    type === 'chat' ? COLORS.primary : COLORS.lightPrimary,                  
                }}
              >
                <Text style={{...FONTS.h3, color: COLORS.white}}>Chats</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setType('people')}
                style={{
                  ...styles.feedPeopleTab,
                  backgroundColor:
                    type === 'people' ? COLORS.primary : COLORS.lightPrimary,
                  
                }}
              >
                <Text style={{...FONTS.h3, color: COLORS.white}}>Peoples</Text>
              </TouchableOpacity>
            </View>
            {!loading ? (
              type === 'people' ? (
                <FlatList
                  columnWrapperStyle={styles.column}
                  numColumns={2}
                  key={2}
                  data={
                    data?.users
                      ? [
                          ...data.users,
                          ...data.users,
                          ...data.users,
                          ...data.users,
                          ...data.users,
                        ]
                      : []
                  }
                  renderItem={({item}) => (
                    <FeedPeoples
                      item={item}
                      handlePress={() => FeedPeoplesClick(item)}
                      chatPress={() => setType('chat')}
                    />
                  )}
                  keyExtractor={(item, ind) => ind.toString()}
                  showsVerticalScrollIndicator={false}
                  ListEmptyComponent={() => (
                    <Text style={styles.notFound}>{`No ${type} found`}</Text>
                  )}
                />
              ) : (
                <FlatList
                  data={
                    data?.users
                      ? [...data.users, ...data.users, ...data.users]
                      : []
                  }
                  renderItem={({item}) => {
                    console.log(item.username, 'username');
                    return (
                      <FeedChats
                        item={item}
                        handlePress={() => feedChatClick(item)}
                      />
                    );
                  }}
                  keyExtractor={(item, ind) => ind.toString()}
                  showsVerticalScrollIndicator={false}
                  ListEmptyComponent={() => (
                    <Text style={styles.notFound}>{`No ${type} found`}</Text>
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
      </View>
    </MainAppContainer>
  );
};
export default FeedScreen;

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
  feedHeader:{
    width: '100%',
    height: 50,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  feedPeopleTab:{
    flex: 1,
    height: '100%',
    borderTopRightRadius: scale(SIZES.radius * 2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatTab:{
    flex: 1,
    height: '100%',
    borderTopLeftRadius: scale(SIZES.radius * 2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  column:{
    justifyContent:'space-between'
  }
});
