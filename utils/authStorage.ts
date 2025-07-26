import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveAuthToStorage = async (token: string, user: any) => {
  try {
    await AsyncStorage.setItem("auth", JSON.stringify({ token, user }));
  } catch (error) {
    console.error("Error saving auth data:", error);
  }
};

export const getAuthFromStorage = async () => {
  try {
    const auth = await AsyncStorage.getItem("auth");
    return auth ? JSON.parse(auth) : null;
  } catch (error) {
    console.error("Error getting auth data:", error);
    return null;
  }
};

export const clearAuthFromStorage = async () => {
  try {
    await AsyncStorage.removeItem("auth");
  } catch (error) {
    console.error("Error clearing auth data:", error);
  }
};
