import React, {FC, useState, useContext} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import {
  HeaderBar,
  RoundButton,
  FlashMessage,
  IconAntDesign,
  LoadingIndicator,
  TermsAndConditions,
} from '../../components';
import {globalStyles, SIZES, COLORS, FONTS} from '../../constants';
import {CheckBox} from '@ui-kitten/components';
import {Context as AuthContext} from '../../context/authContext';
import {useMutation, useSubscription} from '@apollo/client';
import {
  UPDATE_PROFILE_TERMS,
  // INSERT_MENTEE,
  // INSERT_MENTOR,
} from '../../graphql/mutations';
import {CHECK_PROFILE_QUERY} from '../../graphql/subscriptions';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthContextType} from '../../utils/interfaces';
type RootStackParamList = {
  OnboardScreenFive: undefined;
};

type OnboardScreenFiveProps = NativeStackScreenProps<
  RootStackParamList,
  'OnboardScreenFive'
>;

const OnboardScreenFive: FC<OnboardScreenFiveProps> = ({navigation}) => {
  const {
    state,
    // profileCompleted
  } = useContext(AuthContext) as AuthContextType;
  const [loader, setLoader] = useState(false);
  const [termsVisible, setTermsVisible] = useState(false);
  const [checked, setChecked] = useState(false);

  // const user = state?.user?.username ? state.user.username.toLowerCase() : '';
  const user_id = state?.user?.id
    ? state.user.id.toLowerCase()
    : '68b0992a-6606-42d2-8c31-7931b69466ef';
  const [update_Profile] = useMutation(UPDATE_PROFILE_TERMS);
  // const [InsertMentees] = useMutation(INSERT_MENTEE);
  // const [InsertMentors] = useMutation(INSERT_MENTOR);
  const {data, loading} = useSubscription(CHECK_PROFILE_QUERY, {
    variables: {id: user_id},
  });

  const isProfileExist =
    data && data.profile && data.profile[0] ? data.profile[0] : false;

  const updateUserProfile = () => {
    setLoader(false);
    setLoader(true);
    update_Profile({
      variables: {
        user_id: user_id,
        accepted_terms: true,
        profile_complete: true,
      },
    })
      .then(response => {
        // setLoader(false);
        setTimeout(() => {
          setLoader(false);
          console.log({response});
          FlashMessage({
            message: 'Success',
            description: 'Profile Created!',
            type: 'success',
          });
        }, 1200);
        AsyncStorage.setItem('isUserProfileComplete', 'true');

        // profileCompleted();
        // let insertData = {
        //   user_id: user,
        //   last_seen: 'online',
        // };
        // console.log({insert_mentors: insertData});
        // if (
        //   data.profile[0].user_type &&
        //   data.profile[0].user_type === 'Mentor'
        // ) {
        //   InsertMentors({
        //     variables: insertData,
        //   });
        // } else {
        //   InsertMentees({
        //     variables: insertData,
        //   });
        // }
      })
      .catch(error => {
        setLoader(false);
        console.log(error);
      });
  };

  const SubmitProfile = () => {
    if (checked) {
      updateUserProfile();
    } else {
      FlashMessage({
        type: 'warning',
        message: 'Warning',
        description: 'Please accept the Terms And Conditions!',
      });
    }
  };

  const TermsModal = () => {
    return (
      <SafeAreaView
        style={[globalStyles.modalContainer, {padding: SIZES.paddingLeft}]}>
        <View style={styles.closeIcon}>
          <TouchableOpacity onPress={() => setTermsVisible(false)}>
            <IconAntDesign
              name={'arrowleft'}
              color={COLORS.primary}
              size={20}
            />
          </TouchableOpacity>
          <Text style={{...FONTS.h3, color: COLORS.primary}}>
            Terms And Conditions
          </Text>
          <View />
        </View>
        <TermsAndConditions />
        <RoundButton
          title={'ACCEPT'}
          onPress={() => {
            setTermsVisible(false);
            setChecked(true);
          }}
        />
      </SafeAreaView>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderBar
        title={''}
        height={180}
        showBackIcon={() => navigation.goBack()}
        onboardingUsername={'Your profile'}
      />
      <ScrollView style={globalStyles.scrollViewContentStyle}>
        <View style={globalStyles.contentContainerStyle}>
          {loading ? (
            <LoadingIndicator color={COLORS.primary} size={35} />
          ) : (
            <>
              {isProfileExist && isProfileExist.image_uri ? (
                <View style={[globalStyles.spacing, styles.ImageContainer]}>
                  <Image
                    source={{uri: isProfileExist.image_uri}}
                    style={{
                      ...globalStyles.hollaFormImageView,
                      borderRadius: 130 / 2,
                    }}
                  />
                </View>
              ) : null}
              <View style={styles.userInfoView}>
                {isProfileExist && isProfileExist.first_name ? (
                  <Text
                    style={
                      styles.title
                    }>{`${isProfileExist.first_name} ${isProfileExist.last_name}`}</Text>
                ) : null}
                {isProfileExist && isProfileExist.expertise ? (
                  <Text style={styles.subtitle}>
                    {isProfileExist.expertise.split(', ')[0]}
                  </Text>
                ) : null}
                {isProfileExist && isProfileExist.bio ? (
                  <Text style={[styles.text2, styles.bioText]}>
                    {isProfileExist.bio}
                  </Text>
                ) : null}
              </View>
              <View style={[globalStyles.spacing, styles.spacingView]}>
                <Text style={styles.text2}>Date of birth</Text>
                {isProfileExist && isProfileExist.dob ? (
                  <Text style={styles.text1}>
                    {moment(isProfileExist.dob).format('MMM Do YY')}
                  </Text>
                ) : null}
              </View>
              <View style={[globalStyles.spacing, styles.spacingView]}>
                <Text style={styles.text2}>Ethnicity</Text>
                {isProfileExist && isProfileExist.ethnicity ? (
                  <Text style={styles.text1}>{isProfileExist.ethnicity}</Text>
                ) : null}
              </View>
              <View style={[globalStyles.spacing, styles.spacingView]}>
                <Text style={styles.text2}>Gender</Text>
                {isProfileExist && isProfileExist.gender ? (
                  <Text style={styles.text1}>{isProfileExist.gender}</Text>
                ) : null}
              </View>
              <View style={[globalStyles.spacing, styles.spacingView]}>
                <Text style={styles.text2}>Profession</Text>
                {isProfileExist && isProfileExist.expertise ? (
                  <Text style={styles.text1}>{isProfileExist.expertise}</Text>
                ) : null}
              </View>
              <View style={styles.checkboxView}>
                <CheckBox
                  checked={checked}
                  style={styles.checkbox}
                  onChange={nextChecked => setChecked(nextChecked)}
                />
                <TouchableOpacity onPress={() => setTermsVisible(true)}>
                  <Text style={[globalStyles.spacing, styles.terms]}>
                    Accept Terms and Conditions
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
      <View style={[globalStyles.spacing, {padding: SIZES.paddingLeft}]}>
        <RoundButton
          title={'COMPLETE'}
          loader={loader}
          disable={!checked}
          onPress={SubmitProfile}
        />
      </View>
      <Modal animationType="slide" visible={termsVisible}>
        <TermsModal />
      </Modal>
    </View>
  );
};
export default OnboardScreenFive;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ImageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  title: {
    ...FONTS.h2,
    color: COLORS.primary,
  },
  subtitle: {
    ...FONTS.body3,
    color: COLORS.primary,
  },
  text1: {
    ...FONTS.body5,
    color: COLORS.primary,
  },
  text2: {
    ...FONTS.body5,
    color: COLORS.lightGray2,
  },
  userInfoView: {alignItems: 'center'},
  bioText: {textAlign: 'center'},
  checkboxView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  checkbox: {
    margin: 2,
    marginRight: 5,
  },
  terms: {
    textDecorationLine: 'underline',
    ...FONTS.body5,
  },
  spacingView: {flexDirection: 'row', justifyContent: 'space-between'},
  closeIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.paddingLeft,
  },
});
