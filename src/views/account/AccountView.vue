<template>
    <div class="min-h-screen bg-gray-100">
        <NavBarComponent />
        <div class="py-10">
            <header>
                <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 class="text-3xl font-bold leading-tight text-gray-900">Account</h1>
                </div>
            </header>
            <main>
                <div class="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    <!-- Profile card -->
                    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div class="px-4 py-5 sm:px-6">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-10 w-10">
                                    <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="" />
                                </div>
                                <div class="ml-4">
                                    <h3 class="text-lg leading-6 font-medium text-gray-900">{{ user.ownerName }}</h3>
                                    <p class="text-sm text-gray-500">{{ user.email }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="border-t border-gray-200">
                            <dl>
                                <!-- Add your fields here -->
                                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">Job title</dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ user.jobTitle }}
                                    </dd>
                                </div>
                                <!-- More fields... -->
                            </dl>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import NavBarComponent from '../../components/shared/NavBarComponent.vue';
import { ref, onMounted } from 'vue';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../core/services/firebase/firebaseConfig';

export default {
    components: {
        NavBarComponent,
    },
    setup() {
        const auth = getAuth();
        const user = ref({
            ownerName: '',
            email: '',
            imageUrl: '',
            jobTitle: '',
            // Add other fields
        });

        onMounted(async () => {
            const userDoc = doc(db, 'users', auth.currentUser.uid);
            const userSnapshot = await getDoc(userDoc);
            if (userSnapshot.exists()) {
                user.value = userSnapshot.data();
            }
        });

        return { user };
    },
};
</script>