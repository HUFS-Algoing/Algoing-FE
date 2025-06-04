import axios from "axios";

const API_BASE_URL = "https://api.al-going.com";

export interface BOJInfo {
  handle: string;
  bojId: string;
  bojPassword: string;
}

export const postBOJ = async (data: BOJInfo) => {
  const res = await axios.post(`${API_BASE_URL}/insertboj`, data);
  return res.data;
};
