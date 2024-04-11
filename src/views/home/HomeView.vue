<template>
    <div class="min-h-full">
        <NavBarComponent />
        <div class="lg:col-span-5 xl:col-span-6 flex flex-col">
            <div class="relative z-10 rounded-xl bg-white shadow-xl overflow-hidden my-auto xl:mt-18">
                <section>
                    <HeaderComponent @open-modal="showModal = true" />
                    <CardsComponent :projects="projects" />
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
import { ref, onMounted, watch } from 'vue';
import { db, auth } from '../../core/services/firebase/firebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

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
            projects: [],
            collaborators: [],
            user: {},
            managerId: '', // Añade esta propiedad para almacenar el ID del manager
        };
    },
    created() {
        this.fetchProjects();
        this.fetchCollaborators();
        this.user = auth.currentUser; // Obtener el usuario actual al inicio
        this.setManagerId();
    },
    methods: {
        fetchProjects() {
            const user = auth.currentUser;
            if (user) {
                const managerId = user.uid;
                const q = query(collection(db, 'projects'), where('managerId', '==', managerId));

                onSnapshot(q, (querySnapshot) => {
                    const projects = [];
                    querySnapshot.forEach((doc) => {
                        projects.push({ id: doc.id, ...doc.data() });
                    });
                    this.projects = projects;
                });
            }
        },
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
