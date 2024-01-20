<template>
  <header class="mainHeader">
    <nav>
      <ul class="indexHeaderNav">
        <li class="indexHeaderButton" v-for="(item, index) in img" :key="item">
            <RouterLink :to="name[index]">
              <img :src= "getImageUrl(item.i)" class="indexHeaderButtonIcon">
            </RouterLink>
        </li>
        <div class="line"></div>
        <div class="indexHeaderLogin">
          <a href="#">
            <img src="../assets/imgs/nav/nav-icon-Login.png" alt="" class="indexHeaderButtonLogin" @click="openModal">
          </a>
        </div>
      </ul>

      <ul class="indexHeaderNavPh">
        <li class="indexHeaderButtonPh" v-for="item in img">
            <a href="#" class="indexHeaderA">
              <img :src= "getImageUrl(item.i)" class="indexHeaderButtonIconPh" >
                <!-- <p class="indexHeaderButtonP">PRODUCT</p> -->
            </a>
        </li>
        <div class="linePh"></div>
        <div class="indexHeaderLoginPh">
          <a href="#">
            <img src="../assets/imgs/nav/nav-icon-Login-Ph.png" alt="" class="indexHeaderButtonLoginPh">
          </a>
        </div>
      </ul>
    </nav>
  </header>
  <!--  ↓登入燈箱↓  -->
  <div id="loginOverlay" @click="closeModal"></div>
  <div id="loginModal">
    <span class="close" @click="closeModal">&times;</span>
        <div class="login_container">
            <fieldset>
                <legend>會員登入</legend>
                <p>帳號</p>
                <input type="email" id="username" name="username" placeholder="電子郵件" required>
                <p>密碼</p>
                <input type="password" id="password" name="password" placeholder="************" required>
                <a href="#">忘記密碼</a>
                <img v-if="passwordVisible" src="../assets/imgs/open-eye.svg" alt="closeEye" class="eye" @click="togglePswVisbility">
                <img v-else src="../assets/imgs/close-eye.svg" alt="closeOpen" class="eye" @click="togglePswVisbility">
                <div id="errorMessage" class="error-message"></div>
                <button type="submit">登入</button>
                <span>還不是會員嗎? <a href="#">立即註冊　！</a></span>
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
// import { VueElement } from 'vue';
// import { RouterLink, RouterView } from 'vue-router'
export default{
  // components: {
    // RouterLink,
    // RouterView,
  // },
  data(){
    return{
      name:[
        '/ProductList',
        '/SecondHandList',
        '/Game',
        '/ShopInformation',
        '/MemberCenter',
        '/Cart',
    ],
      img:[
        {i:'nav/nav-icon-01.png'},
        {i:'nav/nav-icon-02.png'},
        {i:'nav/nav-icon-03.png'},
        {i:'nav/nav-icon-04.png'},
        {i:'nav/nav-icon-05.png'},
        {i:'nav/nav-icon-06.png'},
      ],
      // name:[
      //   {p:'PRODUCT'},
      //   {p:'2nd-HAND'},
      //   {p:'SHOP-INFO'},
      //   {p:'MEMBER'},
      //   {p:'MY-CART'},
      // ],
      // hover: false,
    }
  },
  // created() {
  //   this.axiosGetData();
  // },
  methods:{
    getImageUrl(paths){
      return new URL(`../assets/imgs/${paths}`, import.meta.url).href
    },
    // axiosGetData(){
    //     axios.get('https://tibamef2e.com/cgd103/g1/api/getMember.php?type=front')
    //         .then( res=> {
    //         console.log(res)
    //         if(res && res.data){
    //             this.responseData = res.data
    //             this.displayData = res.data
    //         }
    //     })
    // },

    openModal(){
      const loginModal = document.querySelector('#loginModal')
      const loginOverlay = document.querySelector('#loginOverlay')
      loginOverlay.style.display = 'block';
      loginModal.style.display = 'block';
      loginOverlay.classList.add('fadeIn');
      loginModal.classList.add('fadeIn');
    },
    closeModal(){
        loginOverlay.style.display = 'none';
        loginModal.classList.remove('fadeIn');
        loginModal.classList.add('fadeOut');
        loginOverlay.classList.remove('fadeIn');
        loginOverlay.classList.add('fadeOut');

        setTimeout(() => {
        loginModal.classList.remove('fadeOut');
        loginOverlay.classList.remove('fadeOut');
        loginModal.style.display = 'none';
        loginOverlay.style.display = 'none';
        }, 100);
    },
    togglePswVisbility() {
            // console.log(togglePswVisbility)
            this.passwordVisible = !this.passwordVisible;
        }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/layout/header.scss';
@import '@/assets/scss/layout/login.scss';

</style>
