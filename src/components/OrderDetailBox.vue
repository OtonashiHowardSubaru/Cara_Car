<script>
import axios from 'axios'
export default {
    data() {
        return {
            showOrderbox: false,
        }
    },
    created() {

    },
    mounted() {

    },
    methods: {
        // openOrderbox() {
        //     this.showOrderbox = true;
        // },
        closeOrderbox() {
            console.log('我有抓到');
            // this.$emit('showOrderbox', closeOrderbox);
            this.showOrderbox = !this.showOrderbox;
        },
    },
}
</script>

<template>
    <!--  ↓訂單燈箱↓  -->
    <!-- <div id="orderOverlay" @click="closeOrderbox"></div> -->
    <div id="orderModal">
        <span class="close" @click="closeOrderbox">&times;</span>
        <div class="order_container">
            <div class="detail_card">
                <div class="detail_pro_name">
                    <div class="detail_proImg">
                        <img src="@/assets/imgs/product/product_1.png" alt="" />
                        <h3>商品名稱</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/components/orderDetailBox.scss';
</style>
