<script>
import axios from 'axios'; //引入函式庫
import CardShProcess from "@/components/card/CardShProcess.vue";
import TitleMaybeYouLike from "@/components/TitleMaybeYouLike.vue";
import TitleViewed from "@/components/TitleViewed.vue";
import ProductCard from "@/components/ProductCard.vue";
import MainHeader from "@/components/MainHeader.vue";
import ProductIntroCard from "@/components/card/ProductIntroCard.vue";
// import mainImage from "@/assets/imgs/product/sh_products/product.png";
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import ProCardSwiper1 from "@/components/ProCardSwiper1.vue"
import ProCardSwiper2 from "@/components/ProCardSwiper2.vue"
import DoubleCloud from "@/components/animation/DoubleCloud.vue";

// import product01 from '@/assets/imgs/product/sh_products/product001.jpg';
// import product02 from '@/assets/imgs/product/sh_products/product002.jpg';
// import product03 from '@/assets/imgs/product/sh_products/product003.jpg';
// import product04 from '@/assets/imgs/product/sh_products/product004.jpg';
// import product05 from '@/assets/imgs/product/sh_products/product005.jpg';
// import product06 from '@/assets/imgs/product/sh_products/product006.jpg';
// import product07 from '@/assets/imgs/product/sh_products/product007.jpg';
// import product08 from '@/assets/imgs/product/sh_products/product008.jpg';
// import product09 from '@/assets/imgs/product/sh_products/product009.jpg';



  export default {
    components:{
    CardShProcess, TitleMaybeYouLike, TitleViewed,
    ProductCard, MainHeader,ProductIntroCard,Swiper,ProCardSwiper1,DoubleCloud,ProCardSwiper2
},
    data(){
      return {
        search: '',
        responseData : [],
        ImgsName:[],
        thisProduct:[],
        allProducts:[],
        // sh_product_list: [
        //     {
        //       prod_img1:product01,
        //       prod_name:"極光追逐者",
        //       prod_price:"3000",
        //       linkwhere:"/SecondHand"
        //     },
        //     {
        //       prod_img1:product02,
        //       prod_name:"極速閃電車",
        //       prod_price:"5000",
        //       linkwhere:"/SecondHand"
        //     },
        //     {
        //       prod_img1:product03,
        //       prod_name:"太空探險車",
        //       prod_price:"8000",
        //       linkwhere:"/SecondHand"
        //     },
        //     {
        //       prod_img1:product04,
        //       prod_name:"科技漂移车",
        //       prod_price:"6000",
        //       linkwhere:"/SecondHand"
        //     },
        //     {
        //       prod_img1:product05,
        //       prod_name:"爆炸速度狂飆车",
        //       prod_price:"4000",
        //       linkwhere:"/SecondHand"
        //     },
        //     {
        //       prod_img1:product06,
        //       prod_name:"魔法變形賽車",
        //       prod_price:"6000",
        //       linkwhere:"/SecondHand"
        //     },
        //     {
        //       prod_img1:product07,
        //       prod_name:"閃電漂移車",
        //       prod_price:"2500",
        //       linkwhere:"/SecondHand"
        //     },
        //     {
        //       prod_img1:product08,
        //       prod_name:"太空漫步車",
        //       prod_price:"3500",
        //       linkwhere:"/SecondHand"
        //     },
        //     {
        //       prod_img1:product09,
        //       prod_name:"磁浮飛行車",
        //       prod_price:"5500",
        //       linkwhere:"/SecondHand"
        //     },
        // ],
        // displayData: [],
        // activeTab: 0,
        // mainImage: mainImage, 
        // littleImages: [
        //   {img: 'product.png'},
        //   {img: 'product001_001.png'},
        //   {img: 'product001_002.png'},
        //   {img: 'product001_003.png'},
        // ],

      }
    },
    setup() {
      
      return {
        modules: [Navigation],
        
      };
    },
    created(){
      this.fetchData();
      
    },

    methods: {
      replaceLineBreaks(text) {
        return text.replace(/\r\n/g, "<br>");
      },
      fetchData(){
        const pageId = this.$route.params.sh_pro_id
        axios.get(`${import.meta.env.VITE_CARA_URL}/front/frontShProductinfo.php`)
        .then((response) => {
          // 成功取得資料後，將資料存入陣列
          console.log(response.data)
          this.allProducts = response.data;
          this.thisProduct = response.data.find((item) =>{
          return item.sh_pro_id == pageId
        })
        console.log(this.thisProduct)
      })
        .catch((error) => {
          console.error("Error fetching data:", error);
          this.errorMessage = "執行失敗: " + error.message; // 存儲錯誤訊息
        });
      
      // 取得這一份商品的全部圖片名稱
      axios.get(`${import.meta.env.VITE_CARA_URL}/front/shProductimgs.php?pageId=${pageId}`)
        .then((response) => {
          this.ImgsName = response.data;
          console.log(this.ImgsName);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          this.errorMessage = "執行失敗: " + error.message; // 存儲錯誤訊息
        });
      },
      
      getProductImgSrc(imgName){
        return new URL(`../assets/imgs/product/sh_products/${imgName}`, import.meta.url).href
      },

      showLarge(e) {
        // console.log('Clicked on image:', e.target.src);
    //     if (e.target.tagName === 'IMG' && e.target.src) {
    //       this.mainImage = e.target.src;
    // }
        const clickedImgSrc = e.target.src;
        // console.log('Clicked on image:', clickedImgSrc);
        const bigImg = document.getElementById('mainpic');
        bigImg.src = clickedImgSrc;
        console.log(bigImg);
      },
      // init() {
      //   const smalls = this.$refs.littlepicImgs;

      //   for (let i = 0; i < smalls.length; i++) {
      //     smalls[i].addEventListener("click", this.showLarge);
      //   }
      // },
      changeTab(tabIndex) {
        // 頁籤跳轉
        this.activeTab = tabIndex;
      },
      changeMainImage(image) {
        this.mainImage = image;
      },
    },
    mounted() {
      // this.init();
      
    }
  }
</script>

<template>
  <MainHeader />
  <div class="headerbg">
    <img src="../assets/imgs/draw/greeting_illust.svg" alt="">
    <div class="cloud">
      <DoubleCloud/>
    </div>
    
  </div>
<div class="sh_product_wrap">
  <!-- <img src="../assets/imgs/product/" alt=""> -->
    <div class="intromq">
      
      <h1>{{thisProduct.sh_pro_en_name}}</h1>
      <h2>{{thisProduct.sh_pro_name}}</h2>
    </div>
    <div class="prodpic">
      <div class="mainpic">
        <img v-if="ImgsName.length > 0" :src="getProductImgSrc(ImgsName[0].img_name)" alt="" id="mainpic">
      </div>
      <div class="littlepic">
        <img v-for="item in ImgsName" :src="getProductImgSrc(item.img_name)" alt="" @click="showLarge($event)" :key="item" class="littlepic">
      </div>
      
    </div>
    <div class="intro">
      <h1>{{thisProduct.sh_pro_en_name}}</h1>
      <h2>{{thisProduct.sh_pro_name}}</h2>
        <div class="year price">
            <span>${{ thisProduct.sh_pro_price}}</span>
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

        <div class="purchase_btn" id="purchase_btn">
          <a href="./CartView.vue">直接購買</a>
        </div>
    </div>
</div>
<div class="productIntro">
  <img src="../assets//imgs/product/info_bg.png" alt="">
  <ProductIntroCard/>
</div>


<div class="recommand">
  
  <!-- <ProCardSwiper1 :displayData="displayData" /> -->
</div>


<div class="sh_process">
  <div class="shbg">
    <img src="../assets/imgs/product/sh_bg.png" alt="">
  </div>
  <CardShProcess/> 
</div>

</template>
  
  <style lang="scss" scoped>
  
  @import '../assets/scss/page/shproduct';
  
  </style>