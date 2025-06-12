
<script setup lang="ts">
    import Column from './Column.vue';
    import { useTaskStore } from '@/stores/taskStore';
    import { onMounted } from 'vue';

    const taskStore = useTaskStore();

    onMounted(() => {
        taskStore.fetchTasks();
    });

</script>

<template>
    <div>
        Board is here

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Column title="To Do" status="todo" />
            <Column title="In Progress" status="in-progress" />
            <Column title="Done" status="done" />
        </div>

    </div>
</template>

<style lang="css" scoped>

</style>