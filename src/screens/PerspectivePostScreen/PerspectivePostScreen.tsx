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
  RoundButton,
  PhotoPicker,
  ImagePickerModal,
  Avatar,
  FlashMessage,
} from '../../components';
import {
  globalStyles,
  SIZES,
  COLORS,
  FONTS,
  WIDTH,
  routes,
} from '../../constants';
import {verticalScale} from 'react-native-size-matters';
import ImagePicker from 'react-native-image-crop-picker';
import {Select, SelectItem} from '@ui-kitten/components';
import {useMutation, useQuery} from '@apollo/client';
import {Context as AuthContext} from '../../context/authContext';
import {Context as PostContext} from '../../context/postContext';
import {CREATE_PERSPECTIVE} from '../../graphql/mutations';
import {GET_PERSPECTIVES_CATEGORY} from '../../graphql/queries';
import {fileUploadPostImageToS3} from '../../services/media';
import {
  AuthContextType,
  PostContextType,
  Perspective,
  ImagePickerAction,
  CategoryProps,
} from '../../utils/interfaces';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const IMAGEPICKEROBJ = {
  width: WIDTH,
  cropping: true,
  multiple: false,
  compressImageQuality: 1,
};

type RootStackParamList = {
  PerspectivePostScreen: undefined;
};

type PerspectivePostScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PerspectivePostScreen'
>;

const PerspectivePostScreen: FC<PerspectivePostScreenProps> = ({
  navigation,
}) => {
  const {state} = useContext(AuthContext) as AuthContextType;
  const {createPost} = useContext(PostContext) as PostContextType;
  const user = state?.user?.username ? state.user.username : 'John';
  const [InsertPerspectives] = useMutation(CREATE_PERSPECTIVE);
  const {data} = useQuery(GET_PERSPECTIVES_CATEGORY);

  const [content, setContent] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [actions, setActions] = useState<ImagePickerAction>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedCategoryLabel, setSelectedCategoryLabel] =
    useState<string>('Select category');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

  const takeImageHandler = async () => {
    setIsVisible(true);
    const imageData = [
      {
        text: 'Camera',
        callback: async () => {
          const response = await ImagePicker.openCamera(IMAGEPICKEROBJ);
          setSelectedImage(response.path);
          setIsVisible(false);
        },
      },
      {
        text: 'Gallery',
        callback: async () => {
          const response = await ImagePicker.openPicker(IMAGEPICKEROBJ);
          setSelectedImage(response.path);
          setIsVisible(false);
        },
      },
    ];
    setActions(imageData);
  };

  const SaveHolla = async () => {
    if (!content) {
      setIsError(true);
      return;
    }
    setLoader(true);
    const perspective = {
      description: content,
      categoryId: selectedCategoryId,
      image: '',
      userId: 'aa1a6da9-2a05-4a86-a961-9463a292e95e',
    } as Perspective;
    let imageUrl;

    if (selectedImage) {
      imageUrl = await fileUploadPostImageToS3({
        image: selectedImage,
        name: user,
      });
      if (imageUrl) {
        perspective.image = imageUrl;
      }
    }
    createPost(perspective);
    InsertPerspectives({
      variables: perspective,
    })
      .then(() => {
        navigation.navigate(routes.HOLLA_SCREEN, {post: perspective});
        FlashMessage({
          message: 'Perspective',
          description: 'Perspective posted',
          type: 'success',
        });
        setContent('');
        setLoader(false);
      })
      .catch(error => {
        setLoader(false);
        console.log({error});
        FlashMessage({
          message: 'Perspective',
          description: 'Perspective failed',
          type: 'danger',
        });
      });
  };

  return (
    <View style={styles.container}>
      <HeaderBar
        title={'Create a Perspective'}
        height={verticalScale(100)}
        showBackIcon
      />
      <ScrollView
        style={globalStyles.scrollViewContentStyle}
        contentContainerStyle={styles.scrollViewContent}>
        <View style={globalStyles.contentContainerStyle}>
          <View style={globalStyles.spacing}>
            <Text style={globalStyles.label}>Select category</Text>
            {data?.perspectivesCategory ? (
              <Select
                value={selectedCategoryLabel}
                // contentContainerStyle={{backgroundColor:'red'}}
                style={styles.select}
                onSelect={(index: any) => {
                  setSelectedCategoryLabel(
                    data.perspectivesCategory[index - 1].name,
                  );
                  setSelectedCategoryId(
                    data.perspectivesCategory[index - 1].id,
                  );
                }}>
                {data.perspectivesCategory.map(
                  (item: CategoryProps, index: string) => {
                    return <SelectItem key={index} title={item.name} />;
                  },
                )}
              </Select>
            ) : null}
          </View>
          <View style={globalStyles.spacing}>
            <Text style={globalStyles.label}>Perspective content</Text>
            <Input
              textarea={true}
              placeholder={'Type here'}
              onChangeText={(text: string) => setContent(text)}
              value={content}
              maxLength={250}
            />
            <View style={styles.contentView}>
              <Text style={[globalStyles.errorText]}>
                {isError && !content ? 'Please write post content' : null}
              </Text>
              <Text
                style={globalStyles.textCount}>{`${content.length}/250`}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => takeImageHandler()}>
            <View
              style={[styles.ImageContainer, globalStyles.hollaFormImageView]}>
              {selectedImage ? (
                <Avatar
                  url={selectedImage}
                  style={{...globalStyles.hollaFormImageView}}
                />
              ) : (
                <View>
                  <Text style={styles.imageText}>Drop your image here</Text>
                </View>
              )}
              <PhotoPicker
                icon={'image'}
                size={25}
                onPress={() => console.log('PhotoPicker')}
                style={selectedImage ? styles.camera2 : styles.camera}
              />
            </View>
          </TouchableOpacity>
          {/* {isError && !selectedImage ? <Text style={[globalStyles.errorText]}>
                            Please upload photo
                        </Text> : null} */}
        </View>
      </ScrollView>
      <View style={styles.btns}>
        <RoundButton
          title={'Create Perspective'}
          loader={loader}
          disable={loader || !selectedCategoryId || !content || !selectedImage}
          onPress={SaveHolla}
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
export default PerspectivePostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  postContainer: {},
  ImageContainer: {
    alignSelf: 'center',
    backgroundColor: COLORS.lightGray5,
    alignItems: 'center',
  },
  dropdownText: {
    ...FONTS.h5,
    textAlign: 'left',
    color: COLORS.primary,
  },
  btns: {
    width: '100%',
    position: 'absolute',
    bottom: 2 * SIZES.paddingLeft,
    alignSelf: 'center',
    paddingHorizontal: SIZES.paddingLeft,
  },
  select: {width: '100%'},
  contentView: {flexDirection: 'row', justifyContent: 'space-between'},
  scrollViewContent: {paddingBottom: 100},
  camera: {
    position: 'absolute',
    top: 70,
    padding: 10,
  },
  camera2: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: COLORS.lightGray5,
    right: 10,
    padding: 10,
    borderRadius: SIZES.radius * 3,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  imageText: {
    marginBottom: -50,
    ...FONTS.h2,
    color: COLORS.lightGray2,
  },
});
