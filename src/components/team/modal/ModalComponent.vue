<template>
  <div
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center"
    v-show="isOpen">
    <div class="relative p-5 w-full max-w-md mx-4 sm:mx-auto rounded-md bg-white shadow-lg">
      <div class="mt-3 text-center">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          New Team
        </h3>
        <div class="mt-2">
          <input v-model="fullName" type="text" placeholder="Full Name" class="mt-2 p-2 w-full border rounded" />
          <input v-model="mail" type="text" placeholder="Mail" class="mt-2 p-2 w-full border rounded" />

          <select v-model="departmentAreaSelect" class="mt-2 p-2 w-full border rounded">
            <option v-for="department in localDepartmentOptions" :key="department" :value="department">
              {{ department }}
            </option>
          </select>


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
import { db, auth } from '../../../core/services/firebase/firebaseConfig';
import { collection, addDoc, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    departmentOptions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      fullName: '',
      mail: '',
      departmentAreaSelect: '', // Nueva variable para el select
      positionRole: '',
      notesOrComments: '',
      localDepartmentOptions: [],
    };
  },

  async mounted() {
    this.localDepartmentOptions = [...this.departmentOptions]; // Copiar la prop a una variable local
    await this.fetchUserDepartments();
  },
  methods: {
    async fetchUserDepartments() {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          this.localDepartmentOptions = userDoc.data().departments || [];
        } else {
          console.error('El documento del usuario no existe');
          // Manejar el caso de que el usuario no tenga documento/departmentos
        }
      }
    },
    generateToken(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let token = '';
      for (let i = 0; i < length; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return token;
    },

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

      if (!this.fullName || !this.mail || !this.departmentAreaSelect || !this.positionRole || !this.notesOrComments) {
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
        const user = auth.currentUser;
        const managerId = user ? user.uid : null;
        const token = this.generateToken(8);

        // Verifica si el correo ya existe en la colección 'collaborators'
        const collaboratorsRef = collection(db, "collaborators");
        const q = query(collaboratorsRef, where("mail", "==", this.mail));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Ya existe un colaborador con este correo electrónico
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ya existe un colaborador con este correo electrónico.',
          });
          return;
        }

        // Intenta enviar el correo electrónico primero
        const response = await fetch('http://localhost:3000/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName: this.fullName,
            email: this.mail,
            subject: 'Bienvenido al grupo de trabajo',
            html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ECECEC; border-radius: 10px; text-align: center; color: #333;">
          <div style="margin-bottom: 25px;">
            <img src="https://th.bing.com/th/id/OIG2.QF70uYUWT6iCTLd9rLJj?pid=ImgGn" alt="Logo" style="width: 80px;" />
          </div>
          <h1 style="color: #4A90E2; margin-bottom: 25px;">Verifica Tu Email</h1>
          <p style="margin-bottom: 25px;">Gracias por registrarte en EffiTask. Estamos felices de tenerte con nosotros.</p>
          <p style="margin-bottom: 25px;">Por favor, toma un segundo para asegurarte que tenemos tu dirección de correo electrónico correcta.</p>
          <a href="http://localhost:5173/registro?token=${token}" style="background-color: #4A90E2; color: white; padding: 15px 30px; border-radius: 5px; text-decoration: none; display: inline-block; font-weight: bold;">Confirmar tu dirección de correo</a>
          <p style="font-size: 0.9em; color: #666; margin-top: 25px;">Si no te registraste en EffiTask, por favor ignora este mensaje.</p>
          <hr style="margin-top: 30px; border: none; border-top: 1px solid #ECECEC;" />
          <div style="font-size: 0.8em; color: #666; margin-top: 20px;">
            <a href="http://www.tu-sitio-web.com/politica-de-privacidad" style="color: #4A90E2; text-decoration: none; margin-right: 20px;">Política de Privacidad</a>
            <a href="http://www.tu-sitio-web.com/ayuda" style="color: #4A90E2; text-decoration: none; margin-right: 20px;">Ayuda</a>
            <a href="http://www.tu-sitio-web.com/sobre-nosotros" style="color: #4A90E2; text-decoration: none;">Sobre Nosotros</a>
          </div>
        </div>`
          }),
        });

        if (!response.ok) {
          // Error al enviar el correo
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo enviar el correo electrónico al colaborador.',
          });
          return;
        }

        // Si el correo se envió con éxito, agrega el colaborador a la base de datos
        const docRef = await addDoc(collaboratorsRef, {
          fullName: this.fullName,
          mail: this.mail,
          departmentArea: this.departmentAreaSelect,
          positionRole: this.positionRole,
          notesOrComments: this.notesOrComments,
          managerId: managerId,
          token: token
        });

        console.log("Document written with ID: ", docRef.id);

        // Correo enviado con éxito
        Swal.fire({
          icon: 'success',
          title: 'Correo enviado',
          text: 'Se ha notificado al colaborador por correo electrónico.',
        });

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


<!-- <template>
  <div
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center"
    v-show="isOpen">
    <div class="relative p-5 w-full max-w-md mx-4 sm:mx-auto rounded-md bg-white shadow-lg">
      <div class="mt-3 text-center">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          New Team
        </h3>
        <div class="mt-2">
          <input v-model="fullName" type="text" placeholder="Full Name" class="mt-2 p-2 w-full border rounded" />
          <input v-model="mail" type="text" placeholder="Mail" class="mt-2 p-2 w-full border rounded" />
          <input v-model="departmentArea" type="text" placeholder="Department/Area"
            class="mt-2 p-2 w-full border rounded" />
          <select v-model="departmentArea" class="mt-2 p-2 w-full border rounded">
            <option v-for="department in departmentOptions" :key="department" :value="department">
              {{ department }}
            </option>
          </select>

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
import { db, auth } from '../../../core/services/firebase/firebaseConfig';
import { collection, addDoc, query, where, getDocs, doc } from 'firebase/firestore';
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
      departmentOptions: [],
    };
  },
  async mounted() {
    await this.fetchUserDepartments(); // Asegúrate de que esta sea la función correcta.
  },
  methods: {
    async fetchUserDepartments() {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          this.departmentOptions = userDoc.data().departments || [];
        } else {
          console.error('El documento del usuario no existe');
          // Manejar el caso de que el usuario no tenga documento/departmentos
        }
      }
    },
    generateToken(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let token = '';
      for (let i = 0; i < length; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return token;
    },

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
        const user = auth.currentUser;
        const managerId = user ? user.uid : null;
        const token = this.generateToken(8);

        // Verifica si el correo ya existe en la colección 'collaborators'
        const collaboratorsRef = collection(db, "collaborators");
        const q = query(collaboratorsRef, where("mail", "==", this.mail));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Ya existe un colaborador con este correo electrónico
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ya existe un colaborador con este correo electrónico.',
          });
          return;
        }

        // Intenta enviar el correo electrónico primero
        const response = await fetch('http://localhost:3000/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName: this.fullName,
            email: this.mail,
            subject: 'Bienvenido al grupo de trabajo',
            html: `
            <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ECECEC; border-radius: 10px; text-align: center; color: #333;">
              <div style="margin-bottom: 25px;">
                <img src="https://th.bing.com/th/id/OIG2.QF70uYUWT6iCTLd9rLJj?pid=ImgGn" alt="Logo" style="width: 80px;" />
              </div>
              <h1 style="color: #4A90E2; margin-bottom: 25px;">Verifica Tu Email</h1>
              <p style="margin-bottom: 25px;">Gracias por registrarte en EffiTask. Estamos felices de tenerte con nosotros.</p>
              <p style="margin-bottom: 25px;">Por favor, toma un segundo para asegurarte que tenemos tu dirección de correo electrónico correcta.</p>
              <a href="http://localhost:5173/registro?token=${token}" style="background-color: #4A90E2; color: white; padding: 15px 30px; border-radius: 5px; text-decoration: none; display: inline-block; font-weight: bold;">Confirmar tu dirección de correo</a>
              <p style="font-size: 0.9em; color: #666; margin-top: 25px;">Si no te registraste en EffiTask, por favor ignora este mensaje.</p>
              <hr style="margin-top: 30px; border: none; border-top: 1px solid #ECECEC;" />
              <div style="font-size: 0.8em; color: #666; margin-top: 20px;">
                <a href="http://www.tu-sitio-web.com/politica-de-privacidad" style="color: #4A90E2; text-decoration: none; margin-right: 20px;">Política de Privacidad</a>
                <a href="http://www.tu-sitio-web.com/ayuda" style="color: #4A90E2; text-decoration: none; margin-right: 20px;">Ayuda</a>
                <a href="http://www.tu-sitio-web.com/sobre-nosotros" style="color: #4A90E2; text-decoration: none;">Sobre Nosotros</a>
              </div>
            </div>`
          }),
        });

        if (!response.ok) {
          // Error al enviar el correo
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo enviar el correo electrónico al colaborador.',
          });
          return;
        }

        // Si el correo se envió con éxito, agrega el colaborador a la base de datos
        const docRef = await addDoc(collaboratorsRef, {
          fullName: this.fullName,
          mail: this.mail,
          departmentArea: this.departmentArea,
          positionRole: this.positionRole,
          notesOrComments: this.notesOrComments,
          managerId: managerId,
          token: token
        });

        console.log("Document written with ID: ", docRef.id);

        // Correo enviado con éxito
        Swal.fire({
          icon: 'success',
          title: 'Correo enviado',
          text: 'Se ha notificado al colaborador por correo electrónico.',
        });

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
 -->