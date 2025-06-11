
<script setup lang='ts'>
    import { ref } from 'vue';
    import { useTaskStore } from '@/stores/taskStore';
    import type { Task, TaskStatus, TaskPriority } from '@/stores/taskStore';

    const props = defineProps<{
        task?: Task;
        onClose: () => void;
    }>();

    const title = ref(props.task?.title ?? '');
    const description = ref(props.task?.description ?? '');
    const status = ref<TaskStatus>(props.task?.status ?? 'todo');
    const priority = ref<TaskPriority>(props.task?.priority ?? 'medium');
    const dueDate = ref(props.task?.dueDate ?? '');

    const taskStore = useTaskStore();

    function submitTodoForm() {
        const taskData = {
            id: props.task?.id ?? 0,
            title: title.value,
            description: description.value,
            status: status.value,
            priority: priority.value,
            dueDate: dueDate.value,
        };

        if (props.task) {
            taskStore.updateTask(taskData as Task);
        } else {
            taskStore.addTask(taskData);
        }
        props.onClose();
    }

</script>

<template>
    <div>
        <form @submit.prevent="submitTodoForm" class="space-y-4 bg-white/50">

            <!-- Title -->
            <div>
                <label class="block font-semibold">Title</label>
                <input 
                    type="text" name="title" id="title" 
                    aria-describedby="Title"
                    v-model="title" required
                    class="border p-2 rounded w-full"
                />
            </div>

            <!-- Description -->
            <div>
                <label class="block font-semibold">Description</label>
                <input 
                    type="text" name="description" id="description" 
                    aria-describedby="Description"
                    v-model="description" required
                    class="border p-2 rounded w-full"
                />
            </div>

            <!-- Due Date -->
            <div>
                <label class="block font-semibold">Due Date</label>
                <input 
                    type="date" name="dueDate" id="dueDate" 
                    aria-describedby="Due Date"
                    v-model="description" required
                    class="border p-2 rounded w-full"
                />
            </div>

            <!-- Priority -->
            <div>
                <label class="block font-semibold">Priority</label>
                <select 
                    name="dueDate" id="dueDate" aria-describedby="Due Date"
                    v-model="priority" 
                    class="border p-2 rounded w-full"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            <!-- Status -->
            <div>
                <label class="block font-semibold">Status</label>
                <select 
                    name="status" id="status" aria-describedby="status"
                    v-model="status" 
                    class="border p-2 rounded w-full"
                >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                </select>

            </div>

            <button 
                type="submit"
                class="bg-blue-600 text-white py-2 px-4 rounded"
            >
                Save
            </button>
        </form>
    </div>
</template>

<style lang="css" scoped>

</style>