import firestore from '@react-native-firebase/firestore';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  Send,
  SystemMessage,
} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/FontAwesome';
import IIcon from 'react-native-vector-icons/Ionicons';
import {ProfileImage} from '../../components';
import BackgroundLayout from '../../components/Layout/BackgroundLayout';
import LoadingIndicator from '../../components/Loaders/LoadingIndicator';
import {COLORS, FONTS} from '../../constants';
import {Context as AuthContext} from '../../context/authContext';
import {Context as ChatContext} from '../../context/chatContext';

// https://amanhimself.dev/blog/chat-app-with-react-native-part-4/
const RoomScreen = () => {
  // const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [messages, setMessages] = useState([]);
  const giftedChatRef = useRef();

  const {state} = useContext(AuthContext);
  const {state: chatState} = useContext(ChatContext);
  const profile = state.profile;

  const FIRST_NAME = profile.first_name;
  const LAST_NAME = profile.last_name;
  const avatarName = `${FIRST_NAME} ${LAST_NAME}`;

  // useEffect(() => {
  //   const keyboardDidShow = Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
  //   const keyboardDidHide = Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

  //   // cleanup function
  //   return () => {
  //     // keyboardDidShow?.remove()
  //     // keyboardDidHide?.remove()
  //   };
  // }, []);

  // const _keyboardDidShow = () => setKeyboardStatus(true);
  // const _keyboardDidHide = () => setKeyboardStatus(false);

  // helper method that is sends a message
  // const handleSendO = (newMessage = []) => {
  //   setMessages(GiftedChat.append(messages, newMessage));
  // };

  const handleSend = async messages => {
    try {
      const text = messages[0].text;

      giftedChatRef.current.scrollToBottom();
      firestore()
        .collection('GROUP_MENTRINGS')
        .doc(chatState.chatRoom._id)
        .collection('MESSAGES')
        .add({
          text,
          createdAt: new Date().getTime(),
          user: {
            _id: profile.userId,
            user_id: profile.username,
            displayName: avatarName,
            name: avatarName,
            avatar: profile.image_uri,
          },
        })
        .then(() => {
          firestore()
            .collection('GROUP_MENTRINGS')
            .doc(chatState.chatRoom._id)
            .set(
              {
                latestMessage: {
                  text,
                  createdAt: new Date().getTime(),
                  avatar: profile.image_uri ? profile.image_uri : ProfileImage,
                },
              },
              {merge: true},
            )
            .then(() => {})
            .catch(err => Alert.alert(JSON.stringify(err)));
        })
        .catch(err => Alert.alert(JSON.stringify(err)));
    } catch (err) {
      Alert.alert(JSON.stringify(err));
    }
  };

  useEffect(() => {
    const messagesListener = firestore()
      .collection('GROUP_MENTRINGS')
      .doc(chatState.chatRoom._id)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .onSnapshot(async querySnapshot => {
        if (querySnapshot?.docs) {
          const messages = querySnapshot.docs.map(doc => {
            const firebaseData = doc.data();

            const data = {
              _id: doc.id,
              text: '',
              createdAt: new Date().getTime(),
              ...firebaseData,
            };

            if (!firebaseData.system) {
              data.user = {
                ...firebaseData.user,
                // user_id: state.user.username,
                user_id: profile.username,
              };
            }
            return data;
          });
          setMessages(messages);
        }
      });

    return () => messagesListener();
  });

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: COLORS.primary,
            paddingHorizontal: 5,
            borderBottomRightRadius: 0,
          },
          left: {
            backgroundColor: COLORS.lightGray4,
            paddingHorizontal: 5,
            borderBottomLeftRadius: 0,
          },
        }}
        textStyle={{
          right: {
            color: COLORS.white,
            ...FONTS.body5,
            lineHeight: null,
          },
          left: {
            color: COLORS.primary,
            ...FONTS.body5,
            lineHeight: null,
          },
        }}
      />
    );
  };

  const renderSend = props => {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IIcon name="send" size={16} color={COLORS.white} />
        </View>
      </Send>
    );
  };

  const scrollToBottomComponent = () => {
    return (
      <View style={styles.bottomComponentContainer}>
        <Icon name="angle-double-down" size={22} color="#01355d" />
      </View>
    );
  };
  const renderLoading = () => {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator color={'#01355d'} />
      </View>
    );
  };

  const renderSystemMessage = props => {
    return (
      <SystemMessage
        {...props}
        wrapperStyle={styles.systemMessageWrapper}
        textStyle={styles.systemMessageText}
      />
    );
  };

  const renderInputToolbar = props => {
    //Add the extra styles via containerStyle
    return <InputToolbar {...props} containerStyle={styles.inputField} />;
  };

  console.log({chatState});
  return (
    <SafeAreaView style={styles.main}>
      <BackgroundLayout
        bgImage={{uri: 'https://wallpapercave.com/wp/wp4410714.jpg'}}
        ChatScreen={true}>
        <View style={styles.roomDescription}>
          <Text style={{color: COLORS.primary, ...FONTS.h4}}>
            {chatState && chatState.chatRoom && chatState.chatRoom.description
              ? chatState.chatRoom.description
              : 'Chat about perpective!'}
          </Text>
        </View>
        <GiftedChat
          ref={giftedChatRef}
          renderSystemMessage={renderSystemMessage}
          renderLoading={renderLoading}
          scrollToBottomComponent={scrollToBottomComponent}
          scrollToBottom
          renderSend={renderSend}
          placeholder="Type your message here..."
          renderBubble={renderBubble}
          messages={messages}
          onSend={newMessage => handleSend(newMessage)}
          user={{
            _id: state.profile.userId,
            name: avatarName,
            avatar:
              'https://s3-eu-west-2.amazonaws.com/mentring75967c211cbe40fc8b53613ae5252839144640-dev/uploads%2Fjmentee%2F1622540210772.jpg',
          }}
          showUserAvatar
          alwaysShowSend
          renderInputToolbar={renderInputToolbar}
          textInputStyle={styles.textInput}
          keyboardShouldPersistTaps={'handled'}
        />
      </BackgroundLayout>
      <View style={styles.line} />
    </SafeAreaView>
  );
};
export default RoomScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: 0,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    overflow: 'hidden',
  },
  container: {
    marginTop: 60,
    flex: 1,
  },
  chatContainer: {
    flex: 1,
  },
  chatRoomTitleContainer: {
    height: 40,
  },
  chatRoomTitle: {
    textAlign: 'center',
  },
  bottomComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  systemMessageWrapper: {
    backgroundColor: COLORS.primary,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 3,
  },
  systemMessageText: {
    color: COLORS.white,
    ...FONTS.body4,
  },
  roomDescription: {
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    minHeight: 40,
    paddingHorizontal: 50,
    paddingVertical: 5,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputField: {
    borderRadius: 20,
    marginHorizontal: 6,
    justifyContent: 'center',
  },
  sendingContainer: {
    backgroundColor: COLORS.lightGreen,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: -4,
  },
  line: {
    position: 'absolute',
    borderWidth: 2,
    width: 100,
    alignSelf: 'center',
    top: 8,
    borderColor: COLORS.white,
  },
  textInput: {
    ...FONTS.h5,
    paddingHorizontal: 6,
    color: COLORS.black,
  },
});
