<template>
    <div class="flex min-h-screen bg-gray-100 justify-center items-center p-6">
        <div class="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
            <div class="text-center">
                <img class="mx-auto h-24 w-auto" src="../../assets/img/logo.png" alt="EffiTask" />
                <h2 class="mt-6 text-3xl font-bold text-gray-900">
                    Iniciar sesión
                </h2>
            </div>
            <form class="mt-8 space-y-6" @submit.prevent="submitForm">
                <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="email" class="sr-only">Correo electrónico</label>
                        <input v-model="email" id="email" name="email" type="email" autocomplete="email" required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Correo electrónico">
                    </div>
                    <div>
                        <label for="password" class="sr-only">Contraseña</label>
                        <input v-model="password" id="password" name="password" type="password"
                            autocomplete="current-password" required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Contraseña">
                    </div>
                </div>

                <div class="flex items-center justify-between">
                    <div class="text-sm">
                        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"
                            @click="openResetPasswordModal">
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Iniciar sesión
                    </button>
                </div>
            </form>

            <p class="mt-2 text-center text-sm text-gray-600">
                ¿No tienes cuenta?
                <a @click.prevent="navigateToRegister"
                    class="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500">
                    Regístrate aquí
                </a>
            </p>
        </div>
        <ResetPasswordModal v-if="isResetPasswordModalOpen" :isResetPasswordOpen="isResetPasswordModalOpen"
            @closeResetModal="isResetPasswordModalOpen = false" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Swal from 'sweetalert2';
import { loginUser } from '../../core/services/authentication/AuthentificationService';
import router from '../../router';
import ResetPasswordModal from '../../components/authentication/ResetPasswordModal.vue';

const email = ref('');
const password = ref('');
var isResetPasswordModalOpen = ref(false);

const submitForm = async () => {
    try {
        await loginUser(email.value, password.value);
        router.push('/dashboard'); // o la ruta que corresponda a tu página de inicio
    } catch (error: unknown) {
        if (error instanceof Error) {
            Swal.fire({
                icon: 'error',
                title: 'Error de inicio de sesión',
                text: error.message,
            });
        } else {
            // Manejar casos en que el error no es una instancia de Error
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error desconocido.',
            });
        }
    }
};

const navigateToRegister = () => {
    router.push('/register');
};
const openResetPasswordModal = () => {
    isResetPasswordModalOpen.value = true;
};
</script>

<!-- 
<script setup lang="ts">
import { ref } from 'vue';
import { loginUser } from '../../core/services/authentication/AuthentificationService';
import router from '../../router';


const email = ref('');
const password = ref('');

const submitForm = async () => {
    try {
        await loginUser(email.value, password.value);
        router.push('/dashboard'); // o la ruta que corresponda a tu página de inicio
    } catch (error: unknown) {
        if (error instanceof Error) {
            alert('Error de inicio de sesión: ' + error.message);
        } else {
            // Manejar casos en que el error no es una instancia de Error
        }
    }
};

const navigateToRegister = () => {
    router.push('/register');
};
</script> -->