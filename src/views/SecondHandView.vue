<script>
//import axios from 'axios'; //引入函式庫
import CardShProcess from "@/components/card/CardShProcess.vue";
import TitleMaybeYouLike from "@/components/TitleMaybeYouLike.vue";
import TitleViewed from "@/components/TitleViewed.vue";
import ProductCard from "@/components/ProductCard.vue";
import MainHeader from "@/components/Header.vue";
import ProductIntroCard from "@/components/card/ProductIntroCard.vue";
import mainImage from "@/assets/imgs/product/sh_product_mainpic.png"

  export default {
    components:{
    CardShProcess, TitleMaybeYouLike, TitleViewed,
    ProductCard, MainHeader,ProductIntroCard,BtnProductBuy
},
    data(){
      return {
        search: '',
        responseData : [],
        sh_product_list: [
            {
              prod_img1:"/src/assets/imgs/product/sh_product_1.png",
              prod_name:"極光追逐者",
              prod_price:"$3000",
              linkwhere:"/SecondHand"
            },
            {
              prod_img1:"/src/assets/imgs/product/sh_product_2.png",
              prod_name:"極速閃電車",
              prod_price:"$5000",
              linkwhere:"/SecondHand"
            },
            {
              prod_img1:"/src/assets/imgs/product/sh_product_3.png",
              prod_name:"太空探險車",
              prod_price:"$8000",
              linkwhere:"/SecondHand"
            },
            {
              prod_img1:"/src/assets/imgs/product/sh_product_4.png",
              prod_name:"科技漂移车",
              prod_price:"$6000",
              linkwhere:"/SecondHand"
            },
            {
              prod_img1:"/src/assets/imgs/product/sh_product_5.png",
              prod_name:"爆炸速度狂飆车",
              prod_price:"$4000",
              linkwhere:"/SecondHand"
            },
            {
              prod_img1:"/src/assets/imgs/product/sh_product_6.png",
              prod_name:"魔法變形賽車",
              prod_price:"$6000",
              linkwhere:"/SecondHand"
            },
            {
              prod_img1:"/src/assets/imgs/product/sh_product_7.png",
              prod_name:"閃電漂移車",
              prod_price:"$2500",
              linkwhere:"/SecondHand"
            },
            {
              prod_img1:"/src/assets/imgs/product/sh_product_8.png",
              prod_name:"太空漫步車",
              prod_price:"$3500",
              linkwhere:"/SecondHand"
            },
            {
              prod_img1:"/src/assets/imgs/product/sh_product_9.png",
              prod_name:"磁浮飛行車",
              prod_price:"$5500",
              linkwhere:"/SecondHand"
            },
        ],
        displayData: [],
        activeTab: 0,
        mainImage: mainImage, 
        littleImages: [
          {img: 'sh_product_mainpic.png'},
          {img: 'sh_product_litpic.png'},
          {img: 'sh_product_litpic1.png'},
          {img: 'sh_product_litpic2.png'},
          // "/src/assets/imgs/product/sh_product_mainpic.png",
          // "/src/assets/imgs/product/sh_product_litpic.png",
          // "/src/assets/imgs/product/sh_product_litpic1.png",
          // "/src/assets/imgs/product/sh_product_litpic2.png",
        ],

      }
    },
    // created() {
      
    // },
    methods: {
      getImageUrl(paths) {
      return new URL(`../assets/imgs/product/${paths}`, import.meta.url).href
    },
      showLarge(e) {
        console.log('Clicked on image:', e.target.src);
        if (e.target.tagName === 'IMG' && e.target.src) {
          this.mainImage = e.target.src;
    }
      },
      init() {
        const smalls = this.$refs.littlepicImgs;

    for (let i = 0; i < smalls.length; i++) {
      smalls[i].addEventListener("click", this.showLarge);
    }
      },
      changeTab(tabIndex) {
        // 頁籤跳轉
        this.activeTab = tabIndex;
      },
      changeMainImage(image) {
        this.mainImage = image;
      },
    },
    mounted() {
      this.init();
      // this.mainImage = this.littleImages[0];

      // // 使用 Vue 提供的 $refs 來獲取元素，並使用 forEach 來動態設定事件監聽器
      // this.$refs.littleImages.forEach(img => {
      //   img.addEventListener("click", this.showLarge);
      // });
    }
  }
</script>

<template>
  <MainHeader />
<div class="sh_product_wrap">
    <div class="intromq">
      <h1>超強小車車</h1>
      <h2>AMERICAN CLASSIC</h2>
    </div>
    <div class="prodpic">
      <div class="mainpic" id="mainpic">
        <!-- <img src="../assets/imgs/product/sh_product_mainpic.png" alt="超強小車車"> -->
        <img :src="mainImage" alt="超強小車車">
      </div>
      <div class="littlepic">
        <img v-for="(image, index) in littleImages" :key="index" :src="image" alt="超強小車車" @click="showLarge" ref="littlepicImgs">


        <!-- <img src="../assets/imgs/product/sh_product_mainpic.png" alt="超強小車車">
        <img src="../assets/imgs/product/sh_product_litpic.png" alt="超強小車車">
        <img src="../assets/imgs/product/sh_product_litpic1.png" alt="超強小車車">
        <img src="../assets/imgs/product/sh_product_litpic2.png" alt="超強小車車"> -->
      </div>
      
    </div>
    <div class="intro">
        <h1>超強小車車</h1>
        <h2>AMERICAN CLASSIC</h2>
        <div class="year price">
            <span>$ 10,000</span>
            <span>車輛年份: 2019</span>
        </div>
        <div class="intro_text">
          <ul>
            <li>可遙控操作</li>
            <li>續航能力強</li>
            <li>高效能馬達，提供平穩駕駛體驗</li>
            <li>內建音樂播放器，提升兒童駕駛樂趣</li>
            <li>運行時噪音小，適合室內外使用</li>
          </ul>
        </div>

        <div class="purchase_btn" id="purchase_btn">
          <a href="./CartView.vue">直接購買</a>
        </div>
    </div>
</div>

<ProductIntroCard/>

<div class="recommand">
  <div class="view">
    <TitleViewed/>
    <div class="sh_prod_slider" >
      <button class="slider_left"><i class="fa-solid fa-arrow-right"></i></button>
    
      <div class="sh_slider_card" v-for="(item, index) in sh_product_list.slice(0, 3)" :key="index">
        <div class="sh_pro_card_img">
          <img :src="item.prod_img1" alt="sh_Product Image">
        </div>
        <div class="sh_pro_crad_info">
          <h6>{{ item.prod_name }}</h6>
          <p>{{ item.prod_price }}</p>
        </div>
      </div>

      <button><i class="fa-solid fa-arrow-right"></i></button>
    </div>

   
  </div>

  <div class="maybeYouLike">
    <TitleMaybeYouLike/>
    <div class="sh_prod_slider" >
      <button class="slider_left"><i class="fa-solid fa-arrow-right"></i></button>
    
      <div class="sh_slider_card" v-for="(item, index) in sh_product_list.slice(0, 3)" :key="index">
        <div class="sh_pro_card_img">
          <img :src="item.prod_img1" alt="sh_Product Image">
        </div>
        <div class="sh_pro_crad_info">
          <h6>{{ item.prod_name }}</h6>
          <p>{{ item.prod_price }}</p>
        </div>
      </div>

      <button><i class="fa-solid fa-arrow-right"></i></button>
    </div>

  </div>
</div>

<!-- <div class="salecar">
  <a href="./SecondHandSaleView.vue">我要賣車</a>
</div> -->



<CardShProcess/> 
</template>
  
  <style lang="scss" scoped>
  
  @import '../assets/scss/page/shproduct';
  
  </style>