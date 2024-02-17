<script>
import lightBoxStore from "@/stores/lightBox.js"
import axios from 'axios';
import { mapActions } from 'pinia'; // mapActions pinia的方法，取得api的
import userStore from '@/stores/user.js'
import apiInstance from '@/stores/auth'


export default {
    data() {
        return {
            lightBoxStore: lightBoxStore(),
            username: '',
            psw666: '',
            pswVisible: false,
            isLoggedIn: false,
        };
    },
    created() {
        // 判斷有沒有登入過，如果沒有token等同於沒有登入
        const user = this.checkLogin()
        if (user) {
            //有登入資訊就關閉燈箱並跳轉到首頁
            // this.closeLightbox()
            // this.$router.push('/')
        }
    },
    methods: {
        //關閉燈箱
        closeLightbox() {
            this.lightBoxStore.closeLightbox()
        },
        //密碼切換type
        togglePsw() {
            this.pswVisible = !this.pswVisible;
        },
        handleClick(e) {
            //如果點擊的事件物件是loginOverlay(遮罩)就關閉燈箱，如果點擊的事件物件的標籤名稱是A，且path是/Register就關閉燈箱並跳轉到註冊頁面
            if (e.target.id === 'loginOverlay') {
                this.closeLightbox();
            } else if (e.target.tagName === 'A' && e.target.href.endsWith('/Register')) {
                this.closeLightbox();
                this.$router.push('/Register');
            }
        },
        // ...在JS中是展開運算符，可以把一組的東西變成單獨的元素或屬性；
        //在Vue.js中是展開對象的屬性，使用mapActions通常包含多個 action 函式的對象展開為函式的列表
        ...mapActions(userStore, ['updateToken', 'updateName', 'checkLogin', 'updateUserData']),
        // signin() {
        //     axios.post(`${import.meta.env.VITE_CARA_URL}/memberCenterLogin.php`, {
        //         username: this.username,
        //         password: this.psw666
        //     }, {
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     })
        //         .then(response => {
        //             if (response.data && response.data.token) {
        //                 localStorage.setItem('token', response.data.token)
        //                 this.updateToken(response.data.token)
        //                 // console.log(response.data.token);
        //                 this.closeLightbox()
        //                 this.$router.push('/')
        //             }
        //         })
        //         .catch(error => console.error(error));
        // },

        signin(){
            const bodyFormData = new FormData();
            bodyFormData.append('m_email', this.username);
            bodyFormData.append('member_psw', this.psw666);

            // 請記得將php埋入跨域
            apiInstance({
                method: 'post',
                url: `${import.meta.env.VITE_CARA_URL}/front/memberLogin.php`,
                headers: { "Content-Type": "multipart/form-data" },
                data: bodyFormData
                }).then(res=>{
                // console.log(res);
                    if(res && res.data){
                        if(res.data.code == 1){
                            this.updateToken(res.data.session_id)
                            this.updateUserData(res.data.memInfo)
                            alert('登入成功, 歡迎來到Cara-Car~')
                            // this.$router.push('/')
                            this.closeLightbox();

                        }else{
                            alert('登入失敗, 請再試看看哦~')
                        }
                    }
                }).catch(error=>{
                console.log(error);
            })
        },
    }
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
                        <label for="email">email</label>
                        <input type="email" id="email" v-model="username" placeholder="請輸入電子郵件">
                    </div>
                    <div class="psw">
                        <p>密碼</p>
                        <label for="email"></label>
                        <div class="psw_input">
                            <input :type="pswVisible ? 'text' : 'password'" v-model="psw666" placeholder="請輸入密碼"
                            minlength="8" maxlength="12">
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