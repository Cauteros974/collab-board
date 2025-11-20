import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { type User, type Comment, type Task } from "./types";

interface TaskStore {
    tasks: Task[];
    addTask: (title: string, status: Status) => void;
    moveTask: (id: string, newStatus: Status) => void;
    updateTask: (id: string, updates: Partial<Task>) => void;
    addComment: (taskId: string, comment: Comment) => void;
}
