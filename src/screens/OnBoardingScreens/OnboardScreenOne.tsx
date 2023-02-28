import React, {FC, useRef, useState, useContext} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {
  HeaderBar,
  Input,
  RoundButton,
  FlashMessage,
  ItemPicker,
  IconAntDesign,
} from '../../components';
import {globalStyles, SIZES, COLORS, routes} from '../../constants';
import {IndexPath, Datepicker} from '@ui-kitten/components';
import {
  optionsGender,
  optionsEthnicity,
  optionsProfession,
} from '../../constants/onboarding';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {UPDATE_PROFILE} from '../../graphql/mutations';
import {Context as AuthContext} from '../../context/authContext';
import {useMutation} from '@apollo/client';
import moment from 'moment';
import {scale} from 'react-native-size-matters';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthContextType, OnboardingProps} from '../../utils/interfaces';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Please enter first name'),
  lastName: Yup.string().required('Please enter last name'),
  birthDate: Yup.string().required('Please enter date of birth'),
  gender: Yup.string().required('Please select gender'),
  organization: Yup.string().required('Please select oraganization name'),
  ethnicity: Yup.string().required('Please select ethnicity'),
});

type RootStackParamList = {
  OnboardScreenOne: undefined;
};

type OnboardScreenOneProps = NativeStackScreenProps<
  RootStackParamList,
  'OnboardScreenOne'
>;

const OnboardScreenOne: FC<OnboardScreenOneProps> = ({navigation}) => {
  const fnameRef = useRef<any>(null);
  const lnameRef = useRef<any>(null);
  const dateRef = useRef<any>(null);
  const ethnicityRef = useRef<any>(null);
  const genderRef = useRef<any>(null);
  const professionRef = useRef<any>(null);
  const [birthDate, setBirthDate] = useState<any>('');

  const [loader, setLoader] = useState(false);
  const [selectedEthiIndex, setSelectedEthiIndex] = React.useState(
    new IndexPath(0),
  );
  const [selectedGenderIndex, setSelectedGenderIndex] = React.useState(
    new IndexPath(0),
  );
  const [selectedOrgaIndex, setSelectedOrgaIndex] = React.useState(
    new IndexPath(0),
  );

  const ethiDisplayValue = optionsEthnicity[selectedEthiIndex.row];
  const genderDisplayValue = optionsGender[selectedGenderIndex.row];
  const orgaDisplayValue = optionsProfession[selectedOrgaIndex.row];

  const {state} = useContext(AuthContext) as AuthContextType;

  const [update_Profile] = useMutation(UPDATE_PROFILE);

  const checkAndContinue = (values: OnboardingProps) => {
    console.log({values});
    setLoader(false);
    const {firstName, lastName, gender, ethnicity, organization} = values;
    setLoader(true);
    update_Profile({
      variables: {
        username: state?.user?.id
          ? state.user.id.toLowerCase()
          : '68b0992a-6606-42d2-8c31-7931b69466ef',
        first_name: firstName,
        last_name: lastName,
        gender: gender,
        ethnicity: ethnicity,
        profession: organization,
        dob: birthDate,
      },
    })
      .then(() => {
        setLoader(false);
        FlashMessage({
          message: 'Success',
          description: 'Profile info successfully saved',
          type: 'success',
        });
        navigation.navigate(routes.ON_BOARDING_SCREEN_2);
      })
      .catch(error => {
        console.log(error);
        setLoader(false);
      });
    // navigation.navigate(routes.ON_BOARDING_SCREEN_2);
  };

  const InputObject = (formikProps, name: string) => ({
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

  const CalendarIcon = () => (
    <IconAntDesign name={'calendar'} color={COLORS.primary} size={20} />
  );

  const OnboardingForm = ({formikProps}) => (
    <View style={styles.container}>
      <ScrollView style={globalStyles.scrollViewContentStyle}>
        <View style={globalStyles.contentContainerStyle}>
          <View style={[globalStyles.spacing, styles.nameView]}>
            <View style={styles.firstnameView}>
              <Text style={globalStyles.label}>First name</Text>
              <Input
                placeholder={'Type name here!'}
                ref={fnameRef}
                onSubmitEditing={() => lnameRef.current.focus()}
                {...InputObject(formikProps, 'firstName')}
                onChangeText={formikProps.handleChange('firstName')}
              />
              {formikProps.touched.firstName && formikProps.errors.firstName ? (
                <Text style={globalStyles.errorText}>
                  {formikProps.errors.firstName}
                </Text>
              ) : null}
            </View>
            <View style={styles.lastnameView}>
              <Text style={globalStyles.label}>Last name</Text>
              <Input
                placeholder={'Type name here!'}
                ref={lnameRef}
                onSubmitEditing={() => dateRef.current.focus()}
                {...InputObject(formikProps, 'lastName')}
                onChangeText={formikProps.handleChange('lastName')}
              />
              {formikProps.touched.lastName && formikProps.errors.lastName ? (
                <Text style={globalStyles.errorText}>
                  {formikProps.errors.lastName}
                </Text>
              ) : null}
            </View>
          </View>
          <View style={globalStyles.spacing}>
            <Text style={globalStyles.label}>Select date of birth</Text>
            <Datepicker
              style={styles.birthdayView}
              date={birthDate}
              max={new Date(moment().subtract(16, 'years').calendar())}
              min={new Date(moment().subtract(150, 'years').calendar())}
              onSelect={nextDate => {
                setBirthDate(nextDate);
                formikProps.setFieldValue('birthDate', nextDate);
                ethnicityRef.current.focus();
              }}
              accessoryRight={CalendarIcon}
              ref={dateRef}
            />
            {formikProps.touched.birthDate && formikProps.errors.birthDate ? (
              <Text style={globalStyles.errorText}>
                {formikProps.errors.birthDate}
              </Text>
            ) : null}
          </View>
          <View style={globalStyles.spacing}>
            <Text style={globalStyles.label}>Select your Ethnicity</Text>
            <ItemPicker
              data={optionsEthnicity}
              value={ethiDisplayValue.label}
              selectedIndex={selectedEthiIndex}
              onSelect={(index: number) => {
                setSelectedEthiIndex(index);
                formikProps.setFieldValue(
                  'ethnicity',
                  optionsEthnicity[index.row].value,
                );
                genderRef.current.focus();
              }}
              ref={ethnicityRef}
            />
            {formikProps.touched.ethnicity && formikProps.errors.ethnicity ? (
              <Text style={globalStyles.errorText}>
                {formikProps.errors.ethnicity}
              </Text>
            ) : null}
          </View>
          <View style={globalStyles.spacing}>
            <Text style={globalStyles.label}>Select your Gender</Text>
            <ItemPicker
              data={optionsGender}
              value={genderDisplayValue.label}
              selectedIndex={selectedGenderIndex}
              onSelect={index => {
                setSelectedGenderIndex(index);
                formikProps.setFieldValue(
                  'gender',
                  optionsGender[index.row].value,
                );
                professionRef.current.focus();
              }}
              ref={genderRef}
            />
            {formikProps.touched.gender && formikProps.errors.gender ? (
              <Text style={globalStyles.errorText}>
                {formikProps.errors.gender}
              </Text>
            ) : null}
          </View>
          <View style={globalStyles.spacing}>
            <Text style={globalStyles.label}>Select your Profession</Text>
            <ItemPicker
              data={optionsProfession}
              value={orgaDisplayValue.label}
              selectedIndex={selectedOrgaIndex}
              onSelect={index => {
                setSelectedOrgaIndex(index);
                formikProps.setFieldValue(
                  'organization',
                  optionsProfession[index.row].value,
                );
              }}
              ref={professionRef}
            />
            {formikProps.touched.organization &&
            formikProps.errors.organization ? (
              <Text style={globalStyles.errorText}>
                {formikProps.errors.organization}
              </Text>
            ) : null}
          </View>
        </View>
      </ScrollView>
      <View style={[globalStyles.spacing, {padding: SIZES.paddingLeft}]}>
        <RoundButton
          title={'NEXT'}
          loader={loader}
          disable={
            !formikProps.values.firstName ||
            !formikProps.values.lastName ||
            !formikProps.values.birthDate ||
            !formikProps.values.ethnicity ||
            !formikProps.values.gender ||
            !formikProps.values.organization
          }
          onPress={() => {
            checkAndContinue(formikProps.values);
          }}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <HeaderBar
        title={''}
        height={scale(150)}
        onboardingUsername={`Hi ${
          state?.user?.username ? state.user.username.toLowerCase() : 'John'
        }`}
      />
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          firstName: '',
          lastName: '',
          birthDate: birthDate,
          ethnicity: ethiDisplayValue.value,
          gender: genderDisplayValue.value,
          organization: orgaDisplayValue.value,
        }}
        onSubmit={values => {
          checkAndContinue(values);
        }}>
        {formikProps => <OnboardingForm formikProps={formikProps} />}
      </Formik>
    </View>
  );
};
export default OnboardScreenOne;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  firstnameView: {flex: 1, marginRight: SIZES.paddingLeft / 2},
  lastnameView: {flex: 1, marginLeft: SIZES.paddingLeft / 2},
  birthdayView: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  nameView: {flexDirection: 'row', justifyContent: 'space-between'},
});
