import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key: string, data: any) => {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (error) {
    console.log(error);
  }
};

const retrieveData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log(error);
  }
};

export {retrieveData, storeData};
