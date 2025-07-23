import axiosInstance from "~/config/axiosInstance";

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
