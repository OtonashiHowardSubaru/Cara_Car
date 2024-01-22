<template>
  <header class="mainHeader">
    <nav>
      <ul class="indexHeaderNav">
        <li class="indexHeaderButton" v-for="(item, index) in img" :key="item">
          <RouterLink :to="name[index]">
            <img :src="getImageUrl(item.i)" class="indexHeaderButtonIcon">
          </RouterLink>
        </li>
        <div class="line"></div>
        <div class="indexHeaderLogin">
          <img src="../assets/imgs/nav/nav-icon-Login.png" alt="" class="indexHeaderButtonLogin" @click="openModal">
        </div>
      </ul>
      <ul class="indexHeaderNavPh">
        <li class="indexHeaderButtonPh" v-for="item in img" :key="item">
            <a href="#" class="indexHeaderA">
              <img :src= "getImageUrl(item.i)" class="indexHeaderButtonIconPh" >
              <br>
              <div class="indexHeaderButtonP">{{item.p}}</div>
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
      <div class="login_textarea">
        <h2>會員登入</h2>
        <div class="email">
          <p>帳號</p>
          <input type="email" id="username" name="username" placeholder="電子郵件">
        </div>
        <div class="psw">
          <p>密碼</p>
          <div class="psw_input">
            <input :type="passwordVisible ? 'text' : 'password'" v-model="psw6666" placeholder="●●●●●●●●" maxlength="12">
            <img v-if="passwordVisible" src="../assets/imgs/open-eye.svg" alt="openEye" class="eye" @click="togglePswVisbility">
            <img v-else src="../assets/imgs/close-eye.svg" alt="closeEye" class="eye" @click="togglePswVisbility">
          </div>
          </div>
        <a href="#">忘記密碼</a>
        <button @click.prevent="signin">登入</button>
        <span>
          還不是會員嗎? 
          <RouterLink to="../views/Register.vue">立即註冊 ！</RouterLink>
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
</template>

<script>
import axios from 'axios';
import { mapActions } from 'pinia'; // mapActions pinia的方法，取得api的
import userStore from '@/stores/user.js'
export default {
  // components: {
  // },
  data() {
    return {
      username: '',
      psw6666: '',
      passwordVisible: false,
      name: [
        '/ProductList',
        '/SecondHandList',
        '/Game',
        '/ShopInformation',
        '/MemberCenter',
        '/Cart',
      ],
      img: [
        { i: 'nav/nav-icon-01.png' },
        { i: 'nav/nav-icon-02.png' },
        { i: 'nav/nav-icon-03.png' },
        { i: 'nav/nav-icon-04.png' },
        { i: 'nav/nav-icon-05.png' },
        { i: 'nav/nav-icon-06.png' },
      ],
      title:[
        {p:'PRODUCT'},
        {p:'2nd-HAND'},
        {p:'SHOP-INFO'},
        {p:'MEMBER'},
        {p:'MY-CART'},
      ],
      // hover: false,
    }
  },
  // created() {
  //   this.axiosGetData();
  // },
  methods: {
    getImageUrl(paths) {
      return new URL(`../assets/imgs/${paths}`, import.meta.url).href
    },
    openModal() {
      const modal = document.querySelector('#loginModal')
      const overlay = document.querySelector('#loginOverlay')
      overlay.style.display = 'block';
      modal.style.display = 'block';
      overlay.classList.add('fadeIn');
      modal.classList.add('fadeIn');
    },
    closeModal() {
      const modal = document.querySelector('#loginModal')
      const overlay = document.querySelector('#loginOverlay')
      modal.classList.remove('fadeIn');
      modal.classList.add('fadeOut');
      overlay.classList.remove('fadeIn');
      overlay.classList.add('fadeOut');

      function handleAnimationEnd() {
    modal.style.display = 'none';
    overlay.style.display = 'none';
    modal.classList.remove('fadeOut');
    overlay.classList.remove('fadeOut');
    modal.removeEventListener('animationend', handleAnimationEnd);
  }
  modal.addEventListener('animationend', handleAnimationEnd);
},
    togglePswVisbility() {
      // console.log(togglePswVisbility)
      this.passwordVisible = !this.passwordVisible;
    },
    ...mapActions(userStore, ['updateToken']),
    signin() {
      axios.post('https://fakestoreapi.com/auth/login', {
        username: "mor_2314",
        password: "83r5^_"
        // username: this.username,
        // password: this.psw6666,
      }, {
      })
        .then(response => {
          if (response.data && response.data.token) { //3
            localStorage.setItem('token', response.data.token)
            this.updateToken(response.data.token)
            // this.updateToken(123) //1 一定要寫在api轉譯的.then方法內
            // console.log('login'); //2
            this.$router.push('/')
          }
        })
        .catch(error => {
          console.error(error)
          this.updateToken('')
          //登入失敗
          //系統維護中
        });
      // pinia
      // this.updateToken(123) //1
      // console.log('login'); //2
    },

  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/layout/header.scss';
@import '@/assets/scss/layout/login.scss';
</style>
