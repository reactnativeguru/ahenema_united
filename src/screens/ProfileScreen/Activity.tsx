import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Pressable,
} from 'react-native';
import {HeaderBar, LoadingIndicator, MainAppContainer} from '../../components';
import {globalStyles, routes, COLORS, FONTS, SIZES} from '../../constants';
import {scale, verticalScale} from 'react-native-size-matters';
import {GET_ACTIVITY_COUNTS} from '../../graphql/queries';
import {
  GET_CURRENT_USER_POSTS,
  LIKES_ACTIVITY,
  COMMENTS_ACTIVITY,
  BOOKMARK_ACTIVITY,
} from '../../graphql/subscriptions';
import {useQuery} from '@apollo/client';
import {Context as AuthContext} from '../../context/authContext';
import AIcons from 'react-native-vector-icons/AntDesign';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import FIcon from 'react-native-vector-icons/Feather';

const Activity = ({navigation}) => {
  const {state} = useContext(AuthContext);
  const {loading, error, data} = useQuery(GET_ACTIVITY_COUNTS, {
    variables: {id: state?.user?.username ? state.user.username : 'Wasi Ayub'},
  });

  if (error) {
    console.log({error});
  }

  const routeTo = (screenName: string, val: any) => {
    navigation.navigate('GlobalModal', {
      screen: screenName,
      params: val,
    });
  };

  return (
    <MainAppContainer>
      <View style={styles.container}>
        <HeaderBar
          title={'Profile'}
          height={verticalScale(Platform.OS === 'ios' ? 100 : 80)}
          showDrawer
        />
        <ScrollView style={globalStyles.scrollViewContentStyle}>
          {loading ? (
            <View style={globalStyles.contentContainerStyle}>
              <LoadingIndicator color={COLORS.primary} size={25} />
            </View>
          ) : (
            <View style={globalStyles.contentContainerStyle}>
              <Pressable
                onPress={() =>
                  routeTo(routes.CURRENT_USER_HOLLA, LIKES_ACTIVITY)
                }
                style={{
                  ...styles.textView,
                  borderTopLeftRadius: SIZES.radius * 1.5,
                  borderTopRightRadius: SIZES.radius * 1.5,
                }}
              >
                <MIcon name={'favorite-border'} size={20} style={styles.icon} />
                <Text style={styles.text}>
                  {data && data.like_aggregate.aggregate.count > 0
                    ? `You have liked ${
                        data && data.like_aggregate.aggregate.count
                      } ${
                        data && data.like_aggregate.aggregate.count === 1
                          ? 'Holla'
                          : 'Hollas'
                      }`
                    : 'No Hollas! liked yet'}
                </Text>
              </Pressable>
              <Pressable
                onPress={() =>
                  routeTo(routes.CURRENT_USER_HOLLA, COMMENTS_ACTIVITY)
                }
                style={styles.textView}
              >
                <FIcon name={'message-square'} size={20} style={styles.icon} />
                <Text style={styles.text}>
                  {data && data.post_comments_aggregate.aggregate.count > 0
                    ? `You commented on ${
                        data && data.post_comments_aggregate.aggregate.count
                      } ${
                        data &&
                        data.post_comments_aggregate.aggregate.count === 1
                          ? 'Perspective'
                          : 'Perspectives'
                      }`
                    : 'No Perspectives! comment yet'}
                </Text>
              </Pressable>
              <View style={styles.textView}>
                <AIcons name={'team'} size={20} style={styles.icon} />
                <Text style={styles.text}>
                  {data && data.followers_aggregate.aggregate.count > 0
                    ? `You followed ${
                        data && data.followers_aggregate.aggregate.count
                      } person`
                    : 'You do not follow anyone yet!'}
                </Text>
              </View>
              <Pressable
                onPress={() =>
                  routeTo(routes.CURRENT_USER_HOLLA, GET_CURRENT_USER_POSTS)
                }
                style={styles.textView}
              >
                <AIcons name={'inbox'} size={20} style={styles.icon} />
                <Text style={styles.text}>
                  {data && data.posts_aggregate.aggregate.count > 0
                    ? `You posted ${
                        data && data.posts_aggregate.aggregate.count
                      } ${
                        data && data.posts_aggregate.aggregate.count === 1
                          ? 'Perspective'
                          : 'Perspectives'
                      }`
                    : 'You do not posted a Perspective yet!'}
                </Text>
              </Pressable>
              <Pressable
                onPress={() =>
                  routeTo(routes.CURRENT_USER_HOLLA, BOOKMARK_ACTIVITY)
                }
                style={{
                  ...styles.textView,
                  borderBottomLeftRadius: SIZES.radius * 1.5,
                  borderBottomRightRadius: SIZES.radius * 1.5,
                }}
              >
                <MIcon
                  name={'bookmark-outline'}
                  size={20}
                  style={styles.icon}
                />
                <Text style={styles.text}>
                  {data && data.saved_posts_aggregate.aggregate.count > 0
                    ? `You saved ${
                        data && data.saved_posts_aggregate.aggregate.count
                      } ${
                        data && data.saved_posts_aggregate.aggregate.count === 1
                          ? 'Perspective'
                          : 'Perspectives'
                      }`
                    : 'Do not save any Perspective yet!'}
                </Text>
              </Pressable>
            </View>
          )}
        </ScrollView>
      </View>
    </MainAppContainer>
  );
};
export default Activity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textView: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    marginVertical: 5,
    alignItems: 'center',
    elevation: 3,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: scale(50 / 50),
  },
  icon: {
    marginRight: 8,
    color: COLORS.lightGray2,
  },
  text: {
    ...FONTS.body4,
    color: COLORS.lightGray2,
  },
});
