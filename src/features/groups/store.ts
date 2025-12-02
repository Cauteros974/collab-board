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

interface GroupStage {
    group: Group[];
    activeGroupId: string | null; // Current ID Group
    createGroup: (name: string, description: string) => void;
    setActiveGroup: (id: string) => void;
    deleteGroup: (id: string) => void;
}

export const useGroupStore = create<GroupStore>()(
    persist(
        (set) => ({
            //Create 1 default group
            group: [
                {id: 'default', name: 'General Team', description: 'The Main workspace', createdAt: new Date().toISOString()}
            ],
            activeGroupId: 'default',

            createGroup: (name, description) => set((state) => {
                const newGroup = {
                  id: uuidv4(),
                  name,
                  description,
                  createdAt: new Date().toISOString()
                };
                toast.success(`Grpup "${name}" created!`);
                return { 
                  groups: [...state.groups, newGroup],
                  activeGroupId: newGroup.id // Switch to a new one right away
                };
            }),
        }),
    )
)