// app/_store/use-user-store.ts
import { create } from "zustand";
import { MyInfoResponse } from "@/app/_api/user/getMyInfo";

type UserState = MyInfoResponse & {
  setUser: (user: MyInfoResponse) => void;
};

export const useUserStore = create<UserState>((set) => ({
  userId: 0,
  email: "",
  name: "",
  role: "",
  handle: "",
  bojId: "",
  bio: "",
  picture: "",
  tier: 0,
  solvedCount: 0,
  userPoint: 0,
  createdAt: "",
  setUser: (user) => set({ ...user }),
}));
