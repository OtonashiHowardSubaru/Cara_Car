<script>
import axios from 'axios'
export default {
    data() {
        return {
            showOrderbox: false,
        }
    },
    created() {},
    mounted() {},
    methods: {
        closeOrderbox() {
            this.showOrderbox = false;
        },
        // handleClick(e) {
        //     if (e.target.id === 'loginOverlay') {
        //         this.closeLightbox();
        //     } else if (e.target.tagName === 'A' && e.target.href.endsWith('/Register')) {
        //         this.closeLightbox();
        //         this.$router.push('/Register');
        //     }
        // },
    },
}
</script>

<template>
    <!--  ↓訂單燈箱↓  -->
    <div id="orderOverlay" @click="closeOrderbox"></div>
    <div id="orderModal">
        <span class="close" @click.stop="closeOrderbox">&times;</span>
        <div class="order_container">
            <div class="detail_card">
                <div class="detail_pro_name">
                    <div class="detail_proImg">
                        <img
                            src="@/assets/imgs/product/product_1.png"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/layout/login.scss';
</style>
