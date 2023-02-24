import React from 'react';
import {StyleSheet, Image} from 'react-native';

type Props = {
  url: string;
  style: object;
};

const Avatar = ({url, style}: Props) => (
  <Image
    style={[style ? style : styles.container]}
    source={{
      uri: url,
    }}
  />
);
export default Avatar;

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
  },
});
