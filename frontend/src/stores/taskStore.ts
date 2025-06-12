
import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "@/composables/supabase";
import type { Task, TaskStatus } from "@/types/Task";

export const useTaskStore = defineStore('task', () => {

    const tasks = ref<Task[]>([]);
    const loading = ref(false);

    function asNumber(id: string | number): number {
        return typeof id === 'string' ? parseInt(id, 10) : id;
    }

    async function fetchTasks() {
        loading.value = true;
        const  { data, error } = await supabase
            .from('tasks')
            .select('*')
            .order('id', { ascending: true });
        if (error) {
            console.error('Error fetching tasks:', error);
        } else {
            tasks.value = data as Task[];
        }
        loading.value = false;
    }

    async function addTask(title: string, status: TaskStatus) {
        const { data, error } = await supabase
            .from('tasks')
            .insert([{ title, status }])
            .select()
            .single();

        if (!error && data) {
            tasks.value.push(data as Task);
        } else {
           console.error('Error adding task:', error);
        }
    }
        
    async function updateTaskStatus(id: number | string, status: TaskStatus) {
        
        const numId = asNumber(id);

        const { data, error } = await supabase
            .from('tasks')
            .update({ status })
            .eq('id', id)
            .select()
            .single();

        if (!error && data) {
            const idx = tasks.value.findIndex(t => t.id === numId);
            if (idx !== -1) tasks.value[idx] = data as Task;
        } else {
            console.error('Error updating task status:', error);
        }
    }

    async function deleteTask(id: number | string) {

        const numId  = typeof id === 'string' ? parseInt(id, 10) : id;
        const { error } = await supabase.from('tasks').delete().eq('id', numId);
        if (!error) {
            tasks.value = tasks.value.filter(t => t.id !== numId);
        } else {
            console.error(error);
        }
    }

    return {
        tasks, loading,
        fetchTasks, addTask, updateTaskStatus, deleteTask
    };
});

// export const useTaskStore = defineStore('taskStore', {

//     state: () => ({
//         tasks: [] as Task[]
//     }),

//     actions: {
//         loadTasks() {
//             const saved = localStorage.getItem('tasks');
//             if (saved) {
//                 this.tasks = JSON.parse(saved);
//             }
//         },

//         saveTasks() {
//             localStorage.setItem('tasks', JSON.stringify(this.tasks));
//         },

//         addTask(task: Omit<Task, 'id'>) {
//             const newId = this.tasks.length ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1;
//             this.tasks.push({ id: newId, ...task });
//             this.saveTasks();
//         },

//         moveTask(taskId: number, newStatus: TaskStatus) {
//             const task = this.tasks.find(t => t.id === taskId) ;
//             if (task) {
//                 task.status = newStatus;
//                 this.saveTasks();
//             };
//         },

//         updateTask(updatedTask: Task) {
//             const index = this.tasks.findIndex(t => t.id === updatedTask.id);
//             if (index !== -1) {
//                 this.tasks[index] = updatedTask;
//                 this.saveTasks();
//             }
//         },

//         deleteTask(taskId: number) {
//             this.tasks = this.tasks.filter(t => t.id !== taskId)
//             this.saveTasks();
//         }
//     }
// });
