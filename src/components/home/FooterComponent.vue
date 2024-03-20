<template>
    <footer class="bg-blue-900 text-white">
        <div class="container px-5 py-6 mx-auto flex items-center justify-between">
            <a class="text-xl font-bold" href="#" aria-label="Back to Homepage">EffiTask</a>
            <div class="flex mt-4 md:mt-0">
                <a href="#features" class="ml-4">Features</a>
                <a href="#about" class="ml-4">About Us</a>
            </div>
            <div class="flex mt-4 md:mt-0">
                <a href="#support" class="ml-4">Support</a>
                <a href="#privacy-policy" class="ml-4">Privacy Policy</a>
                <a href="#terms" class="ml-4">Terms and Conditions</a>
            </div>
        </div>
        <div class="container mx-auto px-5">
            <div class="border-t border-gray-700"></div>
            <div class="flex flex-wrap items-center md:justify-between justify-center text-sm mt-4">
                <p class="text-gray-500 md:mb-0 mb-4">© 2024 EffiTask. All rights reserved.</p>
                <!-- Social Media Links Here -->
            </div>
        </div>
    </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'FooterComponent'
});
</script>

<style scoped>
footer a {
    transition: color 0.3s ease;
}

footer a:hover {
    color: #a0aec0;
}

@media (max-width: 768px) {
    footer .container {
        flex-direction: column;
        align-items: center;
    }

    footer a {
        margin-top: 0.5rem;
    }

    footer .border-t {
        width: 100%;
        margin-top: 0.5rem;
    }
}
</style>