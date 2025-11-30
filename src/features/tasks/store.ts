import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import type { Task, Status, Comment, Priority } from './types';

interface CreateTaskPayload {
    title: string;
    status: Status;
    priority: Priority;
    tags: string[];
    description?: string;
}

interface TaskStore {
    tasks: Task[];
    addTask: (payload: CreateTaskPayload) => void;
    moveTask: (id: string, newStatus: Status) => void;
    updateTask: (id: string, updates: Partial<Task>) => void;
    addComment: (taskId: string, comment: Comment) => void;
    deleteTask: (id: string) => void;
}

export const useTaskStore = create<TaskStore>()(
    persist(
        (set) => ({
            tasks: [],
            
            addTask: (payload) => set((state) => {
                const newTask: Task = {
                    id: uuidv4(),
                    title: payload.title,
                    description: payload.description || '',
                    status: payload.status,
                    priority: payload.priority,
                    tags: payload.tags,
                    comments: [],
                    createdAt: new Date().toISOString(),
                    assignee: null,
                };
                
                toast.success('The task was created successfully.!');
                return { tasks: [...state.tasks, newTask] };
            }),
            
            moveTask: (id, newStatus) => set((state) => {
                toast('The task status has been updated.');
                return {
                    tasks: state.tasks.map(t => 
                        t.id === id ? { ...t, status: newStatus } : t
                    )
                };
            }),
            
            updateTask: (id, updates) => set((state) => ({
                tasks: state.tasks.map(t => 
                    t.id === id ? { ...t, ...updates } : t
                )
            })),
            
            addComment: (taskId, comment) => set((state) => {
                toast.success('Comment added');
                return {
                    tasks: state.tasks.map(t => 
                        t.id === taskId 
                            ? { ...t, comments: [...t.comments, comment] } 
                            : t
                    )
                };
            }),
            
            deleteTask: (id) => set((state) => {
                toast.success('The task has been deleted.');
                return {
                    tasks: state.tasks.filter(t => t.id !== id)
                };
            }),
        }),
        { name: 'collab-board-storage' }
    )
);