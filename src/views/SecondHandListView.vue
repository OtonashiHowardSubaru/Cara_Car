<script>
import axios from 'axios'; //引入函式庫

  export default {
    data(){
      return {
        search: '',
        responseData : [],
        displayData: [],
        sh_product_list: [
            {
                img:"/src/assets/imgs/product/sh_product_1.png",
                sh_product_name:"極光追逐者",
                sh_product_price:"$3000"
            },
            {
                img:"/src/assets/imgs/product/sh_product_2.png",
                sh_product_name:"極速閃電車",
                sh_product_price:"5000"
            },
            {
                img:"/src/assets/imgs/product/sh_product_3.png",
                sh_product_name:"太空探險車",
                sh_product_price:"8000"
            },
            {
                img:"/src/assets/imgs/product/sh_product_4.png",
                sh_product_name:"科技漂移车",
                sh_product_price:"6000"
            },
            {
                img:"/src/assets/imgs/product/sh_product_5.png",
                sh_product_name:"爆炸速度狂飆车",
                sh_product_price:"4000"
            },
            {
                img:"/src/assets/imgs/product/sh_product_6.png",
                sh_product_name:"魔法變形賽車",
                sh_product_price:"6000"
            },
            {
                img:"/src/assets/imgs/product/sh_product_7.png",
                sh_product_name:"閃電漂移車",
                sh_product_price:"2500"
            },
            {
                img:"/src/assets/imgs/product/sh_product_8.png",
                sh_product_name:"太空漫步車",
                sh_product_price:"3500"
            },
            {
                img:"/src/assets/imgs/product/sh_product_9.png",
                sh_product_name:"磁浮飛行車",
                sh_product_price:"5500"
            },
        ],

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
  <div class="sh_pro_list_title col-12">
    <h1>二手車專區</h1>
  </div>
  <div class="container">
    <div class="row">
      <div class="store_name col-12">
        <h2>USED CAR</h2>
        <select name="" id="priceSorter">
          <option value=""></option>
          <option value="desc">價格　　↓</option>
          <option value="asc">價格　　↑</option>
        </select>
      </div>
      
      <div class="sh_pro_card_list col-9 col-md-10">
        <div class="sh_product_card col-md-4" v-for="item in sh_product_list">
          <div class="sh_pro_card_img">
            <img :src="item.img" alt="sh_Product Image">
          </div>
          <div class="sh_pro_crad_info">
            <h6>{{ item.sh_product_name }}</h6>
            <p>{{ item.sh_product_price }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="paginator">
        <ul>
            <li><img src="" alt=""></li>
            <li><a href="">1</a></li>
            <li><a href="">2</a></li>
            <li><a href="">3</a></li>
            <li><a href="">4</a></li>
            <li><a href="">5</a></li>
            <li><img src="" alt=""></li>
        </ul>
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
          </div>

          <div class="opening">
            <span>每周一、二公休</span>
          </div> 
        </div>  
      </div>
    </div>  
  </div>
    

</template>

<style lang="scss" scoped>

@import '@/assets/scss/page/shproduct.scss';

</style>
