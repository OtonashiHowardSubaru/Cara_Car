<script>
import axios from 'axios'; //引入涵式庫

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
      getProductImageUrl(imageFileName) {
      // 返回完整的图片 URL
      return `https://tibamef2e.com/cgd103/g1/images/shop/${imageFileName}`;
    }
    },
  }
</script>
<template>
  <div >
  </div>
  <!-- 用vfor迴圈出資料，而第一項資料是測試資料，所以用v-if="index > 0"直接從第二個資料開始取 -->
  <div v-for="(item,index) in displayData" :key="item.prod_id">
    <div v-if="index > 0" class="product_card">
      <div class="pro_card_img">
        <img :src="getProductImageUrl(item.prod_img1)" alt="Product Image">
      </div>
      <div class="pro_crad_info">
        <h6>{{ item.prod_name }}</h6>
        <p>{{ item.prod_price }}</p>
      </div>
    </div>
  </div>

</template>

<style lnag="scss">
</style>
