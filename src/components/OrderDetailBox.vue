<script>
export default {
  props: ["orderList","detailList"],
  data() {
    return {
      active: "",
    };
  },

  methods: {
    checkOrderDetail(ord_id) {
      this.active = this.active === ord_id ? null : ord_id;
    },
  },
};
</script>

<template>
  <div class="order_detail">
    <div
      class="order_card"
      v-for="orderItems in orderList"
      :key="orderItems.ord_id"
    >
      <div class="order_proImg">
        <img src="@/assets/imgs/product/product_1.png" alt="" />
      </div>

      <div class="card_intro">
        <h2>訂單編號：{{ orderItems.ord_id }}</h2>
        <h2>訂單總額：{{ orderItems.ord_total }}</h2>
        <h2>下單日期：{{ orderItems.ord_date }}</h2>
      </div>

      <button class="order_detail" @click="checkOrderDetail(orderItems.ord_id)">
        查看細節
      </button>

      <Transition name="fade">

        <div class="detail_card_content" v-if="active === orderItems.ord_id">
            <div class="detail_card" v-for="detail in detailList" :key="detail.ord_id">
                <div class="detail_proImg">
                    <img src="@/assets/imgs/product/product_1.png" alt="" />
                </div>
                <div class="detail_text">
                    <h2>商品名稱：{{ detail.pro_name }}</h2>
                    <h2>商品單價：{{ detail.pro_sale }}</h2>
                    <h2>商品數量：{{ detail.ord_qty }}</h2>
                    <h2>運費：{{ 120 * detail.ord_qty }}</h2>
                    <h2>商品總額：{{ detail.ord_sum }}</h2>
                </div>
            </div>
        </div>
      </Transition>

    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/components/orderDetailBox.scss";
</style>
