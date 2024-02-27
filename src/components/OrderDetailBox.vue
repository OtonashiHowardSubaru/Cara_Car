<script>
export default {
    props: ['orderList',],
    data() {
        return {
            active: "",
        };
    },
    created() {



    },
    mounted() {



    },
    methods: {
        checkOrderDetail(index) {
            this.active = index;
        },
    },
}
</script>

<template>
    <div class="order_detail">

        <div class="order_card" v-for="orderItems in orderList" :key="orderItems.ord_id">


            <div class="order_proImg">
                <img src="@/assets/imgs/product/product_1.png" alt="" />
            </div>

            <div class="card_intro">
                <h3>訂單編號：{{ orderItems.ord_id }}</h3>
                <h3>訂單總額：{{ orderItems.ord_total }}</h3>
                <h3>下單日期：{{ orderItems.ord_date }}</h3>
            </div>

            <button class="order_detail" @click="checkOrderDetail(orderItems.ord_id)">
                查看細節
            </button>


            <Transiton name="fade">
                <div class="detail_card" :id="detailBoxId" v-if="active == orderItems.ord_id">
                    <div class="detail_proImg">
                        <img src="@/assets/imgs/product/product_1.png" alt="" />
                    </div>
                    <div class="detail_text">
                        <h2>商品名稱：{{ orderItems.pro_name }}</h2>
                        <h2>商品單價：{{ orderItems.pro_sale }}</h2>
                        <h2>商品數量：{{ orderItems.ord_qty }}</h2>
                        <h2>運費：{{ orderItems.ord_ship }}</h2>
                        <h2>商品總額：{{ orderItems.ord_sum }}</h2>
                    </div>
                </div>
            </Transiton>

        </div>

    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/components/orderDetailBox.scss';
</style>
