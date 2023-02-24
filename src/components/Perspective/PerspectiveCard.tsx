import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import moment from 'moment';
import {SIZES, COLORS, FONTS} from '../../constants';
import {scale} from 'react-native-size-matters';

const PerspectiveCard = ({item}: any) => {
  const {
    description,
    image,
    created_at,
    perspectiveUser,
    perspectivesCategory,
  } = item;

  // const [isImageExist, setIsImageExist] = useState('');
  // const [isShowImage, setIsShowImage] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <TouchableOpacity
          activeOpacity={1}
          // onPress={() => {
          //   setIsImageExist('profileImage');
          //   setIsShowImage(true);
          // }}
        >
          <Image style={styles.profileImageView} source={{uri: image}} />
        </TouchableOpacity>
        <View style={styles.profileView}>
          <View style={styles.hollaDetailView}>
            <Text
              style={styles.usernameText}
            >{`${perspectiveUser.firstname} ${perspectiveUser.lastname}`}</Text>

            <View style={styles.hollaTypeView}>
              <Text style={styles.hollaTypeText}>
                {perspectivesCategory.name}
              </Text>
            </View>
          </View>

          <View>
            <Text style={styles.hollaDateText}>
              {moment(created_at).fromNow()}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.cardContentView}>
        <View style={styles.contentHeight}>
          <Text style={styles.contentText}>{description}</Text>
        </View>
        {true ? (
          <TouchableOpacity
            activeOpacity={1}
            // onPress={() => {
            //   setIsImageExist('imageUrl');
            //   setIsShowImage(true);
            // }}
          >
            <Image style={styles.contentImage} source={{uri: image}} />
          </TouchableOpacity>
        ) : null}
        {/* <View style={styles.profileView}>
          <View>
            <Text
              style={styles.usernameText}
            >{`${perspectiveUser.firstname} ${perspectiveUser.lastname}`}</Text>
          </View>
          <View style={styles.hollaDetailView}>
            <View style={styles.hollaTypeView}>
              <Text style={styles.hollaTypeText}>
                {perspectivesCategory.name}
              </Text>
            </View>
            <Text style={styles.hollaDateText}>
              {moment(created_at).fromNow()}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.cardContentView}>
        <View style={styles.contentHeight}>
          <Text style={styles.contentText}>{description}</Text>
        </View>
        {true ? (
          <TouchableOpacity
            activeOpacity={1}
            // onPress={() => {
            //   setIsImageExist('imageUrl');
            //   setIsShowImage(true);
            // }}
          >
            <Image style={styles.contentImage} source={{uri: image}} />
          </TouchableOpacity>
        ) : null}
        {/* <View>
          <HollaStats
            profileId={currentUser}
            currentUser={username}
            likeString={likeString}
            commentString={commentString}
            showLikes={() => setShowLikes(true)}
            showComments={() => setShowAllComments(true)}
          />
        </View> */}
      </View>
    </View>
  );
};
export default PerspectiveCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(8),
    padding: scale(10),
    elevation: 3,
    borderRadius: SIZES.radius,
    // borderColor:COLORS.black,
    backgroundColor: COLORS.white,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: scale(50 / 50),
  },
  cardHeader: {
    width: '100%',
    height: scale(50),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageView: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(50 / 2),
  },
  profileView: {
    flex: 1,
    marginHorizontal: scale(6),
    justifyContent: 'center',
  },
  contentHeight: {height: 20},
  hollaDetailView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  usernameText: {
    ...FONTS.body4,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  hollaTypeView: {
    paddingHorizontal: scale(8),
    borderRadius: scale(10),
    backgroundColor: COLORS.lightGray4,
    paddingBottom: 3,
  },
  hollaTypeText: {
    ...FONTS.body6,
    color: COLORS.white,
  },

  hollaDateText: {
    marginLeft: scale(2),
    fontSize: scale(10),
    color: COLORS.lightGray2,
  },
  cardContentView: {
    // paddingBottom: scale(2),
    width: '100%',
  },
  contentText: {
    ...FONTS.body6,
    color: COLORS.lightGray2,
  },
  contentImage: {
    width: undefined,
    height: scale(200),
    borderRadius: SIZES.radius,
    marginTop: scale(5),
  },
});
