import axiosInstance from "~/config/axiosInstance";

export const sendOtpAPI = async ({
  phoneNumber,
  phoneSuffix,
}: {
  phoneNumber: string;
  phoneSuffix: string;
}) => {
  const response = await axiosInstance.post("/auth/send-otp", {
    phoneNumber,
    phoneSuffix,
  });
  return response.data;
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
  const response = await axiosInstance.post("/auth/verify-otp", {
    phoneNumber,
    phoneSuffix,
    otp,
  });
  return response.data;
};
