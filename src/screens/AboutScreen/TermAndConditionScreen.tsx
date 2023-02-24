import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {IconAntDesign, TermsAndConditions} from '../../components';
import {globalStyles, SIZES, COLORS, FONTS} from '../../constants';

const TermAndConditionScreen = ({navigation}) => {
  return (
    <SafeAreaView style={globalStyles.modalContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconAntDesign name={'arrowleft'} color={COLORS.primary} size={25} />
        </TouchableOpacity>
        <Text style={styles.title}>Terms And Conditions</Text>
        <View style={styles.headerView} />
      </View>
      <TermsAndConditions />
    </SafeAreaView>
  );
};
export default TermAndConditionScreen;

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
});
