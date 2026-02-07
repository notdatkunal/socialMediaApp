import { Platform } from "react-native";

// Android emulator: 10.0.2.2, iOS simulator: localhost, physical device: your machine IP
const getBaseUrl = () => {
  if (__DEV__) {
    if (Platform.OS === "android") {
      return "http://10.0.2.2:5000";
    }
    return "http://localhost:5000";
  }
  return "https://your-api.com";
};

export const API_BASE_URL = getBaseUrl();
