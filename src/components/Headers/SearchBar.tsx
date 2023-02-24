import React from 'react';
import {View, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Input} from '..';
import {SIZES, COLORS} from '../../constants';

const SearchBar = ({closePress, height, onChangeText, placeholder, value}) => (
  <SafeAreaView style={[styles.container, {height: height}]}>
    <View style={styles.main}>
      <View style={styles.subContainer}>
        <Input
          onChangeText={e => onChangeText(e)}
          style={styles.inputContainer}
          placeholder={placeholder}
          value={value}
          autoFocus
          search
        />
        <TouchableOpacity
          onPress={() => closePress()}
          style={styles.iconView}
          activeOpacity={0.7}
        >
          <Icon name={'close'} size={22} color={COLORS.gray} />
        </TouchableOpacity>
      </View>
    </View>
  </SafeAreaView>
);
export default SearchBar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
  },
  main: {
    width: '100%',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.paddingLeft,
  },
  subContainer: {width: '100%'},
  inputContainer: {
    backgroundColor: 'white',
    paddingLeft: 20,
  },
  iconView: {
    // paddingTop: SIZES.paddingLeft,
    width: '14%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
