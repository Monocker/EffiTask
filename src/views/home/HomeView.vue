<template>
    <div class="min-h-full">
        <NavBarComponent />
        <div class="lg:col-span-5 xl:col-span-6 flex flex-col">
            <div class="relative z-10 rounded-xl bg-white shadow-xl overflow-hidden my-auto xl:mt-18">
                <section>
                    <HeaderComponent @open-modal="showModal = true" />
                    <CardsComponent :tasks="tasks" />
                </section>
            </div>
        </div>
        <ModalComponent :isOpen="showModal" @update:isOpen="showModal = $event" :collaborators="collaborators"
            :user="user" />
    </div>
</template>

<script>
import NavBarComponent from '../../components/shared/NavBarComponent.vue';
import HeaderComponent from '../../components/home/dashboard/HeaderComponent.vue';
import CardsComponent from '../../components/home/dashboard/cards/CardsComponent.vue';
import ModalComponent from '../../components/home/dashboard/modal/ModalComponent.vue';
import { db, auth } from '../../core/services/firebase/firebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';


export default {
    components: {
        NavBarComponent,
        HeaderComponent,
        CardsComponent,
        ModalComponent,
    },
    data() {
        return {
            showModal: false,
            tasks: [], // Usar tasks en lugar de task
            collaborators: [],
            user: {},
            managerId: '', // Añade esta propiedad para almacenar el ID del manager
        };
    },
    created() {

        this.fetchTasks();
        this.fetchCollaborators();
        this.user = auth.currentUser; // Obtener el usuario actual al inicio
        this.setManagerId();
    },
    methods: {

        async fetchTasks() {
            const user = auth.currentUser;
            if (user) {
                const userId = user.uid;

                try {
                    const userDocRef = doc(db, 'users', userId);
                    const userDocSnap = await getDoc(userDocRef);

                    console.log('User data:', userDocSnap.data()); // Verificar datos del usuario

                    if (userDocSnap.exists()) {
                        const userRole = userDocSnap.data().role;
                        const collaboratorId = userDocSnap.data().collaboratorId;
                        console.log('User role:', userRole); // Verificar rol del usuario

                        let q;
                        if (userRole === 'manager') {
                            q = query(collection(db, 'tasks'), where('idManager', '==', userId));
                        }
                        if (userRole === 'employee' && collaboratorId) {
                            q = query(collection(db, 'tasks'), where('idCollaborator', '==', collaboratorId));
                        }

                        if (q) {
                            console.log('Query:', q); // Verificar consulta de tareas

                            onSnapshot(q, (querySnapshot) => {
                                const tasks = [];
                                querySnapshot.forEach((doc) => {
                                    tasks.push({ id: doc.id, ...doc.data() });
                                });
                                this.tasks = tasks;
                            }, (error) => {
                                console.error("Error al obtener las tareas: ", error);
                            });
                        } else {
                            console.log("No se encontró una consulta válida.");
                        }
                    } else {
                        console.log("No se encontraron datos del usuario.");
                    }
                } catch (error) {
                    console.error("Error al obtener el documento del usuario: ", error);
                }
            }
        },


        /*   async fetchTasks() {
              const user = auth.currentUser;
              if (user) {
                  const userId = user.uid;
  
                  try {
                      const userDocRef = doc(db, 'users', userId);
                      const userDocSnap = await getDoc(userDocRef);
  
                      console.log('User data:', userDocSnap.data()); // Verificar datos del usuario
  
                      if (userDocSnap.exists()) {
                          const userRole = userDocSnap.data().role;
                          const collaboratorId = userDocSnap.data().collaboratorId;
                          console.log('User role:', userRole); // Verificar rol del usuario
  
                          let q;
                          if (userRole === 'manager') {
                              q = query(collection(db, 'tasks'), where('idManager', '==', userId));
                          }
                          if (userRole === 'employee') {
                              q = query(collection(db, 'tasks'), where('idCollaborator', '==', collaboratorId));
                          }
  
                          console.log('Query:', q); // Verificar consulta de tareas
  
                          onSnapshot(q, (querySnapshot) => {
                              const tasks = [];
                              querySnapshot.forEach((doc) => {
                                  tasks.push({ id: doc.id, ...doc.data() });
                              });
                              this.tasks = tasks;
                          }, (error) => {
                              console.error("Error al obtener las tareas: ", error);
                          });
                      } else {
                          console.log("No se encontraron datos del usuario.");
                      }
                  } catch (error) {
                      console.error("Error al obtener el documento del usuario: ", error);
                  }
              }
          },
   */
        /*  async fetchTasks() {
             const user = auth.currentUser;
             if (user) {
                 const userId = user.uid;
 
                 try {
                     const userDocRef = doc(db, 'users', userId);
                     const userDocSnap = await getDoc(userDocRef);
 
                     if (userDocSnap.exists()) {
                         const userRole = userDocSnap.data().role;
 
                         let q;
                         if (userRole === 'manager') {
                             q = query(collection(db, 'tasks'), where('idManager', '==', userId));
                         }
                         if (userRole === 'employee') {
                             q = query(collection(db, 'tasks'), where('idCollaborator', '==', userId));
                         }
 
                         onSnapshot(q, (querySnapshot) => {
                             const tasks = [];
                             querySnapshot.forEach((doc) => {
                                 tasks.push({ id: doc.id, ...doc.data() });
                             });
                             this.tasks = tasks;
                         }, (error) => {
                             console.error("Error al obtener las tareas: ", error);
                         });
                     } else {
                         console.log("No se encontraron datos del usuario.");
                     }
                 } catch (error) {
                     console.error("Error al obtener el documento del usuario: ", error);
                 }
             }
         },
  */
        fetchCollaborators() {
            const user = auth.currentUser;
            if (user) {
                const managerId = user.uid;
                const q = query(collection(db, 'collaborators'), where('managerId', '==', managerId));

                onSnapshot(q, (querySnapshot) => {
                    const collaborators = [];
                    querySnapshot.forEach((doc) => {
                        collaborators.push({ id: doc.id, ...doc.data() });
                    });
                    this.collaborators = collaborators;
                });
            }
        },
        setManagerId() {
            const user = auth.currentUser;
            if (user) {
                this.managerId = user.uid;
            }
        },
    },
};
</script>