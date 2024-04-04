<template>
    <div class="px-4 py-2">
        <ul role="list" class="divide-y divide-gray-100">

            <TCardComponent v-for="person in people" :key="person.email" :person="person" />
        </ul>
    </div>
</template>

<script>
import TCardComponent from './TCardComponent.vue';

export default {
    components: {
        TCardComponent
    },
    props: {
        people: Array,
        user: Object
    }
};
</script>