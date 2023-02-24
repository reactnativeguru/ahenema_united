// import React, {useState, useContext, useRef} from 'react';
// import {
//   View,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   Image,
// } from 'react-native';
// import moment from 'moment';
// import {SIZES, COLORS, FONTS, HEIGHT} from '../../constants';
// import {Modal, Popover} from '@ui-kitten/components';
// import FIcon from 'react-native-vector-icons/Feather';
// import {scale} from 'react-native-size-matters';
// import {useMutation} from '@apollo/client';
// import {DELETE_POST_MUTATION} from '../../graphql/mutations';
// import PostFavouriteButton from './Favourite';
// import SharePostButton from './Share';
// import SavePostButton from './Bookmark';
// import CommentButton from './Comments';
// import CommentInput from './CommentInput';
// import CommentsItem from './CommentsItem';
// import HollaStats from './HollaStats';
// import ShowLikeModal from './ShowLikeModal';
// import ShowImageModal from '../Modals/ShowImageModal';

// const HollaCard = ({item, username}) => {
//   const {
//     id,
//     profile: {image_uri: profileImage, user_id: currentUser},
//     profile: {user_id: name},
//     content,
//     imageUrl,
//     likes,
//     saved_posts,
//     comments,
//     createdAt,
//     category: {label: type, color: bgColor},
//   } = item;

//   const scrollViewRef = useRef();

//   const likesCount = item.likes_aggregate.aggregate.count;
//   const commentsCount = item.comments_aggregate.aggregate.count;
//   const savePostCount = item.saved_posts_aggregate.aggregate.count;
//   const isCurrentUser = currentUser === username;
//   const likeString = likesCount
//     ? likesCount >= 1000
//       ? `${(likesCount / 1000).toFixed(1)}k`
//       : `${likesCount}`
//     : '';
//   const commentString = commentsCount
//     ? commentsCount >= 1000
//       ? `${(commentsCount / 1000).toFixed(1)}k`
//       : `${commentsCount}`
//     : '';
//   const savePostString = savePostCount
//     ? savePostCount >= 1000
//       ? `${(savePostCount / 1000).toFixed(1)}k`
//       : `${savePostCount}`
//     : '';
//   const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

//   const [deletePost] = useMutation(DELETE_POST_MUTATION);

//   const [showAllComments, setShowAllComments] = useState(false);
//   const [showDeletePopup, setShowDeletePopup] = useState(false);
//   const [ShowLikes, setShowLikes] = useState(false);
//   const [isImageExist, setIsImageExist] = useState('');
//   const [isShowImage, setIsShowImage] = useState(false);

//   const handleDeletePost = () => {
//     setShowDeletePopup(false);
//     const variables = {
//       user_id: currentUser,
//       post_id: id,
//     };
//     // console.log(variables);
//     deletePost({variables});
//   };

//   const renderMenuIcon = () => (
//     <TouchableOpacity
//       style={{height: 40}}
//       activeOpacity={0.5}
//       onPress={() => (isCurrentUser ? setShowDeletePopup(true) : null)}
//     >
//       <FIcon name={'more-vertical'} size={22} color={COLORS.lightGray4} />
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.cardHeader}>
//         <TouchableOpacity
//           activeOpacity={1}
//           onPress={() => {
//             setIsImageExist(profileImage);
//             setIsShowImage(true);
//           }}
//         >
//           <Image
//             style={styles.profileImageView}
//             source={{
//               uri: profileImage,
//             }}
//           />
//         </TouchableOpacity>
//         <View style={styles.profileView}>
//           <View>
//             <Text style={styles.usernameText}>{name}</Text>
//           </View>
//           <View style={styles.hollaDetailView}>
//             <View style={[styles.hollaTypeView, {backgroundColor: bgColor}]}>
//               <Text style={styles.hollaTypeText}>{type}</Text>
//             </View>
//             <Text style={styles.hollaDateText}>
//               {moment(createdAt).fromNow()}
//             </Text>
//           </View>
//         </View>
//         {isCurrentUser ? (
//           <Popover
//             anchor={renderMenuIcon}
//             visible={showDeletePopup}
//             placement={'bottom end'}
//             onBackdropPress={() => setShowDeletePopup(false)}
//           >
//             <TouchableOpacity
//               activeOpacity={0.5}
//               style={styles.deleteBtn}
//               onPress={handleDeletePost}
//             >
//               <FIcon name="trash-2" size={20} color={COLORS.red} />
//               <Text style={{marginLeft: 3, color: COLORS.red, ...FONTS.body5}}>
//                 Delete Post
//               </Text>
//             </TouchableOpacity>
//           </Popover>
//         ) : null}
//       </View>
//       <View style={styles.cardContentView}>
//         <Text style={styles.contentText}>{content}</Text>
//         {imageUrl ? (
//           <TouchableOpacity
//             activeOpacity={1}
//             onPress={() => {
//               setIsImageExist(imageUrl);
//               setIsShowImage(true);
//             }}
//           >
//             <Image
//               style={styles.contentImage}
//               source={{
//                 uri: imageUrl,
//               }}
//             />
//           </TouchableOpacity>
//         ) : null}
//         <View>
//           <HollaStats
//             profileId={currentUser}
//             currentUser={username}
//             likeString={likeString}
//             commentString={commentString}
//             showLikes={() => setShowLikes(true)}
//             showComments={() => setShowAllComments(true)}
//           />
//         </View>
//         <View style={styles.cardFooter}>
//           <PostFavouriteButton
//             likes={likes}
//             postId={id}
//             profileId={currentUser}
//             currentUser={username}
//             likeString={likeString}
//           />
//           <CommentButton
//             commentString={commentString}
//             clickComment={e => setShowAllComments(true)}
//           />
//           <SharePostButton post={item} username={username} />
//           <SavePostButton
//             saved_posts={saved_posts}
//             postId={id}
//             savePostString={savePostString}
//             currentUser={username}
//           />
//         </View>
//         {/* <CommentInput postId={id} currentUser={username} /> */}
//       </View>
//       {isShowImage && (
//         <ShowImageModal
//           isImageExist={isImageExist}
//           isVisible={isShowImage}
//           close={() => {
//             setIsShowImage(false);
//             setIsImageExist('');
//           }}
//         />
//       )}
//       <Modal
//         visible={showAllComments}
//         backdropStyle={styles.backdrop}
//         onBackdropPress={() => setShowAllComments(false)}
//       >
//         <View style={{flex: 1, height: SIZES.height, alignItems: 'flex-end'}}>
//           <KeyboardAvoidingView
//             behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
//             // keyboardVerticalOffset={keyboardVerticalOffset}
//             style={{flex: 1}}
//           >
//             <TouchableOpacity
//               style={{flex: 1}}
//               onPress={() => setShowAllComments(false)}
//             />

//             <View
//               style={{
//                 backgroundColor: '#fff',
//                 width: SIZES.width,
//                 maxHeight: SIZES.width / 1.2,
//                 alignSelf: 'flex-end',
//                 paddingHorizontal: 20,
//                 borderTopLeftRadius: 15,
//                 borderTopRightRadius: 15,
//                 paddingVertical: 20,
//               }}
//             >
//               <ScrollView
//                 ref={scrollViewRef}
//                 onContentSizeChange={() =>
//                   scrollViewRef.current.scrollToEnd({animated: true})
//                 }
//               >
//                 <View style={{flex: 1}}>
//                   {comments && comments.length
//                     ? comments
//                         .slice(0)
//                         .reverse()
//                         .map((item, index) => {
//                           return (
//                             <View key={index} style={{marginVertical: 2}}>
//                               <CommentsItem key={index} item={item} />
//                             </View>
//                           );
//                         })
//                     : // <Text style={styles.noComments} >No Comments Yet</Text>
//                       null}
//                 </View>
//               </ScrollView>
//               <View style={{height: 60, width: '100%'}}>
//                 <CommentInput postId={id} currentUser={username} />
//               </View>
//             </View>
//           </KeyboardAvoidingView>
//         </View>
//       </Modal>
//       {ShowLikes && (
//         <ShowLikeModal
//           heading={'likes'}
//           _OnPress={() => setShowLikes(false)}
//           likeString={likeString}
//           likeArr={likes}
//         />
//       )}
//     </View>
//   );
// };
// export default HollaCard;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: scale(20),
//   },
//   cardHeader: {
//     width: '100%',
//     height: scale(50),
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   profileImageView: {
//     width: scale(50),
//     height: scale(50),
//     borderRadius: scale(50 / 2),
//   },
//   profileView: {
//     flex: 1,
//     marginHorizontal: scale(6),
//     justifyContent: 'flex-end',
//   },
//   hollaDetailView: {
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//     borderRadius: scale(10),
//   },
//   usernameText: {
//     // fontSize: SIZES.h3,
//     ...FONTS.body4,
//     color: COLORS.primary,
//   },
//   hollaTypeView: {
//     // height: scale(18),
//     paddingHorizontal: scale(8),
//     // paddingVertical: scale(1),
//     marginRight: scale(10),
//     marginTop: scale(5),
//     // backgroundColor: COLORS.lightGreen,
//     borderRadius: scale(10),
//   },
//   hollaTypeText: {
//     ...FONTS.body6,
//     color: COLORS.white,
//   },
//   hollaDateText: {
//     fontSize: scale(10),
//     color: COLORS.lightGray2,
//   },
//   cardContentView: {
//     paddingVertical: scale(5),
//     width: '100%',
//   },
//   contentText: {
//     // fontSize: SIZES.body5,
//     ...FONTS.body6,
//     color: COLORS.lightGray2,
//   },
//   contentImage: {
//     width: undefined,
//     height: scale(200),
//     borderRadius: SIZES.radius,
//     marginTop: scale(5),
//   },
//   cardFooter: {
//     paddingVertical: scale(10),
//     paddingHorizontal: scale(10),
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderBottomWidth: scale(1),
//     borderBottomColor: COLORS.lightGray4,
//   },
//   actionText: {
//     fontSize: SIZES.body5,
//     color: COLORS.lightGray2,
//     marginLeft: scale(5),
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.2)',
//     justifyContent: 'flex-end',
//     paddingBottom: scale(50),
//     paddingHorizontal: scale(15),
//   },
//   viewImageModal: {
//     flex: 1,
//     height: HEIGHT,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'flex-end',
//     alignItems: 'flex-end',
//   },
//   backdrop: {
//     flex: 1,
//     height: SIZES.height,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'flex-end',
//     alignItems: 'flex-end',
//   },
//   commentText: {
//     fontSize: 11,
//     justifyContent: 'center',
//   },
//   commentTextUser: {
//     fontSize: 11,
//     justifyContent: 'center',
//     marginLeft: 5,
//     marginRight: 5,
//     color: '#01355d',
//     fontWeight: 'bold',
//   },
//   noComments: {
//     ...FONTS.body4,
//     fontWeight: '600',
//     alignSelf: 'center',
//   },
//   deleteBtn: {
//     paddingHorizontal: 8,
//     paddingVertical: 5,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   superLikeContainer: {
//     flexDirection: 'row',
//   },
// });
