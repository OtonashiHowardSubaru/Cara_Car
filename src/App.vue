<template>
  <!-- <MainHeader /> -->
  <!-- <div>{{ VITE_IMG_BASE_URL }}</div> -->
  <RouterView />

  <MainFooter />
</template>

<script>
import { RouterView } from "vue-router";
// import MainHeader from '@/components/Header.vue'
import MainFooter from "@/components/MainFooter.vue";

export default {
  components: {
    RouterView,
    // MainHeader,
    MainFooter,
  },
  data() {
    return {
      // VITE_IMG_BASE_URL: import.meta.env.VITE_IMG_BASE_URL
    };
  },
  methods: {},
};
</script>
