<script>
import axios from 'axios'; //引入函式庫
import qs from 'qs' // 引入qs模組
import { mapActions } from 'pinia'
import userStore from '@/stores/user'
import EventCardSlider from '@/components/card/EventCardSlider.vue';
import lightBoxStore from "@/stores/lightBox.js";
import LoginBox from '@/components/LoginBox.vue';
import ProductCard from "@/components/ProductCard.vue";
import CardShProcess from '@/components/card/CardShProcess.vue';
import bannerCanvas from "@/components/Canvas.vue";
import bannerCanvas2 from "@/components/Canvas2.vue";
import bannerCanvas3 from "@/components/Canvas3.vue";
import bannerCanvas4 from "@/components/Canvas4.vue";
import SingleCloud from "@/components/animation/SingleCloud.vue";
import DoubleCloud from "@/components/animation/DoubleCloud.vue";
import chatBox from '@/components/btn/chatBox.vue'
import loading from "@/components/loading.vue";

export default {
  components: {
    EventCardSlider, LoginBox, ProductCard, CardShProcess, SingleCloud,
    DoubleCloud,
    bannerCanvas,
    bannerCanvas2,
    bannerCanvas3,
    bannerCanvas4,
    chatBox,
    loading,
  },
  data() {
    return {
      isLoading: true,
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
      // line login
      line_channel_id: '',    // Line Channel ID
      line_channel_secret: '',// Line Channel Secret
      line_redirect_uri: '',  // Line developer Callback URL
      name: [
        '/ProductList',
        '/SecondHandList',
        '/News',
        '/ShopInformation',
        '/MemberCenter',
        '/Cart',
      ],
      img: [
        { i: 'nav-icon-01.png' },
        { i: 'nav-icon-02.png' },
        { i: 'nav-icon-07.png' },
        { i: 'nav-icon-04.png' },
        { i: 'nav-icon-05.png' },
        { i: 'nav-icon-06.png' },
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
        { i: 'nav-icon-01.png' },
        { i: 'nav-icon-02.png' },
        { i: 'nav-icon-07.png' },
        { i: 'nav-icon-04.png' },
        { i: 'nav-icon-05.png' },
        { i: 'nav-icon-06.png' },
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

    // console.log('getLineConnectionInfo');
    //axios的get方法(`$import.meta.env.{變數}/檔名.php`)用.env檔中寫的網址來判斷網址URL的前贅
    // 取得全部商品資料用作商品資料，以及swiper用的所有資料
    axios.get(`${import.meta.env.VITE_PHP_URL}/front/productlist.php`)
      .then((response) => {
        // 成功取得資料後，將資料存入陣列
        this.displayData = response.data.slice(0, 8);
        this.isLoading = false;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        this.errorMessage = "執行失敗: " + error.message; // 存儲錯誤訊息
      });
  },
  async mounted() {
    // 使用 window.location.search 和 urlParams 獲取當前網頁 URL 中的查詢參數
    const queryString = window.location.search;
    if (queryString) {

      // 使用 get 方法從 urlParams 實例中獲取名為 code 的參數的值。(授權碼，通常由用戶在身份驗證流程中獲得)
      // 如果查詢字串中存在名為 code 的參數，code 變數將被賦值為該參數的值；否則，code 變數將為 null。
      this.getLineConnectionInfo();
    } else {
      // 判斷有沒有登入過，如果沒有token等同於沒有登入
      const user = this.checkLogin()
      // console.log(user);
      if (user) {
        //有登入資訊轉到首頁
        this.$router.push('/')
      }
    }
  },
  methods: {
    // 取得第三方登入連線資訊
    getLineConnectionInfo() {
      axios.get(`${import.meta.env.VITE_PHP_URL}/front/getLineConnectionInfo.php`)
        .then(({ data }) => {
          this.line_channel_id = data[0].channelId
          this.line_channel_secret = data[0].channelSecret
          this.line_redirect_uri = data[0].redirectUri
          const queryString = window.location.search;
          const urlParams = new URLSearchParams(queryString);
          const code = urlParams.get('code');
          this.lineLoginRedirect(code);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          this.errorMessage = "執行失敗: " + error.message; // 存儲錯誤訊息
        });
    },
    getImageUrl(paths) {
      return new URL(`../assets/imgs/nav/${paths}`, import.meta.url).href
    },
    changeImageTitle(index) {
      this.currentTitle = this.title[index].p;
      this.currentHoverIndex = index;
    },
    resetImageTitle() {
      this.currentHoverIndex = -1;
    },
    changeImageTitlePh($index) {
      // console.log('Index:', $index);
      // console.log('titlePh[index]:', this.titlePh[$index]);

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
    ...mapActions(userStore, ['checkLogin', 'updateToken', 'updateUserData']),
    logout() {
      // 調用pinia的updateToken
      const confirmLogout = confirm('確定要登出嗎？');

      if (confirmLogout) {
        //清除token和userData
        this.userStoreData.updateToken('')
        this.userStoreData.updateUserData('')
        //登入是燈箱沒有頁面就不跳轉頁面了
      }
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
    // line登入
    lineLoginEvent() {
      // 根據指定的 client_id、redirect_uri、scope 等參數組合出一個 LINE 登入的連結
      const link = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${this.line_channel_id}&redirect_uri=${this.line_redirect_uri}&state=login&scope=openid%20profile`;
      // 將頁面重新導向到該連結
      window.location.href = link;
    },
    async lineLoginRedirect(code) {
      try {
        /*
            使用 Axios 發送 HTTP POST 請求到指定的 URL
            並指定 'Content-Type': 'application/x-www-form-urlencoded' 標頭以指示伺服器使用 URL 編碼形式解析參數
            grant_type：指定授權類型為 "authorization_code"
            code：授權碼，這個值是從 code 變數中取得的
            redirect_url：指定用戶授權完成後的重定向 URL
            client_id：用於識別應用程式的客戶端 ID
            client_secret：應用程式的客戶端密鑰
            這些參數使用 qs.stringify 函式轉換為 URL 編碼的形式，以符合 "application/x-www-form-urlencoded" 的請求格式
            Content-Type': 'application/x-www-form-urlencoded'：指定請求的內容類型為 URL 編碼形式
        */
        const tokenResponse = await axios.post('https://api.line.me/oauth2/v2.1/token', qs.stringify({
          grant_type: 'authorization_code',
          code: code,
          // yourURI 請設置為實際Line developer 設定的重新導向網址
          redirect_uri: this.line_redirect_uri,
          client_id: this.line_channel_id,
          client_secret: this.line_channel_secret
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });

        /*
            從 tokenResponse 的回應資料中取得 access_token 和 id_token。
            這些欄位是從 LINE 登入 API 取得的授權資訊。
            access_token 是用來作為驗證的令牌
            id_token 是使用者的身份令牌。
        */
        const accessToken = tokenResponse.data.access_token;
        const idToken = tokenResponse.data.id_token;

        /*
            使用 Axios 發送 HTTP POST 到 https://api.line.me/oauth2/v2.1/verify，驗證 id_token 以獲取包含使用者資訊的回應
            id_token：用於識別使用者的身份令牌
            client_id：用於識別應用程式的客戶端 ID
            使用 qs.stringify 函式轉換為 URL 編碼的形式，以符合 "application/x-www-form-urlencoded" 的請求格式
            Content-Type': 'application/x-www-form-urlencoded'：指定請求的內容類型為 URL 編碼形式。
            'Authorization': 'Bearer ' + accessToken：使用存取令牌進行身份驗證，將存取令牌放在 'Bearer ' 字符串之後。
        */
        const userInfoResponse = await axios.post('https://api.line.me/oauth2/v2.1/verify', qs.stringify({
          id_token: idToken,
          client_id: this.line_channel_id
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + accessToken
          }
        });

        /*
            根據需求，可以在登入後的處理中進行相應的操作，例如驗證用戶資訊、儲存登入狀態等。
        */
        const user = userInfoResponse.data
        const sub = user.sub;
        const name = user.name;
        const picture = user.picture;

        const lineTokenRes = {
          sub: user.sub,
          name: user.name,
          picture: user.picture,
        }

        axios.post(`${import.meta.env.VITE_PHP_URL}/front/lineMemberLogin.php`, lineTokenRes, {
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then(res => {
            const member = res.data[0]
            this.updateUserData({
              m_name: member.m_name,
              img_path: member.img_path,
              member_id: member.member_id
            })
          })


        this.updateToken(lineTokenRes.sub)

        this.$router.push('/')
      } catch (error) {
        console.error(error);
      }
    },
  },
  computed: {
    isLoggedIn() {
      return !!this.userStoreData.token
    },
  },
}
</script>


<template>
    <loading :isLoading="isLoading"/>

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
          <img src="@/assets/imgs/nav/nav-icon-Login.png" alt="login" class="indexHeaderButtonLogin"
            @click="openLightbox">
        </div>
        <div class="indexHeaderLogin" v-else>
          <img src="@/assets/imgs/nav/nav-icon-Logout.png" alt="Logout" class="indexHeaderButtonLogin" @click="logout">
        </div>
      </ul>
      <img src="@/assets/imgs/Home/signboard.png" alt="" class="broad">
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
    <div class="indexHeaderLoginPh" v-if="!isLoggedIn">
      <img src="@/assets/imgs/nav/nav-icon-Login-Ph.png" alt="login" class="indexHeaderButtonLoginPh"
        @click="openLightbox">
    </div>
    <div class="indexHeaderLoginPh" v-else>
      <img src="@/assets/imgs/nav/nav-icon-Logout-PH.png" alt="login" class="indexHeaderButtonLoginPh" @click="logout">
    </div>
  </ul>

  <Transition name="fade">
    <LoginBox v-if="lightBoxStore.showLightbox" />
  </Transition>

  <div class="indexBannerGroup">
    <bannerCanvas class="bannerCanvas" />
    <bannerCanvas2 class="bannerCanvas2" />
    <bannerCanvas3 class="bannerCanvas3" />
    <bannerCanvas4 class="bannerCanvas4" />

    <h1 class="indexBannerTitle">每一次轉彎，</h1>
    <h2 class="indexBannerTitle2">都是新的發現！</h2>
    <RouterLink class="RouterLink" to="/">
      <img src="@/assets/imgs/Home/index-logo.svg" alt="" class="indexLogo">
    </RouterLink>
    <div class="indexBannerBagBlock"></div>
    <div class="cloud1">
      <SingleCloud class="SingleCloud" />
    </div>
    <DoubleCloud class="DoubleCloud" />
  </div>
  <div class="indexProductGroup">
    <div class="indexProductTitle">
      <img src="@/assets/imgs/Home/indexProductTitle.png" alt="indexProductTitle">
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
    <img src="@/assets/imgs/Home/index-grass-background.svg" alt="grass.svg" class="decoGrass">
    <img src="@/assets/imgs/draw/mountain.png" alt="mountain.png" class="decoMountain">
    <div class="decoTrainAnima">
      <div class="decoTrain">
        <img src="@/assets/imgs/draw/train.svg" alt="train.svg" class="decoTrainImg">
      </div>
      <img src="@/assets/imgs/draw/rail.svg" alt="rail.svg" class="decoRail">
    </div>
  </div>

  <div class="indexEventGroup">
    <div class="indexEventTitle">
      <img src="@/assets/imgs/Home/indexEventTitle.svg" alt="indexEventTitle">
      <RouterLink to="/News" class="linkToEvent">
        <div class="eventLink">消息一覽</div>
      </RouterLink>
      <img class="decoImg" src="@/assets/imgs/draw/person_sit.png" alt="person_sit">
    </div>
    <div class="otherEventCards">
      <EventCardSlider class="otherEventCard" />
    </div>
  </div>

  <div class="indexAboutUsGroup">
    <div class="indexAboutBlock"></div>
    <div class="indexAboutUsImg">
      <img src="@/assets/imgs/Home/indexAboutUsImg.png" alt="indexAboutUsImg">
    </div>
    <div class="indexAboutUsContent">
      <div class="indexAboutUsTitle">
        <img src="@/assets/imgs/Home/indexAboutUsTitle.svg" alt="">
        <img class="decoImg" id="personBallon" src="@/assets/imgs/draw/person_ballon.png" alt="person_sit">
      </div>
      <div class="indexAboutText">
        <p>我們致力於提供各種特色的玩具車， 讓每個孩子都能擁有專屬的玩具車， 展開一場屬於他們獨特的冒險旅程。</p>
      </div>
      <RouterLink to="/About" class="linkToAbout">
        <div class="AboutLink">了解更多</div>
      </RouterLink>
    </div>
  </div>
  
  <div class="indexGameGroup">

    <div class="gameTitle">
      <img src="@/assets/imgs/Home/indexGameTitle.svg" alt="" class="indexGameTitle">
    </div>
    <img src="@/assets/imgs/Home/indexGameBackground.svg" alt="GameBackground" class="indexGameBackground">

    <div class="game">
      <img src="@/assets/imgs/Home/indexGameImg.png" alt="GameImg" class="indexGameImg">

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
          <img :class="{ 'rotate': isHovered }" src="@/assets/imgs/Home/Make Your own cara car3.svg" alt="buttonText">
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
  <chatBox />
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
