import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  Platform,
} from 'react-native';
import {SIZES, COLORS, FONTS, images} from '../../constants';
import {DrawerMenu} from '../index';
import AIcon from 'react-native-vector-icons/AntDesign';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import faq from '../../assets/images/faq.png';
const HeaderBar = props => {
  const navigation = useNavigation();

  const HeaderContent = ({style}) => {
    return (
      <Pressable
        style={styles.subContainer}
        onPress={() => (props.coverImage ? props.clickBgImage() : null)}
      >
        <ImageBackground
          style={[styles.image, {...style}]}
          source={
            props.coverImage
              ? {uri: props.coverImage}
              : images.iconImageBackground
          }
        >
          <View style={styles.navigationContainer}>
            <View style={styles.drawerIconContainer}>
              {props.showDrawer ? <DrawerMenu /> : null}
              {props.showBackIcon ? (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  activeOpacity={0.5}
                >
                  <AIcon name={'arrowleft'} size={25} color={COLORS.white} />
                </TouchableOpacity>
              ) : null}
            </View>

            <View style={styles.screenTitleContainer}>
              <Text style={styles.screenTitle}>{props.title}</Text>
            </View>

            <View style={styles.rightButtonContainer}>
              {/* eslint-disable-next-line no-nested-ternary */}
              {props.rightIcon ? (
                <TouchableOpacity
                  onPress={props.rightPress}
                  style={styles.rightIcon}
                >
                  {props.rightIcon}
                </TouchableOpacity>
              ) : props.skipButton ? (
                <TouchableOpacity
                  onPress={props.skipButton}
                  activeOpacity={0.5}
                >
                  <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
          {props.username ? (
            <View style={styles.headerContent}>
              <View style={styles.leftPadding}>
                <Text style={styles.title}>Hi {props.username}</Text>
              </View>
            </View>
          ) : null}
          {props.onboardingUsername ? (
            <View
              style={[
                // styles.headerContent,
                // styles.leftPadding,
                styles.usernameContainer,
              ]}
            >
              <Text style={styles.onboardTitle}>
                {props.onboardingUsername}
              </Text>
            </View>
          ) : null}
          {props.image ? (
            <View style={styles.imageView}>
              {/* <Image source={props.image} style={styles.logoImage} /> */}
              <Image source={faq} style={styles.logoImage} />
            </View>
          ) : null}
        </ImageBackground>
      </Pressable>
    );
  };

  return (
    <View style={[styles.container, {height: props.height}]}>
      {props.coverImage ? (
        <HeaderContent style={styles.header} />
      ) : (
        <SafeAreaView>
          <HeaderContent />
        </SafeAreaView>
      )}
    </View>
  );
};
export default HeaderBar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
  },
  subContainer: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? SIZES.statusbarHeight : 0,
  },
  navigationContainer: {
    width: '100%',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginTop: SIZES.paddingLeft / 2,
    paddingHorizontal: SIZES.paddingLeft,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title: {
    color: COLORS.white,
    ...FONTS.h4,
  },
  subtitle: {
    color: COLORS.white,
    ...FONTS.h5,
  },
  onboardTitle: {
    color: COLORS.white,
    ...FONTS.h2,
    textAlign: 'center',
  },
  leftPadding: {
    paddingLeft: SIZES.paddingLeft,
  },
  usernameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenTitleContainer: {
    width: '80%',
    // flex: 2,
    alignItems: 'center',
  },
  drawerIconContainer: {
    width: '10%',
  },
  rightButtonContainer: {
    width: '10%',
  },
  rightIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  screenTitle: {
    color: COLORS.white,
    ...FONTS.body3,
  },
  skipText: {
    color: COLORS.white,
    ...FONTS.body5,
  },
  drawerIcon: {},
  rightButton: {},
  headerContent: {
    flex: 1,
    marginBottom: scale(40),
    marginTop: scale(10),
  },
  imageView: {
    width: '100%',
    height: 150,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logoImage: {
    width: 80,
    height: 100,
  },
});
