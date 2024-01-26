<script>
import axios from 'axios';
import { mapActions } from 'pinia'; // mapActions pinia的方法，取得api的
import userStore from '@/stores/user.js'
export default {
  // components: {
  // },
data() {
return {
    username: '',
    psw6666: '',
    passwordVisible: false,
    //header v-for v-show
    currentTitle: '',
    currentHoverIndex: -1,
    name: [
    '/ProductList',
    '/SecondHandList',
    '/Game',
    '/ShopInformation',
    '/MemberCenter',
    '/Cart',
    ],
    img: [
    { i: 'nav/nav-icon-01.png' },
    { i: 'nav/nav-icon-02.png' },
    { i: 'nav/nav-icon-03.png' },
    { i: 'nav/nav-icon-04.png' },
    { i: 'nav/nav-icon-05.png' },
    { i: 'nav/nav-icon-06.png' },
    ],
    title:[
    {p:'PRODUCT'},
    {p:'2nd HAND'},
    {p:'GAME'},
    {p:'SHOP INFO'},
    {p:'MEMBER'},
    {p:'MY CART'},
    ],
    
}
},
// created() {
//   this.axiosGetData();
// },
methods: {
getImageUrl(paths) {
    return new URL(`../assets/imgs/${paths}`, import.meta.url).href
},
changeImageTitle(index) {
    this.currentTitle = this.title[index].p;
    this.currentHoverIndex = index;
},
resetImageTitle() {
    this.currentHoverIndex = -1;
},


},
}

</script>

<template>
<header class="mainHeader">
<nav>
    <!-- 電腦版header -->
    <!-- 內頁才有這個LOGO圖 -->
    <RouterLink to="/">
        <img src="../assets/imgs/nav/nav-logo.png" alt="caraCarLogo" class="indexNavLogo">
    </RouterLink>
    <ul class="indexHeaderNav">
    <li class="indexHeaderButton" v-for="(item, index) in img" :key="item" @mouseenter="changeImageTitle(index)" @mouseleave="resetImageTitle()">
        <RouterLink :to="name[index]">
        <img :src="getImageUrl(item.i)" class="indexHeaderButtonIcon" v-show="currentHoverIndex !== index">
        <div class="indexHeaderButtonP" v-if="currentHoverIndex === index">{{ title[index].p }}</div>
        </RouterLink>
    </li>
    <div class="line"></div>
    <div class="indexHeaderLogin">
        <img src="../assets/imgs/nav/nav-icon-Login.png" alt="login" class="indexHeaderButtonLogin" @click="openModal">
    </div>
    </ul>
</nav>
</header>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/layout/header.scss';
// @import '@/assets/scss/layout/login.scss';
</style>
<!-- <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,1000&display=swap" rel="stylesheet"> -->
