<script>
import axios from 'axios'; //引入函式庫
import CardShProcess from "@/components/card/CardShProcess.vue";
import MainHeader from '@/components/MainHeader.vue';
import PageNumber from "@/components/btn/PageNumber.vue"
import ProductCard from "@/components/ProductCard.vue"
import PriceSorter from '@/components/PriceSorter.vue';
import shProduct01 from '@/assets/imgs/product/sh_product_1.png'
import shProduct02 from '@/assets/imgs/product/sh_product_2.png'
import shProduct03 from '@/assets/imgs/product/sh_product_3.png'
import shProduct04 from '@/assets/imgs/product/sh_product_4.png'
import shProduct05 from '@/assets/imgs/product/sh_product_5.png'
import shProduct06 from '@/assets/imgs/product/sh_product_6.png'
import shProduct07 from '@/assets/imgs/product/sh_product_7.png'
import shProduct08 from '@/assets/imgs/product/sh_product_8.png'
import shProduct09 from '@/assets/imgs/product/sh_product_9.png'
  export default {
    components:{
      CardShProcess,MainHeader,PageNumber,ProductCard,PriceSorter
    },
    data(){
      return {
        // 頁數切換
        activeTab: "",
        currentPage: 1,
        perPage: 9,

        search: '',
        priceSorter: '',
        responseData : [],
        displayData: [],
        productDisplayList: [],
        sh_product_list: [
            {
              prod_img1:shProduct01,
              prod_name:"極光追逐者",
              prod_price:"3000",
              linkwhere:"/SecondHand"
            },
            {
              prod_img1:shProduct02,
              prod_name:"極速閃電車",
              prod_price:"5000",
              linkwhere:"/SecondHand"
            },
            {
              prod_img1:shProduct03,
              prod_name:"太空探險車",
              prod_price:"8000",
              linkwhere:"/SecondHand"
            },
            {
              prod_img1:shProduct04,
              prod_name:"科技漂移車",
              prod_price:"6000",
              linkwhere:"/SecondHand"
            },
            {
              prod_img1:shProduct05,
              prod_name:"爆炸速度狂飆車",
              prod_price:"4000",
              linkwhere:"/SecondHand"
            },
            {
              prod_img1:shProduct06,
              prod_name:"魔法變形賽車",
              prod_price:"6000",
              linkwhere:"/SecondHand"
            },
            {
              prod_img1:shProduct07,
              prod_name:"閃電漂移車",
              prod_price:"2500",
              linkwhere:"/SecondHand"
            },
            {
              prod_img1:shProduct08,
              prod_name:"太空漫步車",
              prod_price:"3500",
              linkwhere:"/SecondHand"
            },
            {
              prod_img1:shProduct09,
              prod_name:"磁浮飛行車",
              prod_price:"5500",
              linkwhere:"/SecondHand"
            },
        ],

      }
    },
    created() {
      // this.axiosGetData();
    },
    methods: {
      handleFilter() {
        this.displayData = this.responseData.filter((item) => {
          // console.log(item);
          return item.title.includes(this.search)
        })
      },
      handleSortChange(newSort){
          if (newSort === "0") {
            this.sh_product_list = this.responseData
          } else if (newSort === "desc") {
            this.sh_product_list.sort((a, b) => b.prod_price - a.prod_price);
          } else if (newSort === "asc"){
            this.sh_product_list.sort((a, b) => a.prod_price - b.prod_price);
          };
      },
      currentSidebar(item) {
          this.activeTab = item
      },
      changePage(page) {
          this.currentPage = page;
      },
    },
    computed:{
      // 頁數切換
      paginated(){
        const start = (this.currentPage - 1) * this.perPage; //將當前頁數-1再乘以頁面顯示內容筆數得到start值
        const end = start + this.perPage;//計算此頁面中的內容是否達到perPage中的數字最後索引值來得到end值
        return this.sh_product_list.slice(start, end);//用JS的.slice()方法獲取vue data中的member陣列內容顯示內容
      },
      totalPages() {
        return Math.ceil(this.sh_product_list.length / this.perPage);//用Math.ceil()無條件進位，值則是用member陣列物件長度除以顯示內容筆數取得
      },
    },
}
</script>
<template>
  <MainHeader />
  <div class="sh_pro_list_title">
      <h1>二手專區
      </h1>
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
        <ProductCard
        :displayData = "sh_product_list"
        />
      </div>
    </div>
    <div class="paginator">
      <PageNumber :totalPages="totalPages" :currentPage="currentPage" @pageChange="changePage" />
    </div>

    <div class="iwantsellCar">
            <div class="iwantsellCarbutton" onclick="togglePopup()">
            <a href="./SecondHandSale"><p>我要<br>賣車</p></a>    
            </div>
            
        </div>
  </div>

<CardShProcess/>
</template>

<style lang="scss" scoped>

@import '@/assets/scss/page/shproduct.scss';

</style>
