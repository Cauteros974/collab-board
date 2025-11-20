import {create } from 'zustand';
import { type User } from '../tasks/types';

interface AuthStore {
    user: User | null;
    login: (name: string) => void;
    logout: () => void;
}