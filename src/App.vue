<!-- <script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script> -->

<template>
    <MainHeader />

    <RouterView />

    <MainFooter 
      :content1="['dd', 'cc']"
      :content2="msg"
      @callParentPay="pay"
    />
</template>

<script> 
import { RouterView } from 'vue-router'
import MainHeader from '@/components/MainHeader.vue'
import MainFooter from '@/components/MainFooter.vue'


// const imgUrl = new URL('./assets/imgs/cat.jpg', import.meta.url).href
// 這是取圖片的一種方法
export default {
  components:{
    RouterView,
    MainHeader,
    MainFooter,
  },
  data() {
    return {
      msg: 100,
    }
  },
  methods:{    
    pay(money){
      console.log('pay')
      this.msg += money
    }
  },
}
</script>