import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import {
  HeaderBar,
  MainAppContainer,
  LoadingIndicator,
  RoundButton,
  EditButton,
  Input,
  FlashMessage,
} from '../../components';
import {globalStyles, COLORS, FONTS, WIDTH, HEIGHT} from '../../constants';
import {verticalScale} from 'react-native-size-matters';
import AIcons from 'react-native-vector-icons/AntDesign';
import {useSubscription, useMutation} from '@apollo/client';
import {UPDATE_PROFILE} from '../../graphql/mutations';
import {Context as AuthContext} from '../../context/authContext';
import {CHECK_PROFILE_QUERY} from '../../graphql/subscriptions';
import Modal from 'react-native-modal';

const EditBio = () => {
  const {state} = useContext(AuthContext);
  const [update_Profile] = useMutation(UPDATE_PROFILE);

  const [editModelVisible, setEditModelVisible] = useState(false);
  const [loader, setLoader] = useState(false);

  const {loading, data} = useSubscription(CHECK_PROFILE_QUERY, {
    variables: {id: state?.user?.username ? state.user.username : 'Wasi Ayub'},
  });

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    if (data && data.profile && data.profile.length) {
      setFirstName(
        data.profile[0].first_name ? data.profile[0].first_name : '',
      );
      setLastName(data.profile[0].last_name ? data.profile[0].last_name : '');
    }
  }, [data]);

  const updateProfile = () => {
    setLoader(true);
    update_Profile({
      variables: {
        // ...state.user,
        ...data.profile[0],
        username: data.profile[0].user_id,
        firstName: firstName,
        lastName: lastName,
      },
    })
      .then(response => {
        setLoader(false);
        console.log('response => ', response);
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
                  <Text style={styles.titleText}>{'First name '}</Text>
                  <Text style={styles.nameText}>
                    {data && data.profile[0].first_name
                      ? data.profile[0].first_name
                      : ''}
                  </Text>
                </View>
                <View style={styles.textView}>
                  <Text style={styles.titleText}>{'Last name '}</Text>
                  <Text style={styles.nameText}>
                    {data && data.profile[0].last_name
                      ? data.profile[0].last_name
                      : ''}
                  </Text>
                </View>
              </>
            )}
          </View>
        </ScrollView>
        {!loading ? (
          <EditButton onPress={() => setEditModelVisible(true)} />
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
                  Change Your Name
                </Text>
                <TouchableOpacity onPress={() => setEditModelVisible(false)}>
                  <AIcons name="close" size={25} color={COLORS.white} />
                </TouchableOpacity>
              </View>
              <View style={globalStyles.profileModalView}>
                <View>
                  <View>
                    <Text style={[globalStyles.spacing, FONTS.h4]}>
                      First name
                    </Text>
                    <Input
                      value={firstName}
                      multiline={true}
                      placeholder="First name"
                      onChangeText={value => {
                        setFirstName(value);
                      }}
                    />
                  </View>
                  <View>
                    <Text style={[globalStyles.spacing, FONTS.h4]}>
                      Last name
                    </Text>
                    <Input
                      value={lastName}
                      multiline={true}
                      placeholder="Last name"
                      onChangeText={value => {
                        setLastName(value);
                      }}
                    />
                  </View>
                </View>
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
export default EditBio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {margin: 0},
  textView: {
    width: '100%',
    // flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    marginVertical: 6,
    // borderRadius: SIZES.radius
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
  titleText: {
    ...FONTS.h5,
    fontWeight: '600',
    color: COLORS.primary,
  },
  nameText: {
    ...FONTS.body4,
    color: COLORS.lightGray2,
  },
});
