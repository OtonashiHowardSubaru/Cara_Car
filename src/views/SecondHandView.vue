<script>
import axios from 'axios'; //引入函式庫

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
    handleFilter() {
      this.displayData = this.responseData.filter((item) => {
        // console.log(item);
        return item.title.includes(this.search)
      })
    },
  },
}
</script>

<template>
<div class="sh_product_wrap">
    <div class="intro">
        <h4>超強小車車</h4>
        <h4>AMERICAN CLASSIC</h4>
        <div class="year price">
            <span>$ 10,000</span>
            <span>車輛年份: 2019</span>
        </div>
        <ul>
            <li>可遙控操作</li>
            <li>續航能力強</li>
            <li>高效能馬達，提供平穩駕駛體驗</li>
            <li>內建音樂播放器，提升兒童駕駛樂趣</li>
            <li>運行時噪音小，適合室內外使用</li>
        </ul>
        <a href="#">直接購買</a>
    </div>

</div>
  
</template>
  
  <style lang="scss" scoped>
  
  @import '@/assets/scss/page/shproduct.scss';
  
  </style>