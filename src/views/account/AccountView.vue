<template>
    <div class="min-h-screen bg-gray-100">
        <NavBarComponent />
        <div class="py-10 px-[1.6rem]">
            <header>
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 class="text-3xl font-bold leading-tight text-gray-900">Profile</h1>
                </div>
            </header>
            <main>
                <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form @submit.prevent="updateUserProfile" class="space-y-8 divide-y divide-gray-200">
                        <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                            <div>
                                <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                                    <div v-if="role=='manager'" class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center">
                                        <label for="company-name"
                                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                            Name
                                        </label>
                                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                                            <input type="text" name="company-name" id="company-name"
                                                v-model="user.ownerName" autocomplete="given-name"
                                                :disabled="!isEditable"
                                                class="max-w-xl block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg border-gray-300 rounded-md">
                                        </div>
                                    </div>
                                    <div v-else class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center">
                                        <label for="company-name"
                                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                            Name
                                        </label>
                                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                                            <input type="text" name="company-name" id="company-name"
                                                v-model="user.fullName" autocomplete="given-name"
                                                :disabled="!isEditable"
                                                class="max-w-xl block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg border-gray-300 rounded-md">
                                        </div>
                                    </div>
                                    

                                    <!-- More input fields here -->
                                    <div v-if="role=='manager'" class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center">
                                        <label for="company-name"
                                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                            Company Name
                                        </label>
                                        <div class="mt-1 sm:mt-0 sm:col-span-2">
                                            <input type="text" name="company-name" id="company-name"
                                                v-model="user.companyName" autocomplete="given-name"
                                                :disabled="!isEditable"
                                                class="max-w-xl block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg border-gray-300 rounded-md">
                                        </div>
                                    </div>



                                </div>
                            </div>
                        </div>


                        <div v-if="role=='manager'"  class="pt-5">
                            <div class="flex justify-end">
                                <button v-if="isEditable" @click="toggleEditMode" type="button"
                                    class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Cancelar
                                </button>
                                <button v-if="isEditable" @click="updateUserProfile" type="submit"
                                    class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Guardar
                                </button>
                                <button v-else @click="toggleEditMode" type="button"
                                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    Editar
                                </button>
                            </div>
                        </div>


                        <div v-if="role=='manager'" class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">

                            <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center">
                                <label for="department"
                                    class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Departamentos
                                </label>
                                <div class="mt-1 sm:mt-5 sm:col-span-2">
                                    <input type="text" name="department" id="department" v-model="newDepartment"
                                        placeholder="Ejemplo: Marketing, Ventas"
                                        class="max-w-xl block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg border-gray-300 rounded-md">
                                    <button @click="addDepartment" type="button"
                                        class="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                                        Agregar
                                    </button>
                                </div>
                            </div>
                            <div class="mt-1 sm:mt-0 sm:col-span-2">
                                <ul class="flex flex-wrap gap-2">
                                    <li v-for="(dept, index) in user.departments" :key="index"
                                        class="flex items-center">
                                        <span
                                            class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">{{
                                                dept }}</span>
                                        <button @click="removeDepartment(index)" type="button"
                                            class="text-red-500 hover:text-red-700">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M6 18L18 6M6 6l12 12"></path>
                                            </svg>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>


                    </form>
                </div>
            </main>
        </div>
    </div>

</template>

<script>
import { ref, onMounted } from 'vue';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../core/services/firebase/firebaseConfig';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import NavBarComponent from '../../components/shared/NavBarComponent.vue';

export default {
    components: {
        NavBarComponent,
    },
    data(){
        return{
            role:''
        }
    },
    created(){
        this.fetchRole();
    },
    methods:{
        async fetchRole() {
    const user = auth.currentUser;
    const userId = user.uid;
    
    const userDocRef = doc(db, 'users', userId);
    const userDocSnap = await getDoc(userDocRef);
    const userRole = userDocSnap.data().role;
    console.log('User role desde fetchRole:', userRole); 
    this.role = userRole;
},
    },
    setup() {
        const router = useRouter();
        const auth = getAuth();
        const user = ref({
            ownerName: '',
            companyName: '',
            departments: [],
            // otros campos que necesites
        });
        const isEditable = ref(false);
        const newDepartment = ref('');

        const addDepartment = async () => {
            if (newDepartment.value.trim()) {
                user.value.departments.push(newDepartment.value.trim());
                newDepartment.value = '';
                await updateUserDepartment(); // Llama a la función de actualizar el perfil directamente aquí.
            }
        };

 
        const removeDepartment = async (index) => {
            user.value.departments.splice(index, 1);
            await updateUserDepartment(); // También actualiza el perfil aquí.
        };
        const fetchUserDetails = async () => {
            if (auth.currentUser) {
                try {
                    const userDocRef = doc(db, 'users', auth.currentUser.uid);
                    const userDocSnap = await getDoc(userDocRef);

                    if (userDocSnap.exists()) {
                        user.value = userDocSnap.data();
                    } else {
                        console.error('No se encontró el documento!');
                    }
                } catch (error) {
                    console.error("Error al obtener el documento:", error);
                }
            }
        };

        onMounted(async () => {
            await fetchUserDetails();
        });

        onMounted(async () => {
            // Resto del código...
            if (userDocSnap.exists()) {
                let data = userDocSnap.data();
                // Si no hay campo departments o no es un arreglo, inicializar como arreglo vacío
                user.value = { ...data, departments: Array.isArray(data.departments) ? data.departments : [] };
            }
            
        });

        const updateUserProfile = async () => {
            const userRef = doc(db, 'users', auth.currentUser.uid);
            try {
                // Suponiendo que `user.value.departments` ya es un arreglo con los departamentos
                await updateDoc(userRef, {
                    ownerName: user.value.ownerName,
                    companyName: user.value.companyName,

                });

                await Swal.fire({
                    icon: 'success',
                    title: 'Perfil actualizado',
                    text: 'Tu perfil ha sido actualizado con éxito.',
                });

                router.push('/dashboard');
            } catch (error) {
                console.error('Error al actualizar el perfil:', error);
                await Swal.fire({
                    icon: 'error',
                    title: 'Error al actualizar',
                    text: 'Hubo un problema al actualizar tu perfil.',
                });
            }
        };

        const updateUserDepartment = async () => {
            const userRef = doc(db, 'users', auth.currentUser.uid);
            try {
                // Suponiendo que `user.value.departments` ya es un arreglo con los departamentos
                await updateDoc(userRef, {
                    departments: user.value.departments, // Asegúrate de que user.value.departments es un array
                    // Incluye aquí otros campos a actualizar
                });

                await Swal.fire({
                    icon: 'success',
                    title: 'Departamentos actualizados',
                    text: 'Se agregó departamento con éxito.',
                });

                router.push('/account');
            } catch (error) {
                console.error('Error al agregar departamento:', error);
                await Swal.fire({
                    icon: 'error',
                    title: 'Error al actualizar',
                    text: 'Hubo un problema al actualizar tu perfil.',
                });
            }
        };

        /* 
                const updateUserProfile = async () => {
                    const userRef = doc(db, 'users', auth.currentUser.uid);
                    try {
                        await updateDoc(userRef, {
                            ownerName: user.value.ownerName,
                            companyName: user.value.companyName,
                            // Actualiza aquí otros campos si es necesario
                        });
        
                        await Swal.fire({
                            icon: 'success',
                            title: 'Perfil actualizado',
                            text: 'Tu perfil ha sido actualizado con éxito.',
                        });
        
                        router.push('/dashboard');
                    } catch (error) {
                        console.error('Error al actualizar el perfil:', error);
                        await Swal.fire({
                            icon: 'error',
                            title: 'Error al actualizar',
                            text: 'Hubo un problema al actualizar tu perfil.',
                        });
                    }
                };
         */
        const toggleEditMode = () => {
            if (!isEditable.value) {
                fetchUserDetails();
            }
            isEditable.value = !isEditable.value;
        };

        return {
            user,
            isEditable,
            updateUserProfile,
            toggleEditMode,
            newDepartment,
            addDepartment,
            removeDepartment,
        };
    },
};
</script>
