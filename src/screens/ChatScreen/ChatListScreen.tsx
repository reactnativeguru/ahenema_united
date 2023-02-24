import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Text,
    Image,
    Platform
} from 'react-native';
import moment from 'moment';
import { HeaderBar, MainAppContainer, ProfileImage, Avatar, LoadingIndicator } from '@/components';
import { Context as ChatContext } from '../../context/chatContext';
import firestore from '@react-native-firebase/firestore';
import { globalStyles, COLORS, FONTS, routes } from '../../constants';
import { useNavigation } from '@react-navigation/native';
// import ProfileImage from '../../components/Image/ProfileImage';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const ChatListScreen = ({ }) => {
    const { setChatRoom } = useContext(ChatContext);
    const [threads, setThreads] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = firestore()
            .collection('GROUP_MENTRINGS')
            .orderBy('latestMessage.createdAt', 'desc')
            .onSnapshot(async (querySnapshot) => {
                const threads = await querySnapshot.docs.map((documentSnapshot) => {
                    return {
                        _id: documentSnapshot.id,
                        // give defaults
                        name: '',
                        latestMessage: {
                            text: '',
                        },
                        ...documentSnapshot.data(),
                    };
                });
                console.log({ threads });
                setThreads(threads);

                if (loading) {
                    setLoading(false);
                }
            });

        return () => unsubscribe();
    }, []);

    // if (loading) {
    //     return <LoadingIndicator />;
    // }

    const Chat = ({ item }) => {
        let title = moment(item.latestMessage.createdAt).format('h:mm:ss a');
        let isToday = moment(item.latestMessage.createdAt).calendar().includes('Today');
        let isYesterday = moment(item.latestMessage.createdAt).calendar().includes('Yesterday');
        let isLastWeek = (new Date().getTime() - new Date(item.latestMessage.createdAt).getTime()) >= 7 * 24 * 60 * 60 * 1000;
        if (isToday) {
            title = title;
        }
        else if (isYesterday) {
            title = `Yesterday ${title}`;
        }
        else if (isLastWeek) {
            title = `${moment(item.latestMessage.createdAt).fromNow()}`;
        }
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                    setChatRoom(item);
                    navigation.navigate('GlobalModal', {
                        screen: routes.CHAT_SCREEN,

                        params: { thread: item },
                    });
                }}
                key={item.id}
                style={globalStyles.mentringCard}
            >
                <View style={[globalStyles.displayRow]}>
                    <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ width: 70, height: 70, borderRadius: 70 / 2, marginRight: 10 }} source={{ uri: item.latestMessage.avatar ? item.latestMessage.avatar : ProfileImage }} />
                    </View>
                    {/* <View style={globalStyles.displayRow}> */}
                    <View
                        style={[
                            globalStyles.chatContentContainer,
                            {
                                // justifyContent: 'space-between',
                                // flexDirection: 'row',
                            },
                        ]}>
                        <Text style={{ ...FONTS.body6, width: '100%', textAlign: 'right', color: COLORS.primary }} numberOfLines={1}>
                            {title}
                        </Text>
                        <View style={[globalStyles.chatContent, { justifyContent: 'space-evenly' }]}>
                            <View>
                                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}> */}
                                {/* <Text style={{ ...FONTS.body5, width: 100, textAlign: 'right', color: COLORS.primary }} numberOfLines={1}>
                                        {title}
                                    </Text> */}
                                <Text style={{ ...FONTS.body5, color: COLORS.primary }} numberOfLines={1}>
                                    {item.name}
                                </Text>
                                {/* </View> */}
                                <Text style={{ ...FONTS.body6, color: COLORS.lightGray2 }}>
                                    {item.latestMessage.text}
                                </Text>
                            </View>
                        </View>
                    </View>
                    {/* </View> */}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <MainAppContainer>
            <View style={styles.container}>
                <HeaderBar
                    title={'Chats'}
                    height={verticalScale(Platform.OS === 'ios' ? 100 : 80)}
                    showBackIcon
                />
                <View style={globalStyles.scrollViewContentStyle}>
                    <View style={[globalStyles.contentContainerStyle, { flex: 1 }]}>
                        {
                            loading ?
                                <View style={styles.loader}>
                                    <LoadingIndicator color={COLORS.primary} size={35} />
                                </View>
                                :
                                <FlatList
                                    data={threads}
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={(item) => item._id.toString()}
                                    renderItem={({ item }) => <Chat key={item._id.toString} item={item} />}
                                />
                        }
                    </View>
                </View>
            </View>
        </MainAppContainer>
    );
};
export default ChatListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loader: {
        padding: verticalScale(30),
    },
});
