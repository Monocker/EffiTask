<template>
    <div class="min-h-full">
        <NavBarComponent />
        <div class="lg:col-span-5 xl:col-span-6 flex flex-col">
            <div class="relative z-10 rounded-xl bg-white shadow-xl overflow-hidden my-auto xl:mt-18">
                <section>
                    <HeaderComponent />
                    <CardsComponent />
                </section>
            </div>
        </div>

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


export default {
    components: {
        NavBarComponent,
        HeaderComponent,
        CardsComponent
    },
    data() {
        return {
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
</script>