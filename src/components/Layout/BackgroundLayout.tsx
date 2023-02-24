import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {Layout} from '@ui-kitten/components';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

type Props = {
  children: any;
  bgImage: object;
  ChatScreen: boolean;
};

const BackgroundLayout = ({children, bgImage, ChatScreen}: Props) => {
  return (
    <Layout style={styles.container}>
      {ChatScreen ? (
        <View style={styles.contentContainer}>
          <ImageBackground source={bgImage} style={styles.bgImage}>
            {children}
          </ImageBackground>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'always'}
        >
          <ImageBackground source={bgImage} style={styles.bgImage}>
            {children}
          </ImageBackground>
        </ScrollView>
      )}
    </Layout>
  );
};
export default BackgroundLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
  },
  contentContainer: {
    flex: 1,
  },
  bgImage: {
    width: WIDTH,
    height: HEIGHT,
    flex: 1,
  },
});
