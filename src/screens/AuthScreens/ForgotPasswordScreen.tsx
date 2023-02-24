import React, {FC, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  HeaderBar,
  MainAppContainer,
  FlashMessage,
  RoundButton,
} from '../../components';
import {
  globalStyles,
  COLORS,
  FONTS,
  routes,
  SIZES,
  images,
  AppInput,
} from '../../constants';
import {Auth} from 'aws-amplify';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  ForgotPassword: undefined;
};

type ForgotPasswordProps = NativeStackScreenProps<
  RootStackParamList,
  'ForgotPassword'
>;

const ForgotPassword: FC<ForgotPasswordProps> = ({navigation}) => {
  const [username, setUsername] = useState<string>('');
  const [loader, setLoader] = useState(false);
  const usernameRef = useRef(null);

  const resetPasswordCodeSend = async () => {
    setLoader(true);
    await Auth.forgotPassword(username.toLowerCase())
      .then(() => {
        navigation.navigate(routes.RESET_PASSWORD_SCREEN, {
          user: username.toLowerCase(),
        });
        FlashMessage({
          message: 'Confirmation code successfully sent',
          type: 'success',
        });
        setLoader(false);
      })
      .catch(err => {
        let errorMessage;
        setLoader(false);
        if (!err.message) {
          errorMessage = 'Error when signing up';
        } else {
          errorMessage = err.message;
        }
        FlashMessage({
          message: errorMessage,
          type: 'danger',
        });
      });
  };

  return (
    <MainAppContainer>
      <View style={styles.container}>
        <HeaderBar
          onboardingUsername={'FORGOT PASSWORD'}
          height={260}
          // showBackIcon={() => navigation.goBack()}
          image={images.appLogo}
        />
        <ScrollView style={globalStyles.scrollViewContentStyle}>
          <View style={globalStyles.contentContainerStyle}>
            <View style={[globalStyles.spacing, styles.titleView]}>
              <Text style={styles.title}>
                Enter your username linked{'\n'}to your account.
              </Text>
            </View>
            <View style={globalStyles.spacing}>
              <AppInput
                label={'Username'}
                onChangeText={text => setUsername(text)}
                keyboardAppearance={'dark'}
                returnKeyType={'go'}
                returnKeyLabel={'go'}
                ref={usernameRef}
                onSubmitEditing={() =>
                  !username ? console.log() : resetPasswordCodeSend()
                }
              />
            </View>
            <View style={globalStyles.spacing}>
              <RoundButton
                title={'SEND CODE'}
                loader={loader}
                disable={!username}
                onPress={resetPasswordCodeSend}
              />
            </View>
            <View style={[globalStyles.spacing, styles.textView]}>
              <Text style={styles.textColor1}>Back to</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(routes.RESET_PASSWORD_SCREEN)
                }
                activeOpacity={0.5}
              >
                <Text style={styles.textColor2}> SIGN IN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </MainAppContainer>
  );
};
export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleView: {
    marginTop: SIZES.paddingLeft,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    ...FONTS.h4,
    color: COLORS.lightGray2,
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  textColor1: {
    color: COLORS.lightGray2,
  },
  textColor2: {
    color: COLORS.primary,
  },
});
