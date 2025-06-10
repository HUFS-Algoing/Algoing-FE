import { apiPost } from "../methods";

export const logoutApi = async (): Promise<void> => {
  await apiPost<void>("/logout");
};
