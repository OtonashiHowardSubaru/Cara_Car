  <script>
  import axios from 'axios'; //引入函式庫
  import ProductCard from '@/components/ProductCard.vue';
  import PriceSorter from '@/components/PriceSorter.vue';
  import CardShProcess from "@/components/card/CardShProcess.vue";
  import PageNumber from "@/components/btn/PageNumber.vue";
  import BtnFilter from '@/components/btn/BtnFilter.vue';
  import MainHeader from '@/components/MainHeader.vue';

  export default {
    components:{
      ProductCard,
      PriceSorter,
      CardShProcess,
      PageNumber,
      BtnFilter,
      MainHeader,
    },
    data(){
      return {
        // 頁數切換
        activeTab: "",
        currentPage: 1,
        perPage: 9,
        newSort: '',
        filter: [
          {
            filterId: "electricCar",
            filterName: "電動車",
          },
          {
            filterId: "Accessory",
            filterName: "配件",
          },
          {
            filterId: "ModelCar",
            filterName: "模型車",
          },
        ],
        activeFilter: '',
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
            img: "src/assets/imgs/product/sh_process_second_hand.png",
            shSubtitle:'SECOND-HAND',
            context: '查看二手車輛商品',
            arrowImg: "src/assets/imgs/product/sh_process_arrow.png"
          },
          {
            img: "src/assets/imgs/product/sh_process_recycle_car.png",
            shSubtitle:'RECYCLE CAR',
            context: '了解二手車輛販賣',
            arrowImg: "src/assets/imgs/product/sh_process_arrow.png"
          },
        ],
      }
    },
    created() {
      //axios的get方法(`$import.meta.env.{變數}/檔名.php`)用.env檔中寫的網址來判斷網址URL的前贅
      // 取得全部商品資料用作商品資料，以及swiper用的所有資料
      axios.get(`${import.meta.env.VITE_CARA_URL}/front/productlist.php`)
        .then((response) => {
          // 成功取得資料後，將資料存入陣列
          // console.log(response.data)
          this.responseData = response.data;
          this.displayData = response.data;
      })
        .catch((error) => {
          console.error("Error fetching data:", error);
          this.errorMessage = "執行失敗: " + error.message; // 存儲錯誤訊息
        });
    },
    methods: {
      // 目前有個小bug，我懶得修，是價格篩選器再返還至預設值時，類別篩選要重新啟動
      // 價格排序的涵式
      handleSortChange(newSort){
        if (newSort === "0") {
          this.displayData = this.responseData
        } else if (newSort === "desc") {
          this.displayData.sort((a, b) => b.pro_price - a.pro_price);
        } else if (newSort === "asc"){
          this.displayData.sort((a, b) => a.pro_price - b.pro_price);
        };
      },

      // 商品種類的篩選(共兩個函式，一個切換啟動關閉、一個過濾)
      handleToggleFilter(filterName, isActive) {
        // 如果按鈕是啟動的，將過濾單位加入過濾器activeFilter 內；否則，從中刪除
        if (isActive) {
          this.activeFilter = filterName;
        } else {
          this.activeFilter = '';
        }
        // 在這裡更新過濾邏輯，可能需要重新運行過濾
        this.updateFilter(); // 這裡需要定義 updateFilter 方法
      },
      updateFilter(){
        if (this.activeFilter == '') {
          this.displayData = this.responseData;
        } else {
          // 當有按鈕被啟動時，篩選資料
          this.displayData = this.responseData.filter(item => {
            return item.pro_category.includes(this.activeFilter)
          });
        }
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
        return this.displayData.slice(start, end);//用JS的.slice()方法獲取vue data中的member陣列內容顯示內容
      },
      totalPages() {
        return Math.ceil(this.displayData.length / this.perPage);//用Math.ceil()無條件進位，值則是用member陣列物件長度除以顯示內容筆數取得
      },
    }
  }
  </script>
  <template>
    <MainHeader />
    <div class="pro_list_title">
      <h1>新品專區
      </h1>
    </div>
    <div class="container">
      <div class="row">
        <div class="store_name col-12">
          <h2>CARA CAR</h2>
          <PriceSorter 
          @sortChange="handleSortChange"
          />
        </div>
        <div class="pro_list_filter col-12 col-md-1">
          <BtnFilter 
            v-for="item in filter"
            :filterId="item.filterId"
            :filterName="item.filterName"
            :key="item"
            @toggleFilter="handleToggleFilter"
          />
        </div>
        <div class="pro_card_list col-md-10">
          <ProductCard 
          :displayData="displayData"
          />
        </div>
      </div>
    </div>
    <PageNumber :totalPages="totalPages" :currentPage="currentPage" @pageChange="changePage" />

  <CardShProcess/>
</template>

  <style lang="scss">

  @import '@/assets/scss/page/productList.scss';

  </style>
