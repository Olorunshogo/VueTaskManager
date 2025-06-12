
<script setup lang='ts'>

    import { computed } from 'vue';

    import { useTaskStore } from '@/stores/taskStore';
    import type { Task, TaskStatus } from '@/types/Task';

    import TaskCard from './TaskCard.vue';
    // import TaskForm from './TaskForm.vue';
    // import Modal from '../Common/Modal.vue';

    // import { useDroppable } from '@dnd-kit/core';

    const props = defineProps<{
        title: string
        status: TaskStatus;
    }>();

    const store = useTaskStore();

    const filteredTasks = computed<Task[]>(() => {
        store.tasks.filter(t => t.status === props.status);
    });

    async function addNewTask() {
        const title = prompt('Enter task title');
        if (title) {
            await store.addTask(title, props.status);
        }
    }


</script>

<template>
    <div>

        <div class="grid gap-4 bg-white/70 p-4 rounded-lg text-black">
            <h2 class="text-xl font-bold mb-4">{{ title }}:</h2>
            <div class="space-y-2">
                <TaskCard 
                    v-for="task in filteredTasks" 
                    :key="task.id" 
                    :task="task" 
                />

                <button @click="addNewTask" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
                    + Add Task 
                </button>
            </div>
        </div>

    </div>
</template>

<style lang="css" scoped>

</style>