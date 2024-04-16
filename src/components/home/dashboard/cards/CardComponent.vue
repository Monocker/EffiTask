<template>
    <li class="group cursor-pointer rounded-md p-3 bg-white ring-1 ring-gray-200 shadow-sm hover:bg-blue-500 hover:ring-blue-500 hover:shadow-md"
        @click="$emit('select', task)">
        <dl class="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
            <div>
                <dd class="font-semibold text-gray-900 group-hover:text-white">{{ task.projectName }}</dd>
            </div>
            <div>
                <dt class="sr-only">Category</dt>
                <dd class="group-hover:text-blue-200">{{ shortenedDescription }}</dd>
            </div>
            <div class="col-start-2 row-start-1 row-end-3">
                <dt class="sr-only">Users</dt>
                <dd class="flex justify-end -space-x-1.5">
                    <!-- <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
                        alt="" class="w-6 h-6 rounded-full bg-gray-100 ring-2 ring-white"> -->
                        <i class="material-icons ">account_circle</i>
                </dd>
            </div>
        </dl>
    </li>
</template>


<script>
export default {
    props: {
        task: {
            type: Object,
            default: () => ({})
        },
    },
    computed: {
        shortenedDescription() {
            if (this.task.description.length > 30) {
                return this.task.description.slice(0, 40) + '...';
            } else {
                return this.task.description;
            }
        }
    },
    mounted() {
        console.log('Task en CardComponent:', this.task);
    }
};
</script>


<style></style>