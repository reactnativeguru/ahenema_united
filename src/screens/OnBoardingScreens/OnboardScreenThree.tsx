import React, {FC, useContext, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {
  HeaderBar,
  RoundButton,
  PhotoPicker,
  ImagePickerModal,
  Avatar,
  FlashMessage,
} from '../../components';
import {globalStyles, SIZES, routes} from '../../constants';
import ImagePicker from 'react-native-image-crop-picker';
import {useMutation} from '@apollo/client';
import {UPDATE_PROFILE_IMAGE} from '../../graphql/mutations';
import {fileUploadToS3} from '../../services/media';
import {Context as AuthContext} from '../../context/authContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthContextType} from '../../utils/interfaces';

const IMAGEPICKEROBJ = {
  width: 300,
  height: 300,
  cropping: true,
  multiple: false,
  compressImageQuality: 1,
};

type RootStackParamList = {
  OnboardScreenThree: undefined;
};

type OnboardScreenThreeProps = NativeStackScreenProps<
  RootStackParamList,
  'OnboardScreenThree'
>;

const OnboardScreenThree: FC<OnboardScreenThreeProps> = ({navigation}) => {
  const {state, updateProfile} = useContext(AuthContext) as AuthContextType;
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [loader, setLoader] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [actions, setActions] = useState<any>([]);
  const [
    update_Profile,
    // , {loading: profileLoading, error: profileError}
  ] = useMutation(UPDATE_PROFILE_IMAGE);

  const takeImageHandler = async () => {
    setIsVisible(true);
    const imageData = [
      {
        text: 'Camera',
        callback: async () => {
          const response = await ImagePicker.openCamera(IMAGEPICKEROBJ);
          if (response) {
            setSelectedImage(response.path);
          }
          setIsVisible(false);
        },
      },
      {
        text: 'Gallery',
        callback: async () => {
          const response = await ImagePicker.openPicker(IMAGEPICKEROBJ);
          if (response) {
            setSelectedImage(response.path);
          }
          setIsVisible(false);
        },
      },
    ];
    setActions(imageData);
  };

  const HandleS3Upload = async () => {
    setLoader(true);
    const newFile = {
      uri: selectedImage,
      type: `test/${selectedImage.split('.')[1]}`,
      name: `test.${selectedImage.split('.')[1]}`,
    };
    const image = newFile.uri;
    const profileUrl = await fileUploadToS3({
      image,
      name: state?.user?.username ? state?.user?.username.toLowerCase() : '',
    });
    SaveProfileImage(profileUrl);
  };

  const SaveProfileImage = async (profileUrl: string) => {
    const currentProfile = state.profile;
    const newProfile = {
      ...currentProfile,
      imageUrl: selectedImage,
      profileUrl,
    };
    updateProfile(newProfile);
    update_Profile({
      variables: {
        user_id: state?.user?.id
          ? state.user.id.toLowerCase()
          : '68b0992a-6606-42d2-8c31-7931b69466ef',
        image_uri: profileUrl,
        cover_uri: profileUrl,
      },
    })
      .then(() => {
        FlashMessage({
          message: 'Image Upload',
          description: 'Successfully',
          type: 'success',
        });
        setLoader(false);
        navigation.navigate(routes.ON_BOARDING_SCREEN_4);
      })
      .catch(() => {
        setLoader(false);
      });
  };

  return (
    <View style={styles.container}>
      <HeaderBar
        title={''}
        height={180}
        showBackIcon={() => navigation.goBack()}
        onboardingUsername={'Please choose a profile picture'}
        skipButton={() => navigation.navigate(routes.ON_BOARDING_SCREEN_4)}
      />
      <ScrollView style={globalStyles.scrollViewContentStyle}>
        <View style={globalStyles.contentContainerStyle}>
          <View style={[globalStyles.spacing, styles.ImageContainer]}>
            {selectedImage ? (
              <TouchableOpacity onPress={() => takeImageHandler()}>
                <Avatar url={selectedImage} style={styles.avatar} />
              </TouchableOpacity>
            ) : (
              <PhotoPicker
                icon={'camera'}
                onPress={() => takeImageHandler()}
                width={160}
              />
            )}
          </View>
        </View>
      </ScrollView>
      <View style={[globalStyles.spacing, {padding: SIZES.paddingLeft}]}>
        <RoundButton
          title={'NEXT'}
          loader={loader}
          disable={!selectedImage}
          onPress={HandleS3Upload}
        />
      </View>
      <ImagePickerModal
        isVisible={isVisible}
        setIsVisible={() => setIsVisible(false)}
        actions={actions}
      />
    </View>
  );
};
export default OnboardScreenThree;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ImageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  avatar: {
    ...globalStyles.hollaFormImageView,
    width: 160,
    height: 160,
    borderRadius: 160 / 2,
  },
});
