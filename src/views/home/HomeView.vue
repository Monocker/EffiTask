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
        <ModalComponent :isOpen="showModal" @update:isOpen="showModal = $event" :collaborators="collaborators" />
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
        };
    },
    created() {
        this.fetchProjects();
        this.fetchCollaborators();
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
    },
};
</script>


<!-- <template>
    <div class="min-h-full">
        <NavBarComponent />
        <div class="lg:col-span-5 xl:col-span-6 flex flex-col">
            <div class="relative z-10 rounded-xl bg-white shadow-xl overflow-hidden my-auto xl:mt-18">
                <section>
                    <HeaderComponent @open-modal="showModal = true" />

                    <CardsComponent />
                </section>
            </div>
        </div>
        <ModalComponent :isOpen="showModal" @update:isOpen="showModal = $event" />
    </div>
</template>

<style>
@media (max-width: 768px) {
    .hidden {
        display: none;
    }
}
</style>

<script>

import NavBarComponent from '../../components/shared/NavBarComponent.vue'
import CardsComponent from '../../components/home/dashboard/cards/CardsComponent.vue';
import HeaderComponent from '../../components/home/dashboard/HeaderComponent.vue'
import ModalComponent from '../../components/home/dashboard/modal/ModalComponent.vue'


export default {
    components: {
        NavBarComponent,
        HeaderComponent,
        CardsComponent,
        ModalComponent
    },
    data() {
        return {
            showModal: false,
            user: {
                name: 'Tom Cook',
                email: 'tom@example.com',
                imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
            navigation: [
                { name: 'Dashboard', href: '/dashboard', current: false },
                { name: 'Team', href: '/team', current: false },
                // más elementos de navegación...
            ],
            userNavigation: [
                { name: 'Your Profile', href: '#' },
                { name: 'Settings', href: '#' },
                { name: 'Sign out', href: '#' },
            ],
            // cualquier otra data que necesites
        }
    },
};
</script> -->