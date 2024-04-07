<template>
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center"
        v-show="isResetPasswordOpen">
        <!-- Utiliza clases de Tailwind para márgenes y anchos responsivos -->
        <div class="relative p-3 sm:p-5 w-full max-w-md mx-3 sm:mx-auto rounded-md bg-white shadow-lg">
            <div class="text-center">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                    Restablecer contraseña
                </h3>
                <div class="mt-2">
                    <input v-model="resetEmail" type="email" placeholder="Tu correo electrónico"
                        class="mt-2 p-2 w-full border rounded" />
                </div>
            </div>
            <div class="mt-4 flex justify-end">
                <button @click="closeResetModal"
                    class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2">
                    Cancelar
                </button>
                <button @click="sendPasswordReset" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    Restablecer
                </button>
            </div>
        </div>
    </div>
</template>


<script>
import { ref } from 'vue';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../core/services/firebase/firebaseConfig';
import Swal from 'sweetalert2';

export default {
    props: {
        isResetPasswordOpen: {
            type: Boolean,
            required: true
        }
    },
    emits: ['closeResetModal'],
    setup(props, { emit }) {
        const resetEmail = ref('');

        const sendPasswordReset = async () => {
            if (!resetEmail.value) {
                Swal.fire('Ingrese su correo electrónico', '', 'warning');
                return;
            }
            try {
                await sendPasswordResetEmail(auth, resetEmail.value);
                Swal.fire('Correo de restablecimiento enviado', 'Revisa tu bandeja de entrada', 'success');
                emit('closeResetModal');
            } catch (error) {
                Swal.fire('Error al enviar correo de restablecimiento', error.message, 'error');
            }
        };

        const closeResetModal = () => {
            resetEmail.value = '';
            emit('closeResetModal');
        };

        return {
            resetEmail,
            sendPasswordReset,
            closeResetModal
        };
    }
};
</script>