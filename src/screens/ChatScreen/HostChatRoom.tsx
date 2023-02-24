import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import { ProfileImage } from '@/components';
import { Context as AuthContext } from '../../context/authContext';
import { Context as ChatContext } from '../../context/chatContext';
import LoadingIndicator from '../../components/Loaders/LoadingIndicator';
import firestore from '@react-native-firebase/firestore';
import {
    GiftedChat,
    Bubble,
    Send,
    SystemMessage,
    InputToolbar
} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS, FONTS, SIZES } from '../../constants';
import IIcon from 'react-native-vector-icons/Ionicons';

// https://amanhimself.dev/blog/chat-app-with-react-native-part-4/
const HostChatRoom = ({ navigation, route, onLiveSession, isMentee }) => {
    const { state } = useContext(AuthContext);
    const { state: chatState } = useContext(ChatContext);
    const profile = state.profile;

    const FIRST_NAME = profile.first_name;
    const LAST_NAME = profile.last_name;
    const avatarName = `${FIRST_NAME} ${LAST_NAME}`;

    const [messages, setMessages] = useState([]);

    const handleSend = async (messages) => {
        const text = messages[0].text;

        firestore()
            .collection('GROUP_MENTRINGS')
            .doc(chatState.chatRoom._id)
            .collection('MESSAGES')
            .add({
                text,
                createdAt: new Date().getTime(),
                user: {
                    _id: profile.id,
                    user_id: state.user.username,
                    displayName: avatarName,
                    name: avatarName,
                    avatar: profile.image_uri
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
                                avatar: profile.image_uri ? profile.image_uri : ProfileImage
                            },
                        },
                        { merge: true },
                    )
                    .then(() => {

                    })
                    .catch((err) => console.log({ err }))
            })
            .catch((err) => console.log({ err }))

    };

    useEffect(() => {
        const messagesListener = firestore()
            .collection('GROUP_MENTRINGS')
            .doc(chatState.chatRoom._id)
            .collection('MESSAGES')
            .orderBy('createdAt', 'desc')
            .onSnapshot(async (querySnapshot) => {
                const messages = querySnapshot.docs.map((doc) => {
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
                            user_id: state.user.username,
                        };
                    }

                    return data;
                });
                setMessages(messages);
            });

        return () => messagesListener();
    }, []);

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: 'rgba(112, 112, 112, 0.2)',
                        paddingHorizontal: 5,
                        borderBottomRightRadius: 0
                    },
                    left: {
                        backgroundColor: 'rgba(112, 112, 112, 0.2)',
                        paddingHorizontal: 5,
                        borderBottomLeftRadius: 0,
                    }
                }}
                textStyle={{
                    right: {
                        color: COLORS.white,
                        ...FONTS.body5,
                        lineHeight: null
                    },
                    left: {
                        color: COLORS.white,
                        ...FONTS.body5,
                        lineHeight: null
                    }
                }}
            />
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
                <LoadingIndicator color={"#01355d"} />
            </View>
        );
    };

    const renderSend = (props) => {
        return (
            <Send {...props} >
                <View style={styles.sendingContainer}>
                    <IIcon name="send" size={16} color={COLORS.lightGreen} />
                </View>
            </Send>
        );
    };

    const renderInputToolbar = (props) => {
        //Add the extra styles via containerStyle
        if (isMentee) {
            return (
                <InputToolbar
                    {...props}
                    containerStyle={styles.inputField}
                />
            )
        } else {
            return (
                null
            )
        }
    }


    const renderSystemMessage = (props) => {
        return (
            <SystemMessage
                {...props}
                wrapperStyle={styles.systemMessageWrapper}
                textStyle={styles.systemMessageText}
            />
        );
    };


    return (
        <View style={styles.main}>
            <View style={{ flex: 1 }}>
                {!onLiveSession ?
                    <View style={styles.roomDescription}>
                        <Text style={{ color: COLORS.primary, ...FONTS.h4 }}>
                            {chatState && chatState.chatRoom && chatState.chatRoom.description ? chatState.chatRoom.description : `Needs a description in the firebase as like last message so i can render it here.`}</Text>
                    </View>
                    :
                    null
                }
                <GiftedChat
                    renderSystemMessage={renderSystemMessage}
                    renderLoading={renderLoading}
                    scrollToBottomComponent={scrollToBottomComponent}
                    scrollToBottom
                    renderSend={renderSend}
                    placeholder="Type your message here..."
                    renderBubble={renderBubble}
                    messages={messages}
                    onSend={(newMessage) => handleSend(newMessage)}
                    user={{
                        _id: state.profile.id,
                    }}
                    showUserAvatar
                    alwaysShowSend={isMentee}
                    renderInputToolbar={renderInputToolbar}
                    textInputStyle={styles.textInput}
                    keyboardShouldPersistTaps={'handled'}
                />
            </View>
        </View>
    );
};
export default HostChatRoom;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingHorizontal: 0,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        overflow: 'hidden',
        // height: '50%',
    },
    container: {
        marginTop: 60,
        flex: 1,
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
    roomDescription: {
        width: '100%',
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        minHeight: 40,
        paddingHorizontal: 50,
        paddingVertical: 5,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        shadowColor: "#000",
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
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
    sendingContainer: {
        backgroundColor: COLORS.white,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        marginRight: -4
    },
    textInput: {
        ...FONTS.h5,
        paddingHorizontal: 6,
        color: COLORS.black,
    },
    systemMessageWrapper: {
        // backgroundColor: COLORS.primary,
        // paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 3,
        height: 0
    },
    systemMessageText: {
        color: COLORS.white,
        opacity: 0,
        ...FONTS.body4
    },
});
