


// Need to install the following packages:
// supabase@2.24.3

export type Json = 
    string | number | boolean | null | 
    { [key: string]: Json } | Json[];
    
import type { TaskStatus } from "./Task";

export interface Database {
    public: {
        Tables: {
            tasks: {
                Row: {
                    id: number;
                    title: string;
                    description: string;
                    status: TaskStatus;
                    created_at: string;
                };
                Insert: {
                    id?: number;
                    title: string;
                    description?: string;
                    status: TaskStatus;
                    created_at?: string;
                };
                Update: {
                    id?: number;
                    title?: string;
                    description?: string;
                    status?: TaskStatus;
                    created_at?: string;
                };
            };
        };
    };
}
