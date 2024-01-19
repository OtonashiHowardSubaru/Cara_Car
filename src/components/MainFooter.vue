<template>
  <footer class="mainFooter">
    <div class="footerbg">
    </div>
    <div class="footerSection1">
      <div class="footerSection1Info">
        <RouterLink class="RouterLink" to="/">
          <img src="../assets/imgs/MainFooter/logo.png" alt="logo">
        </RouterLink>
        
        <h4>與我們一起探索無限可能，<br>讓每個角落都成為冒險天地！</h4>
        <div class="shopInfo">
          <p>桃園市中壢區復興路46號8樓</p>
          <p>03-425-1108</p>
          <p>Cara_car@gmail.com</p>
      </div>
      </div>
    </div>
    <div class="footerSection2">
        <ul class="mainMenu">
          <li>
            <RouterLink class="RouterLink" to="/Product">> 商品一覽</RouterLink>
          </li>
              <ul class="subMenu">
                <li>
                  <RouterLink class="RouterLink" to="/">> 兒童車</RouterLink>
                </li>
                <li>
                  <RouterLink class="RouterLink" to="/">> 車車模型</RouterLink>
                </li>
                <li>
                  <RouterLink class="RouterLink" to="/">> 其他配件</RouterLink>
                </li>
              </ul>
          <li>
            <RouterLink class="RouterLink" to="/">> 二手車一覽</RouterLink>
          </li>
              <ul class="subMenu">
                <li>
                  <RouterLink class="RouterLink" to="/">> 我要販售</RouterLink>
                </li>
              </ul>    
        </ul>
        <ul class="mainMenu">
          <li>
            <RouterLink class="RouterLink" to="/">> 最新消息</RouterLink>
          </li>
          <li>
            <RouterLink class="RouterLink" to="/about">> 關於我們</RouterLink>
          </li>
          <li>
            <RouterLink class="RouterLink" to="/">> 門市資訊</RouterLink>
          </li>
          <li class="footerGame">
            <RouterLink class="RouterLink" to="/">> 賽車小遊戲</RouterLink>
          </li>
        </ul>
    </div>
    <div class="footerSection3">
      <div class="footerSection3Follow">
        <p>Follow Us</p>
        <RouterLink class="RouterLink" to="/">
          <img src="../assets/imgs/MainFooter/icon_fb.png" alt="icon_fb">
        </RouterLink>
        
        <RouterLink class="RouterLink" to="/">
          <img src="../assets/imgs/MainFooter/icon_ig.png" alt="icon_ig">
        </RouterLink>
        
      </div>
      <div class="footerSection3Top">
        <div class="decoLine"></div>
        <p>TOP</p>
      </div>
    </div>
    <div class="footerSection4">
      <p>©Cara_Car Co. All rights reserved.<br>本網站為緯育TibaMe_前端設計工程師班學員專題成果作品本平台僅供學習、展示之用。</p>
    </div>

  </footer>
</template>

<script>
export default{
  data() {
    return{
      targetValue: 0
    }
  },
  props: ['content1','content2'],
  created() {},
  methods: {
    callMoney(){
      console.log('123');
      // 利用emit去呼叫父層更新資訊
      // 
      this.$emit('callParentPay', this.money);
    },
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/layout/footer.scss" 

</style>
