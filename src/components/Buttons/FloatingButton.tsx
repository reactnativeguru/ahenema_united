import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Platform,
} from 'react-native';
import {COLORS} from '../../constants';
import {IconAntDesign} from '..';
import {scale} from 'react-native-size-matters';
// import {useNavigation} from '@react-navigation/native';
// import {useQuery} from '@apollo/client';
// import {
//   MENTRING_CATEGORIES,
//   HOLLA_CATEGORIES,
//   CHECK_PROFILE_QUERY,
// } from '../../graphql/queries';
// import {Context as AuthContext} from '../../context/authContext';

const FloatingButton = props => {
  // const {state} = useContext(AuthContext);
  // const navigation = useNavigation();
  // const {data} = useQuery(MENTRING_CATEGORIES);
  // const {data: userProfile} = useQuery(CHECK_PROFILE_QUERY, {
  //   variables: {id: state.user.username},
  // });
  // const {data: hollaCategoryData} = useQuery(HOLLA_CATEGORIES);

  // const [userType, setUserType] = useState('');
  // const [animation, setAnimation] = useState(new Animated.Value(0));
  // const [open, setOpen] = useState(false);
  // const [keyboardStatus, setKeyboardStatus] = useState(false);
  // const [modalOpen, setModalOpen] = useState('');
  // const modalizeRef = useRef(null);
  // const screenModelRef = useRef(null);

  // useEffect(() => {
  //   Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
  //   Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

  //   // cleanup function
  //   return () => {
  //     Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
  //     Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
  //   };
  // }, []);

  // useEffect(() => {
  //   if (userProfile && userProfile.profile && userProfile.profile.length) {
  //     setUserType(
  //       userProfile.profile[0].user_type
  //         ? userProfile.profile[0].user_type
  //         : '',
  //     );
  //   }
  // }, [userProfile]);

  // const _keyboardDidShow = () => setKeyboardStatus(true);
  // const _keyboardDidHide = () => setKeyboardStatus(false);

  // const onOpen = () => {
  //   modalizeRef.current?.open();
  // };

  // const onClose = () => {
  //   modalizeRef.current?.close();
  //   screenModelRef.current?.close();
  // };

  // useEffect(() => {
  //   console.log({open});
  // }, [open]);

  const toggleActionMenu = () => {
    // const toValue = open ? 0 : 1;
    // Animated.spring(animation, {
    //   toValue,
    //   friction: 5,
    //   useNativeDriver: true,
    // }).start();
    // if (open) {
    //   onClose();
    // } else {
    //   onOpen();
    // }
    // setOpen(!open);
  };

  // const rotation = {
  //   transform: [
  //     {
  //       rotate: animation.interpolate({
  //         inputRange: [0, 1],
  //         outputRange: ['0deg', '45deg'],
  //       }),
  //     },
  //   ],
  // };

  // const actionType = type => {
  //   setModalOpen(type);
  //   modalizeRef.current?.close();
  //   screenModelRef.current?.open();
  //   toggleActionMenu();
  //   if (type === 'holla') {
  //     navigation.navigate('GlobalModal', {
  //       screen: routes.ADD_POSTS_SCREEN,
  //       params: hollaCategoryData,
  //     });
  //   } else if (type === 'mentring') {
  //     navigation.navigate('GlobalModal', {
  //       screen: routes.SCHEDULE_MENTRING_SCREEN,
  //       params: data,
  //     });
  //   }
  // };

  const ActionButton = ({menu}: any) => (
    <TouchableWithoutFeedback onPress={() => toggleActionMenu()}>
      <Animated.View
        style={[
          styles.button,
          menu && menu,
          // {backgroundColor: open ? COLORS.pink : COLORS.lightGreen},
          // rotation,
        ]}
      >
        <IconAntDesign size={60} color="white" name="pluscircleo" />
      </Animated.View>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={[styles.container, props.style]}>
      <ActionButton />
      {/* <Modalize ref={modalizeRef}>
        <Portal>
          <View style={[styles.modelContainer, {justifyContent: 'flex-end'}]}>
            <ActionModal {...props} onPress={actionType} userType={userType} />
            <View
              style={[styles.actionButtonView, keyboardStatus && {height: 0}]}
            >
              <ActionButton
                menu={[styles.menu, keyboardStatus && {top: -30}]}
              />
            </View>
          </View>
        </Portal>
      </Modalize> */}
    </View>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'absolute',
  },
  button: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 10,
    shadowOpacity: 0.3,
    shadowOffset: {height: 10},
  },
  menu: {
    bottom: 40,
  },
  secondary: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    backgroundColor: COLORS.primary,
  },
  modelContainer: {
    flex: 1,
  },
  actionButtonView: {
    width: '100%',
    height: Platform.OS === 'android' ? scale(70) : scale(70),
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    backgroundColor: COLORS.transparent,
  },
});
