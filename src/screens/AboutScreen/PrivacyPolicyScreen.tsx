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

const PrivacyPolicyScreen = ({navigation}) => {
  return (
    <SafeAreaView style={[globalStyles.modalContainer]}>
      <View style={[styles.header]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconAntDesign name={'arrowleft'} color={COLORS.primary} size={25} />
        </TouchableOpacity>
        <Text style={styles.title}>Privacy Policy</Text>
        <View style={styles.headerView} />
      </View>
      <View style={styles.container}>
        <Text>Privacy Policy Text</Text>
      </View>
    </SafeAreaView>
  );
};
export default PrivacyPolicyScreen;

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
