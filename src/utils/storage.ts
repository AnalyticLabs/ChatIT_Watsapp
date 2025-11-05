import AsyncStorage from '@react-native-async-storage/async-storage';

function isJson(text: string) {
  if (typeof text !== "string") {
    return false;
  }
  try {
    JSON.parse(text);
    return true;
  } catch (error) {
    return false;
  }
}

export const saveString = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    return false;
  }
};

export const save = async (key: string, value: any) =>
  saveString(key, JSON.stringify(value));

export const get = async (key: string) => {
  try {
    const itemString = await AsyncStorage.getItem(key);
    if (itemString) {
      if (isJson(itemString))
        return JSON.parse(itemString);
      else return itemString
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const clear = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
}

export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    return false;
  }
}
export default {
  saveString,
  save,
  get,
  clear,
  clearAll,
};
