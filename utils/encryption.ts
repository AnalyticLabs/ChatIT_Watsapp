import CryptoJS from "crypto-js";

/**
 * Encrypts any string data using AES and the given secret key.
 */
export const encryptData = (data: string, secretKey: string): string => {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

/**
 * Decrypts AES-encrypted data back into a string using the secret key.
 */
export const decryptData = (ciphertext: string, secretKey: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted || "[decryption failed]";
  } catch {
    return "[decryption error]";
  }
};
