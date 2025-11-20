import { create } from 'zustand';
import { type User } from '../tasks/types';

interface AuthStore {
  user: User | null;
  login: (name: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  login: (name) => {
    const user = { 
      id: 'u1', name, 
      avatar: `https://ui-avatars.com/api/?name=${name}&background=random` 
    };
    localStorage.setItem('user', JSON.stringify(user));
    set({ user });
  },
  logout: () => {
    localStorage.removeItem('user');
    set({ user: null });
  },
}));