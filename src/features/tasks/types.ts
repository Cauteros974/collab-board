export type Status = 'todo' | 'in-progress' | 'done';
export type Priority = 'low' | 'medium' | 'high';

export interface User {
    id: string;
    name: string;
    avatar: string;
    email: string;
}

export interface Comment {
    id: string;
    text: string;
    author: User;
    createAd: string;
}

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: Status;
    comments: Comment[];
    createdAt: string;
    priority: Priority;
    assignee: User | null;
    tags: string[];
}