<!-- <script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script> -->

<script> 
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

//這一段是定義import圖片的方法
const imgUrl = new URL('./assets/imgs/cat.jpg', import.meta.url).href
export default {
  components:{
    HelloWorld
  },
  data() {
    return {
      imgUrl: imgUrl,
      list:[
        {url: 'product/shopcard-nc16.png', name:'prod_1'},
        {url: 'product/shopcard-nc17.png', name:'prod_2'},
        {url: 'product/shopcard-nc18.png', name:'prod_3'},
        {url: 'product/shopcard-nc19.png', name:'prod_4'},
      ],
      imgIndex: 16,
    }
  },
  methods:{
    getImageUrl(paths){
      return new URL(`./assets/imgs/${paths}`, import.meta.url).href
    },
    toggleImg(){
      if(this.imgIndex == 19){
        this.imgIndex = 16
      }else{
        this.imgIndex += 1
      }
    }
  },
  mounted() {
  }
}
</script>

<!-- 頁面路由route渲染的地方 -->
<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->
    <img src="@/assets/imgs/cat.jpg" alt="">
    <img :src="imgUrl" alt="">
    <img :src="getImageUrl('product/shopcard-nc16.png')" alt="" width="250">
    <!-- <img v-for="(item, index) in list" :src="getImageUrl(item.url)" alt="" :width="(index + 1)* 25"> -->
    <!-- <img src="@/assets/imgs/cat.jpg" alt=""> -->

    <div class="pro_card" v-for="item in list">
      <img :src="getImageUrl(item.url)" alt="" width="100">
      <p>{{item.name}}</p>
    </div>
    
    <!-- <div  class="change_card">
      <img :src="getImageUrl(`product/shopcard-nc${imgIndex}.png`)" alt="" width="400">
      <img v-for="item in list" :src="getImageUrl(item.url)" alt="" width="80" @click="imgIndex=">
    </div> -->

    <button @click="toggleImg">換圖</button>
    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/ProductList">Product</RouterLink>
        <RouterLink to="/Test">Test</RouterLink>
        <RouterLink to="/Login">Login</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
.pro_card{
  width: 25%;
  float: left;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.change_card{
  width: 200;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
