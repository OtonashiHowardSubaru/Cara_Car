<script>
export default {
  data() {
    return {
    }
  },
  props:[ 'displayData', ],
  created() {},
  methods: {
    // 取得圖片的路徑函式
    getProductImgSrc(imgName){
    return new URL(`../assets/imgs/product/new_products/${imgName}`, import.meta.url).href
    },
  }
}
</script>
<template>
    <!-- 用vfor迴圈出資料，而第一項資料是測試資料，所以用v-for="item, in displayData.slice(1)"直接從第二個資料開始取 -->
    <div class="product_card" v-for="item in displayData" :key="item.pro_id">
      <RouterLink :to="'Product/' + item.pro_id">
        <div class="pro_card_img">
            <img :src="getProductImgSrc(item.img_name)" alt="Product Image">
        </div>
        <div class="pro_crad_info">
            <h6>{{ item.pro_name }}</h6>
            <p>${{ item.pro_price }}</p>
        </div>
      </RouterLink>
    </div>
</template>
<style lang="scss" scoped>
    // @import '@/assets/scss/components/_productCard.scss';
</style>