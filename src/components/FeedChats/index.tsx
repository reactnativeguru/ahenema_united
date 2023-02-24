import React, { FC, } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import {
    globalStyles,
    COLORS,
    FONTS,
    ProfileImage,
} from '../../constants';
import moment from 'moment';
import { scale } from 'react-native-size-matters';

type chatObj = {
    image_uri: String,
    username: String
}

type RootStackParamList = {
    item: chatObj;
    handlePress: Function
};

const FeedChats: FC<RootStackParamList> = ({ item, handlePress }) => {

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handlePress()}
            style={styles.main}
        >
            <View style={styles.container} >
                <Image
                    style={styles.image}
                    source={{ uri: item.image_uri ? item.image_uri : ProfileImage }}
                />
            </View>
            <View style={[globalStyles.chatContentContainer]}>
                <View
                    style={[globalStyles.chatContent]}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1 }}>
                            <Text
                                style={styles.title}
                                numberOfLines={1}
                            >
                                {item.username}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.lastMsgText}>
                                {moment().format('LT')}
                            </Text>
                        </View>
                    </View>
                    <Text numberOfLines={1} style={styles.lastMsgText}>
                        {'item.latestMessage.texts'}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};
export default FeedChats;

const styles = StyleSheet.create({
    main: {
        width: '100%',
        height: scale(75),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderBottomWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: scale(10),
        // marginVertical: scale(4),
        paddingHorizontal: scale(10),
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        marginRight: 10,
    },
    title: {
        ...FONTS.body5,
        color: COLORS.primary
    },
    lastMsgText: {
        ...FONTS.body6,
        color: COLORS.lightGray2
    },

});
