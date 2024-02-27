<script>
import axios from 'axios'; //引入函式庫
import MainHeader from '@/components/MainHeader.vue';
import ProductCard from '@/components/ProductCard.vue';
import ProCardSwiper from '@/components/ProCardSwiperForGame.vue'


export default {
  components: {
    MainHeader, ProductCard, ProCardSwiper
  },
  data() {
    return {
      active: false,
      process: 0,
      value: 0,//選取商品的起始值，就是第1樣商品開始就對了
      responseData: [],
      displayData: [],
      questionBank: [
        {
          id: 1,
          title: '你更傾向於獨處還是與他人一起活動？',
          answer1: '獨處',
          answer2: '與他人一起',
          answer3: '都可以',
        },
        {
          id: 2,
          title: '你是個什麼樣個性的人？',
          answer1: '開朗活潑',
          answer2: '內向安靜',
          answer3: '皆不是',
        },
        {
          id: 3,
          title: '你覺得自己對於激烈的情緒更偏好？',
          answer1: '表達出來',
          answer2: '壓抑',
          answer3: '取決於情境',
        },
        {
          id: 4,
          title: '在社交場合中，你更喜歡主動交談還是被動聆聽？',
          answer1: '主動交談',
          answer2: '被動聆聽',
          answer3: '視情況而定',
        },
        {
          id: 5,
          title: '你對於事情總是規劃好再依安排行動？',
          answer1: '是',
          answer2: '否',
          answer3: '有時如此',
        },
        {
          id: 6,
          title: '你認為自己是一個樂觀的人還是悲觀的人？',
          answer1: '樂觀',
          answer2: '悲觀',
          answer3: '客觀分析',
        },
        {
          id: 7,
          title: '面對突發狀況時，你更傾向於？',
          answer1: '心如止水',
          answer2: '心跳加速',
          answer3: '驚慌失措',
        },
        {
          id: 8,
          title: '你通常會如何處理壓力？',
          answer1: '直面壓力來源',
          answer2: '轉換心情',
          answer3: '找人訴苦',
        },
        {
          id: 9,
          title: '你認為自己對於他人的情感反應敏感嗎？',
          answer1: '敏感',
          answer2: '不敏感',
          answer3: '普普通通',
        },
        {
          id: 10,
          title: '你覺得自己想像力、創造力如何?',
          answer1: '天馬行空',
          answer2: '平淡無奇',
          answer3: '有時豐富',
        },
      ],
    };
  },
  created() {
    //axios的get方法(`$import.meta.env.{變數}/檔名.php`)用.env檔中寫的網址來判斷網址URL的前贅
    // 取得全部商品資料用作商品資料，以及swiper用的所有資料
    axios.get(`${import.meta.env.VITE_PHP_URL}/front/productlist.php`)
      .then((response) => {
        // 成功取得資料後，將資料存入陣列
        // console.log(response.data)
        this.responseData = response.data;
        this.displayData = response.data;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        this.errorMessage = "執行失敗: " + error.message; // 存儲錯誤訊息
      });
  },
  methods: {
    startGame() {
      this.active = true;
      this.process = 0;//確保遊戲開始時機制重整
    },
    clickanswer(choosedValue) {
      this.process++; //追蹤進度
      this.value += choosedValue
      console.log(this.value);
    }
  }
}
</script>
<template>
  <MainHeader />
  <main>
    <div class="game_title">
      <h1>新品專區</h1>
    </div>
    <div class="container">
      <div class="row">
        <div class="gameMenu col-9" v-if="!(active)">
          <div class="main_art">
            <h2 class="slogan">來測驗看看你最適合什麼樣的小汽車吧 !</h2>
            <img src="@/assets/imgs/game/game_main_art.png" alt="最適合你的車車">
          </div>
          <div class="start_game">
            <button id="btnStartGame" @click="startGame">開始測驗</button>
          </div>
        </div>
        <div class="quetionGame col-8" v-if="active && process < questionBank.length">
          <div class="quetionBox">
            <h3>Quetion {{ process + 1 }}</h3>
            <p>{{ questionBank[process].title }}</p>
          </div>
          <div class="answerBox">
            <button @click="clickanswer(0)">{{ questionBank[process].answer1 }}</button>
            <button @click="clickanswer(2)">{{ questionBank[process].answer2 }}</button>
            <button @click="clickanswer(1)">{{ questionBank[process].answer3 }}</button>
          </div>
        </div>
        <div v-if="active && process >= questionBank.length" class="col-8 finishGame">
          <h3>\ 看看這個是不是你喜歡的吧！ /</h3>
          <ProCardSwiper :displayData="displayData.slice(this.value, (this.value) + 3)" />
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
@import '@/assets/scss/page/game.scss';
</style>
