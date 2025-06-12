
import { ref } from 'vue';
import { supabase } from './useSupabase';
import type { Task, TaskStatus } from '@/types/Task';

export function useTasks() {
  const tasks = ref<Task[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchTasks() {
    loading.value = true;
    const { data, error: err } = await supabase.from('tasks').select('*').order('id');
    if (err) {
      error.value = err.message;
    } else {
      tasks.value = data as Task[];
    }
    loading.value = false;
  }

  async function addTask(newTask: Omit<Task, 'id' | 'created_at'>) {
    const { data, error: err } = await supabase
      .from('tasks')
      .insert([{ ...newTask }])
      .select()
      .single();
    if (err) {
      error.value = err.message;
    } else {
      tasks.value.push(data as Task);
    }
  }

  async function updateTaskStatus(taskId: number, status: TaskStatus) {
    const { data, error: err } = await supabase
      .from('tasks')
      .update({ status })
      .eq('id', taskId)
      .select()
      .single();
    if (err) {
      error.value = err.message;
    } else {
      const index = tasks.value.findIndex(t => t.id === taskId);
      if (index !== -1) {
        tasks.value[index] = data as Task;
      }
    }
  }

  async function deleteTask(taskId: number) {
    const { error: err } = await supabase.from('tasks').delete().eq('id', taskId);
    if (err) {
      error.value = err.message;
    } else {
      tasks.value = tasks.value.filter(t => t.id !== taskId);
    }
  }

  return {
    tasks, loading, error,
    fetchTasks, addTask, updateTaskStatus, deleteTask
  };

}