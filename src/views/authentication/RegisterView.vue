<template>
    <div class="flex min-h-screen bg-gray-100 justify-center items-center p-4 sm:p-6">
        <div class="max-w-md w-full space-y-8 bg-white rounded-xl shadow-lg z-10">
            <div class="text-center p-6">
                <h2 class="mt-6 text-xl sm:text-3xl font-bold text-gray-900">
                    Regístrate
                </h2>
                <p class="mt-2 text-sm sm:text-base text-gray-600">
                    O
                    <a @click.prevent="navigateToLogin" class="font-medium text-indigo-600 hover:text-indigo-500">
                        inicia sesión en tu cuenta
                    </a>
                </p>
            </div>
            <form class="space-y-6 px-4 sm:px-6 py-6" @submit.prevent="register">
                <div class="rounded-md shadow-sm -space-y-px">
                    <div class="mb-[.8rem]">
                        <label for="email" class="sr-only">Correo electrónico</label>
                        <input v-model="email" id="email" name="email" type="email" autocomplete="email" required
                            class="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Correo electrónico">
                    </div>
                    <div>
                        <label for="password" class="sr-only">Contraseña</label>
                        <input v-model="password" id="password" name="password" type="password"
                            autocomplete="current-password" required
                            class="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Contraseña">
                    </div>
                </div>
                <div>
                    <button type="submit"
                        class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Registrarse
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { registerUser } from '../../core/services/authentication/AuthentificationService';
import router from '../../router';

const email = ref('');
const password = ref('');

const register = async () => {
    try {
        await registerUser(email.value, password.value);
        router.push('/');
    } catch (error: unknown) {
        if (error instanceof Error) {
            alert('Error al registrarse: ' + error.message);
        } else {
            alert('Ocurrió un error desconocido');
        }
    }
};

const navigateToLogin = () => {
    router.push('/login');
};
</script>