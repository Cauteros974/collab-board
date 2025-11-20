export type Status = 'todo' | 'in-progress' | 'done';

export interface User {
    id: string;
    name: string;
    avatar: string;
}

export interface Comment {
    id: string;
    text: string;
    author: User;
    createAd: string;
}