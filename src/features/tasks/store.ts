import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import type     { Task, Status, Comment } from './types';

interface TaskStore {
    tasks: Task[];
    addTask: (title: string, status: Status) => void;
    moveTask: (id: string, newStatus: Status) => void;
    updateTask: (id: string, updates: Partial<Task>) => void;
    addComment: (taskId: string, comment: Comment) => void;
}

export const useTaskStore = create<TaskStore> () (
    persist(
        (set) => ({
            tasks: [],
            addTask: (title, status) => set((state) =>{
                toast.success('Task created');
                return { tasks: [...state.tasks, { 
                    id: uuidv4(), title, status, comments: [], createdAt: new Date().toISOString() 
                }]};
            }),
            moveTask: (id, newStatus) => set((state) => ({
                tasks: state.tasks.map(t => t.id === id ? { ...t, status: newStatus } : t)
            })),
            updateTask: (id, updates) => set((state) => ({
                tasks: state.tasks.map(t => t.id === id ? { ...t, ...updates } : t)
            })),
            addComment: (taskId, comment) => set((state) => {
                toast.success('Comment added');
                return { tasks: state.tasks.map(t => t.id === taskId ? { ...t, comments: [...t.comments, comment] } : t) };
            }),
        }),
        { name: 'collab-board-storage' }
    )
);