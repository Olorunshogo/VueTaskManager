
<script setup lang="ts">
  import Board from '@/components/Board.vue';
  import { useTaskStore } from '@/stores/taskStore';
  import { onMounted } from 'vue';

  const store = useTaskStore();

  onMounted(() => {
    store.fetchTasks()
  });
  
</script>

<template>
  <main>

    <div class="min-h-90 p-4">
      <h1 class="text-3xl font-extrabold text-center mb-8">
        TaskFlow - Kanban Board
      </h1>
      <Board />
    </div>

  </main>
</template>
