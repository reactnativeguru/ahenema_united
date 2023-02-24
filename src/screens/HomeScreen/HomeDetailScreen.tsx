import React, {FC} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {globalStyles, COLORS, FONTS, WIDTH, SIZES} from '../../constants';
import {IconAntDesign} from '../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import HTML from 'react-native-render-html';

type RootStackParamList = {
  HomeDetailScreen: undefined;
};

type HomeDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'HomeDetailScreen'
>;

const HomeDetailScreen: FC<HomeDetailScreenProps> = ({navigation, route}) => {
  return (
    <View style={globalStyles.modalContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconAntDesign name={'arrowleft'} color={COLORS.white} size={25} />
        </TouchableOpacity>
        <Text style={styles.title}>Post Detail</Text>
        <View style={styles.headerView} />
      </View>
      <ScrollView style={{padding: SIZES.paddingLeft}}>
        <View style={styles.htmlContainer}>
          <Text style={FONTS.h3}>{route?.params?.title?.rendered}</Text>
          <HTML
            source={{html: route?.params?.content?.rendered}}
            contentWidth={WIDTH - 40}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.paddingLeft,
    paddingTop: SIZES.statusbarHeight,
    paddingBottom: 20,
    backgroundColor: COLORS.primary,
  },
  title: {...FONTS.h3, color: COLORS.white},
  headerView: {width: 25},
  htmlContainer: {
    width: '100%',
  },
});

export default HomeDetailScreen;
