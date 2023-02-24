import React, { useContext } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { HeaderBar, MainAppContainer } from '../../components';
import { globalStyles } from '../../constants';
import { Context as ChatContext } from '../../context/chatContext';
import RoomScreen from './RoomScreen';


const ChatScreen = ({navigation}) => {
  const {setChatRoom, state: chatState} = useContext(ChatContext);

  return (
    <MainAppContainer>
      <View style={styles.container}>
        <HeaderBar
          title={chatState.chatRoom.name}
          height={verticalScale(Platform.OS === 'ios' ? 100 : 80)}
          showBackIcon
        />
        <View style={globalStyles.scrollViewContentStyle}>
          <RoomScreen navigation={navigation}/>
        </View>
      </View>
    </MainAppContainer>
  );
};
export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
