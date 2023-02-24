import {StyleSheet} from 'react-native';
import SIZES from './sizes';
import COLORS from './colors';
import FONTS from './fonts';
import {scale} from 'react-native-size-matters';

const globalStyles = StyleSheet.create({
  scrollViewContentStyle: {
    flex: 1,
    marginTop: -25,
    borderTopLeftRadius: scale(SIZES.radius * 2),
    borderTopRightRadius: scale(SIZES.radius * 2),
    backgroundColor: COLORS.white,
  },
  contentContainerStyle: {
    flex: 1,
    marginTop: SIZES.paddingLeft,
    paddingLeft: SIZES.paddingLeft,
    paddingRight: SIZES.paddingLeft,
  },
  spacing: {
    width: '100%',
    // marginBottom: SIZES.base,
  },
  label: {
    marginBottom: SIZES.base,
    fontSize: SIZES.body3,
    color: COLORS.primary,
  },
  errorText: {
    color: COLORS.red,
    marginHorizontal: SIZES.paddingLeft,
    ...FONTS.body6,
    marginBottom: 8,
  },

  //Create Holla Styling
  hollaFormImageView: {
    width: '100%',
    height: 250,
    borderWidth: 3,
    borderColor: COLORS.borderColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    borderStyle: 'dashed',
  },
  coverImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: COLORS.lightGray4,
    paddingHorizontal: SIZES.paddingLeft,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  homeTopPadding: {
    paddingTop: scale(180),
  },

  drawerLink: {
    marginLeft: 4,
    color: COLORS.lightGray4,
  },

  modal: {
    flex: 1,
    marginTop: '50%',
    margin: 16,
  },
  modalContainer: {
    flex: 1,
  },
  modalContent: {
    flex: 1,
    marginTop: 60,
    paddingHorizontal: 16,
  },

  profileModalView: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
    paddingHorizontal: 1.2 * SIZES.paddingLeft,
    paddingVertical: 0.8 * SIZES.paddingLeft,
  },
  mentringCard: {
    width: '100%',
    height: scale(100),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderWidth: scale(1),
    borderColor: COLORS.primary,
    borderRadius: scale(10),
    marginVertical: scale(4),
    paddingHorizontal: scale(10),
  },

  profileCard: {
    width: '49%',
    height: scale(170),
    justifyContent: 'space-evenly',
    borderWidth: scale(1),
    borderColor: COLORS.primary,
    borderRadius: scale(10),
    marginVertical: scale(4),
    backgroundColor: COLORS.white,
    marginBottom: SIZES.paddingLeft / 2,
  },
  displayRow: {
    flexDirection: 'row',
    flex: 1,
    height: '100%',
  },
  displayInRow: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    height: 40,
    margin: 2,
    width: '100%',
  },
  chatContentContainer: {
    flex: 1,
  },
  profileContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatContent: {
    width: '100%',
  },
  chatButton: {},
  textCount: {
    textAlign: 'right',
    ...FONTS.body6,
    color: COLORS.lightGray2,
  },
  container: {
    padding: scale(5),
  },
});

export default globalStyles;
