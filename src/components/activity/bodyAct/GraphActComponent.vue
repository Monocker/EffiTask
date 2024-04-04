<template>
    <div class="chart-container mb-2">
      <div style="position: relative;">
        <canvas id="myChart" width="150" height="150"></canvas>
        <div class="chart-label">
          <span>{{ percentage }}</span>
        </div>
      </div>
      <div>
        <p class="text-sm">
          <span class="color-box" style="background-color: #A0AEC0;"></span>
          <span>{{ pending }}</span> pending
        </p>
        <p class="text-sm">
          <span class="color-box" style="background-color: #4F46E5;"></span>
          <span>{{ inProgress }}</span> in progress
        </p>
        <p class="text-sm">
          <span class="color-box" style="background-color: #48BB78;"></span>
          <span>{{ completed }}</span> completed
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js/auto';
  
  export default {
    data() {
      return {
        percentage: '40%', 
        pending: 12,
        inProgress: 28,
        completed: 20
      };
    },
    mounted() {
      this.renderChart();
    },
    methods: {
      renderChart() {
        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Pending', 'In Progress', 'Completed'],
            datasets: [{
              data: [this.pending, this.inProgress, this.completed],
              backgroundColor: ['#A0AEC0', '#4F46E5', '#48BB78'],
              borderWidth: 0
            }]
          },
          options: {
            cutout: '70%',
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                enabled: false
              }
            }
          }
        });
      }
    }
  }
  </script>
  
  <style scoped>
  .chart-container {
    display: flex;
    justify-content: space-between;
  }
  
  .chart-label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    font-weight: bold;
  }
  
  .chart-label span {
    color: black;
  }
  
  .color-box {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 5px;
  }
  
  .text-sm {
    font-size: 14px;
    margin-bottom: 5px;
  }
  </style>
  