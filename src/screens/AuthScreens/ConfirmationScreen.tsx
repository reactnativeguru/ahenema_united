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
import {Auth} from 'aws-amplify';
import {
  globalStyles,
  COLORS,
  FONTS,
  routes,
  SIZES,
  images,
  AppInput,
} from '../../constants';
import {useMutation} from '@apollo/client';
import {CREATE_PROFILE_MUTATION, UPDATE_USER} from '../../graphql/mutations';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  ConfirmCode: undefined;
};

type ConfirmCodeProps = NativeStackScreenProps<
  RootStackParamList,
  'ConfirmCode'
>;

const ConfirmCode: FC<ConfirmCodeProps> = ({navigation, route}) => {
  const user = route && route.params ? route.params : {};
  const [username, setUsername] = useState<string>(
    user?.username ? user.username : '',
  );
  const [code, setCode] = useState('');
  const [loader, setLoader] = useState(false);
  const [resendloader, setResendLoader] = useState(false);
  const usernameRef = useRef(null);
  const codeRef = useRef(null);
  const [InsertProfile] = useMutation(CREATE_PROFILE_MUTATION);
  const [InsertUser] = useMutation(UPDATE_USER);

  const ConfirmSignUp = async () => {
    setLoader(true);
    await Auth.confirmSignUp(username.toLowerCase(), code)
      .then(() => {
        // console.log('Confirm sign up successful');
        setLoader(false);
        sendConfirmSignUp();
        FlashMessage({
          message: 'Confirm sign up successful',
          type: 'success',
        });
        // navigation.navigate(routes.SIGN_IN_SCREEN);
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

  const sendConfirmSignUp = () => {
    try {
      InsertUser({
        variables: {
          email: user.email,
          phone: user.phoneNumber,
          username: username.toLowerCase(),
        },
      })
        .then(result => {
          const id = result.data.insert_users.returning[0].id;
          InsertProfile({
            variables: {
              user_id: id,
            },
          })
            .then(() => {
              // navigation.navigate('OnBoardingModal', {
              //   screen: routes.ON_BOARDING_SCREEN_1,
              // });
            })
            .catch(err => {
              throw err;
            });
        })
        .catch(err => {
          throw err;
        });
    } catch (err) {
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
    }
  };

  const resendSignUp = async () => {
    //TODO check that user has confirmed or not their code and if so make then reset password instead
    setResendLoader(true);
    await Auth.resendSignUp(username.toLowerCase())
      .then(() => {
        setResendLoader(false);
        FlashMessage({
          message: 'Confirmation code resent successfully',
          type: 'success',
        });
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

  const InputObject = () => ({
    keyboardAppearance: 'dark',
    returnKeyType: 'go',
    returnKeyLabel: 'go',
  });

  return (
    <MainAppContainer>
      <View style={styles.container}>
        <HeaderBar
          onboardingUsername={'CONFIRMATION'}
          height={260}
          showBackIcon={() => navigation.goBack()}
          image={images.appLogo}
        />
        <ScrollView style={globalStyles.scrollViewContentStyle}>
          <View style={globalStyles.contentContainerStyle}>
            {/* <View style={[globalStyles.spacing, styles.titleView]}>
              <Text style={styles.title}>Confirmation</Text>
            </View> */}
            <View style={globalStyles.spacing}>
              <AppInput
                label={'Username'}
                value={username}
                onChangeText={text => setUsername(text)}
                disabled={user}
                {...InputObject()}
                ref={usernameRef}
                onSubmitEditing={() => codeRef.current.focus()}
              />
            </View>
            <View style={globalStyles.spacing}>
              <AppInput
                label={'Code'}
                onChangeText={text => setCode(text)}
                {...InputObject()}
                value={code}
                keyboardType={'number-pad'}
                ref={codeRef}
                onSubmitEditing={() =>
                  !username || !code ? console.log('disable') : ConfirmSignUp()
                }
              />
            </View>
            <View style={globalStyles.spacing}>
              <RoundButton
                title={'CONFIRM'}
                loader={loader}
                disable={!username || !code}
                onPress={ConfirmSignUp}
              />
            </View>
            <View style={styles.horizontalSpace} />
            <View style={globalStyles.spacing}>
              <RoundButton
                title={'RESEND CODE'}
                loader={resendloader}
                onPress={resendSignUp}
              />
            </View>
            <View style={[globalStyles.spacing, styles.textView]}>
              <Text style={styles.textColor1}>
                Already have an Account here?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate(routes.SIGN_IN_SCREEN)}
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
export default ConfirmCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleView: {
    marginBottom: SIZES.paddingLeft,
    alignItems: 'center',
  },
  title: {
    ...FONTS.h2,
    color: COLORS.primary,
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
  horizontalSpace: {
    width: '100%',
    height: 10,
  },
});
