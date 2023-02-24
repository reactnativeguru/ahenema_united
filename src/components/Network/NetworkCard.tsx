import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import {IconAntDesign, IconMaterialIcon} from '..';
import {COLORS, FONTS, SIZES} from '../../constants';
import avatar from '../../assets/images/avatar.png';
const NetworkCard = ({id, item, onPress, followData}: any) => {
  const {username, profile} = item;
  const user_id = '9e832a38-2dca-47b0-8afa-6a18a57cd87b';
  const [follow, setFollow] = useState(false);
  console.log(profile,"profile")
  useEffect(() => {
    console.warn({followData});
    console.log(item,"item")
    getFolloww();
  }, [followData]);

  const getFolloww = async () => {
    const isFollowing = await followData.find(
      (follow: any) => follow.user_id === user_id && follow.follower_id === id,
    );
    setFollow(isFollowing ? true : false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.contentContainer}>
          <Image
            style={styles.profileImageView}
            source={!profile || profile.image_uri ===null ? avatar  : {uri: profile.image_uri}}
          />
          <Text style={styles.text}>{username}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.iconsStyles}>
        <TouchableOpacity>
          <IconAntDesign name={'message1'} size={20} color={COLORS.gray} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFollow(!follow)}>
          <IconMaterialIcon
            name={follow ? 'person-remove' : 'person-add'}
            size={20}
            color={COLORS.gray}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NetworkCard;

const styles = StyleSheet.create({
  container: {
    width: '48%',
    paddingVertical: 20,
    height: 150,
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: scale(50 / 50),
  },
  profileImageView: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(50 / 1),
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    // backgroundColor:'red'
  },
  text: {
    textAlign: 'center',
    ...FONTS.body5,
    marginTop: 5,
  },
  iconsStyles: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
