<template>
    
    <div class="iwantsellCar">
        <div class="iwantsellCarbutton">
            <button @click="openLightbox">填寫表格</button>
        </div>

        <Transition name="fade">
            <!-- <div v-if="showLightbox"> -->
            <div>
                <div id="iwantsellCarOverlay" @click="handleClick">
                    <div id="iwantsellCarModal">
                        <span class="close" @click="closeLightbox">&times;</span>
                        <div class="iwantsellCar_container">
                            <div class="iwantsellCar_textarea">
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
            </div>
        </Transition>

    </div>
</template>

<script>



export default {
    components: {

    },
    data() {
        return {
            showLightbox: false,
        };
    },
    methods: {
        openLightbox() {
            this.showLightbox = true;
            // console.log('我有抓到');
        },
        closeLightbox() {
            this.showLightbox = false;
        },
        handleClick(e) {
            if (e.target.id === 'loginOverlay') {
                this.closeLightbox();
            }
        },
        handleLogin() {
            console.log('Login clicked');
        },
    },
    mounted() {
    },
};

</script>


<style lang="scss" scoped>
@import "@/assets/scss/page/second_hand_sale.scss";
</style>

