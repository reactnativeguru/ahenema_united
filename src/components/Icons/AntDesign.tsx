import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Props from './IconType';

const IconAntDesign = (props: Props) => (
  <View style={styles.container}>
    <Icon color={props.color} name={props.name} size={props.size} />
  </View>
);
export default IconAntDesign;

const styles = StyleSheet.create({
  container: {},
});
