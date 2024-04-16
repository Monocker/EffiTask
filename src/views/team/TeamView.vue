<template>
    <div class="min-h-full">
        <NavBarComponent />
        <div class="lg:col-span-5 xl:col-span-6 flex flex-col">
            <div class="relative z-10 rounded-xl bg-white shadow-xl overflow-hidden my-auto xl:mt-18">
                <section>
                    <THeaderComponent @open-modal="showModal = true" :role="role" />
                    <TListComponent :people="people" @select="handleSelect" />
                </section>
            </div>
        </div>
        <ModalComponent :isOpen="showModal" @update:isOpen="showModal = $event"
            :departmentOptions="departmentOptions" />
        <CollaboratorModalComponent :isOpen="showModalEdit" :person="selectedPerson"
            @update:isOpen="showModalEdit = $event" @update="fetchColaboradores" />
    </div>
</template>

<script>
import NavBarComponent from '../../components/shared/NavBarComponent.vue'
import THeaderComponent from '../../components/team/THeaderComponent.vue'
import TListComponent from '../../components/team/cards/TListComponent.vue'
import ModalComponent from '../../components/team/modal/ModalComponent.vue'
import { ref, onMounted } from 'vue';

import { db, auth } from '../../core/services/firebase/firebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import CollaboratorModalComponent from '@/components/team/modal/CollaboratorModalComponent.vue';

let isMenuOpen = ref(false);

onMounted(() => {
    document.addEventListener('click', closeMenuOnClickOutside);
});

const closeMenuOnClickOutside = (event) => {
    const menu = document.querySelector('.relative.ml-3');

    if (menu && !menu.contains(event.target)) {
        isMenuOpen.value = false;
    }
};

export default {
    components: {
        NavBarComponent,
        THeaderComponent,
        TListComponent,
        ModalComponent,
        CollaboratorModalComponent
    },
    data() {
        return {
            showModal: false,
            showModalEdit: false,
            selectedPerson: null,
            departmentOptions: [],
            userNavigation: [
                { name: 'Your Profile', href: '#' },
                { name: 'Settings', href: '#' },
                { name: 'Sign out', href: '#' },
            ],
            people: [],
            role: '',
        }
    },

    created() {
        this.fetchRole();
        this.fetchColaboradores();
       
    },

    methods: {
        async fetchRole() {
            const user = auth.currentUser;
            const userId = user.uid;

            const userDocRef = doc(db, 'users', userId);
            const userDocSnap = await getDoc(userDocRef);
            const userRole = userDocSnap.data().role;
            console.log('User role desde fetchRole:', userRole);
            this.role = userRole;
        },
        fetchColaboradores() {
            const user = auth.currentUser;
            if (user) {
                const managerId = user.uid;
                const q = query(collection(db, 'collaborators'), where('managerId', '==', managerId));

                onSnapshot(q, (querySnapshot) => {
                    const colaboradores = [];
                    querySnapshot.forEach((doc) => {
                        colaboradores.push({ id: doc.id, ...doc.data() });
                    });
                    this.people = colaboradores;
                });
            }
        },
        handleSelect(person) {
            this.selectedPerson = person;
            this.showModalEdit = true;
        },
    }

};

</script>

<style>
@media (max-width: 768px) {
    .hidden {
        display: none;
    }
}
</style>