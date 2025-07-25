import axiosInstance from "~/config/axiosInstance";
import * as mime from "react-native-mime-types";

export const sendOtpAPI = async ({
  phoneNumber,
  phoneSuffix,
}: {
  phoneNumber: string;
  phoneSuffix: string;
}) => {
  try {
    const response = await axiosInstance.post("/auth/send-otp", {
      phoneNumber,
      phoneSuffix,
    });
    return response.data;
  } catch (error: any) {
    console.log("SendOtpAPI failed:", error?.response?.data || error.message);
    throw error;
  }
};

export const verifyOtpAPI = async ({
  phoneNumber,
  phoneSuffix,
  otp,
}: {
  phoneNumber: string;
  phoneSuffix: string;
  otp: string;
}) => {
  try {
    const response = await axiosInstance.post("/auth/verify-otp", {
      phoneNumber,
      phoneSuffix,
      otp,
    });
    return response.data;
  } catch (error: any) {
    console.log("VerifyOtpAPI failed:", error?.response?.data || error.message);
    throw error;
  }
};

export const createProfileAPI = async ({
  username,
  agreed,
  profileImage,
}: {
  username: string;
  agreed: boolean;
  profileImage?: string | null;
}) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("agreed", String(agreed));

  const fileType = profileImage ? mime.lookup(profileImage) : undefined;

  if (profileImage) {
    formData.append("profilePicture", {
      uri: profileImage,
      name: "avatar.jpg",
      type: fileType || "image/jpeg",
    } as any);
  } else {
    console.warn(
      "Static avatars via `require` cannot be sent as FormData. Use a URI image."
    );
  }

  try {
    const response = await axiosInstance.post(
      "/auth/create-profile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.log(
      "CreateProfileAPI failed:",
      error?.response?.data || error.message
    );
    throw error;
  }
};
