<template>
    <div v-if="isOpen"
        class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
        <div class="relative p-5 w-full max-w-md mx-4 sm:mx-auto rounded-md bg-white shadow-lg">
            <div class="text-center">
                <h3 class="text-lg font-medium text-gray-900">{{ showModalEdit }}</h3>

                <div class="mt-2">
                    <input v-model="editablePerson.fullName" type="text" placeholder="Nombre Completo"
                        class="mt-2 p-2 w-full border rounded" :disabled="!isEditable" />
                    <input v-model="editablePerson.mail" type="text" placeholder="Correo Electrónico"
                        class="mt-2 p-2 w-full border rounded" disabled />
                    <input v-model="editablePerson.departmentArea" type="text" placeholder="Área/Departamento"
                        class="mt-2 p-2 w-full border rounded" :disabled="!isEditable" />
                    <input v-model="editablePerson.positionRole" type="text" placeholder="Cargo/Rol"
                        class="mt-2 p-2 w-full border rounded" :disabled="!isEditable" />
                    <textarea v-model="editablePerson.notesOrComments" placeholder="Notas o Comentarios"
                        class="mt-2 p-2 w-full border rounded" :disabled="!isEditable" rows="4"></textarea>
                </div>
            </div>
            <div class="mt-4 flex justify-end">
                <button @click="closeModal"
                    class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mr-2">Cerrar</button>
                <button v-if="isEditable" @click="updateColaborador"
                    class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">Guardar</button>
                <button v-else @click="enableEdit"
                    class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Editar</button>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from '../../../core/services/firebase/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';

export default {
    props: {
        person: Object,
        isOpen: Boolean
    },
    data() {
        return {
            isEditable: false,
            editablePerson: {}
        };
    },
    watch: {
        person: {
            handler(newVal) {
                this.editablePerson = { ...newVal };
            },
            deep: true,
            immediate: true
        }
    },
    computed: {
        showModalEdit() {
            return this.isEditable ? 'Editar Colaborador' : 'Información del Colaborador';
        }
    },
    methods: {
        enableEdit() {
            this.isEditable = true;
        },
        async updateColaborador() {
            try {
                const colaboradorRef = doc(db, 'collaborators', this.editablePerson.id);
                await updateDoc(colaboradorRef, {
                    fullName: this.editablePerson.fullName,
                    departmentArea: this.editablePerson.departmentArea,
                    positionRole: this.editablePerson.positionRole,
                    notesOrComments: this.editablePerson.notesOrComments
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Colaborador actualizado',
                    text: 'La información del colaborador ha sido actualizada exitosamente.'
                });
                this.isEditable = false;
                this.closeModal(); // Cierra el modal después de guardar
            } catch (error) {
                console.error('Error al actualizar el colaborador:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al actualizarel colaborador.'
                });
            }
        },
        closeModal() {
            this.isEditable = false; // Restablece el estado de edición
            this.$emit('update:isOpen', false);
        }
    }

};
</script>