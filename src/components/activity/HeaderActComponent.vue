<template>
    <a href="/dashboard" class="flex items-center px-2 py-1 mb-4">
      <i class="material-icons mr-1">arrow_back</i>
      <span class="text-xl font-bold">{{ title }}</span>
    </a>
  </template>
  
  <script>
  export default {
    data() {
      return {
        title: 'Activity'
      };
    }
  }
  </script>
  
  <style scoped>
  </style>
  