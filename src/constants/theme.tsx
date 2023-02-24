import COLORS from './colors';

const darkTheme = {
  name: 'dark',
  backgroundColor: COLORS.secondary,
  textColor: COLORS.white,
  tabBackgroundColor: COLORS.lightGray,
  cardBackgroundColor: COLORS.gray3,
  bottomTabBarBackgroundColor: COLORS.gray3,
  headerColor: COLORS.yellow,
};

const lightTheme = {
  name: 'light',
  backgroundColor: COLORS.lightGray3,
  textColor: COLORS.black,
  tabBackgroundColor: COLORS.yellow,
  cardBackgroundColor: COLORS.lightYellow,
  bottomTabBarBackgroundColor: COLORS.lightYellow,
  headerColor: COLORS.red,
};

export {darkTheme, lightTheme};
