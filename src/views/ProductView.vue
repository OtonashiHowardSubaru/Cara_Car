<script>
import axios from "axios"; //引入函式庫
import ProCardSwiper from "@/components/ProCardSwiper.vue";
import MainHeader from "@/components/MainHeader.vue";
import ProductIntroCard from "@/components/card/ProductIntroCard.vue";
import NumberSelect from "@/components/btn/BtnNumberSelect.vue";
import Swal from "sweetalert2";
import DoubleCloud from "@/components/animation/DoubleCloud.vue";
import BlueBird from "@/components/animation/BlueBird.vue";
import YellowBird from "@/components/animation/YellowBird.vue";
import GreenBird from "@/components/animation/GreenBird.vue";
import loading from "@/components/loading.vue";

import { mapState, mapActions } from "pinia";
import cartStore from "@/stores/cart";
import chatBox from "@/components/btn/chatBox.vue";

export default {
  components: {
    ProCardSwiper,
    MainHeader,
    MainHeader,
    NumberSelect,
    ProductIntroCard,
    chatBox,
    Swal,
    DoubleCloud,
    BlueBird,
    YellowBird,
    GreenBird,
    loading,
  },
  data() {
    return {
      allProducts: [],
      thisProduct: [],
      ImgsName: [],
      activeTab: 0,
      qtyValue: 1,
      favoriteProducts: [],
      isFavorite: false,
      isLoading: true,
      isLoggedIn: false, 
    };
  },
  computed: {
    ...mapState(cartStore, ["cartItems"]),
  },
  created() {
    //在頁面載入時同時載入function
    this.fetchData();
    this.getLocalCartData();
    this.fetchFavoriteProducts();
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      // 如果有用戶數據，將 isLoggedIn 設置為 true
      this.isLoggedIn = true;
    }
  },
  watch: {
    $route(to, from) {
      // 監聽 $route 有變化
      // 在路徑參數變化時執行一次fetchData(抓取資料)
      this.fetchData();
    },
  },
  methods: {
    fetchData() {
      // 定義頁碼
      const pageId = this.$route.params.pro_id;
      // console.log(pageId)
      //axios的get方法(`$import.meta.env.{變數}/檔名.php`)用.env檔中寫的網址來判斷網址URL的前贅

      // 取得所有商品資料用做本頁資料以及swiper
      axios
        .get(`${import.meta.env.VITE_PHP_URL}/front/productlist.php?`)
        .then((response) => {
          // 成功取得資料後，將資料存入陣列
          // console.log(response.data)
          this.allProducts = response.data;
          this.thisProduct = response.data.find((item) => {
            return item.pro_id == pageId;
          });
          console.log(this.allProducts);
          axios
            .get(
              `${
                import.meta.env.VITE_PHP_URL
              }/front/thisproductimgs.php?pageId=${pageId}`
            )
            .then((response) => {
              this.ImgsName = response.data;
              this.isLoading = false;
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
              this.errorMessage = "執行失敗: " + error.message; // 存儲錯誤訊息
            });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          this.errorMessage = "執行失敗: " + error.message; // 存儲錯誤訊息
        });

      // 取得這一份商品的全部圖片名稱
    },

    // 取得圖片的路徑函式
    getProductImgSrc(imgName) {
      return new URL(
        `${import.meta.env.VITE_IMG_BASE_URL}/new_products/${imgName}`
      ).href;
    },

    // 大圖換小圖
    showLarge(e) {
      const clickedImgSrc = e.target.src;
      // console.log('Clicked on image:', clickedImgSrc);
      const bigImg = document.getElementById("bigImg");
      bigImg.src = clickedImgSrc;
    },

    // 轉換pro_intro到比較合適的版型
    replaceLineBreaks(text) {
      return text.replace(/\r\n/g, "<br>");
    },
    //抓取數量
    handleqtyValue(thisProductQty) {
      this.qtyValue = thisProductQty;
    },

      //商品收藏功能
      fetchFavoriteProducts() {
        const products = JSON.parse(localStorage.getItem('favoriteProducts'))
        if (products) {
          console.log(products);
          this.favoriteProducts = products
        }
      },
      
      removeFromFavorite(id) {
        // 從收藏清單中移除商品
        const products = this.favoriteProducts;
        if (!products) return;
        const productIndex = products.findIndex(product => product.pro_id === id);
        if (productIndex === -1) return;
        products.splice(productIndex, 1);
        localStorage.setItem('favoriteProducts', JSON.stringify(products));
      },
      toggleFavorite(product) {
        const index = this.favoriteProducts.findIndex(item => item.pro_id === product.pro_id);
        if (index !== -1) {
            this.favoriteProducts.splice(index, 1);
            Swal.fire({
              title: '已從收藏清單中移除',
              icon: 'success',
              confirmButtonText: '確定',
            });
        } else {
            this.favoriteProducts.push(product);
            localStorage.setItem('favoriteProducts', JSON.stringify(this.favoriteProducts));
            Swal.fire({
              title: '已加入收藏清單',
              icon: 'success',
              confirmButtonText: '確定',
            });
        }
        localStorage.setItem('favoriteProducts', JSON.stringify(this.favoriteProducts));
        this.isFavorite = !this.isFavorite; 
      },
      // login(){
      //   //登入
      //   this.isLoggedIn = true;
      //   localStorage.setItem("isLoggedIn", JSON.stringify(true));
        
      // },
      logout() {
      // 登出時清除本地端存儲的用戶數據
      localStorage.removeItem('userData');
      this.isLoggedIn = false;
      },
      handleAddToCart(thisProduct, qtyValue) {
        if (this.isLoggedIn) {
            // 用戶已登入，執行加入購物車操作
            this.addToCart(thisProduct, qtyValue);
        } else {
            // 用戶未登入，顯示提示信息
            Swal.fire({
                title: "請先登入會員",
                icon: "warning",
                confirmButtonText: "確定"
            });
        }
    },



  
      //加入購物車
      // addToCart(){
      //   const product = {
      //     id: this.thisProduct.pro_id,
      //     name: this.thisProduct.pro_name,
      //     price: this.thisProduct.pro_price,
      //     imageUrl: this.getProductImgSrc(this.ImgsName[0].img_name),
      //     quantity: parseInt(this.qtyValue === '' ? 1 : this.qtyValue),
      //   };
      //   // 從本地端中獲取已有的購物車內容，如果没有則初始化為空值
      //   let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

      //   // 將當前商品添加到購物車中，重複商品時則更新數量
      //   let existingProductIndex = cartItems.findIndex(item => item.id === product.id);
      //   if (existingProductIndex !== -1) {
      //     // 如果購物車中已有相同商品，則更新其數量
      //     cartItems[existingProductIndex].quantity += product.quantity;
      //   } else {
      //     // 若不是則將商品添加到購物車
      //     cartItems.push(product);
      //   };

      //   // cartItems.push(product);
      //   // 將更新後的購物車數據保存到本地端
      //   localStorage.setItem('cart', JSON.stringify(cartItems));

      //   // alert('商品已加入到購物車！');
      //   return  Swal.fire({
      //     title: '已加入購物車!',
      //     icon: 'success',
      //     confirmButtonText: 'OK',
      //   })
      // },
      ...mapActions(cartStore,["addToCart","getLocalCartData"]),
      
      // addToCart(){
      //   this.addToCart({ 
      //     thisProduct: this.thisProduct, 
      //     qtyValue: parseInt(this.qtyValue === '' ? 1 : this.qtyValue) });
      //   // this.addToCart(thisProduct, this.qtyValue);
      //   return  Swal.fire({
      //     title: '已加入購物車!',
      //     icon: 'success',
      //     confirmButtonText: 'OK',
      //   })
      // },
      // addCart(thisProduct) {
      //   // 调用 Pinia Store 中的 addToCart 方法
      //   this.addToCart(thisProduct, this.qtyValue);
      // }
    }
  }
</script>

<template>
  <loading :isLoading="isLoading" />
  <MainHeader />
  <div class="pro_title">
    <div class="titleBackGround">
      <h1>{{ thisProduct.pro_name }}</h1>
      <h2>{{ thisProduct.pro_en_name }}</h2>
    </div>
    <DoubleCloud />
  </div>
  <main class="container">
    <div class="row">
      <div class="col-12 col-md-6 pro_img_switcher">
        <div class="bigImgBox">
          <!-- 第一圖片 -->
          <!-- 不知道為什麼一定要v-if="ImgsName.length > 0"，不然會報錯 -->
          <img
            v-if="ImgsName.length > 0"
            :src="getProductImgSrc(ImgsName[0].img_name)"
            alt=""
            id="bigImg"
          />
        </div>
        <div class="smallImgsBox">
          <!-- 圖片們 -->
          <img
            v-for="item in ImgsName"
            :src="getProductImgSrc(item.img_name)"
            alt=""
            class="smallImg"
            :key="item"
            @click="showLarge($event)"
          />
        </div>
      </div>
      <div class="col-12 col-md-6 intro">
        <div
          class="price"
          :style="{ color: thisProduct.promo_state == 1 ? 'red' : 'black' }"
        >
          <p>
            <span>{{ thisProduct.promo_name }}</span>
            <span>${{ thisProduct.pro_sale }}</span>
          </p>
        </div>
        <!-- 採用v-html顯示內容(而非顯示字串)，再利用涵式轉換\r\n為<br>，最後利用v-if確保涵式運作的順序在讀取到資料之後-->
        <div
          class="intro_tet"
          v-if="thisProduct.pro_intro"
          v-html="replaceLineBreaks(thisProduct.pro_intro)"
        ></div>
        <div class="pro_functions">
          <form class="numberChoice" name="numberChoice" action="#">
            <label for="">數量</label>
            <NumberSelect @qtyValue="handleqtyValue" />
          </form>
          <form class="additional_pro">
            <label for="">加購</label>
            <div class="choose_additional_pro">
              <button type="button" class="btn_buy_additional">
                <span>客製化車牌</span>
                <span>(+$300)</span>
                <span>專屬於你的個性化車牌</span>
              </button>
              <button type="button" class="btn_buy_additional">
                <span>升級充電器</span>
                <span>(+$850)</span>
                <span>快速充電器(12V/1.8A)</span>
              </button>
              <button type="button" class="btn_buy_additional">
                <span>升級電池</span>
                <span>($+950)</span>
                <span>更強續行</span>
              </button>
            </div>
          </form>
        </div>
        <div class="buy_pro">
          <div class="toggle_favorite">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="38"
              height="34"
              viewBox="0 0 38 34"
              fill="white"
              @click="toggleFavorite(thisProduct)"
            >
              <path
                :fill-rule="isFavorite ? 'evenoded' : 'evenodd'"
                clip-rule="evenoded"
                :fill="isFavorite ? 'red' : 'black'"
                d="M7.63165 3.69477C4.73707 5.01731 2.61716 8.16489 2.61716 11.9179C2.61716 15.7512 4.18746 18.7068 6.43474 21.2402C8.28943 23.327 10.5332 25.0578 12.7212 26.7433C13.2411 27.1446 13.7576 27.5441 14.2653 27.9437C15.183 28.6678 16.0013 29.3011 16.7917 29.7635C17.5804 30.2241 18.2155 30.4352 18.7563 30.4352C19.2972 30.4352 19.9323 30.2258 20.721 29.7635C21.5113 29.3011 22.3296 28.6678 23.2474 27.9437C23.7534 27.5424 24.2716 27.1446 24.7915 26.745C26.9795 25.0561 29.2233 23.327 31.078 21.2402C33.327 18.7068 34.8955 15.7512 34.8955 11.9179C34.8955 8.16663 32.7756 5.01731 29.881 3.69477C27.0685 2.40887 23.2893 2.7491 19.6985 6.48118C19.5765 6.60783 19.4301 6.70856 19.2682 6.77737C19.1063 6.84618 18.9322 6.88164 18.7563 6.88164C18.5804 6.88164 18.4064 6.84618 18.2445 6.77737C18.0826 6.70856 17.9362 6.60783 17.8142 6.48118C14.2234 2.7491 10.4442 2.40887 7.63165 3.69477ZM18.7563 3.75758C14.7224 0.145895 10.2052 -0.36009 6.54291 1.31315C2.67998 3.0841 0 7.18781 0 11.9196C0 16.5695 1.9367 20.1184 4.47884 22.9798C6.51325 25.2707 9.00305 27.1882 11.2032 28.8806C11.7022 29.2645 12.1855 29.6379 12.6444 30.0008C13.5395 30.7057 14.4991 31.4559 15.4709 32.0247C16.4428 32.5918 17.5525 33.0541 18.7563 33.0541C19.9602 33.0541 21.0699 32.5918 22.0418 32.0247C23.0153 31.4559 23.9732 30.7057 24.8683 30.0008C25.3462 29.6242 25.8266 29.2508 26.3095 28.8806C28.5079 27.1882 30.9994 25.2689 33.0339 22.9798C35.576 20.1184 37.5127 16.5695 37.5127 11.9196C37.5127 7.18781 34.8345 3.0841 30.9698 1.31664C27.3075 -0.358345 22.7903 0.14764 18.7563 3.75758Z"
              />
            </svg>
          </div>
          <!-- 加入購物車按鈕 -->

          <button type="button" id="buyNowBtn" @click="addToCart(thisProduct, qtyValue)">
            <!-- 直接購買 -->
            <router-link to="/cart">直接購買</router-link>
          </button>
          <button
            type="button"
            id="addToCartBtn"
            @click="handleAddToCart(thisProduct, qtyValue)"
          >
            加入購物車
          </button>
        </div>
      </div>
      <div class="col-12" style="position: relative">
        <div class="birdbox">
          <BlueBird />
          <YellowBird />
          <GreenBird />
        </div>
        <ProductIntroCard :thisProductInfo="thisProduct" />
        <ProCardSwiper :displayData="allProducts" :title="'也許你會喜歡'" />
        <ProCardSwiper :displayData="allProducts" :title="'別人也逛過'" />
      </div>
    </div>
    <chatBox />
  </main>
</template>
<style lang="scss" scoped>
@import "@/assets/scss/page/product";
</style>
