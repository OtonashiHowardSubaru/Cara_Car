<script>
import MainHeader from '@/components/MainHeader.vue'
export default {
    data() {
        return {
            psw7777: '',
            psw8888: '',
            passwordVisibleLeft: false,
            passwordVisibleRight: false,
        }
    },
    components:{
        MainHeader
    },
    methods: {
        togglePswLeft() {
            // console.log(togglePswVisbility)
            this.passwordVisibleLeft = !this.passwordVisibleLeft;
        },
        togglePswRight() {
            // console.log(togglePswVisbility)
            this.passwordVisibleRight = !this.passwordVisibleRight;
        },
    },
    mounted() {

    }
}
</script>

<template>
    <MainHeader />
    <div class="register">
        <div class="registerTitle">
            <!-- <div class="line"></div> -->
            <div class="title">
                <img src="../assets/imgs/login/JoinUsTitle.png" alt="title">
            </div>
            <div class="line"></div>
        </div>
        <div class="registerContent">
            <div class="textarea">
                <div class="name_birth">
                    <div class="space">
                        <p>會員姓名</p>
                        <input type="text" placeholder="輸入您的姓名">
                    </div>
                    <div class="space">
                        <p>會員生日</p>
                        <input type="date" placeholder="2024/01/01">
                    </div>
                </div>
                <div class="email_tel">
                    <div class="space">
                        <p>電子郵件</p>
                        <input type="email" placeholder="cara_car@gmail.com">
                    </div>
                    <div class="space">
                        <p>連絡電話</p>
                        <input type="tel" placeholder="0912345678" maxlength="10">
                    </div>
                </div>
                <div class="address">
                    <p>會員地址</p>
                    <input type="address" placeholder="桃園市中壢區復興路46號">
                </div>
                <div class="register_psw">
                    <div class="keyin_psw">
                        <p>輸入密碼</p>
                        <input :type="passwordVisibleLeft ? 'text' : 'password'" v-model="psw7777" placeholder="請輸入密碼"
                            maxlength="12">
                        <img v-if="passwordVisibleLeft" src="../assets/imgs/register/open-eye.svg" alt="closeEye" class="eye1"
                            @click="togglePswLeft">
                        <img v-else src="../assets/imgs/register/close-eye.svg" alt="closeOpen" class="eye1"
                            @click="togglePswLeft">
                    </div>
                    <div class="confirm_psw">
                        <p>確認密碼</p>
                        <input :type="passwordVisibleRight ? 'text' : 'password'" v-model="psw8888" placeholder="確認密碼"
                            maxlength="12">
                        <img v-if="passwordVisibleRight" src="../assets/imgs/register/open-eye.svg" alt="closeEye" class="eye2"
                            @click="togglePswRight">
                        <img v-else src="../assets/imgs/register/close-eye.svg" alt="closeOpen" class="eye2"
                            @click="togglePswRight">
                    </div>
                </div>
            </div>
            <div class="check">
                <input type="checkbox" id="registerChecked" name="registerChecked">
                <label for="registerChecked">我已閱讀並同意所有條款</label>
                <span>使用條款 / 隱私政策 / 推播通知</span>
            </div>
            <div class="register_btn">
                <!-- <button @click.prevent="signup">送出並成為會員</button> -->
                <button>送出並成為會員</button>
                <RouterLink to="/">已經是會員了嗎? 在此登入</RouterLink>
            </div>
            <div class="other_register">
                <div class="other_register_title">
                    <div class="other_line"></div>
                    <h2>更多註冊方式</h2>
                    <div class="other_line"></div>
                </div>
                <div class="register_group">
                    <a href="#">
                        <img src="../assets/imgs/login/loginGoogle.png" alt="otherRegister">
                    </a>
                    <a href="#">
                        <img src="../assets/imgs/login/loginFacebbok.png" alt="otherRegister">
                    </a>
                    <a href="#">
                        <img src="../assets/imgs/login/loginLine.png" alt="otherRegister">
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>@import '@/assets/scss/page/register.scss'</style>