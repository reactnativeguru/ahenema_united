import {scale} from 'react-native-size-matters';
import SIZES from './sizes';

const FONTS = {
  largeTitle: {
    fontSize: SIZES.largeTitle,
  },
  h1: {
    fontSize: scale(SIZES.h1),
    // lineHeight: scale(36),
  },
  h2: {
    fontSize: scale(SIZES.h2),
    // lineHeight: scale(30),
  },
  h3: {
    fontSize: scale(SIZES.h3),
    // lineHeight: scale(22),
  },
  h4: {
    fontSize: scale(SIZES.h4),
    // lineHeight: scale(22),
  },
  h5: {
    fontSize: scale(SIZES.h5),
    // lineHeight: scale(18),
  },
  body1: {
    fontSize: scale(SIZES.body1),
    lineHeight: scale(36),
  },
  body2: {
    fontSize: scale(SIZES.body2),
    lineHeight: scale(30),
  },
  body3: {
    fontSize: scale(SIZES.body3),
    // lineHeight: scale(22),
  },
  body4: {
    fontSize: scale(SIZES.body4),
    // lineHeight: scale(22),
  },
  body5: {
    fontSize: scale(SIZES.body5),
    // lineHeight: scale(22),
  },
  body6: {
    fontSize: scale(SIZES.body6),
    // lineHeight: scale(22),
  },
  body7: {
    fontSize: 14,
  },
};

export default FONTS;
