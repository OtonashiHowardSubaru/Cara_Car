<template>
    <!-- 我要賣車的表格按鈕lightbox -->
    <div class="iWantSellCarButton">
        <button @click="openLightbox">填寫表格1</button>
    </div>

    <div class="iWantSellCarOverlay" @click="handleClickForm">

        <div class="iWantSellCarModal">

            <span class="closeBox" @click="closeLightbox">&times;</span> <!-- 開關的X -->

            <div class="iWantSellCar_container">

                <div class="iWantSellCar_textarea">
                    <h2>我要賣車</h2>
                    <div class="sellcarforms">

                        <div class="sellcarform">
                            <div class="email">
                                <p>帳號</p>
                                <input type="email" id="username" name="username" placeholder="電子郵件">
                            </div>
                            <div class="email">
                                <p>帳號</p>
                                <input type="email" id="username" name="username" placeholder="電子郵件">
                            </div>
                            <div class="email">
                                <p>帳號</p>
                                <input type="email" id="username" name="username" placeholder="電子郵件">
                            </div>
                            <div class="email">
                                <p>帳號</p>
                                <input type="email" id="username" name="username" placeholder="電子郵件">
                            </div>
                        </div>
                        <div class="sellcarform">
                            <div class="email">
                                <p>帳號</p>
                                <input type="email" id="username" name="username" placeholder="電子郵件">
                            </div>
                            <div class="email">
                                <p>帳號</p>
                                <input type="email" id="username" name="username" placeholder="電子郵件">
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>

<script>

import lightBoxForm from "@/stores/lightBoxForm.js"

export default {

    data() {
        return {
            lightBoxForm: lightBoxForm(),
            showLightbox: false,
        };
    },
    methods: {
        handleClick(e) {
            if (e.target.class === 'iWantSellCarOverlay') {
                this.closeLightbox();
                // } else if (e.target.tagName === 'A' && e.target.href.endsWith('/Register')) {
                //     this.$router.push('/Register');
                //     this.closeLightbox();
            }
        },
        openLightbox() {
            this.lightBoxStore.openLightbox()
        },
        closeLightbox() {
            this.lightBoxStore.closeLightbox()
        },
    },
    mounted() {
    },
};

</script>


<style lang="scss" scoped>
@import "@/assets/scss/page/second_hand_sale.scss";
@import "@/assets/scss/components/saleCarbtn.scss";
</style>

