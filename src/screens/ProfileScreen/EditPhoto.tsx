import {useMutation, useSubscription} from '@apollo/client';
import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import {verticalScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  CoverPicker,
  FlashMessage,
  HeaderBar,
  IconAntDesign,
  ImagePickerModal,
  LoadingIndicator,
  MainAppContainer,
  PhotoPicker,
  RoundButton,
} from '../../components';
import {
  AppInput,
  COLORS,
  FONTS,
  globalStyles,
  ProfileImage,
} from '../../constants';
import {Context as AuthContext} from '../../context/authContext';
import {UPDATE_PROFILE_IMAGE} from '../../graphql/mutations';
import {CHECK_PROFILE_QUERY} from '../../graphql/subscriptions';
import {fileUploadToS3} from '../../services/media';
const IMAGEPICKEROBJ = {
  width: 300,
  height: 300,
  cropping: true,
  multiple: false,
  compressImageQuality: 1,
};

const EditPhoto = () => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedCover, setSelectedCover] = useState<string>('');
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [actions, setActions] = useState<any>([]);
  const [show, setShow] = useState(false);

  const {state} = useContext(AuthContext);

  const [update_Profile] = useMutation(UPDATE_PROFILE_IMAGE);

  const {loading, data} = useSubscription(CHECK_PROFILE_QUERY, {
    variables: {id: state?.user?.username ? state.user.username : 'Wasi Ayub'},
  });

  useEffect(() => {
    if (data && data.profile[0].image_uri) {
      console.log({profile: data.profile[0].image_uri});
      setSelectedImage(data.profile[0].image_uri);
      setSelectedCover(data.profile[0].cover_uri);
    }
  }, [data]);

  const takeImageHandler = async (cover: boolean) => {
    console.log(dialogVisible);
    setIsVisible(true);
    const imageData = [
      {
        text: 'Camera',
        callback: async () => {
          const response = await ImagePicker.openCamera(IMAGEPICKEROBJ);
          if (response) {
            if (cover) {
              setSelectedCover(response.path);
              handleS3Upload('', response.path);
            } else {
              setSelectedImage(response.path);
              handleS3Upload(response.path);
            }
          }
          setIsVisible(false);
        },
      },
      {
        text: 'Gallery',
        callback: async () => {
          const response = await ImagePicker.openPicker(IMAGEPICKEROBJ);
          if (response) {
            if (cover) {
              setSelectedCover(response.path);
              handleS3Upload('', response.path);
            } else {
              setSelectedImage(response.path);
              handleS3Upload(response.path);
            }
          }
          setIsVisible(false);
        },
      },
    ];
    setActions(imageData);
  };

  const updateProfile = (profileUrl: string, coverUrl: string) => {
    console.log({profileUrl, coverUrl});
    const variables = {
      username: data.profile[0].user_id,
      image_uri: '',
      cover_uri: '',
    };
    if (profileUrl) {
      variables.image_uri = profileUrl;
      variables.cover_uri = selectedCover;
    } else {
      variables.cover_uri = coverUrl;
      variables.image_uri = selectedImage;
    }
    update_Profile({
      variables,
    })
      .then(response => {
        console.log('response => ', response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleS3Upload = async (profileURI: string, coverURI?: string) => {
    console.log({profileURI, coverURI});
    // eslint-disable-next-line no-nested-ternary
    const uri = profileURI ? profileURI : coverURI ? coverURI : '';
    const newFile = {
      uri: uri,
      type: `test/${uri.split('.')[1]}`,
      name: `test.${uri.split('.')[1]}`,
    };

    const image = newFile.uri;
    const profileUrl = await fileUploadToS3({
      image,
      name: state.user.username,
    });
    updateProfile(profileURI ? profileUrl : '', coverURI ? profileUrl : '');
    setDialogVisible(false);
    FlashMessage({
      message: `${profileURI ? 'Profile' : 'Cover'} image updated`,
      description: 'Successfully',
      type: 'success',
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
            <View style={[globalStyles.spacing, styles.imageContainer]}>
              {loading ? (
                <LoadingIndicator color={COLORS.primary} size={35} />
              ) : (
                <>
                  <View style={styles.coverView}>
                    {selectedCover ? (
                      <View>
                        <Image
                          source={{uri: selectedCover}}
                          style={{...globalStyles.coverImage}}
                        />
                        <TouchableOpacity
                          style={styles.addCover}
                          onPress={() => takeImageHandler(true)}
                        >
                          <Icon
                            color={COLORS.lightGray3}
                            name={'account-edit'}
                            size={25}
                          />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <CoverPicker
                        icon={'camera'}
                        onPress={() => takeImageHandler(true)}
                      />
                    )}
                  </View>

                  {/* {selectedImage ? ( */}
                  <View>
                    <Image
                      source={{
                        uri: selectedImage ? selectedImage : ProfileImage,
                      }}
                      style={styles.formImage}
                    />
                    <TouchableOpacity
                      style={styles.addImage}
                      onPress={() => takeImageHandler(false)}
                    >
                      {selectedImage ? (
                        <Icon
                          color={COLORS.lightGray2}
                          name={'account-edit'}
                          size={25}
                        />
                      ) : (
                        <PhotoPicker
                          icon={'camera'}
                          onPress={() => takeImageHandler(false)}
                          color={COLORS.black}
                          size={25}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                  {/* ) : (
                    <PhotoPicker
                      icon={'camera'}
                      onPress={() => takeImageHandler(false)}
                      width={160}
                      border
                    />
                  )} */}
                </>
              )}
            </View>
            <View style={styles.header}>
              <Text style={styles.heading} />
              <TouchableWithoutFeedback onPress={() => setShow(true)}>
                {show ? null : (
                  <IconAntDesign name={'edit'} size={20} color={COLORS.black} />
                )}
              </TouchableWithoutFeedback>
            </View>
            <AppInput label="First Name" />
            <AppInput label="Last Name" />
            <AppInput label="Bio" />
            <AppInput label="Expertise" />
            {show && (
              <View style={styles.btnContainer}>
                <RoundButton
                  title="Cancel"
                  fgColor={COLORS.primary}
                  onPress={() => setShow(false)}
                  bgColor={COLORS.lightGray4}
                  btnStyle={styles.btnStyle}
                />
                <RoundButton
                  title="Save"
                  fgColor={COLORS.primary}
                  onPress={() => console.log('save')}
                  bgColor={COLORS.transparent}
                  btnStyle={styles.btnStyle}
                />
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      <ImagePickerModal
        isVisible={isVisible}
        setIsVisible={() => setIsVisible(false)}
        actions={actions}
      />
    </MainAppContainer>
  );
};
export default EditPhoto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  textView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 15,
  },
  addImage: {
    position: 'absolute',
    backgroundColor: COLORS.lightGray3,
    borderColor: COLORS.black,
    borderWidth: 4,
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    bottom: 15,
    right: 5,
  },
  addCover: {
    position: 'absolute',
    bottom: 16,
    right: 4,
  },
  coverView: {marginBottom: -80, width: '100%'},
  formImage: {
    // ...globalStyles.hollaFormImageView,
    width: 160,
    height: 160,
    borderRadius: 160 / 2,
    backgroundColor: COLORS.lightGray3,
  },
  heading: {
    ...FONTS.h4,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnStyle: {
    borderRadius: 0,
    width: '45%',
    borderColor: COLORS.lightGray4,
    borderWidth: 1,
  },
});
