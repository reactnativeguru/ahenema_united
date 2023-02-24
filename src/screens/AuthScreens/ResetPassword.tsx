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
import {Formik} from 'formik';
import {ConfirmCodeSchema} from './AuthSchema';
import {Auth} from 'aws-amplify';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  ResetPassword: undefined;
};

type ResetPasswordProps = NativeStackScreenProps<
  RootStackParamList,
  'ResetPassword'
>;

const ResetPassword: FC<ResetPasswordProps> = ({navigation, route}) => {
  const {user = null} = route && route.params ? route.params : {};
  // const [username, setUsername] = useState(user ? user : '');
  const [loader, setLoader] = useState(false);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const codeRef = useRef(null);

  const resetPasswordCodeSend = async ({username, code, password}) => {
    setLoader(true);
    await Auth.forgotPasswordSubmit(username, code, password)
      .then(() => {
        navigation.navigate(routes.SIGN_IN_SCREEN);
        FlashMessage({
          message: 'Password reset successful',
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

  const InputObject = (formikProps, name) => ({
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

  const ResetPasswordForm = ({formikProps}) => {
    const isDisabled =
      !formikProps.values.username ||
      !formikProps.values.code ||
      !formikProps.values.password;
    return (
      <View style={globalStyles.contentContainerStyle}>
        {/* <View style={[globalStyles.spacing, styles.titleView]}>
          <Text style={styles.title}>Reset Passowrd</Text>
        </View> */}
        <View style={globalStyles.spacing}>
          <AppInput
            label={'Username'}
            {...InputObject(formikProps, 'username')}
            onChangeText={formikProps.handleChange('username')}
            disabled={user}
            ref={usernameRef}
            onSubmitEditing={() => codeRef.current.focus()}
            // disabled={true}
          />
          {formikProps.touched.username && formikProps.errors.username ? (
            <Text style={globalStyles.errorText}>
              {formikProps.errors.username}
            </Text>
          ) : null}
        </View>
        <View style={globalStyles.spacing}>
          <AppInput
            label={'Code'}
            {...InputObject(formikProps, 'code')}
            onChangeText={formikProps.handleChange('code')}
            keyboardType={'number-pad'}
            ref={codeRef}
            onSubmitEditing={() => passwordRef.current.focus()}
          />
        </View>
        <View style={globalStyles.spacing}>
          <AppInput
            label={'Passowrd'}
            {...InputObject(formikProps, 'password')}
            onChangeText={formikProps.handleChange('password')}
            ref={passwordRef}
            onSubmitEditing={() =>
              isDisabled
                ? console.log('isDisabled')
                : formikProps.handleSubmit()
            }
          />
          {formikProps.touched.password && formikProps.errors.password ? (
            <Text style={globalStyles.errorText}>
              {formikProps.errors.password}
            </Text>
          ) : null}
        </View>
        <View style={globalStyles.spacing}>
          <RoundButton
            title={'RESET PASSWORD'}
            loader={loader}
            disable={isDisabled}
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
  };
  return (
    <MainAppContainer>
      <View style={styles.container}>
        <HeaderBar
          onboardingUsername={'RESET PASSWORD'}
          height={260}
          showBackIcon={() => navigation.goBack()}
          image={images.appLogo}
        />
        <ScrollView style={globalStyles.scrollViewContentStyle}>
          <Formik
            validationSchema={ConfirmCodeSchema()}
            initialValues={{
              username: user,
              code: '',
              password: '',
            }}
            onSubmit={values => {
              console.log({values});
              resetPasswordCodeSend(values);
            }}
          >
            {formikProps => <ResetPasswordForm formikProps={formikProps} />}
          </Formik>
        </ScrollView>
      </View>
    </MainAppContainer>
  );
};
export default ResetPassword;

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
});
