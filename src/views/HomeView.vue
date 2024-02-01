<!-- 疑問疑問 ↓↓小龜老師看這裡 ↓↓ 疑問疑問-->
<!-- 在這頁中有引用燈箱的store和component，這頁的header是手機板的nav，但在HomeView.vue檔中引用燈箱和MainHeader.vue就會變成有兩個燈箱，而且我修改燈箱的css他會影分身成兩個 -->
<script>
// import gsap from 'gsap';
// import { TextPlugin } from 'gsap/TextPlugin';
// gsap.registerPlugin(TextPlugin);
import EventCardSlider from '@/components/card/EventCardSlider.vue'
import lightBoxStore from "@/stores/lightBox.js"
import LoginBox from '@/components/LoginBox.vue'
import ProductCard from "@/components/ProductCard.vue";
import CardShProcess from '@/components/card/CardShProcess.vue'
import bannerCanvas from "@/components/Canvas.vue";

import product01 from '@/assets/imgs/product/product_1.png';
import product02 from '@/assets/imgs/product/product_2.png';
import product03 from '@/assets/imgs/product/product_3.png';
import product04 from '@/assets/imgs/product/product_4.png';
import product05 from '@/assets/imgs/product/product_5.png';
import product06 from '@/assets/imgs/product/product_6.png';
import product07 from '@/assets/imgs/product/product_7.png';
import product08 from '@/assets/imgs/product/product_8.png';

export default {
  components: {
    EventCardSlider, LoginBox, ProductCard, CardShProcess,bannerCanvas
  },
  data() {
    return {
      lightBoxStore: lightBoxStore(),
      showLightbox: false,
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
      title: [
        { p: 'PRODUCT' },
        { p: '2nd HAND' },
        { p: 'GAME' },
        { p: 'SHOP INFO' },
        { p: 'MEMBER' },
        { p: 'MY CART' },
      ],
      productList:[
        {
              prod_img1:product01,
              prod_name:"起始玩家",
              prod_price:"5000",
              linkwhere:"/Product"
            },
            {
              prod_img1:product02,
              prod_name:"賓士少爺",
              prod_price:"10000",
              linkwhere:"/Product"
            },
            {
              prod_img1:product03,
              prod_name:"賓士少爺二代",
              prod_price:"12000",
              linkwhere:"/Product"
            },
            {
              prod_img1:product04,
              prod_name:"敞篷輕旅",
              prod_price:"12000",
              linkwhere:"/Product"
            },
            {
              prod_img1:product05,
              prod_name:"野貓戰機",
              prod_price:"8000",
              linkwhere:"/Product"
            },
            {
              prod_img1:product06,
              prod_name:"敞篷輕旅二代",
              prod_price:"14000",
              linkwhere:"/Product"
            },
            {
              prod_img1:product07,
              prod_name:"赤色風暴",
              prod_price:"8000",
              linkwhere:"/Product"
            },
            {
              prod_img1:product08,
              prod_name:"英倫經典",
              prod_price:"10000",
              linkwhere:"/Product"
            },
      ],
    }
  },
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
    handleClick(e) {
      if (e.target.id === 'loginOverlay') {
        this.closeLightbox();
      } else if (e.target.tagName === 'A' && e.target.href.endsWith('/Register')) {
        this.$router.push('/Register');
        this.closeLightbox();
      }
    },
    openLightbox() {
      // this.showLightbox = true;
      this.lightBoxStore.openLightbox()
    },
    closeLightbox() {
      // this.showLightbox = false;
      this.lightBoxStore.closeLightbox()
    },
  },
  mounted() {
    // const textPath = document.querySelector('.text-path');
    // gsap.to('.text-path', { rotation: 360, duration: 10, repeat: -1, ease: 'linear' });
  },
}
</script>


<template>
  <header class="mainHeader">
    <nav>
      <!-- 電腦版header -->
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
      </ul>
    </nav>
  </header>
  <Transition name="fade">
    <LoginBox v-if="lightBoxStore.showLightbox" />
  </Transition>

  <div class="indexBannerGroup">
    <img src="../assets/imgs/Home/indexBannerImg.png" alt="" class="indexBannerImg">
    <h1 class="indexBannerTitle">每一次轉彎，</h1>
    <h2 class="indexBannerTitle2">都是新的發現！</h2>
    <RouterLink class="RouterLink" to="/">
      <img src="../assets/imgs/nav/nav-logo.png" alt="" class="indexLogo">
    </RouterLink>
    <div class="indexBannerBagBlock"></div>
  </div>

  <div class="indexProductGroup">
    <div class="indexProductTitle">
      <img src="../assets/imgs/Home/indexProductTitle.png" alt="indexProductTitle">
      <RouterLink to="/productList" class="linkToProductList">
        <!-- <div class="decoLine"></div> -->
        <div class="productListLink">商品一覽</div>
      </RouterLink>
    </div>
    <div class="indexDisplayProducts">
      <ProductCard 
        :displayData="productList"
      />
    </div>
  </div>

  <div class="decoTrainAnimation">
    <img src="../assets/imgs/draw/mountain.png" alt="mountain.png" class="decoMountain">
    <div class="decoTrainAnima">
      <div class="decoTrain">
        <img src="../assets/imgs/draw/train.svg" alt="train.svg" class="decoTrainImg">
      </div>
      <img src="../assets/imgs/draw/rail.svg" alt="rail.svg" class="decoRail">
    </div>
  </div>

  <div class="indexEventGroup">
    <div class="indexEventTitle">
      <img src="../assets/imgs/Home/indexEventTitle.svg" alt="indexEventTitle">
      <RouterLink to="/News" class="linkToEvent">
        <!-- <div class="decoLine"></div> -->
        <div class="eventLink">消息一覽</div>
      </RouterLink>
      <img class="decoImg" src="../assets/imgs/draw/person_sit.PNG" alt="person_sit">
    </div>
    <div class="otherEventCards">
      <EventCardSlider class="otherEventCard" />
    </div>
  </div>

  <div class="indexAboutUsGroup">
    <div class="indexAboutBlock"></div>
    <div class="indexAboutUsImg">
      <img src="../assets/imgs/Home/indexAboutUsImg.png" alt="indexAboutUsImg">
    </div>
    <div class="indexAboutUsContent">
      <div class="indexAboutUsTitle">
        <img src="../assets/imgs/Home/indexAboutUsTitle.svg" alt="">
        <img class="decoImg" src="../assets/imgs/draw/person_ballon.PNG" alt="person_sit">
      </div>
      <div class="indexAboutText">
        <p>我們致力於提供各種特色的玩具車，
          讓每個孩子都能擁有專屬的玩具車，
          展開一場屬於他們獨特的冒險旅程。</p>
      </div>
      <RouterLink to="/About" class="linkToAbout">
        <!-- <div class="decoLine"></div> -->
        <div class="AboutLink">了解更多</div>
      </RouterLink>
    </div>
    </div>

  <div class="indexGameGroup">
    <img src="../assets/imgs/Home/indexGameTitle.png" alt="" class="indexGameTitle">
    <div class="indexGameBagBlock"></div>
    <img src="../assets/imgs/Home/indexGameImg.png" alt="GameImg" class="indexGameImg">
    <button class="indexGameButton" @mouseover="handleMouseOver" @mouseout="handleMouseOut"
      >
      <button class="indexGameButton2">
        <p class="indexGameButtonTitle">Get<br>Start</p>
      </button>
    </button>
    <div class="circular">
      <svg viewBox="165 0 100 100">
        <path d="M 76,51 a 66,66 0 1,1 -1,0 z" id="circle" />
        <text>
          <textPath class="text-path" xlink:href="#circle">
            MAKE YOUR OWN CARA CAR
            <animate attributeName="startOffset" values="0;180;360" dur="15s" repeatCount="indefinite"></animate>
            <animate attributeName="fill" values="black;white;black" dur="15s" repeatCount="indefinite"></animate>
          </textPath>
        </text>
      </svg>
    </div>
  </div>
  <CardShProcess/>
  <!-- <bannerCanvas/> -->
</template>
<style lang="scss" scoped>
@import '@/assets/scss/layout/header.scss';
@import '@/assets/scss/page/home.scss';
@import '@/assets/scss/layout/login.scss';
</style>
