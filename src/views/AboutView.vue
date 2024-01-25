<template>
  <div class="about">
    <h1><img src="../assets/imgs/about/aboutTitle.png" alt=""></h1>
    <!-- <h2>Test init</h2> -->
    <div class="topPics">
      <img src="../assets/imgs/about/aboutTop1.png" alt="aboutIMG">
      <img src="../assets/imgs/about/aboutTop2.png" alt="aboutIMG">
      <img src="../assets/imgs/about/aboutTop3.png" alt="aboutIMG">
      <img src="../assets/imgs/about/aboutTop4.png" alt="aboutIMG">
    </div>
    <div class="aboutUsContents">
      <div class="aboutUsContentsPic">
        <img src="../assets/imgs/about/aboutUsC1.png" alt="">
      </div>
      <div class="aboutUsContent">
        <img src="../assets/imgs/draw/person_love.png" alt="">
        <p>歡迎踏入 Cara Car，<br>一個充滿創意與歡樂的玩具車仙境。
        </p>
        <p>我們的故事始於一群充滿熱情的年輕人團隊，<br>共同夢想打造一個屬於孩子的彩色車輪世界。
        </p>
      </div>
    </div>
    <div class="aboutUsContents">
      <div class="aboutUsContentsPic">
        <img src="../assets/imgs/about/aboutUsC2.png" alt="">
      </div>
      <div class="aboutUsContent">
        <!-- <div class="car_caraPic"><img src="../assets/imgs/draw/car_caracar.png" alt=""></div> -->
        <p>我們致力於提供各種特色的玩具車，<br>讓每個孩子都能擁有專屬的玩具車，<br>展開一場屬於他們獨特的冒險旅程。
      </p>
      <p>我們相信，<br>每個孩子都應該擁有屬於自己的獨特遊戲體驗。
      </p>
      </div>

    </div>
    <div class="car_caraPic"><img src="../assets/imgs/draw/car_caracar.png" alt=""></div>
    <BtnEvent/>
    <BtnShopInfo/>


  </div>
</template>

<script>
import BtnEvent from '@/components/btn/BtnEvent.vue'
import BtnShopInfo from '@/components/btn/BtnShopInfo.vue'

export default {
    components:{
        BtnEvent, BtnShopInfo
    },
    data() {
        return{
            
        }
    },
    methods:{
    },
    mounted() {
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/page/about.scss";
</style>
