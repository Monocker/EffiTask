<template>
  <nav class="bg-white shadow">
    <div class="container mx-auto px-6 py-3 flex justify-between items-center">
      <a class="text-gray-800 text-xl font-bold hover:text-gray-700" href="#">EffiTask</a>
      <div class="flex items-center">
        <button @click="toggleMenu" class="md:hidden text-gray-500 hover:text-gray-600 focus:outline-none">
          <svg viewBox="0 0 24 24" class="h-6 w-6 fill-current">
            <path fill-rule="evenodd" d="M4 5h16v2H4V5zm0 6h16v2H4v-2zm0 6h16v2H4v-2z"></path>
          </svg>
        </button>
      </div>
      <div :class="{ 'hidden': !isOpen, 'flex': isOpen }" class="w-full md:flex md:items-center md:justify-between">
        <div class="flex flex-col md:flex-row md:mx-6">
          <a class="my-1 text-gray-700 hover:text-blue-500 md:mx-4 md:my-0" href="#">Features</a>
          <a class="my-1 text-gray-700 hover:text-blue-500 md:mx-4 md:my-0" href="#">About Us</a>
        </div>
        <div class="flex justify-center md:block">
          <a class="relative text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 md:ml-4 rounded" href="#">
            <router-link to="/register">
              Get Started
            </router-link></a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { ref } from 'vue';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'NavBarComponent',
  setup() {
    const isOpen = ref(false);

    const toggleMenu = () => {
      isOpen.value = !isOpen.value;
    };

    return { isOpen, toggleMenu };
  },
});
</script>

<style>
@media (max-width: 768px) {
  .hidden {
    display: none;
  }
}
</style>
