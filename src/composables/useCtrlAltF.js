import { ref } from "vue";

export default function useCtrlAltF(methodToCall) {
    const ctrlPressed = ref(false);
    const altPressed = ref(false);
    const fPressed = ref(false);

    const handleKeyDown = (event) => {
        if (event.key === 'Control') {
            ctrlPressed.value = true;
        } else if (event.key === 'Alt') {
            altPressed.value = true;
        } else if (event.key === 'f' || event.key === 'F') {
            fPressed.value = true;
        }

        if (ctrlPressed.value && altPressed.value && fPressed.value) {
            methodToCall();
        }
    };

    const handleKeyUp = (event) => {
        if (event.key === 'Control') {
            ctrlPressed.value = false;
        } else if (event.key === 'Alt') {
            altPressed.value = false;
        } else if (event.key === 'f' || event.key === 'F') {
            fPressed.value = false;
        }
    };

    const startListening = () => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
    };

    const stopListening = () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
    };

    return {
        startListening,
        stopListening
    };
}