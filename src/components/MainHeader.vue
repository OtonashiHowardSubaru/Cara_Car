<template>
  <header class="mainHeader">
    <nav>
      <ul class="indexHeaderNav">
        <li class="indexHeaderButton" v-for="(item, index) in img" :key="item">
            <RouterLink :to="name[index]">
              <img :src= "getImageUrl(item.i)" class="indexHeaderButtonIcon">
            </RouterLink>
        </li>
        <div class="line"></div>
        <div class="indexHeaderLogin">
          <a href="#">
            <img src="../assets/imgs/nav/nav-icon-Login.png" alt="" class="indexHeaderButtonLogin">
          </a>
        </div>
      </ul>

      <ul class="indexHeaderNavPh">
        <li class="indexHeaderButtonPh" v-for="item in img">
            <a href="#" class="indexHeaderA">
              <img :src= "getImageUrl(item.i)" class="indexHeaderButtonIconPh" >
                <!-- <p class="indexHeaderButtonP">PRODUCT</p> -->
            </a>
        </li>
        <div class="linePh"></div>
        <div class="indexHeaderLoginPh">
          <a href="#">
            <img src="../assets/imgs/nav/nav-icon-Login-Ph.png" alt="" class="indexHeaderButtonLoginPh">
          </a>
        </div>
      </ul>
    </nav>
  </header>
</template>

<script>
// import { VueElement } from 'vue';
// import { RouterLink, RouterView } from 'vue-router'
export default{
  // components: {
  //   RouterLink,
  //   RouterView,
  // },
  data(){
    return{
      name:[
        '/ProductList',
        '/SecondHandList',
        '/Game',
        '/ShopInformation',
        '/MemberCenter',
        '/Cart',
    ],
      img:[
        {i:'nav/nav-icon-01.png'},
        {i:'nav/nav-icon-02.png'},
        // {i:'nav/nav-icon-03.png'},
        {i:'nav/nav-icon-04.png'},
        {i:'nav/nav-icon-05.png'},
        {i:'nav/nav-icon-06.png'},
      ],
      // name:[
      //   {p:'PRODUCT'},
      //   {p:'2nd-HAND'},
      //   {p:'SHOP-INFO'},
      //   {p:'MEMBER'},
      //   {p:'MY-CART'},
      // ],
      // hover: false,
    }
  },
    methods:{
      getImageUrl(paths){
        return new URL(`../assets/imgs/${paths}`, import.meta.url).href
      }
    }
}
  
</script>

<style lang="scss" scoped>
@import '@/assets/scss/layout/header.scss';

</style>
