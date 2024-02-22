<script>
import BtnEvent from '@/components/btn/BtnEvent.vue'
import BtnShopInfo from '@/components/btn/BtnShopInfo.vue'
import MainHeader from '@/components/MainHeader.vue'
import chatBox from '@/components/btn/chatBox.vue'


export default {
  components: {
    BtnEvent, BtnShopInfo, MainHeader, chatBox
  },
  data() {
    return {

    }
  },
  methods: {
  },
  mounted() {
  }
}
</script>

<template>
  <MainHeader />
  <div class="about">
    <div class="aboutTitle">
      <h1>關於CaRa Car</h1>
      <img src="../assets/imgs/about/aboutTitle.svg" alt="關於CaRa Car">
    </div>
    <div class="topPics">
      <div class="topPicsView">
        <div class="topPicContainer">
          <div class="topPicsImg"><img src="../assets/imgs/about/aboutTop1.png" alt="aboutIMG"></div>
          <div class="topPicsImg"><img src="../assets/imgs/about/aboutTop2.png" alt="aboutIMG"></div>
          <div class="topPicsImg"><img src="../assets/imgs/about/aboutTop3.png" alt="aboutIMG"></div>
          <div class="topPicsImg"><img src="../assets/imgs/about/aboutTop4.png" alt="aboutIMG"></div>
          <div class="topPicsImg"><img src="../assets/imgs/about/aboutTop5.png" alt="aboutIMG"></div>
          <div class="topPicsImg"><img src="../assets/imgs/about/aboutTop6.png" alt="aboutIMG"></div>
          <div class="topPicsImg"><img src="../assets/imgs/about/aboutTop1.png" alt="aboutIMG"></div>
          <div class="topPicsImg"><img src="../assets/imgs/about/aboutTop2.png" alt="aboutIMG"></div>
          <div class="topPicsImg"><img src="../assets/imgs/about/aboutTop3.png" alt="aboutIMG"></div>
          <div class="topPicsImg"><img src="../assets/imgs/about/aboutTop4.png" alt="aboutIMG"></div>
          <div class="topPicsImg"><img src="../assets/imgs/about/aboutTop5.png" alt="aboutIMG"></div>
          <div class="topPicsImg"><img src="../assets/imgs/about/aboutTop6.png" alt="aboutIMG"></div>
        </div>
      </div>
    </div>
    <div class="bgcPic">
      <div class="aboutUsContents">
        <div class="aboutUsContentsPic">
          <img src="../assets/imgs/about/aboutUsC1.png" alt="">
        </div>
        <div class="container aboutUsContent">
          <img src="../assets/imgs/draw/person_love.png" alt="">
          <span class="highlight">
            <p><span class="highlight-container"><span class="highlight"><strong>歡迎來到 Cara Car，</strong></span></span></p>
          </span>
          <span class="highlight">
            <p><span class="highlight-container"><span class="highlight">一個充滿創意與歡樂的玩具車仙境。</span></span></p>
          </span>
          <span class="highlight">
            <p><span class="highlight-container"><span class="highlight">我們的故事始於一群充滿熱情的年輕人團隊，</span></span></p>
          </span>
          <span class="highlight">
            <p><span class="highlight-container"><span class="highlight">共同夢想打造一個屬於孩子的彩色車輪世界。</span></span></p>
          </span>
        </div>
      </div>
      <div class="aboutUsContents">
        <div class="aboutUsContentsPic">
          <img src="../assets/imgs/about/aboutUsC2.png" alt="">
        </div>
        <div class="container aboutUsContent">
          <div class="car_caraPic"><img src="../assets/imgs/draw/car_caracar.png" alt=""></div>
          <span class="highlight">
            <p><span class="highlight-container"><span class="highlight">我們致力於提供各種特色的玩具車，</span></span></p>
          </span>
          <span class="highlight">
            <p><span class="highlight-container"><span class="highlight">讓每個孩子都能擁有專屬的玩具車，</span></span></p>
          </span>
          <span class="highlight">
            <p><span class="highlight-container"><span class="highlight">展開一場屬於他們獨特的冒險旅程。</span></span></p>
          </span>
          <span class="highlight">
            <p><span class="highlight-container"><span class="highlight">我們相信，</span></span></p>
          </span>
          <span class="highlight">
            <p><span class="highlight-container"><span class="highlight">每個孩子都能擁有屬於自己的獨特遊戲體驗。</span></span></p>
          </span>
        </div>
      </div>
    </div>

    <chatBox />
    <div class="bottonbtns">
      <BtnEvent />
      <BtnShopInfo />
    </div>


  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/page/about.scss";
</style>
