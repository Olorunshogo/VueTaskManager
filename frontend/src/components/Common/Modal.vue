
<script setup lang='ts'>
    const props = defineProps<{
        show: boolean | null
    }>();
</script>

<template>
    <div>
        <div 
            v-if="show"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
            <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                <button 
                    @click="$emit('close')"
                    class="absolute top-2 right-2 text-gray-600"
                >
                    &times;
                </button>
                <slot />
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>

</style>