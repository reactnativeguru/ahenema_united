import React, {FC, useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  HeaderBar,
  IconAntDesign,
  IconMaterialIcon,
  LoadingIndicator,
  PerspectiveCard,
} from '../../components';
import {scale, verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, globalStyles, SIZES} from '../../constants';
import {GET_PERSPECTIVES_BY_ID} from '../../graphql/queries';
import {
  FOLLOW_USER_MUTATION,
  UNFOLLOW_USER_MUTATION,
} from '../../graphql/mutations';
import {useQuery, useMutation} from '@apollo/client';
import avatar from '../../assets/images/avatar.png';
type RootStackParamList = {
  UserProfileScreen: undefined;
};

type UserProfileScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'UserProfileScreen'
>;
const UserProfileScreen: FC<UserProfileScreenProps> = ({route}) => {
  const detail: any = route?.params ? route.params : {};
  const userId = '9e832a38-2dca-47b0-8afa-6a18a57cd87b';
  const [follow, setFollow] = useState(detail.isFollowing ? true : false);
  const [InsertFollow] = useMutation(FOLLOW_USER_MUTATION);
  const [DeleteFollow] = useMutation(UNFOLLOW_USER_MUTATION);
  const {data, loading} = useQuery(GET_PERSPECTIVES_BY_ID, {
    variables: {id: detail.id},
  });

  useEffect(() => {
    console.warn({data});
    console.log(data);
  }, [data]);

  const following = () => {
    if (!follow) {
      InsertFollow({
        variables: {
          user_id: userId,
          follower_id: detail.id,
        },
      }).then(() => {
        setFollow(true);
      });
    } else {
      DeleteFollow({
        variables: {
          user_id: userId,
          follower_id: detail.id,
        },
      }).then(() => {
        setFollow(false);
      });
    }
  };

  const [show, setShow] = useState(0);
  return (
    <View style={styles.container}>
      <HeaderBar
        title={
          !loading
            ? `${data.perspectives[0].perspectiveUser.firstname} ${data.perspectives[0].perspectiveUser.lastname}`
            : null
        }
        height={verticalScale(Platform.OS === 'ios' ? 100 : 80)}
        showBackIcon
      />
      <View style={globalStyles.scrollViewContentStyle}>
        {!loading ? (
          <View>
            <View style={styles.topHeader}>
              <Image
                source={
                  data.perspectives[0].image
                    ? {uri: data.perspectives[0].image}
                    : avatar
                }
                style={styles.profileImageView}
              />
              <Text style={styles.name}>
                {`${data.perspectives[0].perspectiveUser.firstname} ${data.perspectives[0].perspectiveUser.lastname}`}
              </Text>
              <View style={styles.profileData}>
                <View style={{...styles.box}}>
                  <Text style={styles.text}>Chat</Text>
                  <IconAntDesign
                    name={'message1'}
                    size={20}
                    color={COLORS.black}
                  />
                </View>
                <View style={styles.separator} />
                <TouchableOpacity onPress={following}>
                  <View
                    style={
                      follow
                        ? {...styles.box}
                        : {
                            ...styles.box,
                            backgroundColor: COLORS.white,
                            borderColor: COLORS.grayPrimaryBorder,
                          }
                    }
                  >
                    <Text style={styles.text}>
                      {follow ? 'Followed' : 'follow'}
                    </Text>
                    <IconMaterialIcon
                      name={follow ? 'person-remove' : 'person-add'}
                      size={20}
                      color={COLORS.black}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <FlatList
                data={['Details', 'Perspective']}
                horizontal
                contentContainerStyle={styles.containerStyle}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity onPress={() => setShow(index)}>
                      <Text
                        style={
                          show === index ? styles.selected : styles.unSelected
                        }
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
            {show === 0 ? (
              <View style={{...styles.details, ...styles.name}}>
                <Text style={styles.title}>Name</Text>
                <Text style={styles.text2}>
                  {data.perspectives[0].perspectiveUser.firstname}
                </Text>
                <Text style={styles.title}>Category</Text>
                <Text style={styles.text2}>
                  {data.perspectives[0].perspectivesCategory.name}
                </Text>
                <Text style={styles.title}>Description</Text>
                <Text style={styles.text2}>
                  {data.perspectives[0].description}
                </Text>
                <Text style={styles.title}>Created At</Text>
                <Text style={styles.text2}>
                  {data.perspectives[0].created_at}
                </Text>
              </View>
            ) : (
              <View style={styles.name}>
                <FlatList
                  data={data?.perspectives || []}
                  keyExtractor={ind => ind.toString()}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.details}
                  renderItem={({item}) => <PerspectiveCard item={item} />}
                />
              </View>
            )}
          </View>
        ) : (
          <View style={styles.loadingContainer}>
            <LoadingIndicator color={COLORS.primary} size={35} />
          </View>
        )}
      </View>
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 2 * SIZES.paddingLeft,
  },
  title: {
    ...FONTS.h4,
    color: COLORS.primary,
    fontWeight: '600',
  },
  text2: {
    ...FONTS.body6,
    color: COLORS.lightGray2,
    marginVertical: 5,
  },
  contentImage: {
    width: undefined,
    height: scale(200),
    borderRadius: SIZES.radius,
    marginTop: scale(5),
  },
  containerStyle: {
    flex: 1,
    backgroundColor: COLORS.grayPrimary,
    borderColor: COLORS.grayPrimaryBorder,
    height: 50,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  profileImageView: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(50 / 1),
  },
  topHeader: {
    alignItems: 'center',
    marginVertical: scale(10),
  },
  profileData: {
    flexDirection: 'row',
    width: '44%',
  },
  box: {
    flexDirection: 'row',
    backgroundColor: COLORS.grayPrimary,
    borderWidth: 0.5,
    borderColor: COLORS.grayPrimaryBorder,
    borderRadius: scale(5),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
  },
  separator: {
    width: 20,
  },
  details: {
    paddingHorizontal: scale(10),
    paddingVertical: scale(3),
    flexGrow: 1,
    paddingBottom: 400,
  },
  text: {
    ...FONTS.h5,
    marginRight: scale(3),
  },
  name: {
    ...FONTS.h4,
    marginVertical: 8,
    fontWeight: 'bold',
  },
  selected: {
    ...FONTS.h4,
    borderBottomWidth: 1,
  },
  unSelected: {
    ...FONTS.h4,
    color: COLORS.lightGray2,
  },
});
