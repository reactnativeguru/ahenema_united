import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {IconAntDesign} from '../../components';
import {globalStyles, SIZES, COLORS, FONTS} from '../../constants';

const AppInfoScreen = ({navigation}) => {
  return (
    <SafeAreaView style={[globalStyles.modalContainer]}>
      <View style={[styles.header]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconAntDesign name={'arrowleft'} color={COLORS.primary} size={25} />
        </TouchableOpacity>
        <Text style={styles.title}>App Info</Text>
        <View style={styles.headerView} />
      </View>
      <View style={styles.container}>
        <Text>App Info Screen</Text>
      </View>
    </SafeAreaView>
  );
};
export default AppInfoScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.paddingLeft,
    height: 40,
  },
  title: {...FONTS.h3, color: COLORS.primary},
  headerView: {width: 25},
  container: {padding: SIZES.paddingLeft},
});
