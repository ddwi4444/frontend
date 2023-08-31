<template>
    <div class="dashboard">
      <h1>Dashboard</h1>
      <div class="statistic" v-for="stat in statistics" :key="stat.id">
        <h2>{{ stat.title }}</h2>
        <p>{{ stat.value }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "main-view",    data() {
      return {
        statistics: [
          { id: 1, title: 'Total Users', value: 1000 },
          { id: 2, title: 'Revenue', value: '$50,000' },
          { id: 3, title: 'Orders', value: 300 },
          { id: 4, title: 'Visitors', value: 5000 },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .dashboard {
    padding: 20px;
  }
  .statistic {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
  }
  </style>
  