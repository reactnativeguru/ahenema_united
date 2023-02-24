import React, {FC, useState, useRef, useContext} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {HeaderBar, RoundButton} from '../../components';
import {
  globalStyles,
  COLORS,
  FONTS,
  routes,
  SIZES,
  images,
  AppInput,
} from '../../constants';
import {Formik} from 'formik';
import {SignInSchema} from './AuthSchema';
import {Context as AuthContext} from '../../context/authContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthContextType} from '../../utils/interfaces';

type RootStackParamList = {
  SignInScreen: undefined;
};

type SignInScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SignInScreen'
>;

const SignInScreen: FC<SignInScreenProps> = ({navigation}) => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [loader, setLoader] = useState(false);
  const {signUserIn} = useContext(AuthContext) as AuthContextType;
  const handleLogin = async (username: string, password: string) => {
    setLoader(false);
    setLoader(true);
    console.warn({username, password});
    const response = await signUserIn(username.toLowerCase(), password);
    setTimeout(() => {
      setLoader(false);
    }, 1000);
    if (response && response === 'UserNotConfirmedException') {
      navigation.navigate(routes.CONFIRM_SCREEN, {user: username});
    }
  };

  const InputObject = (formikProps: any, name: string) => ({
    autocapitalize: false,
    keyboardAppearance: 'dark',
    returnKeyType: 'go',
    returnKeyLabel: 'go',
    value: formikProps.values[name],
    onBlur: () => formikProps.handleBlur(name),
    touched: formikProps.touched[name],
    error: formikProps.errors[name],
    status:
      formikProps.touched[name] && formikProps.errors[name] ? 'danger' : false,
  });

  const SignInForm = ({formikProps}: any) => (
    <View style={globalStyles.contentContainerStyle}>
      {/* <View style={[globalStyles.spacing, styles.titleView]}>
        <Text style={styles.title}>Sign In</Text>
      </View> */}
      <View style={globalStyles.spacing}>
        <AppInput
          autocapitalize={false}
          label={'Username'}
          ref={usernameRef}
          onSubmitEditing={() => passwordRef.current.focus()}
          {...InputObject(formikProps, 'username')}
          onChangeText={formikProps.handleChange('username')}
        />
      </View>
      <View style={globalStyles.spacing}>
        <AppInput
          label={'Password'}
          isPassword
          ref={passwordRef}
          onSubmitEditing={formikProps.handleSubmit}
          {...InputObject(formikProps, 'password')}
          onChangeText={formikProps.handleChange('password')}
        />
      </View>
      <View style={[globalStyles.spacing, styles.forgotView]}>
        <TouchableOpacity
          onPress={() => navigation.navigate(routes.FORGOT_PASSWORD_SCREEN)}
          activeOpacity={0.5}
        >
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <View style={globalStyles.spacing}>
        <RoundButton
          title={'SIGN IN'}
          loader={loader}
          disable={!formikProps.values.username || !formikProps.values.password}
          onPress={formikProps.handleSubmit}
        />
      </View>
      <View style={[globalStyles.spacing, styles.textView]}>
        <Text style={styles.textColor1}>Don't have any Account here?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(routes.SIGN_UP_SCREEN)}
          activeOpacity={0.5}
        >
          <Text style={styles.textColor2}> SIGN UP</Text>
        </TouchableOpacity>
      </View>
      <View style={[globalStyles.spacing, styles.textView]}>
        <Text style={styles.textColor1}>Don't confirm your Account yet?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(routes.CONFIRM_SCREEN)}
          activeOpacity={0.5}
        >
          <Text style={styles.textColor2}> CONFIRM</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <HeaderBar
          onboardingUsername={'SIGN IN'}
          height={260}
          // showBackIcon={() => navigation.goBack()}
          image={images.appLogo}
        />
        <ScrollView style={globalStyles.scrollViewContentStyle}>
          <Formik
            validationSchema={SignInSchema()}
            initialValues={{
              username: '',
              password: '',
            }}
            onSubmit={values => {
              handleLogin(values.username, values.password);
            }}
          >
            {formikProps => <SignInForm formikProps={formikProps} />}
          </Formik>
        </ScrollView>
      </View>
    </View>
  );
};
export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleView: {
    marginBottom: SIZES.paddingLeft,
    alignItems: 'center',
  },
  title: {
    ...FONTS.h3,
    color: COLORS.primary,
  },
  forgotView: {
    marginBottom: SIZES.paddingLeft,
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
