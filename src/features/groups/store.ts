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