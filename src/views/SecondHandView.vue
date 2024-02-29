<script>
import axios from 'axios'; //引入函式庫
import CardShProcess from "@/components/card/CardShProcess.vue";
import TitleMaybeYouLike from "@/components/TitleMaybeYouLike.vue";
import TitleViewed from "@/components/TitleViewed.vue";
import ProductCard from "@/components/ProductCard.vue";
import MainHeader from "@/components/MainHeader.vue";
import ShProductIntroCard from "@/components/card/ShProductIntroCard.vue";
import { Swiper} from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import ProCardSwiper from "@/components/ProCardSwiper.vue"
import DoubleCloud from "@/components/animation/DoubleCloud.vue";
import chatBox from '@/components/btn/chatBox.vue'


export default {
  components: {
    CardShProcess, TitleMaybeYouLike, TitleViewed,
    ProductCard, MainHeader, ShProductIntroCard, Swiper, ProCardSwiper, DoubleCloud, chatBox,
  },
  data() {
    return {
      search: '',
      responseData: [],
      ImgsName: [],
      thisProduct: [],
      allProducts: [],
      newProducts: [],
      newProductInfo: [],
      productInfo: [],
      qtyValue: 1,
    }
  },
  setup() {

    return {
      modules: [Navigation],

    };
  },
  created() {
    this.fetchData();

  },

  methods: {
    replaceLineBreaks(text) {
      return text.replace(/\r\n/g, "<br>");
    },
    fetchData() {
      const pageId = this.$route.params.sh_pro_id
      axios.get(`${import.meta.env.VITE_PHP_URL}/front/shProductList.php`)
        .then((response) => {
          // 成功取得資料後，將資料存入陣列
          // console.log(response.data)
          this.allProducts = response.data;
          this.thisProduct = response.data.find((item) => {
            return item.sh_pro_id == pageId
          })
          // console.log(this.thisProduct)
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          this.errorMessage = "執行失敗: " + error.message; // 存儲錯誤訊息
        });

      // 取得這一份商品的全部圖片名稱
      axios.get(`${import.meta.env.VITE_PHP_URL}/front/shProductimgs.php?pageId=${pageId}`)
        .then((response) => {
          this.ImgsName = response.data;
          // console.log(this.ImgsName);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          this.errorMessage = "執行失敗: " + error.message; // 存儲錯誤訊息
        });
      // 取得所有商品資料用做本頁資料以及swiper
      axios.get(`${import.meta.env.VITE_PHP_URL}/front/productlist.php?`)
        .then((response) => {
          // 成功取得資料後，將資料存入陣列
          // console.log(response.data)
          this.newProducts = response.data;
          this.thisNewProduct = response.data.find((item) => {
            return item.pro_id == pageId
          })
          // console.log(this.allProducts);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          this.errorMessage = "執行失敗: " + error.message; // 存儲錯誤訊息
        });

    },

    getProductImgSrc(imgName) {
      // return new URL(`https://tibamef2e.com/chd104/g6/imgs/sh_products/${imgName}`).href
      return new URL(`${import.meta.env.VITE_IMG_BASE_URL}/sh_products/${imgName}`).href
    },

    showLarge(e) {
      const clickedImgSrc = e.target.src;
      // console.log('Clicked on image:', clickedImgSrc);
      const bigImg = document.getElementById('mainpic');
      bigImg.src = clickedImgSrc;
      // console.log(bigImg);
    },

    changeTab(tabIndex) {
      // 頁籤跳轉
      this.activeTab = tabIndex;
    },
    changeMainImage(image) {
      this.mainImage = image;
    },
    //加入購物車
    addToShCart() {
      try {
        const product = {
          id: this.thisProduct.sh_pro_id,
          shname: this.thisProduct.sh_pro_name,
          shprice: this.thisProduct.sh_pro_price,
          shimageUrl: this.thisProduct.img_name,
          shquantity: parseInt(this.qtyValue === '' ? 1 : this.qtyValue),
        };
        // console.log(JSON.stringify(product));

        const productList = [];
        productList.push(product);
        // 從本地端中獲取已有的購物車內容
        localStorage.setItem('cart', JSON.stringify(productList));
        this.$router.push({ path: '/ShCart' }) //為了要先送資料才跳轉頁面
      } catch (e) {
        console.error(e);
      }

      // let shCartItems = JSON.parse(localStorage.getItem('cart')) || [];

      // // 將當前商品添加到購物車中，重複商品時則更新數量
      // let existingProductIndex = shCartItems.findIndex(item => item.id === product.id);
      // if (existingProductIndex !== -1) {
      //   // 如果購物車中已有相同商品，則更新其數量
      //   cartItems[existingProductIndex].quantity += product.quantity;
      // } else {
      //   // 若不是則將商品添加到購物車
      // shCartItems.push(product);
      // };

      // shCartItems.push(product);
      // 將更新後的購物車數據保存到本地端
      // localStorage.setItem('cart', JSON.stringify(shCartItems));
      // localStorage.setItem('cart', JSON.stringify(shCartItems));

      // return  Swal.fire({
      //   title: '已加入購物車!',
      //   icon: 'success',
      //   confirmButtonText: 'OK',
      // })
    },
  },
  mounted() {

  }
}
</script>

<template>
  <MainHeader />
  <div class="headerbg">
    <img src="@/assets/imgs/draw/greeting_illust.svg" alt="">
    <div class="cloud">
      <DoubleCloud />
    </div>

  </div>
  <div class="sh_product_wrap">
    <div class="intromq">
      <div class="titleBackGround">
        <h1>{{ thisProduct.sh_pro_en_name }}</h1>
        <h2>{{ thisProduct.sh_pro_name }}</h2>
      </div> 
    </div>
    <div class="prodpic">
      <div class="mainpic">
        <img v-if="ImgsName.length > 0" :src="getProductImgSrc(ImgsName[0].img_name)" alt="" id="mainpic">
      </div>
      <div class="littlepic">
        <img v-for="item in ImgsName" :src="getProductImgSrc(item.img_name)" alt="" @click="showLarge($event)" :key="item"
          class="littlepic">
      </div>

    </div>
    <div class="intro">
      <div class="titleBackGround">
        <h1>{{ thisProduct.sh_pro_en_name }}</h1>
        <h2>{{ thisProduct.sh_pro_name }}</h2>
      </div>
      <div class="year price">
        <span>${{ thisProduct.sh_pro_price }}</span>
        <span>車輛年份: 2019</span>
      </div>
      <div v-if="thisProduct.sh_pro_intro">
        <div class="intro_text" v-html="replaceLineBreaks(thisProduct.sh_pro_intro)"></div>
        <!-- <ul>
            <li>可遙控操作</li>
            <li>續航能力強</li>
            <li>高效能馬達，提供平穩駕駛體驗</li>
            <li>內建音樂播放器，提升兒童駕駛樂趣</li>
            <li>運行時噪音小，適合室內外使用</li>
          </ul> -->
      </div>

      <div class="purchase_btn" id="purchase_btn" @click="addToShCart">
        <!-- <router-link to="/ShCart"> -->
        <button type="button" id="purchase_btn">直接購買</button>
        <!-- </router-link> -->
      </div>
    </div>
  </div>
  <div class="productIntro">
    <img src="@/assets//imgs/product/info_bg.png" alt="">
    <ShProductIntroCard :thisProductInfo="thisProduct" />
  </div>


  <div class="recommand">
    <ProCardSwiper :displayData="newProducts" :title="'也許你會喜歡'" />
    <ProCardSwiper :displayData="newProducts" :title="'別人也逛過'" />
  </div>


  <div class="sh_process">
    <div class="shbg">
      <img src="@/assets/imgs/product/sh_bg.png" alt="">
    </div>
    <CardShProcess />
  </div>
  <chatBox />

</template>
  
<style lang="scss" scoped>
@import '@/assets/scss/page/shproduct';
</style>