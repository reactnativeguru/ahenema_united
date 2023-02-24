import {RNS3} from 'react-native-upload-aws-s3';
import {showMessage} from 'react-native-flash-message';
import {s3_Options, s3_PostsImageOptions} from './config';

type Props = {
  image: string;
  name: string;
};

const fileUploadToS3 = async ({image, name}: Props) => {
  const imageType = image.includes('.jpg') ? 'jpg' : 'png';
  const imageName = `${new Date().getTime()}.${imageType}`;
  const file = {
    uri: image,
    name: imageName,
    type: `image/${imageType}`,
  };
  const response = await RNS3.put(file, s3_Options(name)).progress(e =>
    console.log(Math.round((e.loaded / e.total) * 100)),
  );
  console.log({response});
  if (response.status !== 201) {
    showMessage({
      message: 'Image Upload',
      description: 'Failed to upload image to S3',
      type: 'danger',
    });
    console.warn('Failed to upload image to S3');
    return 'error';
  } else {
    return response.body.postResponse.location;
  }
};

const fileUploadPostImageToS3 = async ({image, name}: Props) => {
  const imageType = image.includes('.jpg') ? 'jpg' : 'png';
  const imageName = `${new Date().getTime()}.${imageType}`;
  const file = {
    uri: image,
    name: imageName,
    type: `image/${imageType}`,
  };
  const response = await RNS3.put(file, s3_PostsImageOptions(name)).progress(
    () => console.log('Progress!'),
  );
  console.log({response});
  if (response.status !== 201) {
    showMessage({
      message: 'Image Upload',
      description: 'Failed to upload image to S3',
      type: 'danger',
    });
    console.warn('Failed to upload image to S3');
    return 'error';
  } else {
    return response.body.postResponse.location;
  }
};

export {fileUploadToS3, fileUploadPostImageToS3};
