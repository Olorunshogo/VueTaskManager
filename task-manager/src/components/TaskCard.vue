
<script setup lang='ts'>
    import type { Task } from '@/stores/taskStore';
    import { useDraggable } from '@dnd-kit/core';
    import { vueRefAdapter } from '../utils/refAdapter';

    const props = defineProps<{
        task: Task;
    }>();

    const emit = defineEmits([
        'edit'
    ]);

    const  { attributes, listeners, setNodeRef } = useDraggable({
        id: props.task.id,
    });

</script>

<template>
    <div>
        <!-- Smooth Drag experience -->
        <div class="bg-gray-100 p-4 rounded-2xl shadow-lg cursor-move"
            :ref="vueRefAdapter(setNodeRef)"
            v-bind="attributes"
            v-on="listeners"
            @dblclick="$emit('edit', task)"
        >
            <div class="flex justify-between items-center">
                <h3 class="font-bold mb-1">{{ task.title }}</h3>
                <span :class="{
                    'text-green-600': task.priority === 'low',
                    'text-yellow-600': task.priority === 'medium',
                    'text-red-600': task.priority === 'high'
                }">
                    ●
                </span>
            </div>
            <p class="text-sm text-gray-700">{{ task.description }}</p>
            <p class="text-xs text-gray-500 mt-1" v-if="task.dueDate">Due: {{ task.dueDate }}</p>
        

        </div>
    </div>
</template>

<style lang="css" scoped>

</style>