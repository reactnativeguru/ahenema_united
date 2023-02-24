import React, {FC, useContext} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {RoundButton} from '../../components';
import {
  globalStyles,
  COLORS,
  FONTS,
  routes,
  SIZES,
  images,
} from '../../constants';
import Video from 'react-native-video';
import VideoBg from '../../assets/video/larger.mp4';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Context as AuthContext} from '../../context/authContext';

type RootStackParamList = {
  WelcomeScreen: undefined;
};

type WelcomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'WelcomeScreen'
>;

const WelcomeScreen: FC<WelcomeScreenProps> = ({navigation}) => {
  const {getStarted} = useContext(AuthContext);
  console.warn({navigation});
  return (
    <View style={styles.container}>
      <Video
        repeat
        source={VideoBg}
        resizeMode="cover"
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.subContainer}>
        <View style={styles.welcomeTitleView}>
          <Image source={images.appLogo} style={styles.image} />
          <View>
            <Text style={styles.title1}>Welcome to</Text>
            <Text style={styles.title2}>Ahenema United</Text>
          </View>
        </View>
        <View>
          <View style={globalStyles.spacing}>
            <RoundButton
              title={'SIGN IN'}
              bgColor={COLORS.lightGreen}
              fgColor={COLORS.white}
              onPress={() => navigation.navigate(routes.SIGN_IN_SCREEN)}
            />
          </View>
          <View style={[globalStyles.spacing, styles.textView]}>
            <View style={styles.line} />
            <Text style={styles.lineText}>OR</Text>
            <View style={styles.line} />
          </View>
          <View style={globalStyles.spacing}>
            <RoundButton
              title={'SIGN UP'}
              bgColor={COLORS.white}
              fgColor={COLORS.primary}
              onPress={() => navigation.navigate(routes.SIGN_UP_SCREEN)}
              // onPress={() =>
              //   navigation.navigate('OnBoardingModal', {
              //     screen: routes.ON_BOARDING_SCREEN_1,
              //   })
              // }
            />
          </View>
          <View style={[globalStyles.spacing, styles.textView]}>
            <View style={styles.line} />
            <Text style={styles.lineText}>OR</Text>
            <View style={styles.line} />
          </View>
          <View style={globalStyles.spacing}>
            <RoundButton
              title={'GET STARTED'}
              bgColor={COLORS.primary}
              fgColor={COLORS.white}
              onPress={() => getStarted()}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  subContainer: {
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: SIZES.paddingLeft,
    paddingBottom: SIZES.paddingLeft,
  },
  image: {width: 60, height: 80},
  welcomeTitleView: {
    marginBottom: SIZES.paddingLeft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title1: {
    ...FONTS.h1,
    color: COLORS.white,
  },
  title2: {
    ...FONTS.body2,
    color: COLORS.white,
  },
  forgotView: {
    marginBottom: 2 * SIZES.paddingLeft,
    alignItems: 'flex-end',
  },
  forgotText: {
    ...FONTS.h5,
    color: COLORS.primary,
  },
  textView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textColor1: {
    color: COLORS.lightGray2,
  },
  textColor2: {
    color: COLORS.primary,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: COLORS.gray,
  },
  lineText: {
    ...FONTS.body3,
    color: COLORS.gray,
    marginHorizontal: 10,
  },
});
