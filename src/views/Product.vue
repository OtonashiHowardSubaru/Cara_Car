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
  <div class="product">
    <h1>This is an product page</h1>
    <input type="text" v-model.trim="search" @input="handleFilter">
    {{ search }}，<i>{{productCount}}</i>
    <br>
    </div>
    <div v-if="loading">載入中</div>
    <div v-else-if="nodata">沒有資料</div>
    <div v-else>
    {{displayData}}
    </div>
</template>

<style lnag="scss">
</style>
