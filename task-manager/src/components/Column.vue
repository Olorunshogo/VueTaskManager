
<script setup lang='ts'>

    import { ref, computed, type VNodeRef } from 'vue';

    import { useTaskStore } from '@/stores/taskStore';
    import type { Task, TaskStatus } from '@/stores/taskStore';

    import TaskCard from './TaskCard.vue';
    import TaskForm from './TaskForm.vue';
    import Modal from './Modal.vue';

    import { useDroppable } from '@dnd-kit/core';

    const props = defineProps<{
        title: string
        status: TaskStatus;
    }>();

    const taskStore = useTaskStore();

    // Computed: Filter tasks for this column
    const filteredTasks = computed<Task[]>(() => {
        return taskStore.tasks.filter((task: Task) => task.status === props.status);
    });

    // function onDrop(event: DragEvent) {
    //     const taskId = Number(event.dataTransfer?.getData("task-id"));
    //     if (taskId) taskStore.moveTask(taskId, props.status);
    // };

    // function onDragOver(event: DragEvent) {
    //     const taskId = Number(event.dataTransfer?.getData("task-id"));
    //     if (taskId) taskStore.moveTask(taskId, props.status);
    // };

    const showModal = ref(false);
    const taskToEdit = ref<Task | null>(null);

    function openAddTask() {
        taskToEdit.value = null;
        showModal.value = true;
    }

    function editTask(task: Task) {
        taskToEdit.value = task;
        showModal.value = true;
    }

    const { setNodeRef } = useDroppable({ id: props.status });

</script>

<template>
    <div>
        <!-- <div 
            :ref="setNodeRef"
            @drop="onDrop"
            @dragOver="onDragOver"
            class="bg-white/50 rounded-2xl shadow-lg p-4"
        > -->
        <!-- Each column becomes droppable with useDroppable() -->
        <div 
            :ref="setNodeRef as unknown as VNodeRef"
            class="bg-white/50 rounded-2xl shadow-lg p-4"
        >
            <div class="flex items-center justify-between mb-4">
                <h2 class="font-semibold text-black text-lg">{{ title }}</h2>
                <button 
                    @click="openAddTask"
                    class="bg-blue-600 text-white px-3 py-1 rounded-2xl"
                >
                    +
                </button>
            </div>
            
            <!-- Placeholder for task list -->
            <div class="space-y-3">
                <TaskCard
                    v-for="task in filteredTasks" 
                    :key="task.id"
                    :task="task"
                    @edit="editTask"
                />
            </div>

            <!-- Modal -->
            <Modal :show="showModal" @close="showModal = false">
                <TaskForm
                    :task="taskToEdit ?? undefined"
                    :onClose="() => showModal = false"
                />
            </Modal>

        </div>
    </div>
</template>

<style lang="css" scoped>

</style>