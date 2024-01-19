<script>
import axios from 'axios'; //引入函式庫

  export default {
    data(){
      return {
        search: '',
        responseData : [],
        displayData: [],
        sh_contact: [
          {
            img: "src/assets/imgs/product/sh_process_bird.png",
            shSubtitle:'CONTACT',
            context: '透過電子郵件聯繫我們',
            arrowImg: "src/assets/imgs/product/sh_process_arrow.png"
          },
          {
            img: "src/assets/imgs/product/sh_process_bird.png",
            shSubtitle:'SECOND-HAND',
            context: '查看二手車輛商品',
            arrowImg: "src/assets/imgs/product/sh_process_arrow.png"
          },
          {
            img: "src/assets/imgs/product/sh_process_bird.png",
            shSubtitle:'RECYCLE CAR',
            context: '了解二手車輛販賣',
            arrowImg: "src/assets/imgs/product/sh_process_arrow.png"
          },
        ],

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
    getProductImageUrl(imageFileName) {
      // 返回完整的URL
      return `https://tibamef2e.com/cgd103/g1/images/shop/${imageFileName}`;
    }
  },
}
</script>
<template>
  <div class="pro_list_title col-12">
    <h1>新品專區</h1>
  </div>
  <div class="container">
    <div class="row">
      <div class="store_name col-12">
        <h2>CARA CAR</h2>
        <select name="" id="priceSorter">
          <option value=""></option>
          <option value="desc">價格　　↓</option>
          <option value="asc">價格　　↑</option>
        </select>
      </div>
      <div class="pro_list_filter col-12 col-md-1">
        <button><div class="arrow_ltr"></div><p>促銷中</p></button>
        <button><div class="arrow_ltr"></div><p>電動車</p></button>
        <button><div class="arrow_ltr"></div><p>配件</p></button>
        <button><div class="arrow_ltr"></div><p>模型車</p></button>
      </div>
      <div class="pro_card_list col-9 col-md-10">
        <!-- 用vfor迴圈出資料，而第一項資料是測試資料，所以用v-for="item, in displayData.slice(1)"直接從第二個資料開始取 -->
        <div class="product_card col-md-4" v-for="item, in displayData.slice(1)" :key="item.prod_id">
          <div class="pro_card_img">
            <img :src="getProductImageUrl(item.prod_img1)" alt="Product Image">
          </div>
          <div class="pro_crad_info">
            <h6>{{ item.prod_name }}</h6>
            <p>{{ item.prod_price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="sh_contact">
    <div class="sh_text">
      <h4>舊車新生，回憶傳承</h4>
      <p>如果您有二手車或是任何其他問題，歡迎聯繫我們。</p>
    </div>
      
      <div class="cards">
        <div class="contact_card" v-for="item in sh_contact">
          <div class="card_info">
            <img :src="item.img" alt="">
            <div class="item_text">
              <p>{{ item.shSubtitle }}</p>
              <p>{{ item.context }}</p>
            </div>
            
            <img :src="item.arrowImg" alt="" class="arrow">
          </div>
          
        </div>
      </div>
      
      <div class="phone">
        <img src="../assets/imgs/product/sh_process_contact.png" alt="">
        <div class="tel">
          <div class="contact_detail">
            <span>TELEPHONE</span>
            <span>連絡電話</span>
            <div class="phoneNumber">
              <img src="../assets/imgs/product/sh_process_tel.png" alt="">
              <span>03 425 1108</span>
          </div>
          
          <div class="opening">
            <span>每周一、二公休</span>
          </div>
        </div>
        </div>
      </div>
  </div>
    

</template>

<style lang="scss">

@import '@/assets/scss/page/product.scss';

</style>
