<template>
  <NavBarComponent />
  <div class="pt-16">
    <div class="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
      <div class="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
        <div class="md:pr-14">
          <div class="flex items-center">
            <h2 class="flex-auto font-semibold text-gray-900">{{ format(firstDayCurrentMonth, 'MMMM yyyy') }}</h2>
            <button type="button" @click="previousMonth" class="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
              <span class="sr-only">Previous month</span>
              <ChevronLeftIcon class="w-5 h-5" aria-hidden="true" />
            </button>
            <button @click="nextMonth" type="button" class="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
              <span class="sr-only">Next month</span>
              <ChevronRightIcon class="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
          <div class="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
            <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
          </div>
          <div class="grid grid-cols-7 mt-2 text-sm">
            <template v-for="(day, dayIdx) in days" :key="day.toString()">
              <div :class="dayClasses(day, dayIdx)">
                <button type="button" @click="setSelectedDay(day)" :class="buttonClasses(day)">
                  <time :dateTime="format(day, 'yyyy-MM-dd')">{{ day.getDate() }}</time>
                </button>
                <div class="w-1 h-1 mx-auto mt-1">
                  <div v-if="meetings.some(meeting => isSameDay(parseISO(meeting.startDatetime), day))" class="w-1 h-1 rounded-full bg-sky-500"></div>
                </div>
                <!-- <div class="w-1 h-1 mx-auto mt-1">
                  <div v-if="meetings.some(meeting => isSameDay(parseISO(meeting.endDateTime), day))" class="w-1 h-1 rounded-full bg-sky-500"></div>
                </div> -->
              </div>
            </template>
          </div>
        </div>
        <section class="mt-12 md:mt-0 md:pl-14">
          <h2 class="font-semibold text-gray-900">Schedule for 
            <time :dateTime="format(selectedDay, 'yyyy-MM-dd')">
              {{ format(selectedDay, 'MMM dd, yyyy') }}
            </time>
          </h2>
          <ol class="mt-4 space-y-1 text-sm leading-6 text-gray-500">
            <template v-if="selectedDayMeetings.length > 0">
              <li v-for="meeting in selectedDayMeetings" :key="meeting.id" class="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
                <img :src="meeting.imageUrl" alt="" class="flex-none w-10 h-10 rounded-full" />
                <div class="flex-auto">
                  <p class="text-gray-900">{{ meeting.name }}</p>
                  <p class="mt-0.5">
                    <time :dateTime="meeting.startDatetime">{{ format(parseISO(meeting.startDatetime), 'h:mm a') }}</time> - 
                    <time :dateTime="meeting.endDatetime">{{ format(parseISO(meeting.endDatetime), 'h:mm a') }}</time>
                  </p>
                </div>
              </li>
            </template>
            <p v-else>No meetings for today.</p>
          </ol>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { format ,parseISO, isSameDay, addMonths, startOfToday, eachDayOfInterval, endOfMonth, getDay, isToday } from 'date-fns';
import ChevronLeftIcon from '@heroicons/vue/24/solid/ChevronLeftIcon';
import ChevronRightIcon from '@heroicons/vue/24/solid/ChevronRightIcon';
import NavBarComponent from '../../components/shared/NavBarComponent.vue'

export default {
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
    NavBarComponent
  },
  setup() {

    const today = ref(startOfToday());
    const selectedDay = ref(today.value);
    const currentMonth = ref(new Date());
    const selectedDayMeetings = computed(() => {
      return meetings.value.filter(meeting => {
        const startDateTime = parseISO(meeting.startDatetime);
        //const endDateTime = parseISO(meeting.endDatetime);
        return isSameDay(startDateTime, selectedDay.value);
      });
    });
    // Sample meetings data, should be fetched or computed based on real data
    const meetings = ref([
    {
    id: 1,
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-05-11T13:00',
    endDatetime: '2024-05-11T14:30',
  },
  {
    id: 2,
    name: 'Michael Foster',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-05-20T09:00',
    endDatetime: '2024-05-20T11:30',
  },
  {
    id: 3,
    name: 'Dries Vincent',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-05-20T17:00',
    endDatetime: '2024-05-20T18:30',
  },
  {
    id: 4,
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-06-09T13:00',
    endDatetime: '2024-06-09T14:30',
  },
  {
    id: 5,
    name: 'Michael Foster',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-05-13T14:00',
    endDatetime: '2024-05-13T14:30',
  },
    ]);

    // Compute the first day of the current month
    const firstDayCurrentMonth = computed(() => {
      return new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth(), 1);
    });

    // Compute the days in the current month
    const days = computed(() => {
      return eachDayOfInterval({
        start: firstDayCurrentMonth.value,
        end: endOfMonth(firstDayCurrentMonth.value),
      });
    });

    // Compute the meetings for the selected day
    /* const selectedDayMeetings = computed(() => {
      return meetings.value.filter(meeting => 
        isSameDay(new Date(meeting.startDatetime), selectedDay.value)
      );
    }); */

    // Class bindings for day elements
    const dayClasses = (day, dayIdx) => {
      const colStart = getDay(day) === 0 ? dayIdx + 1 : '';
      return ['py-1.5', `col-start-${colStart}`].join(' ');
    };

    // Button classes binding
    const buttonClasses = (day) => {
      return [
        'mx-auto flex h-8 w-8 items-center justify-center rounded-full',
        isSameDay(day, selectedDay.value) ? 'bg-blue-500 text-white' : '',
        isToday(day) ? 'text-red-500' : 'text-gray-900',
        'hover:bg-blue-100'
      ].filter(Boolean).join(' ');
    };

    // Set the selected day
    const setSelectedDay = (day) => {
      selectedDay.value = day;
    };

    const testParseISO = () => {
      const date = parseISO('2024-05-20T09:00');
      console.log(date);
    };

    testParseISO();

    // Go to the previous month
    const previousMonth = () => {
      currentMonth.value = addMonths(currentMonth.value, -1);
    };

    // Go to the next month
    const nextMonth = () => {
      currentMonth.value = addMonths(currentMonth.value, 1);
    };

    

    return {
      currentMonth,
      days,
      meetings,
      nextMonth,
      previousMonth,
      selectedDay,
      selectedDayMeetings,
      setSelectedDay,
      firstDayCurrentMonth,
      dayClasses,
      buttonClasses,
      format,
      parseISO,
      isSameDay
    };
  }
};
</script>

<style>
/* Add your styles here */
</style>