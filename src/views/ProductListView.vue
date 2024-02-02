  <script>
  import axios from 'axios'; //引入函式庫
  import ProductCard from '@/components/ProductCard.vue';
  import PriceSorter from '@/components/PriceSorter.vue';
  import CardShProcess from "@/components/card/CardShProcess.vue";
  import PageNumber from "@/components/btn/PageNumber.vue";
  import BtnFilter from '@/components/btn/BtnFilter.vue';
  import MainHeader from '@/components/MainHeader.vue';

  import product01 from '@/assets/imgs/product/product_1.png';
  import product02 from '@/assets/imgs/product/product_2.png';
  import product03 from '@/assets/imgs/product/product_3.png';
  import product04 from '@/assets/imgs/product/product_4.png';
  import product05 from '@/assets/imgs/product/product_5.png';
  import product06 from '@/assets/imgs/product/product_6.png';
  import product07 from '@/assets/imgs/product/product_7.png';
  import product08 from '@/assets/imgs/product/product_8.png';
  import product09 from '@/assets/imgs/product/product_9.png';

  export default {
    components:{
      ProductCard, PriceSorter, CardShProcess, PageNumber, BtnFilter, MainHeader,
    },
    data(){
      return {
        newSort: '',
        filter: [
          {
            filterId: "",
            filterName: "促銷中",
          },
          {
            filterId: "",
            filterName: "電動車",
          },
          {
            filterId: "",
            filterName: "配件",
          },
          {
            filterId: "",
            filterName: "模型車",
          },
        ],
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
        productList:[
        {
              prod_img1:product01,
              prod_name:"起始玩家",
              prod_price:"5000",
              linkwhere:"/Product"
            },
            {
              prod_img1:product02,
              prod_name:"賓士少爺",
              prod_price:"10000",
              linkwhere:"/Product"
            },
            {
              prod_img1:product03,
              prod_name:"賓士少爺二代",
              prod_price:"12000",
              linkwhere:"/Product"
            },
            {
              prod_img1:product04,
              prod_name:"敞篷輕旅",
              prod_price:"12000",
              linkwhere:"/Product"
            },
            {
              prod_img1:product05,
              prod_name:"野貓戰機",
              prod_price:"8000",
              linkwhere:"/Product"
            },
            {
              prod_img1:product06,
              prod_name:"敞篷輕旅二代",
              prod_price:"14000",
              linkwhere:"/Product"
            },
            {
              prod_img1:product07,
              prod_name:"赤色風暴",
              prod_price:"8000",
              linkwhere:"/Product"
            },
            {
              prod_img1:product08,
              prod_name:"英倫經典",
              prod_price:"10000",
              linkwhere:"/Product"
            },
            {
              prod_img1:product09,
              prod_name:"F1一代",
              prod_price:"18000",
              linkwhere:"/Product"
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
      handleSortChange(newSort){
        if (newSort === "0") {
          this.productList = this.responseData
        } else if (newSort === "desc") {
          this.productList.sort((a, b) => b.prod_price - a.prod_price);
        } else if (newSort === "asc"){
          this.productList.sort((a, b) => a.prod_price - b.prod_price);
        };
      },
      handleFilter(){ //這是老師的標題搜尋範例，先留著也許哪天用的到
        this.displayData = this.responseData.filter((item)=>{
          // console.log(item);
          return item.title.includes(this.search)
        })
      },
    },
  }
  </script>
  <template>
    <MainHeader />
    <div class="pro_list_title col-12">
      <h1><img src="../assets/imgs/product/productList_title.png" alt="新品專區"></h1>
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
          />
        </div>
        <div class="pro_card_list col-md-10">
          <ProductCard 
          :displayData="productList"
          />
        </div>
      </div>
    </div>
<PageNumber />

  <CardShProcess/>
</template>

  <style lang="scss">

  @import '@/assets/scss/page/productList.scss';

  </style>
