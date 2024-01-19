<template>
<div id="loginOverlay" @click="closeModal"></div>
<div id="loginModal">
    <span class="close" @click="closeModal">&times;</span>
        <div class="login_container">
            <fieldset>
                <legend>會員登入</legend>
                <p>帳號</p>
                <input type="email" id="username" name="username" placeholder="電子郵件或是手機號碼" required>
                <p>密碼</p>
                <input type="password" id="password" name="password" placeholder="密碼(6-12個英數字混合字元)" required>
                <a href="#">忘記密碼</a>
                <div id="errorMessage" class="error-message"></div>
                <button type="submit">登入</button>
            </fieldset>

            <div class="other_login">
                <h2>—————更多方式登入—————</h2>
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
</template>

<script>
export default {
    data() {
        return {
            
        };
    },
    created() {
        this.axiosGetData();
    },
    methods: {
        axiosGetData(){
        axios.get('https://tibamef2e.com/cgd103/g1/api/getMember.php?type=front')
            .then( res=> {
            console.log(res)
            if(res && res.data){
                this.responseData = res.data
                this.displayData = res.data
            }
        })
    },
    closeModal(){
        this.querySelector('#Overlay').style.display = 'none';
        const loginModal = this.querySelector('#loginModal');
        loginModal.classList.remove('fadeIn');
        loginModal.classList.add('fadeOut');

        setTimeout(() => {
        loginModal.classList.remove('fadeOut');
        loginModal.style.display = 'none';
        this.$el.querySelector('#overlay').style.display = 'none';
        }, 100);
    },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/layout/login.scss"
</style>