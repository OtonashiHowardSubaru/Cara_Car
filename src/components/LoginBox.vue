<script>
// import axios from 'axios';
// import { mapActions } from 'pinia'; // mapActions pinia的方法，取得api的
// import userStore from '@/stores/user.js'
export default {
    data() {
        return {
            username: '',
            psw6666: '',
            pswVisible: false,
            showLightbox: false,
        };
    },
    // components: {

    // },
    // created() {
    //     this.axiosGetData();
    // },
    methods: {
        openLightbox() {
            this.showLightbox = true;
        },
        closeLightbox() {
            this.showLightbox = false;
        },
        togglePsw() {
            // console.log(togglePswVisbility)
            this.pswVisible = !this.pswVisible;
        },
        handleClick(e) {
            if (e.target.id === 'loginOverlay') {
                this.closeLightbox();
            } else if (e.target.tagName === 'A' && e.target.href.endsWith('/Register')) {
                this.$router.push('/Register');
                this.closeLightbox();
            }
        },
        handleLogin() {
        // Handle login logic
        console.log('Login clicked');
    }
        // ...mapActions(userStore, ['updateToken']),
        // signin() {
        //     axios.post('https://fakestoreapi.com/auth/login', {
        //         username: "mor_2314",
        //         password: "83r5^_"
                // username: this.username,
                // password: this.psw6666,
            // }, {
            // })
                // .then(response => {
                //     if (response.data && response.data.token) { //3
                //         localStorage.setItem('token', response.data.token)
                //         this.updateToken(response.data.token)
                        // this.updateToken(123) //1 一定要寫在api轉譯的.then方法內
                        // console.log('login'); //2
                        // this.$router.push('/')
                //     }
                // })
                // .catch(error => {
                //     console.error(error)
                //     this.updateToken('')
                    //登入失敗
                    //系統維護中
                // });
            // pinia
            // this.updateToken(123) //1
            // console.log('login'); //2
        // },
    },
}
</script>

<template>
    <!--  ↓登入燈箱↓  -->
    <Transition name="fade">
        <div v-if="showLightbox">
            <button @click="handleLogin">Login</button>
            <div id="loginOverlay" @click="handleClick">
                <div id="loginModal">
                    <span class="close" @click="closeLightbox">&times;</span>
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
        </div>
    </Transition>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/layout/login.scss';
</style>