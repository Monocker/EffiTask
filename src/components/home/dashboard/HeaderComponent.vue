<template>
    <header class="rounded-t-xl space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
        <div class="flex items-center justify-between">
            <h2 class="font-semibold text-gray-900">Projects</h2>
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
            <input type="text" aria-label="Filter projects" placeholder="Filter projects..."
                class="appearance-none w-full text-sm leading-6 bg-transparent text-gray-900 placeholder-gray-400 rounded-md py-2 pl-10 ring-1 ring-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
    </header>
</template>

<script>
</script>

<style></style>