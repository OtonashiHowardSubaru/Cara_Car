<script>
import MainHeader from '@/components/MainHeader.vue';

    export default {
        components:{
            MainHeader,
        },
        data(){
            return{

            };
        },
    }
</script>

<script setup>
    
</script>

<template>
<MainHeader />
<main>
  <div class="game_title">
      <h1>新品專區</h1>
  </div>
  <div class="container">
    <div class="row">
      <h2 class="slogan">來測驗看看你最適合什麼樣的小汽車吧 !</h2>
      <div class="main_art col-12">
        <img src="@/assets/imgs/game/game_main_art.png" alt="最適合你的車車">
      </div>
      <div class="quetionBox">
        
      </div>
      <div class="answerBox">

      </div>
      <div class="start_game">
        <button id="btnstartGame">開始測驗</button>
      </div>
    </div>
  </div>
</main>

</template>

  <style lang="scss">

  @import '@/assets/scss/page/game.scss';

  </style>
