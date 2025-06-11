
<script lang="ts" setup>
    import Board from '@/components/Board.vue';
</script>


<template>
  <div class="task-manager">

    <h1 class="text-center text-4xl md:text-5xl font-extrabold py-12">This is an Task Manager page</h1>

    <!-- <div class="min-h-screen bg-gray-100 p-4"> -->
    <div class="min-h-90 p-4">
        <h1 class="text-3xl font-extrabold text-center mb-8">
            TaskFlow - Kanban Board
        </h1>
        <Board />
    </div>

  </div>
</template>

<style>
    @media (min-width: 1024px) {
        .task-manager {
            min-height: 100vh;
            display: flex;
            align-items: center;
        }
    }
</style>
