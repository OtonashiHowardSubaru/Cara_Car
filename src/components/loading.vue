<!-- YourComponent.vue -->
<template>
    <div>
      <div v-if="isLoading" class="loading-spinner"></div>
      <!-- Your component content goes here -->
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    data() {
      return {
        isLoading: false,
      };
    },
    methods: {
      loadData() {
        this.isLoading = true;
        // Your data loading logic here
        // Upon completion, set isLoading to false
        setTimeout(() => {
          this.isLoading = false;
        }, 5000); // Adjust the timeout based on your needs
      },
    },
  };
  </script>