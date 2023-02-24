import React, {FC, useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  HeaderBar,
  Input,
  SkillInput,
  RoundButton,
  FlashMessage,
  IconAntDesign,
} from '../../components';
import {globalStyles, SIZES, routes, COLORS, FONTS} from '../../constants';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Context as AuthContext} from '../../context/authContext';
import {useMutation} from '@apollo/client';
import {UPDATE_PROFILE_BIO} from '../../graphql/mutations';
import {scale} from 'react-native-size-matters';
import {AuthContextType} from '../../utils/interfaces';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const validationSchema = Yup.object().shape({
  description: Yup.string().required('Please enter first name'),
});

type RootStackParamList = {
  OnboardScreenTwo: undefined;
};

type OnboardScreenTwoProps = NativeStackScreenProps<
  RootStackParamList,
  'OnboardScreenTwo'
>;

const OnboardScreenTwo: FC<OnboardScreenTwoProps> = ({navigation}) => {
  const {state, updateProfile} = useContext(AuthContext) as AuthContextType;
  const [skills, setSkills] = useState<any>([]);
  const [loader, setLoader] = useState(false);
  const [update_Profile] = useMutation(UPDATE_PROFILE_BIO);

  const AboutProfile = values => {
    setLoader(true);
    update_Profile({
      variables: {
        user_id: state?.user?.id
          ? state.user.id.toLowerCase()
          : '68b0992a-6606-42d2-8c31-7931b69466ef',
        bio: values.description,
        expertise: skills.join(', '),
      },
    })
      .then(response => {
        console.log(response);
        setLoader(false);
        FlashMessage({
          message: 'Success',
          description: 'Your professional info saved!',
          type: 'success',
        });
        updateAndContinue(values.description);
      })
      .catch(error => {
        console.log(error);
        setLoader(false);
      });
  };

  const updateAndContinue = (bio: string) => {
    const currentProfile = state.profile;
    const newProfile = {
      ...currentProfile,
      bio,
      skills: skills.join(','),
    };
    updateProfile(newProfile);
    navigation.navigate(routes.ON_BOARDING_SCREEN_3);
  };

  const AddSkills = (skill: string) => {
    setSkills([...skills, skill]);
  };

  const UpdateSkills = (index: number) => {
    const skillArr = [...skills];
    skillArr.splice(index, 1);
    setSkills(skillArr);
  };

  const OnboardingForm = ({formikProps}: any) => (
    <View style={styles.container}>
      <ScrollView style={globalStyles.scrollViewContentStyle}>
        <View style={[globalStyles.contentContainerStyle, styles.container]}>
          <View style={globalStyles.spacing}>
            <Text style={globalStyles.label}>Please enter your bio</Text>
            <Input
              textarea
              placeholder={'Type here'}
              onChangeText={formikProps.handleChange('description')}
              value={formikProps.values.description}
              maxLength={250}
            />
            <Text
              style={globalStyles.textCount}
            >{`${formikProps.values.description.length}/250`}</Text>
          </View>
          <View>
            <Text style={globalStyles.label}>Please enter your skills</Text>
            <SkillInput placeholder={'Type here'} Add={AddSkills} />
          </View>
          <View style={[globalStyles.spacing, styles.skillView]}>
            {skills.map((item, index) => (
              <View style={styles.skillsView} key={index.toString()}>
                <View style={styles.skillsOpacity}>
                  <Text style={styles.skillsText}>{item}</Text>
                </View>
                <TouchableOpacity
                  style={styles.iconSkillOpacity}
                  onPress={() => UpdateSkills(index)}
                >
                  <IconAntDesign
                    size={16}
                    color={COLORS.primary}
                    name="closecircle"
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={[globalStyles.spacing, {padding: SIZES.paddingLeft}]}>
        <RoundButton
          title={'NEXT'}
          loader={loader}
          disable={!skills.length || !formikProps.values.description}
          onPress={formikProps.handleSubmit}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <HeaderBar
        title={''}
        height={scale(150)}
        showBackIcon={() => navigation.goBack()}
        onboardingUsername={'Something about yourself'}
        skipButton={() => navigation.navigate(routes.ON_BOARDING_SCREEN_3)}
      />
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          description: '',
        }}
        onSubmit={values => {
          AboutProfile(values);
        }}
      >
        {formikProps => <OnboardingForm formikProps={formikProps} />}
      </Formik>
    </View>
  );
};
export default OnboardScreenTwo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ImageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  skillsView: {
    marginVertical: 5,
    flexDirection: 'row',
  },
  skillsOpacity: {
    paddingHorizontal: SIZES.paddingLeft,
    paddingVertical: SIZES.paddingLeft / 2,
    backgroundColor: COLORS.lightGray4,
    borderRadius: 50,
  },
  skillView: {flex: 1, flexWrap: 'wrap', flexDirection: 'row'},
  skillsText: {
    ...FONTS.body4,
    color: COLORS.primary,
  },
  iconSkillOpacity: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -15,
    marginTop: -5,
  },
});
