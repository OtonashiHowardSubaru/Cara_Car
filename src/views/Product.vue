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
    computed:{
      productCount(){
        return Array.isArray(this.displayData)? this.displayData.length : 0
      },
      nodata(){
        return this.responseData.length === 0
      },
      loading(){
        return this.responseData.length === 0
      },
    },
    created() {
      this.axiosGetData();
    },
    methods: {
      // fetchData(){
      //   fetch('https://fakestoreapi.com/products')
      //     .then(res=>res.json())
      //     .then(json=>this.responseData = json)
      // },
      axiosGetData(){
        axios.get('https://tibamef2e.com/cgd103/g1/api/getProducts.php?order=prod_name&limit=9&page=1')
          .then( res=> {
            console.log(res)
            if(res && res.data){
              this.responseData = res.data
              this.displayData = res.data
            }
          })
      },
      handleFilter(){
        this.displayData = this.responseData.filter((item)=>{
          // console.log(item);
          return item.title.includes(this.search)
        })
        }
    },
  }
</script>
<template>
  <div class="product_card" v-if="loading">

  </div>
  <div v-for="item in displayData">   
    <div class="pro_card_img">
      <img :src="item.prod_img1" alt="">
    </div>
    <div class="pro_crad_info">
      <h6>{{ item.prod_name }}</h6>
      <p>{{ item.prod_price }}</p>
    </div>
  </div>

</template>

<style lnag="scss">
</style>
