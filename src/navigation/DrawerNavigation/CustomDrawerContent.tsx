import React, {useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Context as AuthContext} from '../../context/authContext';
import {Context as CommunityContext} from '../../context/communityContext';
import SLIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  globalStyles,
  routes,
  FONTS,
  COLORS,
  images,
  SIZES,
} from '../../constants';
import {AuthContextType, DrawerButtonProps} from '../../utils/interfaces';
// import {useSubscription} from '@apollo/client';
// import {CHECK_PROFILE_QUERY} from '../../graphql/subscriptions';
import avatar from '../../assets/images/avatar.png';
const CustomDrawerContent = (props: any) => {
  const {state, userSignOut} = useContext(AuthContext) as AuthContextType;
  const {state: communityState} = useContext(CommunityContext);
  const [root, setRoot] = useState('TabNavigation');
  // const [imageURL, setImageURL] = useState(ProfileImage);

  // const {loading, error, data} = useSubscription(CHECK_PROFILE_QUERY, {
  //   variables: {id: state.user.username},
  // });

  // useEffect(() => {
  //   if (data && data.profile && data.profile.length) {
  //     setImageURL(
  //       data.profile[0].image_uri ? data.profile[0].image_uri : imageURL,
  //     );
  //     setUserType(data.profile[0].user_type ? data.profile[0].user_type : '');
  //   }
  // }, [data]);

  const navigation = useNavigation();
  const logOut = () => {
    userSignOut();
  };

  const modalGlobal = (e: string) => {
    navigation.navigate('GlobalModal', {
      screen: routes[e],
    });
    setRoot(e);
  };

  const routeTo = (e: string) => {
    // navigation.navigate(routes[e]);
    navigation.navigate(e);
    setRoot(e);
  };

  const DrawerButton = ({title, value, icon}: DrawerButtonProps) => {
    return (
      <View style={[styles.channels]}>
        <TouchableOpacity
          onPress={() => routeTo(value)}
          style={styles.displayRow}
          activeOpacity={0.7}>
          <SLIcon
            name={icon}
            size={20}
            color={root === value ? COLORS.lightGreen : COLORS.white}
          />
          <Text
            style={[
              globalStyles.drawerLink,
              root === value ? {color: COLORS.lightGreen} : {},
            ]}>
            {title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const DrawerCustomButton = ({title, value, icon}: DrawerButtonProps) => (
    <View style={styles.channels}>
      <TouchableOpacity
        onPress={() =>
          value === 'ProfileScreen' ? routeTo(value) : modalGlobal(value)
        }
        style={styles.displayRow}
        activeOpacity={0.7}>
        <SLIcon
          name={icon}
          size={20}
          color={root === value ? COLORS.lightGreen : COLORS.white}
        />
        <Text
          style={[
            globalStyles.drawerLink,
            root === value ? {color: COLORS.lightGreen} : {},
          ]}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView
      {...props}
      scrollEnabled={false}
      contentContainerStyle={styles.contentContainerStyle}>
      <View style={styles.container}>
        <View style={styles.imageview}>
          <Image
            style={styles.imgCover}
            source={
              communityState?.cover_image
                ? {uri: communityState.cover_image}
                : images.appLogo
            }
          />
          <Image style={styles.img} source={avatar} />
        </View>

        <View>
          <Text numberOfLines={2} style={styles.name}>
            Hi
          </Text>
        </View>

        <ScrollView style={styles.scrollViewContainer}>
          <DrawerButton
            title={'Home'}
            value={'TabNavigation'}
            icon={'home-outline'}
          />
          <DrawerCustomButton
            title={'Profile'}
            value={'ProfileScreen'}
            icon={'account-arrow-right'}
          />

          <DrawerButton title={'Feed'} value={'FeedScreen'} icon={'rss'} />

          <DrawerCustomButton
            title={'FAQs'}
            value={'FAQS_SCREEN'}
            icon={'head-question'}
          />
        </ScrollView>

        <View style={styles.footerButton}>
          <DrawerCustomButton
            title={'About'}
            value={'ABOUT_SCREEN'}
            icon={'information-outline'}
          />
          <View style={styles.channels}>
            <TouchableOpacity
              onPress={() => logOut()}
              style={styles.displayRow}
              activeOpacity={0.7}>
              <SLIcon name={'logout'} size={20} color={COLORS.lightGray4} />
              <Text style={globalStyles.drawerLink}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  contentContainerStyle: {flex: 1, backgroundColor: COLORS.primary},
  imageview: {marginBottom: 45},
  displayRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  channels: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  scrollViewContainer: {flex: 1},
  imgCover: {
    height: 170,
    width: '100%',
  },
  img: {
    height: 90,
    width: 90,
    borderRadius: 100,
    marginLeft: 20,
    position: 'absolute',
    bottom: -45,
  },
  name: {
    ...FONTS.body2,
    paddingHorizontal: 15,
    marginTop: SIZES.paddingLeft / 2,
    color: COLORS.white,
  },
  type: {
    ...FONTS.body5,
    paddingHorizontal: 15,
    color: COLORS.lightGray4,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  footerButton: {paddingVertical: 20},
});
