<template>
    <li class="flex justify-between gap-x-6 py-5 px-5  hover:bg-blue-500 hover:ring-blue-500 hover:shadow-md"
        @click="$emit('select', person)">
        <div class="flex min-w-0 gap-x-4">
            <img class="h-12 w-12 flex-none rounded-full bg-gray-50" :src="person.imageUrl" alt="" />
            <div class="min-w-0 flex-auto">
                <p class="text-sm font-semibold leading-6 text-gray-900">{{ person.fullName }}</p>
                <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ person.mail }}</p>
            </div>
        </div>
        <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p class="text-sm leading-6 text-gray-900">{{ person.positionRole }}</p>
            <p v-if="person.lastSeen" class="mt-1 text-xs leading-5 text-gray-500">Last seen <time
                    :datetime="person.lastSeenDateTime">{{ person.lastSeen }}</time></p>
            <div v-else class="mt-1 flex items-center gap-x-1.5">
                <div class="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
                <p class="text-xs leading-5 text-gray-500">Online</p>
            </div>
        </div>
    </li>
</template>

<script>
export default {
    props: {
        person: Object
    }
};
</script>