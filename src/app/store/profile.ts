import { create } from "zustand";

type UserProp = {
  id: string;
  name: string;
  currency: string;
};

type UserStateProp = {
  user: UserProp;
  updateUser: (user: UserProp) => void;
  updateName: (name: string) => void;
  updateCurrency: (currency: string) => void;
};

export const useProfileStore = create<UserStateProp>()((set) => ({
  user: {
    id: "",
    name: "",
    currency: "",
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
