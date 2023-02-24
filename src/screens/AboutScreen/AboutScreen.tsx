import React from 'react';
import {View, StyleSheet, ScrollView, Platform} from 'react-native';
import {HeaderBar, MainAppContainer, AboutList} from '../../components';
import {globalStyles, routes} from '../../constants';
import {verticalScale} from 'react-native-size-matters';

const AboutScreen = ({navigation}) => {
  const arr = [
    {title: 'Terms & conditions', route: routes.TERMS_CONDITIONS_SCREEN},
    {title: 'Privacy policy', route: routes.PRIVACY_POLICY_SCREEN},
    {title: 'App info', route: routes.APP_INFO},
  ];

  return (
    <MainAppContainer>
      <View style={styles.container}>
        <HeaderBar
          title={'ABOUT'}
          height={verticalScale(Platform.OS === 'ios' ? 100 : 80)}
          showBackIcon
        />
        <ScrollView
          style={[globalStyles.scrollViewContentStyle]}
          contentContainerStyle={styles.scrollViewContentStyle}
        >
          <View style={globalStyles.contentContainerStyle}>
            {arr &&
              arr.map((item, index) => {
                return (
                  <AboutList
                    key={index}
                    title={item.title}
                    icon={true}
                    handleClick={() =>
                      item.route &&
                      navigation.navigate('GlobalModal', {
                        screen: item.route,
                      })
                    }
                  />
                );
              })}
          </View>
        </ScrollView>
      </View>
    </MainAppContainer>
  );
};
export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContentStyle: {
    paddingBottom: 100,
  },
});
