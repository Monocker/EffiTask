<template>
  <div
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center"
    v-show="isOpen">
    <div class="relative p-5 w-full max-w-md mx-auto rounded-md bg-white shadow-lg">
      <div class="mt-3 text-center">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          New Team
        </h3>
        <div class="mt-2">
          <input v-model="fullName" type="text" placeholder="Full Name" class="mt-2 p-2 w-full border rounded" />
          <input v-model="mail" type="text" placeholder="Mail" class="mt-2 p-2 w-full border rounded" />
          <input v-model="departmentArea" type="text" placeholder="Department/Area"
            class="mt-2 p-2 w-full border rounded" />
          <input v-model="positionRole" type="text" placeholder="Position/Role"
            class="mt-2 p-2 w-full border rounded" />
          <textarea v-model="notesOrComments" placeholder="Additional notes or comments"
            class="mt-2 p-2 w-full border rounded" rows="4"></textarea>
        </div>
      </div>
      <div class="mt-4 flex justify-end">
        <button @click="closeModal" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 mr-2">Close</button>
        <button @click="submitForm" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../../../core/services/firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
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
      fullName: '',
      mail: '',
      departmentArea: '',
      positionRole: '',
      notesOrComments: '',
    };
  },
  methods: {
    resetForm() {
      this.fullName = '';
      this.mail = '';
      this.departmentArea = '';
      this.positionRole = '';
      this.notesOrComments = '';
    },
    closeModal() {
      this.resetForm();
      this.$emit('update:isOpen', false);
    },
    async submitForm() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!this.fullName || !this.mail || !this.departmentArea || !this.positionRole || !this.notesOrComments) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'All fields are required!',
        });
        return;
      }

      if (!emailRegex.test(this.mail)) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error in the email!',
        });
        return;
      }

      if (this.notesOrComments.length > 200) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Notes or comments must be less than 200 characters!',
        });
        return;
      }

      try {
        // Aquí agregas el colaborador a la base de datos de Firebase
        const docRef = await addDoc(collection(db, "collaborators"), {
          fullName: this.fullName,
          mail: this.mail,
          departmentArea: this.departmentArea,
          positionRole: this.positionRole,
          notesOrComments: this.notesOrComments,
        });

        console.log("Document written with ID: ", docRef.id);

        // Aquí haces la solicitud POST al servidor para enviar el correo
        const response = await fetch('http://localhost:3000/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName: this.fullName,
            email: this.mail,
            subject: 'Bienvenido al grupo de trabajo',
            text: `Hola ${this.fullName}, bienvenido al departamento de ${this.departmentArea}. Tu rol será ${this.positionRole}. Notas: ${this.notesOrComments}`,
          }),
        });


        if (response.ok) {
          // Correo enviado con éxito
          Swal.fire({
            icon: 'success',
            title: 'Correo enviado',
            text: 'Se ha notificado al colaborador por correo electrónico.',
          });
        } else {
          // Error al enviar el correo
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo enviar el correo electrónico al colaborador.',
          });
        }

        this.resetForm();
        this.closeModal();
      } catch (error) {
        // Error al agregar el colaborador o al enviar el correo
        console.error("Error: ", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema durante la operación.',
        });
      }
    },
  },
};
</script>

<style scoped>
/* Tus estilos aquí */
</style>
