import {scale} from 'react-native-size-matters';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const SIZES = {
  // global sizes
  base: scale(8),
  font: scale(14),
  radius: scale(12),
  padding: scale(24),
  paddingLeft: scale(10),
  largeTopPadding: scale(160),
  mediumTopPadding: scale(80),
  smallTopPadding: scale(40),

  // font sizes
  largeTitle: scale(40),
  h1: scale(30),
  h2: scale(22),
  h3: scale(16),
  h4: scale(14),
  h5: scale(12),
  body1: scale(30),
  body2: scale(22),
  body3: scale(16),
  body4: scale(14),
  body5: scale(12),
  body6: scale(10),

  // status bar height
  statusbarHeight: getStatusBarHeight(true),
};

export default SIZES;
