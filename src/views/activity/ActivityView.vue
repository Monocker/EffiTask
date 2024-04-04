<template>
    <div class="container mx-auto">
        <HeaderActComponent/>
        <GraphActComponent/>
        <p class="text-lg font-bold">Your tasks</p>
        <CalendarActComponent/>
        <CardsActComponent/>

    </div>
  </template>
  
  <script>
  import HeaderActComponent from '../../components/activity/HeaderActComponent.vue';
  import GraphActComponent from '../../components/activity/bodyAct/GraphActComponent.vue';
  import CalendarActComponent from '../../components/activity/bodyAct/CalendarActComponent.vue';
  import CardsActComponent from '../../components/activity/bodyAct/CardsActComponent.vue';
  
  export default {
    components: {
        HeaderActComponent,
        GraphActComponent,
        CalendarActComponent,
        CardsActComponent
    }
  }
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  </style>
  