
import { defineStore } from "pinia";

export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
    id: number;
    title: string;
    description: string;
    dueDate?: string; // YYYY-MM-DD

    priority: TaskPriority;
    status: TaskStatus;
    tags?: string[];
}

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [] as Task[]
    }),

    actions: {
        loadTasks() {
            const saved = localStorage.getItem('tasks');
            if (saved) {
                this.tasks = JSON.parse(saved);
            }
        },

        saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        },

        addTask(task: Omit<Task, 'id'>) {
            const newId = this.tasks.length ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1;
            this.tasks.push({ id: newId, ...task });
            this.saveTasks();
        },

        moveTask(taskId: number, newStatus: TaskStatus) {
            const task = this.tasks.find(t => t.id === taskId) ;
            if (task) {
                task.status = newStatus;
                this.saveTasks();
            };
        },

        updateTask(updatedTask: Task) {
            const index = this.tasks.findIndex(t => t.id === updatedTask.id);
            if (index !== -1) {
                this.tasks[index] = updatedTask;
                this.saveTasks();
            }
        },

        deleteTask(taskId: number) {
            this.tasks = this.tasks.filter(t => t.id !== taskId)
            this.saveTasks();
        }
    }
})