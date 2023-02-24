import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  HeaderBar,
  IconAntDesign,
  MainAppContainer,
  LoadingIndicator,
  RoundButton,
  EditButton,
  Input,
  SkillInput,
  FlashMessage,
} from '../../components';
import {
  globalStyles,
  SIZES,
  COLORS,
  FONTS,
  WIDTH,
  HEIGHT,
} from '../../constants';
import {verticalScale} from 'react-native-size-matters';
import Modal from 'react-native-modal';
import {Context as AuthContext} from '../../context/authContext';
import {useSubscription, useMutation} from '@apollo/client';
import AIcons from 'react-native-vector-icons/AntDesign';
import {CHECK_PROFILE_QUERY} from '../../graphql/subscriptions';
import {UPDATE_PROFILE_BIO} from '../../graphql/mutations';

const EditSkills = () => {
  const {state} = useContext(AuthContext);
  const [editModelVisible, setEditModelVisible] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [bio, setBio] = useState<string>('');
  //   const [bioTextCount, setBioTextCount] = useState<number>(0);
  const [skills, setSkills] = useState<any>([]);

  const {loading, data} = useSubscription(CHECK_PROFILE_QUERY, {
    variables: {id: state?.user?.username ? state.user.username : 'Wasi Ayub'},
  });

  const [update_Profile] = useMutation(UPDATE_PROFILE_BIO);

  useEffect(() => {
    if (data && data.profile[0].expertise) {
      setSkills(data.profile[0].expertise.split(', '));
    }
  }, [data]);

  const AddSkills = (skill: string) => {
    setSkills([...skills, skill]);
  };

  const UpdateSkills = (index: number) => {
    const skillArr = [...skills];
    skillArr.splice(index, 1);
    setSkills(skillArr);
  };

  //   const getCharacterCount = (valueHolder: string) => {
  //     const charValue = valueHolder.length;
  //     setBioTextCount(charValue);
  //   };

  const updateProfile = () => {
    setLoader(true);
    update_Profile({
      variables: {
        user_id: data.profile[0].user_id,
        bio: bio,
        expertise: skills.join(', '),
      },
    })
      .then(() => {
        setLoader(false);
        setEditModelVisible(false);
        FlashMessage({
          message: 'Profile updated',
          description: 'Successfully',
          type: 'success',
        });
      })
      .catch(error => {
        console.log(error);
        setLoader(false);
      });
  };

  return (
    <MainAppContainer>
      <View style={styles.container}>
        <HeaderBar
          title={'Profile'}
          height={verticalScale(Platform.OS === 'ios' ? 100 : 80)}
          showDrawer
        />
        <ScrollView style={globalStyles.scrollViewContentStyle}>
          <View style={globalStyles.contentContainerStyle}>
            {loading ? (
              <LoadingIndicator color={COLORS.primary} size={35} />
            ) : (
              <>
                <View style={styles.textView}>
                  {/* <AIcons name={'solution1'} size={20} style={{ marginRight: 5 }} /> */}
                  <Text style={styles.titleText}>{'Bio '}</Text>
                  <Text style={styles.text}>
                    {data?.profile[0]?.bio ? data.profile[0].bio : ''}
                  </Text>
                </View>
                <View style={styles.textView}>
                  {/* <AIcons name={'staro'} size={20} style={{ marginRight: 5 }} /> */}
                  <Text style={styles.titleText}>{'Expertise '}</Text>
                  <Text style={styles.text}>
                    {data?.profile[0]?.expertise
                      ? data.profile[0].expertise
                      : ''}
                  </Text>
                </View>
              </>
            )}
          </View>
        </ScrollView>

        {!loading ? (
          <EditButton
            onPress={() => {
              // setSkills(data.profile[0].expertise !== undefined ? data.profile[0].expertise.split(', ') : []);
              setBio(
                data.profile[0].bio !== undefined ? data.profile[0].bio : '',
              );
              setEditModelVisible(true);
            }}
          />
        ) : null}

        <Modal isVisible={editModelVisible} style={styles.modal} transparent>
          <View style={{width: WIDTH, height: HEIGHT}}>
            <TouchableOpacity
              style={{width: WIDTH, height: HEIGHT - 400}}
              onPress={() => setEditModelVisible(false)}
            />
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={{...FONTS.h3, color: COLORS.white}}>
                  Change About Yourself
                </Text>
                <TouchableOpacity onPress={() => setEditModelVisible(false)}>
                  <AIcons name="close" size={25} color={COLORS.white} />
                </TouchableOpacity>
              </View>
              <View style={globalStyles.profileModalView}>
                <ScrollView
                  style={styles.scrollView}
                  showsVerticalScrollIndicator={false}
                >
                  <View>
                    <View>
                      <Text style={[globalStyles.spacing, FONTS.h4]}>
                        Your Bio
                      </Text>
                      <Input
                        textarea
                        value={bio}
                        placeholder="Profile Bio"
                        onChangeText={value => {
                          setBio(value);
                          //   getCharacterCount(value);
                        }}
                      />
                      {/* <Text style={globalStyles.textCount}>{bioTextCount} characters</Text> */}
                    </View>
                    <View>
                      <Text style={[globalStyles.spacing, FONTS.h4]}>
                        Your Skills
                      </Text>
                      <SkillInput placeholder={'Type here'} Add={AddSkills} />
                    </View>
                    <View style={[globalStyles.spacing, styles.skillContainer]}>
                      {skills.map((item: string, index: number) => (
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
                <View style={globalStyles.spacing}>
                  <RoundButton
                    title={'UPDATE'}
                    loader={loader}
                    disable={loader}
                    onPress={updateProfile}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </MainAppContainer>
  );
};
export default EditSkills;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textView: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    marginVertical: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 16,
  },
  modalContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: 400,
    backgroundColor: COLORS.primary,
  },
  scrollView: {flex: 1},
  skillContainer: {flex: 1, flexWrap: 'wrap', flexDirection: 'row'},
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
  titleText: {
    ...FONTS.h5,
    fontWeight: '600',
    color: COLORS.primary,
  },
  text: {
    ...FONTS.body4,
    color: COLORS.lightGray2,
  },
  modal: {margin: 0},
});
