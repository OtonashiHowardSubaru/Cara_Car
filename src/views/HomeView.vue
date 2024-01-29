<script>
export default {
  data() {
    return{
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
  methods:{
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
  mounted() {
    
  }
}
</script>


<template>
  <header class="mainHeader">
    <nav>
      <!-- 電腦版header -->
      <ul class="indexHeaderNav">
        <li class="indexHeaderButton" v-for="(item, index) in img" :key="item" @mouseenter="changeImageTitle(index)" @mouseleave="resetImageTitle()">
          <RouterLink :to="name[index]">
            <img :src="getImageUrl(item.i)" class="indexHeaderButtonIcon" v-show="currentHoverIndex !== index">
            <div class="indexHeaderButtonP" v-if="currentHoverIndex === index">{{ title[index].p }}</div>
          </RouterLink>
        </li>
        <div class="line"></div>
        <div class="indexHeaderLogin">
          <img src="../assets/imgs/nav/nav-icon-Login.png" alt="login" class="indexHeaderButtonLogin" @click="openLightbox">
        </div>
      </ul>
    </nav>
  </header>

  <div class="indexBannerGroup">
    <img src="../assets/imgs/index/indexBannerImg.png" alt="" class="indexBannerImg">
    <h1 class="indexBannerTitle">每一次轉彎，</h1>
    <h2 class="indexBannerTitle2">都是新的發現！</h2>
    <RouterLink class="RouterLink" to="/">
    <img src="../assets/imgs/nav/nav-logo.png" alt="" class="indexLogo">
    </RouterLink>
    <div class="indexBannerBagBlock"></div>
  </div>
  

  <div class="indexGameGroup">
      <img src="../assets/imgs/index/indexGameTitle.png" alt="" class="indexGameTitle">
      <div class="indexGameBagBlock"></div>
      <img src="../assets/imgs/index/indexGameImg.png" alt="GameImg" class="indexGameImg">
      <div class="indexGameButton">
        <button class="indexGameButton2">
          <p class="indexGameButtonTitle">Get<br>Start</p>
        </button>
        <!-- <p class="indexGameButtonP">
          MAKE YOUR OWN CARA CAR
        </p> -->
      </div>
    <div class="circular">
      <svg viewBox="0 0 100 100">
        <path d="M 80,50 a 65,65 0 1,1 -1,0 z"
              id="circle" />
        <text>
          <textPath class="textPath" xlink:href="#circle">
            MAKE YOUR OWN CARA CAR 
          </textPath>
        </text>
      </svg>
    </div>
  </div>

</template>

<style lang="scss" scoped>
  @import '@/assets/scss/layout/header.scss';
  @import '@/assets/scss/page/home.scss';
  @import '@/assets/scss/layout/login.scss';
</style>
