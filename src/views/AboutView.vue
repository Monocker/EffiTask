<template>
  <div>
    <nav-bar-component />
    <!--  <hero-section-component /> -->
    <section class="bg-[#edf2fa] text-gray-700 body-font overflow-hidden">
      <div class="container mx-auto flex px-5 py-24 items-center justify-between">
        <!-- Contenido de texto -->
        <div class="flex-1 flex flex-col md:items-start md:text-left items-center text-center px-4">
          <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            We’re here to Increase your Productivity
          </h1>
          <p class="mb-8 leading-relaxed">
            Let’s make your work more organized and easily using the EffiTask Dashboard with many of the latest features
            in managing work every day.
          </p>
          <div class="flex justify-center">
            <button
              class="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg">
              <router-link to="/register">Try free trial</router-link>
            </button>
            <button
              class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
              <router-link to="/login">LogIn</router-link>
            </button>
          </div>
        </div>
        <!-- Imagen -->
        <div class="flex-1 hidden lg:block">
          <img class="object-cover object-center rounded" alt="hero"
            src="https://cdn.dribbble.com/userupload/4000360/file/original-b669b77dcb9663a55944d7864d09100a.jpg?resize=752x">
        </div>
      </div>
    </section>
    <!-- End Hero -->

    <!--  <features-section-component /> -->

    <!-- End Feature-Section -->

    <!-- <dashboard-preview-component /> -->
    <section class="text-gray-600 body-font">
      <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10">
          <img class="object-cover object-center rounded" alt="hero"
            src="https://cdn.dribbble.com/userupload/4000360/file/original-b669b77dcb9663a55944d7864d09100a.jpg?resize=752x">
        </div>
        <div
          class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h2 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Manage all your task more easily with Clean Design
          </h2>
          <p class="mb-8 leading-relaxed">
            We designed a dashboard design that's clean and easy to use. We also focus on user satisfaction so that we
            can fulfill what users need in the task manager dashboard.
          </p>
          <div class="flex justify-center">
            <button
              class="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- End dashboard -->

    <!-- <   /> -->

    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
        <h1 class="text-3xl font-medium title-font text-gray-900 mb-12 text-center">
          What Our Clients Say About Us
        </h1>
        <div class="flex overflow-x-scroll scrolling-touch -m-4">
          <div class="p-4 md:w-1/2 w-full flex-shrink-0">
            <div class="h-full bg-gray-100 p-8 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="block w-5 h-5 text-gray-400 mb-4"
                viewBox="0 0 975.036 975.036">
                <!-- SVG icon code -->
              </svg>
              <p class="leading-relaxed mb-6">
                Very nice dashboard, my team also felt comfortable when using it and our work becomes easier and more
                organized.
              </p>
              <a class="inline-flex items-center">
                <img alt="testimonial"
                  src="https://scontent.fcjs3-1.fna.fbcdn.net/v/t39.30808-6/245629017_104462088687983_1775584428165028897_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=QdHZNTGyskoAX-Jtltx&_nc_ht=scontent.fcjs3-1.fna&oh=00_AfA2XlwBzCP79HmJBcmyyCZ495sRxDw2lsOfSPUtok-2-w&oe=65FC907B"
                  class="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center">
                <span class="flex-grow flex flex-col pl-4">
                  <span class="title-font font-medium text-gray-900">Name Surname</span>
                  <span class="text-gray-500 text-sm">POSITION</span>
                </span>
              </a>
            </div>
          </div>
          <!-- More testimonials go here -->
          <div class="p-4 md:w-1/2 w-full flex-shrink-0">
            <div class="h-full bg-gray-100 p-8 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="block w-5 h-5 text-gray-400 mb-4"
                viewBox="0 0 975.036 975.036">
                <!-- SVG icon code -->
              </svg>
              <p class="leading-relaxed mb-6">
                Very nice dashboard, my team also felt comfortable when using it and our work becomes easier and more
                organized.
              </p>
              <a class="inline-flex items-center">
                <img alt="testimonial"
                  src="https://scontent.fcjs3-1.fna.fbcdn.net/v/t39.30808-6/245629017_104462088687983_1775584428165028897_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=QdHZNTGyskoAX-Jtltx&_nc_ht=scontent.fcjs3-1.fna&oh=00_AfA2XlwBzCP79HmJBcmyyCZ495sRxDw2lsOfSPUtok-2-w&oe=65FC907B"
                  class="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center">
                <span class="flex-grow flex flex-col pl-4">
                  <span class="title-font font-medium text-gray-900">Name Surname</span>
                  <span class="text-gray-500 text-sm">POSITION</span>
                </span>
              </a>
            </div>
          </div>

          <div class="p-4 md:w-1/2 w-full flex-shrink-0">
            <div class="h-full bg-gray-100 p-8 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="block w-5 h-5 text-gray-400 mb-4"
                viewBox="0 0 975.036 975.036">
                <!-- SVG icon code -->
              </svg>
              <p class="leading-relaxed mb-6">
                Very nice dashboard, my team also felt comfortable when using it and our work becomes easier and more
                organized.
              </p>
              <a class="inline-flex items-center">
                <img alt="testimonial"
                  src="https://scontent.fcjs3-1.fna.fbcdn.net/v/t39.30808-6/245629017_104462088687983_1775584428165028897_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=QdHZNTGyskoAX-Jtltx&_nc_ht=scontent.fcjs3-1.fna&oh=00_AfA2XlwBzCP79HmJBcmyyCZ495sRxDw2lsOfSPUtok-2-w&oe=65FC907B"
                  class="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center">
                <span class="flex-grow flex flex-col pl-4">
                  <span class="title-font font-medium text-gray-900">Name Surname</span>
                  <span class="text-gray-500 text-sm">POSITION</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- end  testimonials-section-->
    <footer-component />
    <!-- <footer-component /> -->

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FooterComponent from '../components/home/FooterComponent.vue';
import NavBarComponent from '../components/home/NavBarComponent.vue';
import router from '../router';


export default defineComponent({
  name: 'LandingPage',
  components: {

    NavBarComponent,
    FooterComponent,

  }
});

const navigateToLogin = () => {
  router.push('/login');
};

const navigateToRegister = () => {
  router.push('/register');
};
</script>

<style>
/* Add any specific styles you want for this component */
.scrolling-touch {
  -ms-overflow-style: none;
  /* Internet Explorer 10+ */
  scrollbar-width: none;
  /* Firefox */
}

.scrolling-touch::-webkit-scrollbar {
  display: none;
  /* Safari and Chrome */
}
</style>