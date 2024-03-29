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
                <div>
                    <label for="companyName" class="sr-only">Nombre de la empresa</label>
                    <input v-model="companyName" id="companyName" name="companyName" type="text" required
                        class="appearance-none rounded-md relative block w-full px-3 py-3 mb-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Nombre de la empresa">
                </div>
                <div>
                    <label for="ownerName" class="sr-only">Nombre del propietario/administrador</label>
                    <input v-model="ownerName" id="ownerName" name="ownerName" type="text" required
                        class="appearance-none rounded-md relative block w-full px-3 py-3 mb-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Nombre del propietario/administrador">
                </div>
                <div>
                    <label for="email" class="sr-only">Correo electrónico</label>
                    <input v-model="email" id="email" name="email" type="email" autocomplete="email" required
                        class="appearance-none rounded-md relative block w-full px-3 py-3 mb-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Correo electrónico">
                </div>
                <div class="relative mb-4">
                    <label for="password" class="sr-only">Contraseña</label>
                    <input v-model="password" id="password" name="password" :type="showPassword ? 'text' : 'password'"
                        autocomplete="current-password" required
                        class="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Contraseña">
                    <span @click="togglePassword"
                        class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                        <span v-show="!showPassword" class="material-icons">visibility</span>
                        <span v-show="showPassword" class="material-icons">visibility_off</span>
                    </span>
                </div>
                <div class="relative mb-4">
                    <label for="confirmPassword" class="sr-only">Confirmar contraseña</label>
                    <input v-model="confirmPassword" id="confirmPassword" name="confirmPassword" type="password"
                        autocomplete="current-password" required
                        class="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Confirmar contraseña">
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
import Swal from 'sweetalert2';
import { registerUser } from '../../core/services/authentication/AuthentificationService';
import router from '../../router';

const companyName = ref('');
const ownerName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);

const register = async () => {
    if (!companyName.value || !ownerName.value || !email.value || !password.value || !confirmPassword.value) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, rellene todos los campos.',
        });
        return;
    }

    if (password.value !== confirmPassword.value) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Las contraseñas no coinciden.',
        });
        return;
    }

    try {
        await registerUser(email.value, password.value, companyName.value, ownerName.value);
        Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'Te has registrado correctamente.',
        }).then(() => {
            router.push('/dashboard');
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            Swal.fire({
                icon: 'error',
                title: 'Error de registro',
                text: error.message,
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error desconocido.',
            });
        }
    }
};

const togglePassword = () => {
    showPassword.value = !showPassword.value;
};

const navigateToLogin = () => {
    router.push('/login');
};
</script>
