<script>
export default {
  data() {
    return {
    }
  },
  props:[ 'displayData', ],
  created() {},
  methods: {
    // getProductImageUrl(imageFileName) {
    //   // 返回完整的URL
    //   return `https://tibamef2e.com/cgd103/g1/images/shop/${imageFileName}`;
    // }
  }
}
</script>
<template>
    <!-- 用vfor迴圈出資料，而第一項資料是測試資料，所以用v-for="item, in displayData.slice(1)"直接從第二個資料開始取 -->
    <div class="product_card col-md-4" v-for="item in displayData" :key="item.prod_id">
      <RouterLink :to=item.linkwhere>
        <div class="pro_card_img">
            <img :src="item.prod_img1" alt="Product Image">
        </div>
        <div class="pro_crad_info">
            <h6>{{ item.prod_name }}</h6>
            <p>{{ item.prod_price }}</p>
        </div>
      </RouterLink>
    </div>
</template>
<style>
    /* @import '@/assets/scss/components/productCard.scss'; */
</style>