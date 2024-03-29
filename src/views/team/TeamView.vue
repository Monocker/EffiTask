<template>
    <div class="min-h-full">
        <!-- Hola desde el Team View -->
        <NavBarComponent/>
        
        <div class="lg:col-span-5 xl:col-span-6 flex flex-col">
            <div class="relative z-10 rounded-xl bg-white shadow-xl overflow-hidden my-auto xl:mt-18">
                <section>
                    <header class="rounded-t-xl space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
                        <div class="flex items-center justify-between">
                            <h2 class="font-semibold text-gray-900">Collaborators</h2>
                            <div
                                class="group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 cursor-pointer shadow-sm hover:bg-blue-400">
                                <svg width="20" height="20" fill="currentColor" class="mr-2">
                                    <path
                                        d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z">
                                    </path>
                                </svg>New
                            </div>
                        </div>
                        <div class="group relative rounded-md">
                            <svg width="20" height="20" fill="currentColor"
                                class="absolute left-3 top-1/2 -mt-2.5 text-gray-400 pointer-events-none group-focus-within:text-blue-500">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z">
                                </path>
                            </svg>
                            <input type="text" aria-label="Filter projects" placeholder="Filter collaborators..."
                                class="appearance-none w-full text-sm leading-6 bg-transparent text-gray-900 placeholder-gray-400 rounded-md py-2 pl-10 ring-1 ring-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        </div>
                    </header>
                    <div class="px-4 py-2">
                        <ul role="list" class="divide-y divide-gray-100">
                            <li v-for="person in people" :key="person.email" class="flex justify-between gap-x-6 py-5">
                                <div class="flex min-w-0 gap-x-4">
                                    <img class="h-12 w-12 flex-none rounded-full bg-gray-50" :src="person.imageUrl"
                                        alt="" />
                                    <div class="min-w-0 flex-auto">
                                        <p class="text-sm font-semibold leading-6 text-gray-900">{{ person.name }}</p>
                                        <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ person.email }}</p>
                                    </div>
                                </div>
                                <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                    <p class="text-sm leading-6 text-gray-900">{{ person.role }}</p>
                                    <p v-if="person.lastSeen" class="mt-1 text-xs leading-5 text-gray-500">
                                        Last seen <time :datetime="person.lastSeenDateTime">{{ person.lastSeen }}</time>
                                    </p>
                                    <div v-else class="mt-1 flex items-center gap-x-1.5">
                                        <div class="flex-none rounded-full bg-emerald-500/20 p-1">
                                            <div class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                        </div>
                                        <p class="text-xs leading-5 text-gray-500">Online</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

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

<script >
//import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
//import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import NavBarComponent from '../../components/home/dashboard/NavBarComponent.vue'
import { ref, onMounted } from 'vue';

// Define la variable reactiva dentro de setup
let isMenuOpen = ref(false);

// Cerrar el menú cuando se hace clic fuera de él
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
    NavBarComponent
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
        { name: 'Team', href: '/team', current: true },
        // más elementos de navegación...
      ],
      userNavigation: [
        { name: 'Your Profile', href: '#' },
        { name: 'Settings', href: '#' },
        { name: 'Sign out', href: '#' },
      ],
      people: [
    {
        name: 'Leslie Alexander',
        email: 'leslie.alexander@example.com',
        role: 'Co-Founder / CEO',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Michael Foster',
        email: 'michael.foster@example.com',
        role: 'Co-Founder / CTO',
        imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Dries Vincent',
        email: 'dries.vincent@example.com',
        role: 'Business Relations',
        imageUrl:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: null,
    },
    {
        name: 'Lindsay Walton',
        email: 'lindsay.walton@example.com',
        role: 'Front-end Developer',
        imageUrl:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Courtney Henry',
        email: 'courtney.henry@example.com',
        role: 'Designer',
        imageUrl:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Tom Cook',
        email: 'tom.cook@example.com',
        role: 'Director of Product',
        imageUrl:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: null,
    },
]
    }
  },
};
/* antes de ingresar people */

</script>