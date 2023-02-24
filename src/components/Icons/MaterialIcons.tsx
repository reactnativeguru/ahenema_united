import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Props from './IconType';

const IconMaterialIcon = (props: Props) => (
  <View style={styles.container}>
    <Icon color={props.color} name={props.name} size={props.size} />
  </View>
);
export default IconMaterialIcon;

const styles = StyleSheet.create({
  container: {},
});
