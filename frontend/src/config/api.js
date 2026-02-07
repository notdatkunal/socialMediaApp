// Use 10.0.2.2 on Android emulator to reach host machine's localhost
// Use localhost or your machine IP for physical device / iOS simulator
import { Platform } from "react-native";

const getBaseUrl = () => {
  if (__DEV__) {
    return Platform.OS === "android" ? "http://10.0.2.2:5000" : "http://localhost:5000";
  }
  return "https://your-api.com"; // production
};

export const API_BASE_URL = getBaseUrl();

export default API_BASE_URL;
