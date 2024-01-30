<script>
import axios from 'axios'; //引入函式庫
import MainHeader from '@/components/Header.vue';
import CardShProcess from "@/components/card/CardShProcess.vue";
import TitleMaybeYouLike from "@/components/TitleMaybeYouLike.vue";
import TitleViewed from "@/components/TitleViewed.vue";
import ProductCard from "@/components/ProductCard.vue";

// 小圖換大圖
function showLarge(e){
  let small = e.target;
  document.getElementById("mainpic").src = small.src;
}

function init(){
    let smalls = document.querySelectorAll(".littlepic img");

    for(let i=0; i<smalls.length; i++) {
        smalls[i].onclick = showLarge;
    }
}

window.onload = function() {
  init();
};


  export default {
    components:{
    CardShProcess, TitleMaybeYouLike, TitleViewed, MainHeader, ProductCard,
    ProductCard,
},
    data(){
      return {
        search: '',
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
    showLarge(e) {
      // 使用 Vue 提供的方式來獲取元素和設定屬性
      this.$refs.mainpic.src = e.target.src;
    },

    init() {
      // 使用 Vue 提供的 $refs 來獲取元素，並使用 v-for 來動態設定事件監聽器
      const smalls = this.$refs.littlepicImgs;

      for (let i = 0; i < smalls.length; i++) {
        smalls[i].addEventListener("click", this.showLarge);
      }
    },
    changeTab(tabIndex) {
      // 頁籤跳轉
      this.activeTab = tabIndex;
    },
  },

  mounted() {
    this.init(); 
  }
}
</script>

<template>
<div class="sh_product_wrap">
    <div class="intromq">
      <h1>超強小車車</h1>
      <h2>AMERICAN CLASSIC</h2>
    </div>
    <div class="prodpic">
      <div class="mainpic" id="mainpic">
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

<!-- 頁籤 -->
<div class="introduction">
    <div id="searchItem" class="searchItem">
    <ul>
      <li :class="{ 'onSearch': activeTab === 0 }" @click="changeTab(0)">商品介紹</li>
      <li :class="{ 'onSearch': activeTab === 1 }" @click="changeTab(1)">購物須知</li>
      <li :class="{ 'onSearch': activeTab === 2 }" @click="changeTab(2)">常見問題</li>
    </ul>
  </div>
  <div class="sh_detail">
    <div id="searchCont" class="searchCont">
      <ul>
        <li v-show="activeTab === 0">
          <div class="form" id="cont">
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
              
          </div>
        </li>  <!-- no.1 -->

        <li v-show="activeTab === 1">
          <div class="form">
            <h2>購物須知</h2>
            <div class="sh_detail_content">
              <div class="articlel">
                <ul>
                  <li>
                    <span>商品資訊 :</span>
                    <p>我們提供詳細的商品資訊，包括尺寸、顏色、材質等。商品圖片是實物拍攝，以確保您能夠充分了解商品的外觀。</p>
                  </li>
                  <li>
                    <span>價格與折扣：</span>
                    <p>所有商品價格均已包含相關稅金。運費將在結帳時顯示。
                    如果有促銷或折扣活動，請在結帳前輸入優惠碼以享受相應優惠。
                    </p>
                  </li>
                  <li>
                    <span>庫存與供應鏈：</span>
                    <p>我們定期更新庫存狀態，確保您看到的商品均為現貨。發貨時間可能會受到節假日等因素的影響。
                    預計發貨時間僅供參考，實際發貨時間可能因不可抗力因素而有所變動。
                    </p>
                  </li>
                  <li>
                    <span>購物車與結帳：</span>
                    <p>購物車內的商品數量和款式可在結帳前進行修改。請仔細檢查您的訂單內容。
                    請確保在結帳前填寫正確的收件人地址和聯絡方式，以確保順利收到商品。
                    </p>
                  </li>
                  <li>
                    <span>支付選項:：</span>
                    <p>我們接受的支付方式包括信用卡、PayPal等。請確保您的支付資訊安全。
                    </p>
                  </li>
                  <li>
                    <span>退換貨政策：</span>
                    <p>如需辦理退換貨，請在收到商品後的指定期限內聯繫客戶服務，並提供相關訂單信息。
                    請注意，某些商品可能不支持退換貨服務，請查看商品頁面的退換貨條件。
                    </p>
                  </li>
                  
                </ul>
              </div>
              <div class="articler">
                  <ul>
                    <li>
                    <span>客戶服務：</span>
                    <p>若您有任何疑問或需要協助，請隨時聯繫我們的客戶服務團隊。我們將盡快回覆您的查詢。
                    </p>
                  </li>
                  <li>
                    <span>隱私與安全：</span>
                    <p>保護您的隱私是我們的首要任務。請查閱我們的隱私政策以瞭解我們如何處理您的個人資訊。
                    </p>
                  </li>
                  </ul>
              </div>
            </div>
          </div>
        </li><!-- no.2 -->

        <li v-show="activeTab === 2">
          <div class="form">
            <h2>常見問題</h2>
            <div class="sh_detail_content">
              <div class="articlel">
                <ul>
                  <li>
                    <span>如何購物？</span>
                    <p>在我們的網站上購物非常簡單！您只需瀏覽我們的商品頁面，選擇您喜歡的商品，並將其加入購物車。然後，進行結帳並提供您的收貨信息和支付方式。完成付款後，您將收到一封訂單確認郵件。</p>
                  </li>
                  <li>
                    <span>我該如何追蹤我的訂單？</span>
                    <p>在您的帳戶中，您可以點擊「訂單追蹤」以查看您的訂單狀態。一旦我們發貨，您將收到包含訂單追蹤號碼的通知郵件，您可以使用此號碼在運輸公司的網站上追蹤包裹。
                    </p>
                  </li>
                  <li>
                    <span>有免費送貨的選項嗎？</span>
                    <p>是的，我們提供訂單金額達到一定標準時的免費送貨服務。您可以在結帳頁面查看相關選項，以確認是否有資格享受免費送貨。
                    </p>
                  </li>
                  <li>
                    <span>如何辦理退換貨？</span>
                    <p>如需辦理退換貨，請在收到商品後的指定期限內聯繫我們的客戶服務，提供相關的訂單信息。我們將指導您完成退換貨流程。請注意，某些商品可能不支持退換貨，請查看商品頁面的退換貨條件。
                    </p>
                  </li>
                  <li>
                    <span>如何聯絡客戶服務？</span>
                    <p>您可以透過我們的聯絡頁面與我們的客戶服務團隊聯繫。我們會盡快回覆您的查詢。您也可以通過電子郵件或客服熱線聯繫我們。
                    </p>
                  </li>
                  <li>
                    <span>如何確保支付安全？</span>
                    <p>我們使用安全的支付系統，包括SSL加密技術，以確保您的支付資訊安全。我們不會儲存您的信用卡信息。
                    </p>
                  </li>
                  
                </ul>
              </div>
              <div class="articler">
                  <ul>
                    <li>
                    <span>產品是否有保固？</span>
                    <p>是的，我們的產品通常都有一定的保固期限。詳細的保固信息可以在商品頁面找到，也可以在收到商品時附帶的保固卡上查閱。
                    </p>
                  </li>
                  <li>
                    <span>是否支持國際運送？</span>
                    <p>是的，我們提供國際運送服務。在結帳時，您可以選擇您的國家並檢視相應的運費和交貨時間。
                    </p>
                  </li>
                  </ul>
              </div>
            </div>
          </div>
        </li><!-- no.3 -->
      </ul>
    </div>
    <img src="../assets/imgs/product/product_detail_hello.png" alt="">
  </div>
  
</div>

<div class="recommand">
  <div class="view">
    <TitleViewed/>
    <button class="slider_left"><img src="/src/assets/imgs/product/sh_slide_arrow.png" alt=""></button>
    <ProductCard/>

    <button class="slider_right"><img src="/src/assets/imgs/product/sh_slide_arrow.png" alt=""></button>

  </div>
  <div class="maybeYouLike">
    <TitleMaybeYouLike/>
    <button class="slider_left"><img src="/src/assets/imgs/product/sh_slide_arrow.png" alt=""></button>

    <button class="slider_right"><img src="/src/assets/imgs/product/sh_slide_arrow.png" alt=""></button>
  </div>
</div>



<CardShProcess/> 
</template>
  
  <style lang="scss" scoped>
  
  @import '../assets/scss/page/shproduct';
  
  </style>