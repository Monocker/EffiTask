<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center"
    v-show="isOpen">
    <div class="relative p-5 w-full max-w-md mx-4 sm:mx-auto rounded-md bg-white shadow-lg">
      <div class="mt-3 text-center">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          New Team
        </h3>
        <div class="mt-2">
          <input v-model="fullName" type="text" placeholder="Full Name"
            class="mt-2 p-2 w-full border rounded" />
          <input v-model="mail" type="text" placeholder="Mail"
            class="mt-2 p-2 w-full border rounded" />
          <input v-model="departmentArea" type="text" placeholder="Department/Area"
                  class="mt-2 p-2 w-full border rounded" />
          <input v-model="positionRole" type="text" placeholder="Position/Role"
            class="mt-2 p-2 w-full border rounded" />
          <textarea v-model="NotesOrComments" placeholder="Additional notes or comments"
            class="mt-2 p-2 w-full border rounded" rows="4"></textarea> 
        </div>
        </div>
        <div class="mt-4 flex justify-end">
        <button @click="closeModal" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mr-2">
          Close</button>
        <button @click="submitForm" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Save</button>
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
            fullName: '',/* projectName */
            mail: '',/* projectDescription */
            departmentArea: '',
            positionRole: '',
            NotesOrComments: '',
        };
    },
    methods: {
        closeModal() {
            this.$emit('update:isOpen', false);
        },
        submitForm() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!this.fullName || !this.mail || !this.departmentArea || !this.positionRole || !this.NotesOrComments) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'All fields are required!',
            });
        } else if (!emailRegex.test(this.mail)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error in the email!',
            });
        } else if (this.NotesOrComments.length > 200) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Notes or comments must be less than 200 characters!',
            });
        } else {
            // Aquí puedes agregar la lógica para manejar la información del formulario
            console.log('Form Team submitted');
            this.closeModal();
        }
        
    },
    },
};
</script>