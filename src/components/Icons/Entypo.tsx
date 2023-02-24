import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Props from './IconType';

const Entypo = (props: Props) => (
  <View style={[props.styles ? props.styles : styles.container]}>
    <Icon color={props.color} name={props.name} size={props.size} />
  </View>
);
export default Entypo;

const styles = StyleSheet.create({
  container: {},
});
