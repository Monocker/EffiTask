<template>
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center"
        v-show="isOpen">
        <div class="relative p-5 w-full max-w-md mx-4 sm:mx-auto rounded-md bg-white shadow-lg">
            <div class="mt-3 text-center">
                <h3 class="text-lg leading-6 font-medium text-gray-900">New Project</h3>
                <div class="mt-2">
                    <input v-model="projectName" type="text" placeholder="Project Name"
                        class="mt-2 p-2 w-full border rounded" />
                    <textarea v-model="projectDescription" placeholder="Project Description"
                        class="mt-2 p-2 w-full border rounded" rows="4"></textarea>
                    <select v-model="collaborator" class="mt-2 p-2 w-full border rounded">
                        <option disabled value="">Select a Collaborator</option>
                        <option v-for="collaborator in collaborators" :key="collaborator.id" :value="collaborator.id">{{
                            collaborator.fullName }}</option>
                    </select>
                    <input v-model="startDate" type="date" placeholder="Start Date"
                        class="mt-2 p-2 w-full border rounded" />
                    <input v-model="startTime" type="time" placeholder="Start Time"
                        class="mt-2 p-2 w-full border rounded" />
                    <input v-model="endDate" type="date" placeholder="End Date"
                        class="mt-2 p-2 w-full border rounded" />

                    <input v-model="endTime" type="time" placeholder="End Time"
                        class="mt-2 p-2 w-full border rounded" />
                    <input v-model="idManager" type="hidden" />
                </div>
            </div>
            <div class="mt-4 flex justify-end">
                <button @click="closeModal"
                    class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mr-2">Close</button>
                <button @click="submitForm"
                    class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Save</button>
            </div>
        </div>
    </div>
</template>

<script>
import { db, auth } from '../../../../core/services/firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';

export default {
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
        collaborators: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            projectName: '',
            projectDescription: '',
            collaborator: '',
            startDate: '',
            endDate: '',
            startTime: '',
            endTime: '',
            idManager: '', // Añade esta propiedad para almacenar el ID del manager
        };
    },
    methods: {
        closeModal() {
            this.$emit('update:isOpen', false);
        },
        async submitForm() {
            if (!this.projectName || !this.projectDescription || !this.collaborator || !this.startDate || !this.endDate || !this.startTime || !this.endTime) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'All fields are required!',
                });
            } else {
                try {
                    // Agregar un nuevo documento a la colección 'tasks'
                    const docRef = await addDoc(collection(db, 'tasks'), {
                        projectName: this.projectName,
                        description: this.projectDescription,
                        idCollaborator: this.collaborator,
                        startDate: this.startDate,
                        startTime: this.startTime,
                        endDate: this.endDate,
                        endTime: this.endTime,
                        idManager: this.idManager,
                    });
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'The project has been created successfully!',
                    });
                    this.resetForm();
                    this.closeModal();
                } catch (error) {
                    console.error('Error adding document: ', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'An error occurred while creating the project. Please try again later.',
                    });
                }
            }
        },
        resetForm() {
            this.projectName = '';
            this.projectDescription = '';
            this.collaborator = '';
            this.startDate = '';
            this.endDate = '';
            this.startTime = '';
            this.endTime = '';
            this.idManager = '';
        },
    },
    watch: {
        isOpen(newValue) {
            if (!newValue) {
                this.resetForm();
            }
        },
    },
    created() {
        this.idManager = auth.currentUser.uid; // Obtener el ID del manager al inicio
    },
};
</script>
