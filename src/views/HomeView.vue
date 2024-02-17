<!-- 疑問疑問 ↓↓小龜老師看這裡 ↓↓ 疑問疑問-->
<!-- 在這頁中有引用燈箱的store和component，這頁的header是手機板的nav，但在HomeView.vue檔中引用燈箱和MainHeader.vue就會變成有兩個燈箱，而且我修改燈箱的css他會影分身成兩個 -->
<script>
import axios from 'axios'; //引入函式庫
import { mapState, mapActions } from 'pinia'
import userStore from '@/stores/user'
import EventCardSlider from '@/components/card/EventCardSlider.vue';
import lightBoxStore from "@/stores/lightBox.js";
import LoginBox from '@/components/LoginBox.vue';
import ProductCard from "@/components/ProductCard.vue";
import CardShProcess from '@/components/card/CardShProcess.vue';
import bannerCanvas from "@/components/Canvas.vue";
import SingleCloud from "@/components/animation/SingleCloud.vue";
import DoubleCloud from "@/components/animation/DoubleCloud.vue";

export default {
  components: {
    EventCardSlider, LoginBox, ProductCard, CardShProcess, SingleCloud,
    DoubleCloud,
    bannerCanvas,
  },
  data() {
    return {
      userStoreData: userStore(),
      lightBoxStore: lightBoxStore(),
      showLightbox: false,
      currentTitle: '',
      currentHoverIndex: -1,
      currentTitlePh: '',
      currentHoverIndexPh: -1,
      rotateFrom: "0 60 60",
      rotateTo: "360 60 60",
      duration: "10s",
      isHovered: false,
      name: [
        '/ProductList',
        '/SecondHandList',
        '/News',
        '/ShopInformation',
        '/MemberCenter',
        '/Cart',
      ],
      img: [
        { i: 'nav/nav-icon-01.png' },
        { i: 'nav/nav-icon-02.png' },
        { i: 'nav/nav-icon-07.png' },
        { i: 'nav/nav-icon-04.png' },
        { i: 'nav/nav-icon-05.png' },
        { i: 'nav/nav-icon-06.png' },
      ],
      title: [
        { p: 'PRODUCT' },
        { p: '2nd HAND' },
        { p: 'EVENTS' },
        { p: 'SHOP INFO' },
        { p: 'MEMBER' },
        { p: 'MY CART' },
      ],
      namePh: [
        '/ProductList',
        '/SecondHandList',
        '/News',
        '/ShopInformation',
        '/MemberCenter',
        '/Cart',
      ],
      imgPh: [
        { i: 'nav/nav-icon-01.png' },
        { i: 'nav/nav-icon-02.png' },
        { i: 'nav/nav-icon-07.png' },
        { i: 'nav/nav-icon-04.png' },
        { i: 'nav/nav-icon-05.png' },
        { i: 'nav/nav-icon-06.png' },
      ],
      titlePh: [
          { ph: 'PRODUCT' },
          { ph: '2nd HAND' },
          { ph: 'EVENTS' },
          { ph: 'SHOP INFO' },
          { ph: 'MEMBER' },
          { ph: 'MY CART' },
      ],
      displayData: [],
    }
  },
  created() {
    //axios的get方法(`$import.meta.env.{變數}/檔名.php`)用.env檔中寫的網址來判斷網址URL的前贅
    // 取得全部商品資料用作商品資料，以及swiper用的所有資料
    axios.get(`${import.meta.env.VITE_CARA_URL}/front/productlist.php`)
      .then((response) => {
        // 成功取得資料後，將資料存入陣列
        this.displayData = response.data.slice(0, 8);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        this.errorMessage = "執行失敗: " + error.message; // 存儲錯誤訊息
      });
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
    openLightbox() {
      this.lightBoxStore.openLightbox()
    },
    closeLightbox() {
      this.lightBoxStore.closeLightbox()
    },
    ...mapActions(userStore, ['checkLogin', 'updateToken']),
    logout() {
      // 調用pinia的updateToken
      confirm('確定要登出嗎？')
      this.updateToken('')
      //清除Token後回到登入頁
      this.$router.push('/')

    },
    handleClick(e) {
      if (e.target.id === 'loginOverlay') {
        this.closeLightbox();
      } else if (e.target.tagName === 'A' && e.target.href.endsWith('/Register')) {
        this.$router.push('/Register');
        this.closeLightbox();
      }
    },
    // setupAnimation() {
    //   const svgElement = this.$refs.svg;
    //   const animateTransformElement = svgElement.querySelector("animateTransform");
    //   animateTransformElement.setAttribute("from", this.rotateFrom);
    //   animateTransformElement.setAttribute("to", this.rotateTo);
    //   animateTransformElement.setAttribute("dur", this.duration);
    // },
    // startRotateAnimation() {
    //   this.isRotating = true;
    // },
    // animationIteration() {
    //   this.isRotating = false;
    // },
    toggleHover() {
      this.isHovered = !this.isHovered;
    },
    resetRotation() {
      this.isHovered = false;
    },
  },
  computed: {
    isLoggedIn() {
      return !!this.userStoreData.token
    },
  },
  mounted() {
  },
}
</script>


<template>
  <header class="mainHeader">
    <nav>
      <!-- 電腦版header -->
      <!-- 首頁沒有Logo -->
      <ul class="indexHeaderNav">
        <li class="indexHeaderButton" v-for="(item, index) in img" :key="item" @mouseenter="changeImageTitle(index)"
          @mouseleave="resetImageTitle()">
          <RouterLink :to="name[index]">
            <img :src="getImageUrl(item.i)" class="indexHeaderButtonIcon" v-show="currentHoverIndex !== index">
            <div class="indexHeaderButtonP" v-if="currentHoverIndex === index">{{ title[index].p }}</div>
          </RouterLink>
        </li>
        <div class="line"></div>
        <div class="indexHeaderLogin" v-if="!isLoggedIn">
          <img src="../assets/imgs/nav/nav-icon-Login.png" alt="login" class="indexHeaderButtonLogin"
            @click="openLightbox">
        </div>
        <div class="indexHeaderLogin" v-else>
          <img src="../assets/imgs/nav/nav-icon-Logout.png" alt="Logout" class="indexHeaderButtonLogin" @click="logout">
        </div>
      </ul>
      <img src="../assets/imgs/Home/signboard.png" alt="" class="broad">
    </nav>
  </header>
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
  <Transition name="fade">
    <LoginBox v-if="lightBoxStore.showLightbox" />
  </Transition>

  <div class="indexBannerGroup">
    <bannerCanvas class="bannerCanvas" />
    <!-- <img src="../assets/imgs/Home/indexBannerImg.svg" alt="" class="indexBannerImg"> -->
    <h1 class="indexBannerTitle">每一次轉彎，</h1>
    <h2 class="indexBannerTitle2">都是新的發現！</h2>
    <RouterLink class="RouterLink" to="/">
      <img src="../assets/imgs/Home/index-logo.svg" alt="" class="indexLogo">
    </RouterLink>
    <div class="indexBannerBagBlock"></div>
    <SingleCloud class="SingleCloud" />
    <DoubleCloud class="DoubleCloud" />
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
      <ProductCard :displayData="displayData" />
    </div>
  </div>

  <div class="decoTrainAnimation">
    <img src="../assets/imgs/Home/index-grass-background.svg" alt="grass.svg" class="decoGrass">
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
    <img src="../assets/imgs/Home/indexGameTitle.svg" alt="" class="indexGameTitle">
    <div class="game">
      <img src="../assets/imgs/Home/indexGameBackground.svg" alt="GameBackground" class="indexGameBackground">
      <img src="../assets/imgs/Home/indexGameImg.png" alt="GameImg" class="indexGameImg">
      <RouterLink class="RouterLink" to="/Game">
        <button class="indexGameButton" @mouseover="toggleHover" @mouseout="resetRotation"
          :class="{ 'hovered': isHovered }">
          <button class="indexGameButton2">
            <p class="indexGameButtonTitle">Get<br>Start</p>
          </button>
        </button>
      </RouterLink>
      <div class="gameButtonText">
        <transition name="rotate">
          <img :class="{ 'rotate': isHovered }" src="../assets/imgs/Home/Make Your own cara car3.svg" alt="buttonText">
        </transition>
      </div>
      <!-- <div class="circular">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <path d="M 0,50 a 50,50 0 1,1 0,1 z" id="circle" />
        <text>
          <textPath class="text-path"  xlink:href="#circle">
            :class="{ 'rotate-animation': isRotating }"
            MAKE YOUR OWN CARA CAR
            <animate attributeName="startOffset" values="0;180;360" dur="15s" repeatCount="indefinite"></animate>
            <animate attributeName="fill" values="black;white;black" dur="15s" repeatCount="indefinite"></animate>
            
          </textPath>
          <animateTransform  attributeName="transform" type="rotate" :from="rotateFrom" :to="rotateTo" :dur="duration" repeatCount="indefinite" />
          v-if="isRotating"
        </text>
      </svg>
    </div> -->
    </div>
  </div>
  <CardShProcess class="CardShProcess" />
</template>
<style lang="scss" scoped>
@import '@/assets/scss/layout/header.scss';
@import '@/assets/scss/page/home.scss';
// ::v-deep{
//   .rotate-animation {
//         animation: rotateAnimation 15s linear infinite;
//     }
//     .indexGameButton:hover .text-path {
//   transform: rotate(360deg); /* 這樣可以在 hover 時重置轉動，而不是從上一個停止的地方繼續 */
//   transition-duration: 1s;
//   cursor: pointer;
// }
// }
</style>
