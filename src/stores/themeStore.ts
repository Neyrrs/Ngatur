import { create } from "zustand";

type theme = "dark" | "light";

interface ITheme {
  theme: theme;
  setTheme: (newTheme: theme) => void;
}

export const useTheme = create<ITheme>((set) => ({
  theme: "light",
  setTheme: (newTheme) => set({ theme: newTheme }),
}));
