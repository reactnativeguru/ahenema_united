import images from './images';
import SIZES from './sizes';
import COLORS from './colors';
import FONTS from './fonts';
import {darkTheme, lightTheme} from './theme';
import globalStyles from './globalStyles';
import GRAPHQL_URL from './hasura';
import routes from '../navigation/routes';
import AppInput from './AppInput';
import {Dimensions} from 'react-native';
const ProfileImage =
  'https://mentring.reactnative.guru/wp-content/uploads/2021/03/user.png';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export {
  images,
  COLORS,
  SIZES,
  FONTS,
  darkTheme,
  lightTheme,
  globalStyles,
  GRAPHQL_URL,
  routes,
  WIDTH,
  HEIGHT,
  ProfileImage,
  AppInput
};
