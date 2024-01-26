<script> //這一段是定義import圖片的方法
const imgUrl = new URL('../assets/imgs/cat.jpg', import.meta.url).href

export default {
  data() {
    return{
      currentTitle: '',
      currentHoverIndex: -1,
      canvas: null,
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
        {p:'2nd HAND'},
        {p:'GAME'},
        {p:'SHOP INFO'},
        {p:'MEMBER'},
        {p:'MY CART'},
      ],
    }
  },
  methods:{
    getImageUrl(paths) {
      return new URL(`../assets/imgs/${paths}`, import.meta.url).href
    },
    changeImageTitle(index) {
      this.currentTitle = this.title[index].p;
      this.currentHoverIndex = index;
    },
    resetImageTitle() {
      this.currentHoverIndex = -1;
    },
    
  },
  mounted() {
    this.initCanvas();
    this.drawImage();
  }
}
</script>


<template>
  <header class="mainHeader">
    <nav>
      <!-- 電腦版header -->
      <ul class="indexHeaderNav">
        <li class="indexHeaderButton" v-for="(item, index) in img" :key="item" @mouseenter="changeImageTitle(index)" @mouseleave="resetImageTitle()">
          <RouterLink :to="name[index]">
            <img :src="getImageUrl(item.i)" class="indexHeaderButtonIcon" v-show="currentHoverIndex !== index">
            <div class="indexHeaderButtonP" v-if="currentHoverIndex === index">{{ title[index].p }}</div>
          </RouterLink>
        </li>
        <div class="line"></div>
        <div class="indexHeaderLogin">
          <img src="../assets/imgs/nav/nav-icon-Login.png" alt="login" class="indexHeaderButtonLogin" @click="openModal">
        </div>
      </ul>
    </nav>
  </header>
  <div class="indexBanner">
    <canvas id="canvas"></canvas>
  </div>
</template>

<style lang="scss" scoped>
  @import '@/assets/scss/layout/header.scss';
</style>
