<!-- YourComponent.vue -->
<template>
  <div>
    <div class="container">
  <div class="container1">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>
  <div class="container2">
    <div class="dot shadow"></div>
    <div class="dot shadow"></div>
    <div class="dot shadow"></div>
  </div>
  </div>
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
<style>

</style>