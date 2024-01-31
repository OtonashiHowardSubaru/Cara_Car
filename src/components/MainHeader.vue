<!-- 小龜老師看這裡 ↓↓ -->
<!-- 在這頁中有引用燈箱的store和component，這頁的header是手機板的nav，但在HomeView.vue檔中引用燈箱和MainHeader.vue就會變成有兩個燈箱，而且我修改燈箱的css他會影分身成兩個 -->
<template>
  <header class="mainHeader">
    <nav>
      <!-- 電腦版header -->
      <!-- 內頁才有這個LOGO圖 -->
      <!-- <img src="../assets/imgs/nav/nav-logo.png" alt="caraCarLogo" class="indexNavLogo">
      <ul class="indexHeaderNav">
        <li class="indexHeaderButton" v-for="(item, index) in img" :key="item" @mouseenter="changeImageTitle(index)"
          @mouseleave="resetImageTitle()">
          <RouterLink :to="name[index]">
            <img :src="getImageUrl(item.i)" class="indexHeaderButtonIcon" v-show="currentHoverIndex !== index">
            <div class="indexHeaderButtonP" v-if="currentHoverIndex === index">{{ title[index].p }}</div>
          </RouterLink>
        </li>
        <div class="line"></div>
        <div class="indexHeaderLogin">
          <img src="../assets/imgs/nav/nav-icon-Login.png" alt="login" class="indexHeaderButtonLogin"
            @click="openLightbox">
        </div>
      </ul> -->
      <!-- 手機板haeder -->
      <ul class="indexHeaderNavPh">
        <li class="indexHeaderButtonPh" v-for="(item, $index) in imgPh" :key="item">
          <RouterLink :to="namePh[$index]">
            <img :src="getImageUrl(item.i)" class="indexHeaderButtonIconPh">
            <div class="indexHeaderButtonPhP">{{ titlePh[$index].ph }}</div>
          </RouterLink>
        </li>
        <div class="linePh"></div>
        <div class="indexHeaderLoginPh">
          <img src="../assets/imgs/nav/nav-icon-Login-Ph.png" alt="login" class="indexHeaderButtonLoginPh"
            @click="openLightbox">
        </div>
      </ul>
    </nav>
  </header>
  <Transition name="fade">
        <LoginBox v-if="lightBoxStore.showLightbox"/>
    </Transition>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'pinia'; // mapActions pinia的方法，取得api的
import userStore from '@/stores/user.js'
import lightBoxStore from "@/stores/lightBox.js"
import LoginBox from '@/components/LoginBox.vue'
export default {
  components: {
    LoginBox,
    },
  data() {
    return {
      lightBoxStore: lightBoxStore(),
      username: '',
      psw6666: '',
      pswVisible: false,
      showLightbox: false,
      //header v-for v-show
      // currentTitle: '',
      // currentHoverIndex: -1,
      currentTitlePh: '',
      currentHoverIndexPh: -1,
      name: [
        '/ProductList',
        '/SecondHandList',
        '/Game',
        '/ShopInformation',
        '/MemberCenter',
        '/Cart',
      ],
      namePh: [
        '/ProductList',
        '/SecondHandList',
        '/ShopInformation',
        '/MemberCenter',
        '/Cart',
      ],
      // img: [
      //   { i: 'nav/nav-icon-01.png' },
      //   { i: 'nav/nav-icon-02.png' },
      //   { i: 'nav/nav-icon-03.png' },
      //   { i: 'nav/nav-icon-04.png' },
      //   { i: 'nav/nav-icon-05.png' },
      //   { i: 'nav/nav-icon-06.png' },
      // ],
      imgPh: [
        { i: 'nav/nav-icon-01.png' },
        { i: 'nav/nav-icon-02.png' },
        { i: 'nav/nav-icon-04.png' },
        { i: 'nav/nav-icon-05.png' },
        { i: 'nav/nav-icon-06.png' },
      ],
      // title:[
      //   {p:'PRODUCT'},
      //   {p:'2nd HAND'},
      //   {p:'GAME'},
      //   {p:'SHOP INFO'},
      //   {p:'MEMBER'},
      //   {p:'MY CART'},
      // ],
      titlePh: [
        { ph: 'PRODUCT' },
        { ph: '2nd HAND' },
        { ph: 'SHOP INFO' },
        { ph: 'MEMBER' },
        { ph: 'MY CART' },
      ],
      title: [
        { p: 'PRODUCT' },
        { p: '2nd HAND' },
        { p: 'GAME' },
        { p: 'SHOP INFO' },
        { p: 'MEMBER' },
        { p: 'MY CART' },
      ],
      titlePh: [
        { ph: 'PRODUCT' },
        { ph: '2nd HAND' },
        { ph: 'SHOP INFO' },
        { ph: 'MEMBER' },
        { ph: 'MY CART' },
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
    // changeImageTitle(index) {
    //   this.currentTitle = this.title[index].p;
    //   this.currentHoverIndex = index;
    // },
    // resetImageTitle() {
    //   this.currentHoverIndex = -1;
    // },
    changeImageTitlePh($index) {
      console.log('Index:', $index);
      console.log('titlePh[index]:', this.titlePh[$index]);

      if (this.titlePh[$index]) {
        this.currentTitle = this.titlePh[$index].ph;
        this.currentHoverIndexPh = $index;
      }
    },
    resetImageTitlePh() {
      this.currentHoverIndexPh = -1;
    },
    handleClick(e) {
      if (e.target.id === 'loginOverlay') {
        this.closeLightbox();
      } else if (e.target.tagName === 'A' && e.target.href.endsWith('/Register')) {
        this.$router.push('/Register');
        this.closeLightbox();
      }
    },
    openLightbox() {
      this.lightBoxStore.openLightbox()
    },
    closeLightbox() {
      this.lightBoxStore.closeLightbox()
    },
    ...mapActions(userStore, ['updateToken']),
    signin() {
      axios.post('https://fakestoreapi.com/auth/login', {
        username: "mor_2314",
        password: "83r5^_"
        // username: this.username,
        // password: this.psw6666,
      }, {
      })
        .then(response => {
          if (response.data && response.data.token) { //3
            localStorage.setItem('token', response.data.token)
            this.updateToken(response.data.token)
            // this.updateToken(123) //1 一定要寫在api轉譯的.then方法內
            // console.log('login'); //2
            this.$router.push('/')
          }
        })
        .catch(error => {
          console.error(error)
          this.updateToken('')
          //登入失敗
          //系統維護中
        });
      // pinia
      // this.updateToken(123) //1
      // console.log('login'); //2
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/layout/header.scss';
@import '@/assets/scss/layout/login.scss';
</style>
<!-- <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,1000&display=swap" rel="stylesheet"> -->
