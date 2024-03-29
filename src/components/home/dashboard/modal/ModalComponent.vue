<template>
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center"
        v-show="isOpen">
        <div class="relative p-5 w-full max-w-md mx-4 sm:mx-auto rounded-md bg-white shadow-lg">
            <div class="mt-3 text-center">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                    New Project
                </h3>
                <div class="mt-2">
                    <input v-model="projectName" type="text" placeholder="Project Name"
                        class="mt-2 p-2 w-full border rounded" />
                    <textarea v-model="projectDescription" placeholder="Project Description"
                        class="mt-2 p-2 w-full border rounded" rows="4"></textarea>
                    <input v-model="collaborator" type="text" placeholder="Collaborator"
                        class="mt-2 p-2 w-full border rounded" />
                    <input v-model="startDate" type="date" placeholder="Start Date"
                        class="mt-2 p-2 w-full border rounded" />
                    <input v-model="endDate" type="date" placeholder="End Date"
                        class="mt-2 p-2 w-full border rounded" />
                </div>
            </div>
            <div class="mt-4 flex justify-end">
                <button @click="closeModal" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mr-2">
                    Close
                </button>
                <button @click="submitForm" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    Save
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            projectName: '',
            projectDescription: '',
            collaborator: '',
            startDate: '',
            endDate: '',
        };
    },
    methods: {
        closeModal() {
            this.$emit('update:isOpen', false);
        },
        submitForm() {
            if (!this.projectName || !this.projectDescription || !this.collaborator || !this.startDate || !this.endDate) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'All fields are required!',
                });
            } else {
                // Aquí puedes agregar la lógica para manejar la información del formulario
                console.log('Form submitted');
                this.closeModal();
            }
        },
    },
};
</script>



<!-- <template>
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center"
        v-show="isOpen">
        <div class="relative p-5 w-full max-w-md mx-4 sm:mx-auto rounded-md bg-white shadow-lg">
            <div class="mt-3 text-center">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                    New Project
                </h3>
                <div class="mt-2">
                    <input type="text" placeholder="Project Name" class="mt-2 p-2 w-full border rounded" />
                    <textarea placeholder="Project Description" class="mt-2 p-2 w-full border rounded"
                        rows="4"></textarea>
                </div>
            </div>
            <div class="mt-4 flex justify-end">
                <button @click="closeModal" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mr-2">
                    Close
                </button>
                <button @click="submitForm" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2">
                    Save
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        closeModal() {
            this.$emit('update:isOpen', false);
        },
        submitForm() {
            // Aquí puedes agregar la lógica para manejar la información del formulario
            console.log('Form submitted');
            this.closeModal();
        },
    },
};
</script>
 -->