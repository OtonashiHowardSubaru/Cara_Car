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

<style scoped>
.backLogin{
    margin: auto;
    width: 50%;
    max-width: 1920px;
    background-color: #F4F0DE;
}
.logo{
    margin: auto;
    width: 50%;
}
.logo img{
    width: 100%;
    vertical-align: top;
}
.input-area{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    color: #000;
    position: relative;
    font-size: 20px;
    font-family: Nunito Sans;
    border:none;
}
.input-area input{
    width: 70%;
    padding: 5px 12px;
    margin-block: 10px;
    font-size: 14px;
    border-radius: 8px;
    letter-spacing: 2px;
}
button{
    width: 70%;
    color: #fff;
    margin:10px auto 20px auto;
    padding:5px 12px;
    border-radius: 8px;
    background-color: #1F4987;
    cursor: pointer;
    &:hover{
        background-color: #305a98;
    }
}
.eye{
    width: 20px;
    position: absolute;
    /* right: 100px; */
    right: 15.625%;
    /* bottom: 70px; */
    bottom: 48.6111%;
    cursor: pointer;
}
</style>
