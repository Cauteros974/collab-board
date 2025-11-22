import { useEffect } from "react";
import { create } from "zustand";

interface ThemeStore{
    theme:  'light' |'dark';
}