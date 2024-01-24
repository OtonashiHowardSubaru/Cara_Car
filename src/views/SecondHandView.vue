<script>
import axios from 'axios'; //引入函式庫

  export default {
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
    <div class="intro">
        <h4>超強小車車</h4>
        <h4>AMERICAN CLASSIC</h4>
        <div class="year price">
            <span>$ 10,000</span>
            <span>車輛年份: 2019</span>
        </div>
        <ul>
            <li>可遙控操作</li>
            <li>續航能力強</li>
            <li>高效能馬達，提供平穩駕駛體驗</li>
            <li>內建音樂播放器，提升兒童駕駛樂趣</li>
            <li>運行時噪音小，適合室內外使用</li>
        </ul>
        <a href="#">直接購買</a>
    </div>

    <!-- tab -->
    <div id="searchItem" class="list">
            <ul>
            　 <li class="onSearch"><a onclick="SearchTag('searchItem','searchCont','0');">商品介紹</a></li>
            　 <li><a onclick="SearchTag('searchItem','searchCont','1');">購物須知</a></li>
                <li><a onclick="SearchTag('searchItem','searchCont','2');">常見問題</a></li>
            </ul>
            </div>
            <div id="searchCont" class="searchCont">
                <ul>
                　 <li>
                    
                      <div class="aboutShProduct">
                          <div class="productIntro">
                              <h4>AMERICAN CLASSIC</h4>
                              <p>
                                產品規格：
尺寸與重量：
      -長度：約120公分。
      -寬度：約60公分。
      -高度：約50公分。
      -重量：約20公斤。
電池與續航：
      - 電池類型：鋰離子電池。
      -充電時間：約2-3小時。
      - 續航能力：每次充滿電可行駛約1-2小時
                       （視使用條件而定）。
速度與控制：
      -最高速度：每小時5-6公里。
      -加速控制：腳踏式加速器。
      -方向控制：方向盤操作。
      -遙控器：2.4G無線遙控，控制範圍約20-30米。
安全設計：
      -安全帶：可調節五點式安全帶。
      -制動系統：電子制動系統，腳離開加速器即自動減速停車。
附加功能：
      -音響系統：USB/MP3接口，內建小喇叭。
      -燈光系統：前後LED照明燈。
      -輪胎：耐磨防滑塑膠輪胎。
適用年齡與承重：
      -適用年齡：3至8歲。
      -最大承重：約30公斤。
                              </p>
                              
                          
                          </div> 
              
                      </div>
                  </li><!--0 -->
                  <li>
                    
                      <div class="aboutShProduct">
                          <div class="purchase">
                              
                              
                          
                          </div> 
              
                      </div>
                  </li><!--1 -->
                  <li>
                
                      <div class="aboutShProduct">
                          <div class="question">
                              
                              
                          
                          </div> 
              
                      </div>
                  </li><!--2 -->
            
                </ul>
            </div>

</div>
  
</template>
  
  <style lang="scss" scoped>
  
  @import '@/assets/scss/page/second_hand.scss';
  
  </style>