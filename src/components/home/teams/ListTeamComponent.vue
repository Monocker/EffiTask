<template>
    <ul class="bg-gray-50 p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 text-sm leading-6">
        <CardTeamComponent v-for="(card, index) in cards" :key="index" :title="card.title" :category="card.category" />
    </ul>
    </template>

    <script>
    import CardTeamComponent from './CardTeamComponent.vue';

    export default {
    components: {
        CardTeamComponent
    },
    data() {
        return {
        cards: [
            { title: 'API Integration', category: 'Engineering' },
            { title: 'ETravelGuide', category: 'Se Cayó ):' },
            { title: 'Prueba', category: 'Otra Categoria' }
        ]
        };
    }
    };
    </script>

    <style>
    </style>
