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

// export const createProfileAPI = async ({
//   username,
//   agreed,
//   profileImage,
// }: {
//   username: string;
//   agreed: boolean;
//   profileImage?: string | null;
// }) => {
//   const formData = new FormData();
//   formData.append("username", username);
//   formData.append("agreed", String(agreed));

//   const fileType = profileImage ? mime.lookup(profileImage) : undefined;

//   if (profileImage) {
//     formData.append("profilePicture", {
//       uri: profileImage,
//       name: profileImage?.split("/").pop() || "profile.jpg",
//       type: fileType || "image/jpeg",
//     } as any);
//   } else {
//     console.warn("Static avatars via `require` cannot be sent...");
//   }

//   try {
//     const response = await axiosInstance.post(
//       "/auth/create-profile",
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );

//     return response.data;
//   } catch (error: any) {
//     console.log(
//       "CreateProfileAPI failed:",
//       error?.response?.data || error.message
//     );
//     throw error;
//   }
// };

// CHECK AUTH

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

  if (profileImage) {
    const isGalleryImage = profileImage.startsWith("file://");

    if (isGalleryImage) {
      const fileExtension = profileImage.split(".").pop();
      const mimeType = fileExtension
        ? mime.lookup(fileExtension)
        : "image/jpeg";

      formData.append("profilePicture", {
        uri: profileImage,
        name: `profile.${fileExtension || "jpg"}`,
        type: mimeType || "image/jpeg",
      } as any);
    } else {
      // Static avatar, send as string
      formData.append("profilePicture", profileImage);
    }
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

export const checkAuthAPI = async () => {
  try {
    const response = await axiosInstance.get("/auth/check-auth");
    return response.data;
  } catch (error: any) {
    console.log("CheckAuthAPI failed:", error?.response?.data || error.message);
    throw error;
  }
};

// GET ALL USERS
export const getAllUsersAPI = async () => {
  try {
    const response = await axiosInstance.get("/auth/users");
    return response.data;
  } catch (error: any) {
    console.log(
      "GetAllUsersAPI failed:",
      error?.response?.data || error.message
    );
    throw error;
  }
};

// GET LOGGED-IN USER
export const getUserAPI = async () => {
  try {
    const response = await axiosInstance.get("/auth/get-user");
    return response.data;
  } catch (error: any) {
    console.log("getUserAPI failed:", error?.response?.data || error.message);
    throw error;
  }
};

// LOGOUT
export const logoutAPI = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  } catch (error: any) {
    console.log("LogoutAPI failed:", error?.response?.data || error.message);
    throw error;
  }
};
