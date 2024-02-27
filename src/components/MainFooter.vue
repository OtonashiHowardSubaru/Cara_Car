<template>
  <footer class="mainFooter">
    <div class="footerLogoArea">
      <RouterLink class="footerLogo" to="/">
        <img src="@/assets/imgs/MainFooter/logo.png" alt="logo">
      </RouterLink>
    </div>
    <div class="footerDecoBg"></div>
    <div class="footerbg"></div>
    <div class="footerSection1">
      <div class="footerSection1Info">   
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
            <RouterLink class="RouterLink" to="/ProductList">> 商品一覽</RouterLink>
          </li>
              <ul class="subMenu">
                <li>
                  <RouterLink class="RouterLink" to="/ProductList">> 兒童車</RouterLink>
                </li>
                <li>
                  <RouterLink class="RouterLink" to="/ProductList">> 車車模型</RouterLink>
                </li>
                <li>
                  <RouterLink class="RouterLink" to="/ProductList">> 其他配件</RouterLink>
                </li>
              </ul>
          <li>
            <RouterLink class="RouterLink" to="/SecondHandList">> 二手車一覽</RouterLink>
          </li>
              <ul class="subMenu">
                <li>
                  <RouterLink class="RouterLink" to="/SecondHandSale">> 我要販售</RouterLink>
                </li>
              </ul>    
        </ul>
        <ul class="mainMenu">
          <li>
            <RouterLink class="RouterLink" to="/News">> 最新消息</RouterLink>
          </li>
          <li>
            <RouterLink class="RouterLink" to="/About">> 關於我們</RouterLink>
          </li>
          <li>
            <RouterLink class="RouterLink" to="/ShopInformation">> 門市資訊</RouterLink>
          </li>
          <li class="footerGame">
            <RouterLink class="RouterLink" to="/Game">> 小遊戲</RouterLink>
          </li>
        </ul>
    </div>
    <div class="footerSection3">
      <div class="footerSection3Follow">
        <p>Follow Us</p>
        <RouterLink class="RouterLink" to="/">
          <img src="@/assets/imgs/MainFooter/icon_fb.png" alt="icon_fb">
        </RouterLink>
        
        <RouterLink class="RouterLink" to="/"    >
          <img src="@/assets/imgs/MainFooter/icon_ig.png" alt="icon_ig">
        </RouterLink>
        
      </div>
      <div class="footerSection3Top" @click="toTop">
        <img class="toTopCat" src="@/assets/imgs/draw/cat2.png" alt="cat2.png">
        <img class="toTopGrass" src="@/assets/imgs/draw/bushSmallTop.png" alt="bushSmall.png">
      </div>
    </div>
    <div class="footerSection4">
      <p>
        ©Cara_Car Co. All rights reserved.
        <br>
        本網站為緯育TibaMe_前端設計工程師班第88期學員專題成果作品,本平台僅供學習、展示之用。
      </p>
    </div>

  </footer>
</template>

<script>
export default{
  data() {
    return{
    
    }
  },
  
  created() {
    
  },
  methods: {
    toTop(){
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
    }
  },
  mounted() {

  },
  destroyed() {

  },
}
</script>



<style lang="scss" scoped>
@import "@/assets/scss/layout/footer.scss" ;

</style>
