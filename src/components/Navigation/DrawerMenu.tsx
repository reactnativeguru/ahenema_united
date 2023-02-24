import React from 'react';
import {TouchableOpacity} from 'react-native';
import {COLORS} from '../../constants';
import {IconAntDesign} from '../../components';
import {useNavigation} from '@react-navigation/native';

const DrawerMenu = () => {
  const navigation = useNavigation();
  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };
  return (
    <TouchableOpacity onPress={toggleDrawer}>
      <IconAntDesign name="menuunfold" color={COLORS.white} size={25} />
    </TouchableOpacity>
  );
};
export default DrawerMenu;
