import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Props from './IconType';

const IconIonicon = (props: Props) => (
  <View style={styles.container}>
    <Icon color={props.color} name={props.name} size={props.size} />
  </View>
);
export default IconIonicon;

const styles = StyleSheet.create({
  container: {},
});
