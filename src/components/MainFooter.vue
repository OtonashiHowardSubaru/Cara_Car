<template>
  <footer class="mainFooter">
    <div class="footerbg"></div>
    <div class="footerSection1">
      <div class="footerSection1Info">
        <img src="../assets/imgs/MainFooter/logo.png" alt="logo">
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
          <li>> 商品一覽</li>
              <ul class="subMenu">
                <li>> 兒童車</li>
                <li>> 車車模型</li>
                <li>> 其他配件</li>
              </ul>
          <li>> 二手車一覽</li>
              <ul class="subMenu">
                <li>> 我要販售</li>
              </ul>    
        </ul>
        <ul class="mainMenu">
          <li>> 最新消息</li>
          <li>> 關於我們</li>
          <li>> 門市資訊</li>
          <li>> 賽車小遊戲</li>
        </ul>
    </div>
    <div class="footerSection3">
      <div class="footerSection3Follow">
        <p>Follow Us</p>
        <img src="../assets/imgs/MainFooter/icon_fb.png" alt="">
        <img src="../assets/imgs/MainFooter/icon_ig.png" alt="">
      </div>
      <div class="footerSection3Top">
        <div class="decoLine"></div>
        <p>TOP</p>
      </div>
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
@import "@/assets/scss/layout/footer.scss" ;

</style>
