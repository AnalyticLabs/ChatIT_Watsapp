import * as SecureStore from "expo-secure-store";

const SECRET_KEY = "my_encryption_key";

export const saveSecretKey = async (key: string): Promise<void> => {
  await SecureStore.setItemAsync(SECRET_KEY, key);
};

export const getSecretKey = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync(SECRET_KEY);
};

export const removeSecretKey = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(SECRET_KEY);
};
