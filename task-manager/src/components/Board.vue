
<script setup lang="ts">
    import Column from './Column.vue';
    import { useTaskStore, type TaskStatus } from '../stores/taskStore';
    import { onMounted } from 'vue';
    import { DndContext } from '@dnd-kit/core';

    const taskStore = useTaskStore();

    onMounted(() => {
        // if (taskStore.tasks.length === 0) {
        //     taskStore.addTask({ title: 'Learn Vue', description: 'Start the Vue course.', status: 'todo' });
        //     taskStore.addTask({ title: 'Learn Pinia', description: 'Master state management.', status: 'in-progress' });
        //     taskStore.addTask({ title: 'Complete Kanban', description: 'Finish TaskFlow App.', status: 'done' });
        // }

        taskStore.loadTasks();
    });

    function handleDragEnd(event: any) {
        const { active, over } = event;
        if (!over) return;
        const taskId = parseInt(active.id);
        const newStatus = over.id as TaskStatus;
        taskStore.moveTask(taskId, newStatus);
    }

</script>

<template>
    <div>
        <!-- Main Board handles drag drop globally -->
        <DndContext @drag-end="handleDragEnd">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Column title="To Do" status="todo" />
                <Column title="In Progress" status="in-progress" />
                <Column title="Done" status="done" />
            </div>
        </DndContext>
    </div>
</template>

<style lang="css" scoped>

</style>