<script>
import lightBoxStore from "@/stores/lightBox.js"
import { mapActions } from 'pinia'; // mapActions pinia的方法，取得api的
import userStore from '@/stores/user.js'
import apiInstance from '@/stores/auth'

// 引入axios模組
import axios from 'axios';
// 引入qs模組
import qs from 'qs'


export default {
    data() {
        return {
            lightBoxStore: lightBoxStore(),
            username: '',
            psw666: '',
            pswVisible: false,
            isLoggedIn: false,

            // line login
            line_channel_id: '2003656111',    // Line Channel ID
            line_channel_secret: 'e5e6e6e88c5a96b4adebf8fc6f0b0cef',// Line Channel Secret
            line_redirect_uri: 'http://localhost:5174/',  // Line developer Callback URL
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
    async mounted(){
        // 使用 window.location.search 和 urlParams 獲取當前網頁 URL 中的查詢參數
        const queryString = window.location.search;

        if(queryString){
            const urlParams = new URLSearchParams(queryString);
            // 使用 get 方法從 urlParams 實例中獲取名為 code 的參數的值。(授權碼，通常由用戶在身份驗證流程中獲得)
            // 如果查詢字串中存在名為 code 的參數，code 變數將被賦值為該參數的值；否則，code 變數將為 null。
            const code = urlParams.get('code');
            await this.lineLoginRedirect(code)
        }else{
            // 判斷有沒有登入過，如果沒有token等同於沒有登入
            const user = this.checkLogin()
            console.log(user);
            if(user){
                //有登入資訊轉到首頁
                this.$router.push('/')
            }
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
        ...mapActions(userStore, ['checkLogin', 'updateToken', 'updateUserData', 'checkUserData']),
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

        // line登入
        lineLoginEvent(){
        // 根據指定的 client_id、redirect_uri、scope 等參數組合出一個 LINE 登入的連結
        const link = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${this.line_channel_id}&redirect_uri=${this.line_redirect_uri}&state=login&scope=openid%20profile`;
        // 將頁面重新導向到該連結
        window.location.href = link;
        },
        async lineLoginRedirect(code){
            try {
                /*
                    使用 Axios 發送 HTTP POST 請求到指定的 URL
                    並指定 'Content-Type': 'application/x-www-form-urlencoded' 標頭以指示伺服器使用 URL 編碼形式解析參數
                    grant_type：指定授權類型為 "authorization_code"
                    code：授權碼，這個值是從 code 變數中取得的
                    redirect_url：指定用戶授權完成後的重定向 URL
                    client_id：用於識別應用程式的客戶端 ID
                    client_secret：應用程式的客戶端密鑰
                    這些參數使用 qs.stringify 函式轉換為 URL 編碼的形式，以符合 "application/x-www-form-urlencoded" 的請求格式
                    Content-Type': 'application/x-www-form-urlencoded'：指定請求的內容類型為 URL 編碼形式
                */
                const tokenResponse = await axios.post('https://api.line.me/oauth2/v2.1/token', qs.stringify({
                    grant_type: 'authorization_code',
                    code: code,
                    // yourURI 請設置為實際Line developer 設定的重新導向網址
                    redirect_uri: this.line_redirect_uri,
                    client_id: this.line_channel_id,
                    client_secret: this.line_channel_secret
                }), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

                /*
                    從 tokenResponse 的回應資料中取得 access_token 和 id_token。
                    這些欄位是從 LINE 登入 API 取得的授權資訊。
                    access_token 是用來作為驗證的令牌
                    id_token 是使用者的身份令牌。
                */
                const accessToken = tokenResponse.data.access_token;
                const idToken = tokenResponse.data.id_token;

                /*
                    使用 Axios 發送 HTTP POST 到 https://api.line.me/oauth2/v2.1/verify，驗證 id_token 以獲取包含使用者資訊的回應
                    id_token：用於識別使用者的身份令牌
                    client_id：用於識別應用程式的客戶端 ID
                    使用 qs.stringify 函式轉換為 URL 編碼的形式，以符合 "application/x-www-form-urlencoded" 的請求格式
                    Content-Type': 'application/x-www-form-urlencoded'：指定請求的內容類型為 URL 編碼形式。
                    'Authorization': 'Bearer ' + accessToken：使用存取令牌進行身份驗證，將存取令牌放在 'Bearer ' 字符串之後。
                */
                const userInfoResponse = await axios.post('https://api.line.me/oauth2/v2.1/verify', qs.stringify({
                    id_token: idToken,
                    client_id: this.line_channel_id
                }), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Bearer ' + accessToken
                    }
                });

                /*
                    根據需求，可以在登入後的處理中進行相應的操作，例如驗證用戶資訊、儲存登入狀態等。
                */
                console.log(userInfoResponse.data);
                const lineUserId = userInfoResponse.data.sub;
                const lineNickname = userInfoResponse.data.name;
                const lineUSerImgURL = userInfoResponse.data.picture;
                const lineAccountTypeID = 1;

                // 可以在這邊寫回資料庫
                // const response = await axios.post(`${API_URL}lineLogin.php`, {
                //     userId: lineUserId,
                //     nickname: lineNickname,
                //     accountTypeID: lineAccountTypeID
                // });
                this.updateToken(lineUserId)

                // 沒有API先使用寫死資料
                this.updateUserData({
                    m_name: lineNickname,
                    m_validation: 1,
                    m_state: 1
                })
                this.$router.push('/')
            } catch (error) {
                console.error(error);
            }
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
                            <img src="../assets/imgs/login/loginLine.png" alt="otherLogin" @click="lineLoginEvent">
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