  <script>
  import axios from 'axios'; //引入函式庫
  import ProductCard from '@/components/ProductCard.vue';
  import PriceSorter from '@/components/PriceSorter.vue';
  import CardShProcess from "@/components/card/CardShProcess.vue";
  import PageNumber from "@/components/btn/PageNumber.vue";
  import BtnFilter from '@/components/btn/BtnFilter.vue';
  import MainHeader from '@/components/Header.vue'
  export default {
    components:{
      ProductCard, PriceSorter, CardShProcess, PageNumber, BtnFilter,MainHeader
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
          this.displayData = this.responseData
        } else if (newSort === "desc") {
          this.displayData.sort((a, b) => b.prod_price - a.prod_price);
        } else if (newSort === "asc"){
          this.displayData.sort((a, b) => a.prod_price - b.prod_price);
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
      <h1>新品專區</h1>
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
          />
        </div>
        <div class="pro_card_list col-9 col-md-10">
          <ProductCard 
          :displayData="displayData"
          />
        </div>
      </div>
    </div>
<PageNumber />

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
        </div>

        <div class="opening">
          <span>每周一、二公休</span>
        </div> 
      </div>  
    </div>

  </div>
</template>

  <style lang="scss">

  @import '@/assets/scss/page/productList.scss';

  </style>
