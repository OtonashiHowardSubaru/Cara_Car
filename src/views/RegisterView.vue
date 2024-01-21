<script>
export default {
    data() {
        return{}
    },
    methods:{
        togglePswVisbility() {
            // console.log(togglePswVisbility)
            this.passwordVisible = !this.passwordVisible;
        },
    },
    mounted() {
        
    }
}
</script>

<template>
    <div class="register">
        <div class="registerTitle">
            <div class="line"></div>
            <h1>成為會員</h1>
            <div class="line"></div>
        </div>
        <div class="registerContent">
            <div class="Textarea">
                <p>會員姓名</p>
                <input type="text">
                <p>會員生日</p>
                <input type="date">
                <p>電子郵件</p>
                <input type="email">
                <p>連絡電話</p>
                <input type="tel">
                <p>會員地址</p>
                <input type="address">
                <p>輸入密碼</p>
                <input type="password">
                <img v-if="passwordVisible" src="../assets/imgs/open-eye.svg" alt="closeEye" class="eye1" @click="togglePswVisbility">
                <img v-else src="../assets/imgs/close-eye.svg" alt="closeOpen" class="eye1" @click="togglePswVisbility">
                <p>確認密碼</p>
                <input type="password">
                <img v-if="passwordVisible" src="../assets/imgs/open-eye.svg" alt="closeEye" class="eye2" @click="togglePswVisbility">
                <img v-else src="../assets/imgs/close-eye.svg" alt="closeOpen" class="eye2" @click="togglePswVisbility">
            </div>
            <div class="check">

            </div>
        </div>
    </div>
</template>