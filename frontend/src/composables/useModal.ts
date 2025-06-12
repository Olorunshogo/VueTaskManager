
import { ref } from "vue";

export function useModal() {
    const isOpen = ref<boolean>(false);
    function openModal() {
        isOpen.value = true;
    }
    function closeModal() {
        isOpen.value = false;
    }

    return {
        isOpen,
        openModal, closeModal
    };
}