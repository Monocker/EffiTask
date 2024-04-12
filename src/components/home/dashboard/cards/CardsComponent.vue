<template>
    <ul
        class="bg-gray-50 p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 text-sm leading-6">
        <CardComponent v-for="task in tasks" :key="task.id" :task="task" />
    </ul>
</template>

<script>
import CardComponent from './CardComponent.vue';

export default {
    components: {
        CardComponent
    },
    props: {
        tasks: Array,
    }
};
</script>