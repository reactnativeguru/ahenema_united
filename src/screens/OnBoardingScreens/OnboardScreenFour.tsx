import React, {FC, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  // ImageBackground,
  // Text,
  // Pressable,
} from 'react-native';
import {HeaderBar, RoundButton} from '../../components';
import {
  globalStyles,
  SIZES,
  COLORS,
  FONTS,
  routes,
  WIDTH,
  // images,
} from '../../constants';
// import {useMutation, useQuery} from '@apollo/client';
// import {Context as AuthContext} from '../../context/authContext';
// import {COMMUNITY} from '../../graphql/queries';
// import {INSERT_COMMUNITY_MUTATION} from '../../graphql/mutations';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Context as AuthContext} from '../../context/authContext';
import {useContext} from 'react';
type RootStackParamList = {
  OnboardScreenFour: undefined;
};

type OnboardScreenFourProps = NativeStackScreenProps<
  RootStackParamList,
  'OnboardScreenFour'
>;

const OnboardScreenFour: FC<OnboardScreenFourProps> = ({navigation}) => {
  // const {state} = useContext(AuthContext);

  // const user = state.user.username;

  // const [selectedCategory, setSelectedCategory] = useState(null);
  const [loader, setLoader] = useState(false);

  // const {data: communityData} = useQuery(COMMUNITY);

  // const [insert_community_subscribe] = useMutation(INSERT_COMMUNITY_MUTATION);

  // useEffect(() => {
  //   if (
  //     communityData &&
  //     communityData.community &&
  //     communityData.community.length
  //   ) {
  //     setSelectedCategory(communityData.community[0].id);
  //   }
  // }, [communityData]);

  const nextClick = () => {
    setLoader(false);
    // setLoader(true);
    // insert_community_subscribe({
    //   variables: {
    //     community_id: selectedCategory,
    //     user_id: user,
    //   },
    // })
    //   .then(() => {
    //     setLoader(false);
    //     navigation.navigate(routes.ON_BOARDING_SCREEN_5);
    //   })
    //   .catch(err => {
    //     setLoader(false);
    //     console.log('🚀 OnboardScreen4.js ~ line 46 ~ nextClick ~ err', err);
    //   });
  };

  return (
    <View style={styles.container}>
      <HeaderBar
        title={''}
        height={180}
        showBackIcon={() => navigation.goBack()}
        onboardingUsername={'Select your favourite community'}
        skipButton={() => navigation.navigate(routes.ON_BOARDING_SCREEN_5)}
      />
      <ScrollView style={globalStyles.scrollViewContentStyle}>
        <View style={globalStyles.contentContainerStyle}>
          <View style={styles.wrapView}>
            {/* {communityData &&
            communityData.community &&
            communityData.community.length
              ? communityData.community.map((item, index) => (
                  <Pressable
                    key={index}
                    onPress={() => setSelectedCategory(item.id)}
                  >
                    <ImageBackground
                      borderRadius={SIZES.radius}
                      style={[
                        styles.box,
                        selectedCategory === item.id
                          ? {
                              shadowColor: COLORS.primary,
                              borderColor: COLORS.primary,
                            }
                          : {},
                      ]}
                      source={
                        item.cover_image
                          ? {uri: item.cover_image}
                          : images.appLogo
                      }
                    >
                      <Text style={styles.text} numberOfLines={2}>
                        {item.name}
                      </Text>
                    </ImageBackground>
                  </Pressable>
                ))
              : null} */}
          </View>
        </View>
      </ScrollView>
      <View style={[globalStyles.spacing, {padding: SIZES.paddingLeft}]}>
        <RoundButton
          title={'NEXT'}
          loader={loader}
          onPress={() => nextClick()}
        />
      </View>
    </View>
  );
};
export default OnboardScreenFour;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  box: {
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    height: WIDTH / 2.7,
    width: WIDTH / 2.7,
    backgroundColor: COLORS.lightGray3,
    borderRadius: SIZES.radius,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.46,
    elevation: 5,
    marginBottom: SIZES.paddingLeft,
    borderWidth: 1,
    borderColor: COLORS.lightGray3,
  },
  text: {
    ...FONTS.body6,
    fontWeight: '600',
    color: COLORS.black,
    paddingHorizontal: SIZES.paddingLeft - 6,
    textAlign: 'center',
  },
});
