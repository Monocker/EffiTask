<template>
    <Disclosure as="nav" class="bg-gray-800 navbar">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 items-center justify-between">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <img class="h-8 w-8" src="../../assets/img/icon.png" alt="Your Company" />
                    </div>
                    <div class="hidden md:block">
                        <div class="ml-10 flex items-baseline space-x-4">
                            <a v-for="item in navigation" :key="item.name" :href="item.href"
                                :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']"
                                :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
                        </div>
                    </div>
                </div>
                <div class="hidden md:block">
                    <div class="ml-4 flex items-center md:ml-6">
                        <button type="button"
                            class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span class="absolute -inset-1.5" />
                            <span class="sr-only">View notifications</span>
                            <BellIcon class="h-6 w-6" aria-hidden="true" />
                        </button>

                        <AppMenu as="div" class="relative inline-block text-left z-50">
                            <MenuButton
                                class="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-opacity-30 focus:outline-none">
                                Opciones
                            </MenuButton>
                            <transition enter-active-class="transition ease-out duration-100"
                                enter-from-class="transform opacity-0 scale-95"
                                enter-to-class="transform opacity-100 scale-100"
                                leave-active-class="transition ease-in duration-75"
                                leave-from-class="transform opacity-100 scale-100"
                                leave-to-class="transform opacity-0 scale-95">
                                <MenuItems
                                    class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div class="py-1">
                                        <MenuItem as="template" v-slot="{ active }">
                                        <a :class="{ 'bg-gray-100': active }" @click="myAccout"
                                            class="block px-4 py-2 text-sm text-gray-700">Your Perfil</a>
                                        </MenuItem>
                                        <MenuItem as="template" v-slot="{ active }">
                                        <a :class="{ 'bg-gray-100': active }" href="#"
                                            class="block px-4 py-2 text-sm text-gray-700">Settings</a>
                                        </MenuItem>
                                        <MenuItem as="template" v-slot="{ active }">
                                        <a :class="{ 'bg-gray-100': active }" @click="signOut"
                                            class="block px-4 py-2 text-sm text-gray-700">Sign out</a>
                                        </MenuItem>
                                    </div>
                                </MenuItems>
                            </transition>
                        </AppMenu>
                    </div>
                </div>
                <div class="-mr-2 flex md:hidden">

                    <DisclosureButton
                        class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span class="absolute -inset-0.5" />
                        <span class="sr-only">Open main menu</span>
                        <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" /><!--  -->
                        <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" /><!--  -->
                    </DisclosureButton>
                </div>
            </div>
        </div>

        <DisclosurePanel class="md:hidden"><!-- Hola desde el disclosere -->
            <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href"
                    :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']"
                    :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
            </div>
            <div class="border-t border-gray-700 pb-3 pt-4">
                <div class="flex items-center px-5">
                    <div class="flex-shrink-0">
                        <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="" />
                    </div>
                    <div class="ml-3">
                        <div class="text-base font-medium leading-none text-white">{{ user.name }}</div>
                        <div class="text-sm font-medium leading-none text-gray-400">{{ user.email }}</div>
                    </div>
                    <button type="button"
                        class="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span class="absolute -inset-1.5" />
                        <span class="sr-only">View notifications</span>
                        <BellIcon class="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div class="mt-3 space-y-1 px-2">
                    <DisclosureButton v-for="item in userNavigation" :key="item.name"
                        @click="item.action ? item.action() : null"
                        class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                        {{ item.name }}
                    </DisclosureButton>
                </div>
            </div>
        </DisclosurePanel>
    </Disclosure>
</template>

<script>
import { ref } from 'vue';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { useRouter } from 'vue-router';
import { logoutUser } from '../../core/services/authentication/AuthentificationService';


import { defineComponent } from 'vue';

export default defineComponent({
    name: 'NavBarComponent',
    components: {
        Bars3Icon,
        BellIcon,
        XMarkIcon,
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
        AppMenu: Menu, // Usa Menu como AppMenu
        MenuButton,
        MenuItem,
        MenuItems
    },
    methods: {
        signOut() {
            logoutUser()
                .then(() => {
                    this.$router.push('/login');
                })
                .catch((error) => {
                    console.error('Error al cerrar sesión:', error);
                });
        },
        myAccout() {
            this.$router.push('/account');
        }
        // ...
    },

    setup() {
        const isOpen = ref(false);

        var router = useRouter();


        const signOut = async () => {
            try {
                logoutUser();
                router.push('/');
            } catch (error) {
                console.error('Error al cerrar sesión:', error);

            }
        };
        const myAccout = async () => {
            try {

                router.push('/account');
            } catch (error) {
                console.error('Error al cerrar sesión:', error);

            }
        };


        const user = ref({
            name: 'Tom Cook',
            email: 'tom@example.com',
            imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        });

        const navigation = ref([
            { name: 'Dashboard', href: '/dashboard', current: false },
            { name: 'Team', href: '/team', current: false },
            { name: 'Projects', href: '#', current: false },
            { name: 'Calendar', href: '/calendar', current: false },
            { name: 'Reports', href: '#', current: false }
        ]);

        const userNavigation = ref([
            { name: 'Your Profile', action: myAccout },
            { name: 'Settings', href: '#' },
            { name: 'Sign out', action: signOut }
        ]);

        const toggleMenu = () => {
            isOpen.value = !isOpen.value;
        };

        return {
            isOpen,
            user,
            navigation,
            userNavigation,
            toggleMenu
        };
    },
});
</script>

<style>
.navbar {
    z-index: 50;
}
</style>