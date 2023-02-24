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
    SIZES,
    COLORS,
    FONTS,
    ProfileImage,
} from '../../constants';
import moment from 'moment';
import { scale } from 'react-native-size-matters';

type RootStackParamList = {
    item: Object;
    handlePress: Function,
    chatPress: Function
};

const FeedPeoples: FC<RootStackParamList> = ({ item, handlePress, chatPress }) => {

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handlePress()}
            style={[
                globalStyles.profileCard,
            ]}
        >
            <View style={styles.container}  >
                <Image
                    style={styles.image}
                    source={{ uri: item.image_uri ? item.image_uri : ProfileImage }}
                />
            </View>
            <View style={[globalStyles.profileContentContainer]}>
                <Text style={styles.title} numberOfLines={1}>
                    {item.username}
                </Text>
                <Text style={styles.text2}>
                    {`Joined: ${moment(item.created_at).format('MMM Do YYYY')}`}
                </Text>
            </View>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => chatPress()}
                style={styles.button}
            >
                <Text style={styles.btnText}>Chats</Text>
            </TouchableOpacity>
        </TouchableOpacity>

    );
};
export default FeedPeoples;

const styles = StyleSheet.create({
    container: {
        marginTop: SIZES.paddingLeft / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
    },
    title: {
        ...FONTS.h4,
        color: COLORS.primary
    },
    text2: {
        ...FONTS.body6,
        color: COLORS.lightGray2
    },
    button: {
        height: 40,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: scale(10),
        borderBottomRightRadius: scale(10)
    },
    btnText: {
        ...FONTS.body5,
        color: COLORS.white
    }
});
