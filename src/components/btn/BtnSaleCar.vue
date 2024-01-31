<template>
    <!-- 我要賣車的表格按鈕lightbox -->
    <!-- <div class="SellCarFormButton">
        <button @click="openLightbox">填寫表格1</button>
    </div> -->

    <div id="SellCarFormOverlay" @click="handleClick">
                <div id="SellCarFormModal">
                    <span class="close" @click.stop="closeLightbox">&times;</span>
                    <div class="SellCarForm_container">
                        <div class="SellCarForm_textarea">
                            <h2>我要賣車</h2>
                            <div class="email">
                                <p>聯絡人姓名</p>
                                <input type="email" id="username" name="username" placeholder="電子郵件">
                            </div>
                            <div class="psw">
                                <p>連絡電話</p>
                                <div class="psw_input">
                                    <input type="phone" id="phone" name="username" placeholder="電子郵件">

                                </div>
                            </div>
                            
                        </div>

                        <div class="other_SellCarForm">
                            <div class="other_SellCarForm_title">
                                <div class="other_line"></div>
                                <h2>更多方式登入</h2>
                                <div class="other_line"></div>
                            </div>
                            <div class="SellCarForm_group">
                                
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
            lightBoxForm:lightBoxForm(),
        };
    },
    methods: {
        closeLightbox() {
            this.lightBoxForm.closeLightbox()
        },

        handleClick(e) {
            // console.log(e)
            if (e.target.id === 'SellCarFormOverlay') {
                this.closeLightbox();
            } 
            // else if (e.target.tagName === 'A' && e.target.href.endsWith('/Register')) {
            //     this.$router.push('/Register');
            //     this.closeLightbox();
            // }
        },
    },
}

</script>


<style lang="scss" scoped>
@import "@/assets/scss/page/second_hand_sale.scss";
@import "@/assets/scss/components/saleCarbtn.scss";
</style>

