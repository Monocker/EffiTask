<template>
    <div v-if="isOpen"
        class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
        <div class="relative p-5 w-full max-w-md mx-4 sm:mx-auto rounded-md bg-white shadow-lg">
            <div class="text-center">
                <h3 class="text-lg font-medium text-gray-900">Tarea</h3>
                <div class="mt-2">
                    <input v-model="editableTask.projectName" type="text" placeholder="Título"
                        class="mt-2 p-2 w-full border rounded" :disabled="!isEditable" />
                    <textarea v-model="editableTask.description" placeholder="Descripción"
                        class="mt-2 p-2 w-full border rounded" :disabled="!isEditable" rows="4"></textarea>
                    <input v-model="editableTask.startDate" type="date" placeholder="Start Date"
                        class="mt-2 p-2 w-full border rounded" />
                    <input v-model="editableTask.startTime" type="time" placeholder="Start Time"
                        class="mt-2 p-2 w-full border rounded" />
                    <input v-model="editableTask.endDate" type="date" placeholder="End Date"
                        class="mt-2 p-2 w-full border rounded" />

                    <input v-model="editableTask.endTime" type="time" placeholder="End Time"
                        class="mt-2 p-2 w-full border rounded" />
                </div>
            </div>
            <div v-if="role === 'manager'" class="mt-4 flex justify-end">
                <button @click="closeModal"
                    class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mr-2">Cerrar</button>
                <button v-if="isEditable" @click="updateTask"
                    class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">Guardar</button>
                <button v-else @click="enableEdit"
                    class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Editar</button>
            </div>
            <div v-else class="mt-4 flex justify-end">
                <button @click="closeModal"
                    class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mr-2">Cerrar</button>
                <button @click="markTaskAsCompleted"
                    class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Marcar como terminada</button>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from '../../../../core/services/firebase/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';


export default {
    props: {
        isOpen: Boolean,
        task: Object, // Recibe la tarea seleccionada como prop
        role: String
    },
    data() {
        return {
            isEditable: false,
            editableTask: {},
        };
    },
    setup() {
        const router = useRouter();
    },
    watch: {
        task: {
            handler(newVal) {
                this.editableTask = { ...newVal };
            },
            deep: true,
            immediate: true
        }
    },
    created() {
        console.log('Role received:', this.role);
        this.role;
    }
    ,
    methods: {
        enableEdit() {
            this.isEditable = true;
        },
        async markTaskAsCompleted() {
            const taskRef = doc(db, 'tasks', this.editableTask.id);
            updateDoc(taskRef, { status: true })
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Tarea completada',
                        text: 'La tarea ha sido marcada como completada.'
                    });
                    this.closeModal();

                })
                .catch((error) => {
                    console.error('Error al marcar la tarea como completada:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un problema al marcar la tarea como completada.'
                    });
                });


        },
        async updateTask() {
            try {
                const taskRef = doc(db, 'tasks', this.editableTask.id);
                await updateDoc(taskRef, {
                    projectName: this.editableTask.projectName,
                    description: this.editableTask.description,
                    startDate: this.editableTask.startDate,
                    startTime: this.editableTask.startTime,
                    endDate: this.editableTask.endDate,
                    endTime: this.editableTask.endTime,
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Tarea actualizada',
                    text: 'La información de la tarea ha sido actualizada exitosamente.'
                });
                this.isEditable = false;
                this.closeModal();
            } catch (error) {
                console.error('Error al actualizar la tarea:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al actualizar la tarea.'
                });
            }
        },
        closeModal() {
            this.isEditable = false;
            this.$emit('update:isOpen', false);
        },

    }

};
</script>