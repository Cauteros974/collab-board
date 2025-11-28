export type Status = 'todo' | 'in-progress' | 'done';
export type Prioruty = 'low' | 'medium' | 'high';

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

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: Status;
    comments: Comment[];
    createdAt: string;
    priority: Prioruty;
    assignee: User;
}