import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Props from './IconType';

const MaterialCommunityIcons = (props: Props) => (
  <View style={styles.container}>
    <Icon color={props.color} name={props.name} size={props.size} />
  </View>
);
export default MaterialCommunityIcons;

const styles = StyleSheet.create({
  container: {},
});
