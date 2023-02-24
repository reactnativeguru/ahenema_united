import React, {FC, useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {globalStyles, COLORS, FONTS, routes, SIZES} from '../../constants';
import {scale} from 'react-native-size-matters';
import {
  HeaderBar,
  LoadingIndicator,
  CommunityFilterModal,
  IconIonicon,
} from '../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {verticalScale} from 'react-native-size-matters';
import {Context as PostContext} from '../../context/postContext';
import {PostContextType} from '../../utils/interfaces';

type RootStackParamList = {
  HomeScreen: undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

const HomeScreen: FC<HomeScreenProps> = ({navigation}) => {
  const {getPost, getPostCategories} = useContext(
    PostContext,
  ) as PostContextType;
  const [loader, setLoader] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [posts, setPosts] = useState<any>([]);
  const [isFilter, setisFilter] = useState(false);
  const [postCategory, setPostCategory] = useState([
    {slug: 'all', name: 'All'},
  ]);
  const [postCategoryLabel, setPostCategoryLabel] = useState<string>('all');
  const [postCategoryTitle, setPostCategoryTitle] = useState<string>('All');

  useEffect(() => {
    const getData = async () => {
      setLoader(true);
      const postResponse = await getPost();
      const postCategoryResponse = await getPostCategories();
      if (postResponse) {
        setData(postResponse);
        setPosts(postResponse);
      }
      if (postCategoryResponse) {
        setPostCategory([...postCategory, ...postCategoryResponse]);
      }
      setLoader(false);
    };
    return getData();
  }, [navigation]);

  const ListEmpty = (text: string) => {
    return <Text style={styles.notFound}>{`No ${text} here yet!`}</Text>;
  };

  const Filter = (label?: string, title?: string) => {
    setisFilter(false);
    if (label && title) {
      setPostCategoryLabel(label);
      setPostCategoryTitle(title);
      if (label === 'all') {
        setPosts(data);
      } else {
        const postArr = data.filter(item => item.slug === label);
        setPosts(postArr);
      }
    }
  };

  const Post = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.postCard}
        onPress={() =>
          navigation.navigate('GlobalModal', {
            screen: routes.HOME_DETAIL_SCREEN,
            params: item,
          })
        }
      >
        <Text style={styles.postTitle}>{item.title.rendered}</Text>
        <Image
          style={styles.contentImage}
          source={{
            uri: item.featured_media_src_url
              ? item.featured_media_src_url
              : 'https://ahenemaunited.sarchitek.com/wp-content/uploads/2021/09/1800x1200_man_holding_coronavirus_vaccine.jpeg',
          }}
        />
      </TouchableOpacity>
    );
  };

  const joinClick = () => {
    setisFilter(true);
  };
  return (
    <View style={styles.container} testID="Home-container">
      <HeaderBar
        title={`${postCategoryTitle} Post`}
        height={verticalScale(Platform.OS === 'ios' ? 100 : 80)}
        showDrawer
        rightPress={() => joinClick()}
        rightIcon={
          <IconIonicon name="ios-grid-outline" size={25} color={COLORS.white} />
        }
      />
      <View style={globalStyles.scrollViewContentStyle}>
        <View
          style={[
            globalStyles.contentContainerStyle,
            styles.contentContainerStyle,
          ]}
        >
          {loader ? (
            <View style={styles.loader}>
              <LoadingIndicator color={COLORS.primary} size={35} />
            </View>
          ) : (
            <FlatList
              data={posts}
              contentContainerStyle={globalStyles.container}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => <Post item={item} />}
              ListEmptyComponent={() => ListEmpty('post')}
            />
          )}
        </View>
      </View>
      {isFilter ? (
        <CommunityFilterModal
          heading={'Select Community'}
          labels={postCategory}
          communityValue={postCategoryLabel}
          communityTitle={postCategoryTitle}
          _OnPress={(label?: string, title?: string) => Filter(label, title)}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    padding: verticalScale(30),
  },
  notFound: {
    ...FONTS.h5,
    textAlign: 'center',
    paddingVertical: verticalScale(30),
  },
  postCard: {
    width: '100%',
    padding: scale(10),
    borderBottomColor: COLORS.lightGray,
    marginBottom: SIZES.padding / 3,
    paddingVertical: SIZES.paddingLeft,
    elevation: 3,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: scale(50 / 50),
  },
  postTitle: {
    ...FONTS.body5,
    marginBottom: SIZES.paddingLeft / 2,
  },
  contentImage: {
    width: undefined,
    height: scale(200),
    borderRadius: SIZES.radius,
    marginTop: scale(5),
  },
  contentContainerStyle: {marginBottom: 0},
});

export default HomeScreen;
