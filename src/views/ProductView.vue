<script>
  import axios from 'axios'; //引入函式庫
  import ProCardSwiper from '@/components/ProCardSwiper.vue'
  import MainHeader from '@/components/Header.vue';

  export default {
    components: {
      ProCardSwiper,MainHeader
    },
    data(){
      return {
        responseData : [],
        displayData: [],
        activeTab: 0,
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
  },
}
</script>
<template>
<MainHeader />
<main class="container">
  <div class="row">
    <div class="col-12 col-md-12 pro_title">
      <h1>超強小車車</h1>
      <h2>AMERICAN CLASSIC</h2>
    </div>
    <div class="col-12 col-md-6 pro_img_switcher">
      <div class="bigImgBox">
        <img src="../assets/imgs/product/sh_product_mainpic.png" alt="" class="bigImg">
      </div>
      <div class="smallImgsBox">
        <img src="../assets/imgs/product/sh_product_mainpic.png" alt="" class="smallImg">
        <img src="../assets/imgs/product/sh_product_litpic.png" alt="" class="smallImg">
        <img src="../assets/imgs/product/sh_product_litpic1.png" alt="" class="smallImg">
        <img src="../assets/imgs/product/sh_product_litpic2.png" alt="" class="smallImg">
      </div>
    </div>
    <div class="col-12 col-md-6 intro">
      <div class="price">$10,000</div>
      <div class="intro_tet">
        <ul>
          <li>可遙控操作</li>
          <li>續航能力強</li>
          <li>高效能馬達，提供平穩駕駛體驗</li>
          <li>內建音樂播放器，提升兒童駕駛樂趣</li>
          <li>運行時噪音小，適合室內外使用</li>
        </ul>
      </div>
      <div class="pro_functions">
        <form class="numberChoice" name="numberChoice" action="#">
          <label for="">數量</label>
          <div class="number_select">
            <input type="button" value="-" class="qtyMinus">
            <input type="text" name="quantity" value="0" class="qty">
            <input type="button" value="+" class="qtyPlus">
          </div>
        </form>
        <form class="additional_pro">
          <label for="">加購</label>
          <div class="choose_additional_pro">
            <button type="button" class="btn_buy_additional">
              <span>客製化車牌</span>
              <span>(+$300)</span>
              <input type="text" placeholder="請輸入最多8碼" maxlength="8">
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
          <svg xmlns="http://www.w3.org/2000/svg" width="38" height="34" viewBox="0 0 38 34" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.63165 3.69477C4.73707 5.01731 2.61716 8.16489 2.61716 11.9179C2.61716 15.7512 4.18746 18.7068 6.43474 21.2402C8.28943 23.327 10.5332 25.0578 12.7212 26.7433C13.2411 27.1446 13.7576 27.5441 14.2653 27.9437C15.183 28.6678 16.0013 29.3011 16.7917 29.7635C17.5804 30.2241 18.2155 30.4352 18.7563 30.4352C19.2972 30.4352 19.9323 30.2258 20.721 29.7635C21.5113 29.3011 22.3296 28.6678 23.2474 27.9437C23.7534 27.5424 24.2716 27.1446 24.7915 26.745C26.9795 25.0561 29.2233 23.327 31.078 21.2402C33.327 18.7068 34.8955 15.7512 34.8955 11.9179C34.8955 8.16663 32.7756 5.01731 29.881 3.69477C27.0685 2.40887 23.2893 2.7491 19.6985 6.48118C19.5765 6.60783 19.4301 6.70856 19.2682 6.77737C19.1063 6.84618 18.9322 6.88164 18.7563 6.88164C18.5804 6.88164 18.4064 6.84618 18.2445 6.77737C18.0826 6.70856 17.9362 6.60783 17.8142 6.48118C14.2234 2.7491 10.4442 2.40887 7.63165 3.69477ZM18.7563 3.75758C14.7224 0.145895 10.2052 -0.36009 6.54291 1.31315C2.67998 3.0841 0 7.18781 0 11.9196C0 16.5695 1.9367 20.1184 4.47884 22.9798C6.51325 25.2707 9.00305 27.1882 11.2032 28.8806C11.7022 29.2645 12.1855 29.6379 12.6444 30.0008C13.5395 30.7057 14.4991 31.4559 15.4709 32.0247C16.4428 32.5918 17.5525 33.0541 18.7563 33.0541C19.9602 33.0541 21.0699 32.5918 22.0418 32.0247C23.0153 31.4559 23.9732 30.7057 24.8683 30.0008C25.3462 29.6242 25.8266 29.2508 26.3095 28.8806C28.5079 27.1882 30.9994 25.2689 33.0339 22.9798C35.576 20.1184 37.5127 16.5695 37.5127 11.9196C37.5127 7.18781 34.8345 3.0841 30.9698 1.31664C27.3075 -0.358345 22.7903 0.14764 18.7563 3.75758Z" fill="black"/>
          </svg>
        </div>
        <button type="button" id="buyDirected">直接購買</button>
        <button type="button" id="addInCart">加入購物車</button>
      </div>
    </div>
  </div>
</main>

<div class="detail_selecter">
  <button type="button">商品介紹</button>
  <button type="button">購買須知</button>
  <button type="button">常見問題</button>
</div>
<div class="pro_detail">
  <h2>AMERICAN CLASSIC</h2>
  <div class="pro_detail_content">
    <div class="articlel">
      <p>
        設計特點：
        尺寸：適合3至8歲兒童。
        顏色：多樣化顏色選擇，包括鮮豔的紅色、藍色和粉色。
        安全帶：配備安全帶，保證兒童駕駛時的安全。
        遙控操作：父母可透過遙控器控制車輛，確保兒童安全。
        技術優勢：
        電池壽命：長效鋰電池，續航能力強。
        馬達效能：高效能馬達，提供平穩駕駛體驗。
        耐用性：堅固的車身結構，耐用且易於維護。
        使用優勢：
        音效系統：內建音樂播放器，提升兒童駕駛樂趣。
        照明系統：LED燈光，增加夜間駕駛的安全性。
        教育性：幫助兒童學習基本的駕駛技巧和交通安全知識。
        環境友好：
        無污染排放：電動驅動，不產生廢氣排放，環境友好。
        噪音低：運行時噪音小，適合室內外使用。
        這款兒童電動車結合了安全、樂趣和教育性，是適合家庭的理想選擇。
        規格：
        尺寸與重量：
        長度：約120公分。
        寬度：約60公分。
        高度：約50公分。
        重量：約20公斤。
        電池與續航：
        電池類型：鋰離子電池。
        充電時間：約2-3小時。
        續航能力：每次充滿電可行駛約1-2小時
        （視使用條件而定）。
        速度與控制：
        最高速度：每小時5-6公里。
        加速控制：腳踏式加速器。
        方向控制：方向盤操作。
        遙控器：2.4G無線遙控，控制範圍約20-30米。
        安全設計：
        安全帶：可調節五點式安全帶。
        制動系統：電子制動系統，
        腳離開加速器即自動減速停車。
        附加功能：
        音響系統：USB/MP3接口，內建小喇叭。
        燈光系統：前後LED照明燈。
        輪胎：耐磨防滑塑膠輪胎。
        適用年齡與承重：
        適用年齡：3至8歲。
        最大承重：約30公斤。
      </p>
    </div>
  </div>
  <!-- <img src="../assets/imgs/product/product_detail_hello.png" alt=""> -->
</div>

<ProCardSwiper :displayData="displayData" />

</template>

<style lang="scss" scoped>
  @import '../assets/scss/page/product';
</style>
