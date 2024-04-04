<template>
    <div class="calendar">
      <div
        v-for="date in calendarDates"
        :key="date.number"
        :class="{ 'date': true, 'highlighted': date.number === highlightedDate, 'grayed': date.number !== highlightedDate }"
      >
        <div class="date-content">
          <span class="day">{{ date.day }}</span>
          <span class="number">{{ date.number }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        calendarDates: this.generateCalendarDates(),
        highlightedDate: '12'
      };
    },
    methods: {
      generateCalendarDates() {
        return [
          { day: 'Sun', number: '8' },
          { day: 'Mon', number: '9' },
          { day: 'Tue', number: '10' },
          { day: 'Wed', number: '11' },
          { day: 'Thu', number: '12' },
          { day: 'Fri', number: '13' },
          { day: 'Sat', number: '14' }
        ];
      }
    }
  }
  </script>
  
  <style scoped>
  .calendar {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  
  .date {
    width: calc(100% / 7 - 8px);
    height: 100px;
    margin-right: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #d2d6dc;
    background-color: #edf2f7;
    border-radius: 20px;
  }
  
  .highlighted {
    background-color: #4299e1;
    color: #fff;
  }
  
  .grayed {
    background-color: #cbd5e0;
    color: #4a5568;
  }
  
  .date-content {
    display: flex;
    flex-direction: column;
  }
  
  .day,
  .number {
    margin-bottom: 5px;
  }
  </style>
  