<script>
//import axios from 'axios'; //引入函式庫
import CardShProcess from "@/components/card/CardShProcess.vue";
import TitleMaybeYouLike from "@/components/TitleMaybeYouLike.vue";
import TitleViewed from "@/components/TitleViewed.vue";
import ProductCard from "@/components/ProductCard.vue";
import MainHeader from "@/components/Header.vue";
import ProductIntroCard from "@/components/card/ProductIntroCard.vue";


  export default {
    components:{
    CardShProcess, TitleMaybeYouLike, TitleViewed,
    ProductCard, MainHeader,ProductIntroCard
},
    data(){
      return {
        search: '',
        responseData : [],
        displayData: [],
        activeTab: 0,
        mainImage: "/src/assets/imgs/product/sh_product_mainpic.png", 
        littleImages: [  
          "/src/assets/imgs/product/sh_product_mainpic.png",
          "/src/assets/imgs/product/sh_product_litpic.png",
          "/src/assets/imgs/product/sh_product_litpic1.png",
          "/src/assets/imgs/product/sh_product_litpic2.png",
        ],
      }
    },
    // created() {
      
    // },
    methods: {
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
        
        <div class="purchase_btn">
          <a href="./CartView.vue">直接購買</a>
        </div>
        
    </div>
</div>

<ProductIntroCard/>

<div class="recommand">
  <div class="view">
    <TitleViewed/>
    <button class="slider_left"><i class="fa-solid fa-arrow-right"></i></button>
    <ProductCard/>

    <button><i class="fa-solid fa-arrow-right"></i></button>

  </div>
  <div class="maybeYouLike">
    <TitleMaybeYouLike/>
    <button class="slider_left"><i class="fa-solid fa-arrow-right"></i></button>

    <button><i class="fa-solid fa-arrow-right"></i></button>
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