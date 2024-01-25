<script>
import axios from 'axios'; //引入函式庫
import CardShProcess from "@/components/card/CardShProcess.vue";

  export default {
    components:{
      CardShProcess,
    },
    data(){
      return {
        search: '',
        responseData : [],
        displayData: [],
      }
    },
    created() {
      this.axiosGetData();
    },
    methods: {
      axiosGetData(){
        axios.get('https://tibamef2e.com/cgd103/g1/api/getProducts.php?order=prod_name&limit=9&page=1')
          .then( res=> {
            console.log(res)
            if(res && res.data && res.data.prods){
              this.responseData = res.data.prods
              this.displayData = res.data.prods
              //由於res是一整個方法，這個方法內有好幾個小東西，其中一個就是資料(data)
              //所以要取值才是res.data，而學長姐的api預設有prods與prodCount
              //所以才是displayData = res.data.prods
            }else{
              console.log('資料沒有回傳到displayData喔')
            }
          })
      },
      handleFilter(){
        this.displayData = this.responseData.filter((item)=>{
          // console.log(item);
          return item.title.includes(this.search)
        })
    },
    handleFilter() {
      this.displayData = this.responseData.filter((item) => {
        // console.log(item);
        return item.title.includes(this.search)
      })
    },
  },
}
</script>

<template>
<div class="sh_product_wrap">
    <div class="prodpic">
      <div class="mainpic">
        <img src="../assets/imgs/product/sh_product_mainpic.png" alt="超強小車車">
      </div>
      <div class="littlepic">
        <img src="../assets/imgs/product/sh_product_mainpic.png" alt="超強小車車">
        <img src="../assets/imgs/product/sh_product_litpic.png" alt="超強小車車">
        <img src="../assets/imgs/product/sh_product_litpic1.png" alt="超強小車車">
        <img src="../assets/imgs/product/sh_product_litpic2.png" alt="超強小車車">
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
          <a href="#">直接購買</a>
        </div>
        
    </div>
</div>

<div class="sh_detail">
  <h2>AMERICAN CLASSIC</h2>
  <div class="sh_detail_content">
    <div class="articlel">
      <p>
        <span>產品規格：</span>
        <ul>
          <li>
            <span>尺寸與重量：</span>
              <ul>
                <li>-長度：約120公分。</li>
                <li>-寬度：約60公分。</li>
                <li>-高度：約50公分。</li>
                <li>-重量：約20公斤。</li>
              </ul>
          </li>
          <li>
            <span>電池與續航：</span>
              <ul>
                <li>-電池類型：鋰離子電池。</li>
                <li>-充電時間：約2-3小時。</li>
                <li>-續航能力：每次充滿電可行駛約1-2小時（視使用條件而定）。</li>
              </ul>
          </li>
          <li>
            <span>速度與控制：</span>
            <ul>
              <li>-最高速度：每小時5-6公里。</li>
              <li>-加速控制：腳踏式加速器。</li>
              <li>-方向控制：方向盤操作。</li>
              <li>-遙控器：2.4G無線遙控，控制範圍約20-30米。</li>
            </ul>
          </li>
          <li>
            <span>安全設計：</span>
            <ul>
              <li>-安全帶：可調節五點式安全帶。</li>
              <li>-制動系統：電子制動系統，腳離開加速器即自動減速停車。</li>
            </ul>
          </li>
          <li>
            <span>附加功能：</span>
            <ul>
              <li>-音響系統：USB/MP3接口，內建小喇叭。</li>
              <li>-燈光系統：前後LED照明燈。</li>
              <li>-輪胎：耐磨防滑塑膠輪胎。</li>
            </ul>
          </li>
          <li>
            <span>適用年齡與承重：</span>
            <ul>
              <li>-適用年齡：3至8歲。</li>
              <li>-最大承重：約30公斤。</li>
            </ul>
          </li>
        </ul>
      </p>
    </div>
    <div class="articler">
        <ul>
          <span>產品特點：</span>
          <li>-可透過遙控器控制車輛，確保兒童安全。</li>
          <li>-高效能馬達，提供平穩駕駛體驗。</li>
          <li>-堅固的車身結構，耐用且易於維護。</li>
          <li>-內建音樂播放器，提升兒童駕駛樂趣。</li>
          <li>-幫助兒童學習基本的駕駛技巧和交通安全知識。</li>
          <li>-運行時噪音小，適合室內外使用。</li>
        </ul>
    </div>
  </div>
  <img src="../assets/imgs/product/product_detail_hello.png" alt="">
</div>

<div class="recommand">
  <div class="view">
  <h4>別人也逛過</h4>
  <button class="slider_left"><img src="/src/assets/imgs/product/sh_slide_arrow.png" alt=""></button>

  <button class="slider_right"><img src="/src/assets/imgs/product/sh_slide_arrow.png" alt=""></button>

</div>
<div class="maybeYouLike">
  <h4>也許你會喜歡</h4>
  <button class="slider_left"><img src="/src/assets/imgs/product/sh_slide_arrow.png" alt=""></button>

  <button class="slider_right"><img src="/src/assets/imgs/product/sh_slide_arrow.png" alt=""></button>
</div>
</div>



<CardShProcess/> 
</template>
  
  <style lang="scss" scoped>
  
  @import '@/assets/scss/page/shproduct.scss';
  
  </style>