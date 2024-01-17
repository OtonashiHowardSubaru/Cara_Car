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
      fetchData(){
        fetch('https://fakestoreapi.com/products')
          .then(res=>res.json())
          .then(json=>this.responseData = json)
      },
      axiosGetData(){
        axios.get('https://fakestoreapi.com/products')
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
    }
  }
</script>
<template>
  <div class="product">
    <h1>This is an product page</h1>
    <input type="text" v-model.trim="search" @input="handleFilter">
    {{ search }}
    <br>
    </div>
    <div>
    {{displayData}}
    </div>
</template>

<style lnag="scss">
</style>
