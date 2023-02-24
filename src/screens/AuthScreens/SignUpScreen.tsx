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
  FlashMessage,
  RoundButton,
  PhoneInput,
} from '../../components';
import {Formik} from 'formik';
import {
  globalStyles,
  COLORS,
  FONTS,
  routes,
  SIZES,
  images,
  AppInput,
} from '../../constants';
import {SignUpSchema} from './AuthSchema';
import {Auth} from 'aws-amplify';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  SignUpScreen: undefined;
};

type SignUpScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SignUpScreen'
>;

type signUpProps = {
  email: string;
  password: string;
  username: string;
  phoneNumber: string;
};

const SignUpScreen: FC<SignUpScreenProps> = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [countryCallingCode, setCountryCallingCode] = useState('+44');
  const [countryCode, setCountryCode] = useState('GB');
  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const phoneNumberRef = useRef(null);

  const handleSignup = async ({
    email,
    password,
    username,
    phoneNumber,
  }: signUpProps) => {
    try {
      const phone_number = `${countryCallingCode}${phoneNumber}`;
      setLoader(true);
      await Auth.signUp({
        username: username.toLowerCase(),
        password,
        attributes: {
          email,
          phone_number,
          'custom:username': username.toLowerCase(),
        },
      })
        .then(() => {
          setLoader(false);
          navigation.navigate(routes.CONFIRM_SCREEN, {
            email,
            username,
            phoneNumber: phone_number,
          });
        })
        .catch(err => {
          throw err;
        });
    } catch (err) {
      FlashMessage({
        message: err.message,
        type: 'danger',
      });
    }
  };

  const InputObject = (formikProps: any, name: string) => ({
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

  const SignUpForm = ({formikProps}: any) => (
    <View style={globalStyles.contentContainerStyle}>
      {/* <View style={[globalStyles.spacing, styles.titleView]}>
        <Text style={styles.title}>Sign Up</Text>
      </View> */}
      <View style={globalStyles.spacing}>
        <AppInput
          label="Email"
          onChangeText={formikProps.handleChange('email')}
          {...InputObject(formikProps, 'email')}
          ref={emailRef}
          onSubmitEditing={() => usernameRef.current.focus()}
        />
        {formikProps.touched.email && formikProps.errors.email ? (
          <Text style={globalStyles.errorText}>{formikProps.errors.email}</Text>
        ) : null}
      </View>
      <View style={globalStyles.spacing}>
        <AppInput
          label={'Username'}
          onChangeText={formikProps.handleChange('username')}
          {...InputObject(formikProps, 'username')}
          ref={usernameRef}
          onSubmitEditing={() => passwordRef.current.focus()}
        />
        {formikProps.touched.username && formikProps.errors.username ? (
          <Text style={globalStyles.errorText}>
            {formikProps.errors.username}
          </Text>
        ) : null}
      </View>
      <View style={globalStyles.spacing}>
        <AppInput
          isPassword
          label={'Password'}
          onChangeText={formikProps.handleChange('password')}
          {...InputObject(formikProps, 'password')}
          ref={passwordRef}
          onSubmitEditing={() => confirmPasswordRef.current.focus()}
        />
        {formikProps.touched.password && formikProps.errors.password ? (
          <Text style={globalStyles.errorText}>
            {formikProps.errors.password}
          </Text>
        ) : null}
      </View>
      <View style={globalStyles.spacing}>
        <AppInput
          label={'Confirm password'}
          onChangeText={formikProps.handleChange('confirmPassword')}
          {...InputObject(formikProps, 'confirmPassword')}
          ref={confirmPasswordRef}
          onSubmitEditing={() => phoneNumberRef.current.focus()}
        />
        {formikProps.touched.confirmPassword &&
        formikProps.errors.confirmPassword ? (
          <Text style={globalStyles.errorText}>
            {formikProps.errors.confirmPassword}
          </Text>
        ) : null}
      </View>
      <View style={globalStyles.spacing}>
        <PhoneInput
          placeholder={'Phone number'}
          onChangeText={formikProps.handleChange('phoneNumber')}
          {...InputObject(formikProps, 'phoneNumber')}
          ref={phoneNumberRef}
          onSubmitEditing={formikProps.handleSubmit}
          setCountryCallingCode={(value: string) =>
            setCountryCallingCode(`+${value}`)
          }
          setCountryCode={(value: string) => setCountryCode(`+${value}`)}
          countryCode={countryCode}
        />
        {formikProps.touched.phoneNumber && formikProps.errors.phoneNumber ? (
          <Text style={globalStyles.errorText}>
            {formikProps.errors.phoneNumber}
          </Text>
        ) : null}
      </View>
      <View style={globalStyles.spacing}>
        <RoundButton
          title={'SIGN UP'}
          loader={loader}
          disable={
            !formikProps.values.username ||
            !formikProps.values.password ||
            !formikProps.values.confirmPassword ||
            !formikProps.values.phoneNumber
          }
          onPress={formikProps.handleSubmit}
        />
      </View>
      <View style={[globalStyles.spacing, styles.textView]}>
        <Text style={styles.textColor1}>Already have an Account here?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(routes.SIGN_IN_SCREEN)}
          activeOpacity={0.5}
        >
          <Text style={styles.textColor2}> SIGN IN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <HeaderBar
          onboardingUsername={'SIGN UP'}
          height={260}
          // showBackIcon={() => navigation.goBack()}
          image={images.appLogo}
        />
        <ScrollView style={globalStyles.scrollViewContentStyle}>
          <Formik
            validationSchema={SignUpSchema()}
            initialValues={{
              email: '',
              username: '',
              password: '',
              confirmPassword: '',
              phoneNumber: '',
            }}
            onSubmit={values => {
              console.log({values});
              handleSignup(values);
            }}
          >
            {formikProps => <SignUpForm formikProps={formikProps} />}
          </Formik>
        </ScrollView>
      </View>
    </View>
  );
};
export default SignUpScreen;

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
    marginVertical: SIZES.base,
  },
  textColor1: {
    color: COLORS.lightGray2,
  },
  textColor2: {
    color: COLORS.primary,
  },
});
