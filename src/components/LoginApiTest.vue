<template>
  <!-- Login燈箱 -->
  <Transition name="fade">
        <LoginBox v-if="lightBoxStore.showLightbox"/>
    </Transition>
</template>

<script>
//登入import
import axios from 'axios';
import { mapActions } from 'pinia'; // mapActions pinia的方法，取得api的
import userStore from '@/stores/user.js'
//燈箱import
import lightBoxStore from "@/stores/lightBox.js"
import LoginBox from '@/components/LoginBox.vue'
export default {
  components: {
    LoginBox,
    },
  data() {
    return {
      lightBoxStore: lightBoxStore(),
      username: '',
      psw6666: '',
      pswVisible: false,
      showLightbox: false,
    }
  },
  created() {
    this.axiosGetData();
  },
  methods: {
    //控制燈箱關閉&跳轉註冊頁面
    handleClick(e) {
      if (e.target.id === 'loginOverlay') {
        this.closeLightbox();
      } else if (e.target.tagName === 'A' && e.target.href.endsWith('/Register')) {
        this.$router.push('/Register');
        this.closeLightbox();
      }
    },
    //開燈箱
    openLightbox() {
      this.lightBoxStore.openLightbox()
    },
    //關燈箱
    closeLightbox() {
      this.lightBoxStore.closeLightbox()
    },
    // 獲取登入token的pinia
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
@import '@/assets/scss/layout/login.scss';
</style>