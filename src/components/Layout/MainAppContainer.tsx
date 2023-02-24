import React from 'react';
import {StyleSheet, View} from 'react-native';

const MainAppContainer = ({children}: any) => {
  return <View style={styles.container}>{children}</View>;
};
export default MainAppContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
