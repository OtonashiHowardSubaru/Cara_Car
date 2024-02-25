<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';


export default{
    components:{
        Swiper, SwiperSlide,
    },
    data(){
      return{
        slidesPerView: 3,
        thisSwiperId:`swiper-${new Date().getTime()}`,
        shuffleDisplayData: [],
      }
    },
    setup() {
      return {
        modules: [Navigation]
      };
    },
    props:['displayData', 'title'],
    created() {
      // this.shuffleDisplayDataAsync();
    },
    watch:{
      displayData: {
            immediate: true,
            handler(newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.shuffleDisplayDataAsync();
                }
            },
        },
    },
    methods: {
      getProductImgSrc(imgName){
        return new URL(`${import.meta.env.VITE_LIMG_BASE_URL}/product/new_products/${imgName}`).href
      },
      handleResize(){
        this.slidesPerView = window.innerWidth >= 768 ? 3 : 1;
      },
      async shuffleDisplayDataAsync(){
        await this.$nextTick(); 
        const shuffled = this.displayData.sort(()=> 0.5 - Math.random());
        this.shuffleDisplayData = shuffled.slice(0, 5);
      }
    },
    mounted() {
      window.addEventListener('resize',this.handleResize);
      this.handleResize();
      // this.shuffleDisplayDataAsync();
    },
}

</script>

<template>
<div class="recommand" :id="thisSwiperId">
  <div class="recommand_box">
    <h4>{{title}}</h4>
    <div class="swiper-button-next" ref="nextButton"></div>
    <swiper 
    :slidesPerView="slidesPerView"
    :spaceBetween="30"
    :navigation="{
      nextEl:`#${thisSwiperId} .swiper-button-next`,
      // '.swiper-button-next',
      prevEl: `#${thisSwiperId} .swiper-button-prev`,
      // '.swiper-button-prev',
    }"
    :modules="modules"
    class="mySwiper"
    >
      <swiper-slide  v-for="item in shuffleDisplayData" :key="item.pro_id">
        <div class="product_card">
        <RouterLink :to="'/Product/' + item.pro_id">
          <div class="pro_card_img">
              <img :src="getProductImgSrc(item.img_name)" alt="Product Image">
          </div>
          <div class="pro_crad_info">
              <h6>{{ item.pro_name }}</h6>
              <p>${{ item.pro_price }}</p>
          </div>
        </RouterLink>
        </div>
      </swiper-slide>
    </swiper>
    <div class="swiper-button-prev" ref="prevButton"></div>
  </div>
</div>

</template>
<style scoped lang="scss">
.product_card{
  width: 100%;
}
.pro_card_img img{
    vertical-align: top;
    width: 100%;
    aspect-ratio: 1/1;
    object-fit:contain;
    overflow: hidden;
    border-radius: $borr2
}
.pro_crad_info *{
    width: fit-content;
    color: $blackWord;
    margin: auto;
}
.pro_crad_info h6{
    font-size: $h4;
}
.pro_crad_info p{
    font-size: $p;
}

</style>