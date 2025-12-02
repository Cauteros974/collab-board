import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

export interface Group {
    id: string;
    name: string;
    description?: string;
    createAt: string;
}

interface GroupStore {
    groups: Group[];
    activeGroupId: string | null; // Current ID Group
    createGroup: (name: string, description?: string) => void;
    setActiveGroup: (id: string) => void;
    deleteGroup: (id: string) => void;
}

export const useGroupStore = create<GroupStore>()(
    persist(
        (set) => ({
            //Create 1 default group
            groups: [
                {id: 'default', name: 'General Team', description: 'The Main workspace', createAt: new Date().toISOString()}
            ],
            activeGroupId: 'default',

            createGroup: (name, description) => set((state) => {
                const newGroup = {
                  id: uuidv4(),
                  name,
                  description,
                  createAt: new Date().toISOString()
                };
                toast.success(`Group "${name}" created!`);
                return { 
                  groups: [...state.groups, newGroup],
                  activeGroupId: newGroup.id // Switch to a new one right away
                };
            }),

            setActiveGroup: (id) => set({ activeGroupId: id }),

            deleteGroup: (id) => set((state) => ({
                groups: state.groups.filter(g => g.id !== id),
                activeGroupId: state.activeGroupId === id ? 'default' : state.activeGroupId
            })),
        }),
        { name: 'collab-board-groups' }
    )
);