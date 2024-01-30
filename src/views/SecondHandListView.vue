<script>
import axios from 'axios'; //引入函式庫
import CardShProcess from "@/components/card/CardShProcess.vue";
import MainHeader from '@/components/Header.vue';
import PageNumber from "@/components/btn/PageNumber.vue"
import ProductCard from "@/components/ProductCard.vue"
import PriceSorter from '@/components/PriceSorter.vue';
  export default {
    components:{
      CardShProcess,MainHeader,PageNumber,ProductCard,PriceSorter
    },
    data(){
      return {
        search: '',
        priceSorter: '',
        responseData : [],
        displayData: [],
        productDisplayList: [],
        sh_product_list: [
            {
                img:"/src/assets/imgs/product/sh_product_1.png",
                sh_product_name:"極光追逐者",
                sh_product_price:"3000"
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

      }
    },
    created() {
      // this.axiosGetData();
    },
    methods: {
      axiosGetData(){
        axios.get('https://tibamef2e.com/cgd103/g1/api/getProducts.php?order=prod_name&limit=9&page=1')
          .then( res=> {
            // console.log(res)
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
    handleFilter() {
      this.displayData = this.responseData.filter((item) => {
        // console.log(item);
        return item.title.includes(this.search)
      })
    },
    getProductImageUrl(imageFileName) {
      // 返回完整的URL
      return `https://tibamef2e.com/cgd103/g1/images/shop/${imageFileName}`;
    },
    handleSortChange(newSort){
        if (newSort === "0") {
          this.displayData = this.responseData
        } else if (newSort === "desc") {
          this.displayData.sort((a, b) => b.prod_price - a.prod_price);
        } else if (newSort === "asc"){
          this.displayData.sort((a, b) => a.prod_price - b.prod_price);
        };
      },
  },
}
</script>
<template>
  <MainHeader />
  <div class="sh_pro_list_title col-12">
    <h1><img src="../assets/imgs/product/sh_product_list_title.png" alt="used car 二手車"></h1>
  </div>
  <div class="container">
    <div class="row">
      <div class="store_name col-12">
        <h2>USED CAR</h2>
          <PriceSorter 
            @sortChange="handleSortChange"
          />
      </div>
      
      <div class="sh_pro_card_list col-9 col-md-10">
        <div class="sh_product_card col-md-4" v-for="item in sh_product_list">
          <div class="sh_pro_card_img">
            <img :src="item.img" alt="sh_Product Image">
          </div>
          <div class="sh_pro_crad_info">
            <h6>{{ item.sh_product_name }}</h6>
            <p>${{ item.sh_product_price }}</p>
          </div>
        </div>
        <!-- <ProductCard/> -->
      </div>
    </div>
    <div class="paginator">
        <PageNumber/>
    </div>
    
  </div>

<CardShProcess/>
</template>

<style lang="scss" scoped>

@import '@/assets/scss/page/shproduct.scss';

</style>
