<script>
import lightBoxStore from "@/stores/lightBox.js"
export default {
    data() {
        return {
            lightBoxStore:lightBoxStore(),
            username: '',
            psw6666: '',
            pswVisible: false,
        };
    },
    methods: {
        closeLightbox() {
            this.lightBoxStore.closeLightbox()
        },
        togglePsw() {
            this.pswVisible = !this.pswVisible;
        },
        handleClick(e) {
            // console.log(e)
            if (e.target.id === 'loginOverlay') {
                this.closeLightbox();
            } else if (e.target.tagName === 'A' && e.target.href.endsWith('/Register')) {
                this.$router.push('/Register');
                this.closeLightbox();
            }
        },
    },
}
</script>

<template>
    <!--  ↓登入燈箱↓  -->
            <div id="loginOverlay" @click="handleClick">
                <div id="loginModal">
                    <span class="close" @click.stop="closeLightbox">&times;</span>
                    <div class="login_container">
                        <div class="login_textarea">
                            <h2>會員登入</h2>
                            <div class="email">
                                <p>帳號</p>
                                <input type="email" id="username" name="username" placeholder="電子郵件">
                            </div>
                            <div class="psw">
                                <p>密碼</p>
                                <div class="psw_input">
                                    <input :type="pswVisible ? 'text' : 'password'" v-model="psw6666" placeholder="●●●●●●●●"
                                        maxlength="12">
                                    <img v-if="pswVisible" src="../assets/imgs/login/open-eye.svg" alt="openEye" class="eye"
                                        @click="togglePsw">
                                    <img v-else src="../assets/imgs/login/close-eye.svg" alt="closeEye" class="eye"
                                        @click="togglePsw">
                                </div>
                            </div>
                            <a href="#">忘記密碼</a>
                            <button @click.prevent="signin">登入</button>
                            <span>
                                還不是會員嗎?
                                <RouterLink to="/Register">立即註冊 ！</RouterLink>
                            </span>
                        </div>

                        <div class="other_login">
                            <div class="other_login_title">
                                <div class="other_line"></div>
                                <h2>更多方式登入</h2>
                                <div class="other_line"></div>
                            </div>
                            <div class="login_group">
                                <a href="#">
                                    <img src="../assets/imgs/login/loginGoogle.png" alt="otherLogin">
                                </a>
                                <a href="#">
                                    <img src="../assets/imgs/login/loginFacebbok.png" alt="otherLogin">
                                </a>
                                <a href="#">
                                    <img src="../assets/imgs/login/loginLine.png" alt="otherLogin">
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/layout/login.scss';
</style>