import { useEffect } from "react";
import { create } from "zustand";

interface ThemeStore{
    theme:  'light' |'dark';
    toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
    theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'light',
}));