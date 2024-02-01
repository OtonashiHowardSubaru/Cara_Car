<template>
    <!-- <MainHeader /> -->

    <RouterView />

    <MainFooter />
</template>

<script> 
import { RouterView } from 'vue-router'
// import MainHeader from '@/components/Header.vue'
import MainFooter from '@/components/MainFooter.vue'

export default {
  components:{
    RouterView,
    // MainHeader,
    MainFooter,
  },
  data() {
    return {
      
    }
  },
  methods:{    
  },
}
</script>