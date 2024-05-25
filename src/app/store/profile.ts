import { create } from "zustand";

type UserStateProp = {
  user: UserProp;
  updateUser: (user: UserProp) => void;
  updateName: (name: string) => void;
  updateCurrency: (currency: string) => void;
};

type UserProp = {
  name: string;
  currency: string;
};

export const useProfileStore = create<UserStateProp>((set) => ({
  user: {
    name: "Wee Hong KOH",
    currency: "SGD",
  },
  updateUser: (newUser) => set({ user: newUser }),
  updateName: (newName) =>
    set((state) => ({
      user: { ...state.user, name: newName },
    })),
  updateCurrency: (newCurrency) =>
    set((state) => ({
      user: { ...state.user, currency: newCurrency },
    })),
}));
