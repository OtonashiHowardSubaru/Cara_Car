<script>
import axios from 'axios'; //引入函式庫
import CardShProcess from "@/components/card/CardShProcess.vue";
import MainHeader from '@/components/MainHeader.vue';
import PageNumber from "@/components/btn/PageNumber.vue"
import shProductCard from "@/components/shProductCard.vue"
import PriceSorter from '@/components/PriceSorter.vue';
import GreenBird from "@/components/animation/GreenBird.vue";
import YellowBird from "@/components/animation/YellowBird.vue";
import BlueBird from "@/components/animation/BlueBird.vue";

export default {
  components: {
    CardShProcess, MainHeader, PageNumber, shProductCard, PriceSorter, GreenBird, BlueBird, YellowBird,
  },
  data() {
    return {
      // 頁數切換
      activeTab: "",
      currentPage: 1,
      perPage: 6,
      search: '',
      priceSorter: '',
      responseData: [],
      displayData: [],
      productDisplayList: [],

    }
  },
  created() {
    //axios的get方法(`$import.meta.env.{變數}/檔名.php`)用.env檔中寫的網址來判斷網址URL的前贅
    // 取得全部商品資料用作商品資料，以及swiper用的所有資料
    axios.get(`${import.meta.env.VITE_PHP_URL}/front/shProductList.php`)
      .then((response) => {
        // 成功取得資料後，將資料存入陣列
        console.log(response.data)
        this.responseData = response.data;
        this.displayData = response.data;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        this.errorMessage = "執行失敗: " + error.message; // 存儲錯誤訊息
      });
  },
  methods: {
    handleFilter() {
      this.displayData = this.responseData.filter((item) => {
        // console.log(item);
        return item.title.includes(this.search)
      })
    },
    handleSortChange(newSort) {
      if (newSort === "0") {
        this.displayData = this.responseData
      } else if (newSort === "desc") {
        this.displayData.sort((a, b) => b.sh_pro_price - a.sh_pro_price);
      } else if (newSort === "asc") {
        this.displayData.sort((a, b) => a.sh_pro_price - b.sh_pro_price);
      };
    },
    currentSidebar(item) {
      this.activeTab = item
    },
    changePage(page) {
      this.currentPage = page;
    },
  },
  computed: {
    // 頁數切換
    paginated() {
      const start = (this.currentPage - 1) * this.perPage; //將當前頁數-1再乘以頁面顯示內容筆數得到start值
      const end = start + this.perPage;//計算此頁面中的內容是否達到perPage中的數字最後索引值來得到end值
      return this.displayData.slice(start, end);//用JS的.slice()方法獲取vue data中的member陣列內容顯示內容
    },
    totalPages() {
      return Math.ceil(this.displayData.length / this.perPage);//用Math.ceil()無條件進位，值則是用member陣列物件長度除以顯示內容筆數取得
    },
  },
}
</script>
<template>
  <MainHeader />

  <div class="sh_pro_list_title">
    <h1>二手專區</h1>
  </div>
  <div class="container">
    <div class="row">
      <div class="store_name col-12">
        <h2>USED CAR</h2>
        
        <PriceSorter 
        @sortChange="handleSortChange" 
        id:priceSorter/>
        <div class="gbird">
          <GreenBird />
        </div>
        <div class="bbird">
          <BlueBird />
        </div>
        <div class="ybird">
          <YellowBird />
        </div>

      </div>

      <div class="sh_pro_card_list col-9 col-md-10 list">
        <shProductCard :displayData="paginated" />
      </div>
    </div>
    <div class="paginator">
      <PageNumber :totalPages="totalPages" :currentPage="currentPage" @pageChange="changePage" />
    </div>

    <div class="iwantsellCar">
      <button onclick="togglePopup()">
        <a href="./SecondHandSale"><img src="@/assets/imgs/draw/SHP_hand.svg" alt=""></a>
      </button>

    </div>
  </div>
  <div class="sh_process">
    <div class="shbg">
      <img src="@/assets/imgs/product/sh_bg.png" alt="">
    </div>
    <CardShProcess />
  </div>

</template>

<style lang="scss" scoped>
@import '@/assets/scss/page/shproduct.scss';
</style>
