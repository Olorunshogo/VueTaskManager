
<script setup lang='ts'>
    import type { Task } from '@/types/Task';
    import { useTaskStore } from '@/stores/taskStore';

    const props = defineProps<{
        task: Task;
    }>();
    const store = useTaskStore();

    function onDelete() {
        store.deleteTask(props.task.id);
    }

</script>

<template>
    <div>
        
        <div class="bg-white/50 p-4 rounded shadow">
            <h3 class="font-semibold">{{ task.title }}</h3>
            <p class="text-sm text-gray-600">{{ task.description }}</p>

            <div class="flex justify-end mt-2">
                <button @click="onDelete" class="text-red-500 text-sm">
                    Delete
                </button>
            </div>

        </div>
    
    </div>
</template>

<style lang="css" scoped>

</style>