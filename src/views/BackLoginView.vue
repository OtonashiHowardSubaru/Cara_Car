<script>
export default {
    data() {
        return {
            password: '',
            passwordVisible: false,
        };
    },
    methods: {
        togglePswVisbility() {
            // console.log(togglePswVisbility)
            this.passwordVisible = !this.passwordVisible;
        },
        loginBack(){

        }
    },
};
</script>

<template>
    <div class="backLogin">
        <div class="logo">
            <img src="../assets/imgs/back-login-logo.png" alt="logo">
        </div>
        <fieldset class="input-area">
            <input type="email" placeholder="電子郵件">
            <input :type="passwordVisible ? 'text' : 'password'" v-model="password" placeholder="●●●●●●●●" maxlength="12">
            <div id="errorMessage" class="error-message"></div>
            <img v-if="passwordVisible" src="../assets/imgs/open-eye.svg" alt="closeEye" class="eye" @click="togglePswVisbility">
            <img v-else src="../assets/imgs/close-eye.svg" alt="closeOpen" class="eye" @click="togglePswVisbility">
            <button type="submit" @click="loginBack">登入</button>
        </fieldset>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/page/BackLogin.scss'
</style>
