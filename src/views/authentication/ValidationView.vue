<template>
    <div class="flex min-h-screen bg-gray-100 justify-center items-center p-4 sm:p-6">
        <div class="max-w-md w-full space-y-8 bg-white rounded-xl shadow-lg z-10">
            <div class="text-center p-6">
                <h2 class="mt-6 text-xl sm:text-3xl font-bold text-gray-900">
                    Validar Correo
                </h2>
            </div>
            <form class="space-y-6 px-4 sm:px-6 py-6" @submit.prevent="validateEmail">
                <div>
                    <label for="token" class="sr-only">Token</label>
                    <input v-model="token" id="token" name="token" type="text" readonly
                        class="appearance-none rounded-md relative block w-full px-3 py-3 mb-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Token">
                </div>
                <div>
                    <label for="email" class="sr-only">Correo electrónico</label>
                    <input v-model="email" id="email" name="email" type="email" required
                        class="appearance-none rounded-md relative block w-full px-3 py-3 mb-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Correo electrónico">
                </div>
                <div>
                    <button type="submit"
                        class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Validar
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../../core/services/firebase/firebaseConfig';
import Swal from 'sweetalert2';
import router from '../../router';

const token = ref('');
const email = ref('');

const validateEmail = async () => {
    try {
        const collaboratorsRef = collection(db, 'collaborators');
        const q = query(collaboratorsRef, where('mail', '==', email.value), where('token', '==', token.value));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            /* falta hacer la inyeccion al docuemnto */
            await router.push('/login');
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se encontró ningún colaborador con el correo y token proporcionados.',
            });
        }
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al validar el correo.',
        });
    }
};
</script>