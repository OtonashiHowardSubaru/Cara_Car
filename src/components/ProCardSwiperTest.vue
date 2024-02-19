<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import ProductCard from '@/components/ProductCard.vue';


export default{
    components:{
        Swiper, SwiperSlide, ProductCard,
    },
    data(){
        return{
          slidesPerView: 3,
        }
    },
    setup() {
      return {
        modules: [Navigation]
      };
    },
    props:['displayData', ], //這邊再開一個格子，只存一個物件的資料
    created() {
      console.log(this.displayData)
    },
    methods: {
        handleResize(){
          this.slidesPerView = window.innerWidth >= 768 ? 3 : 1;
        }
    },
    mounted() {
      window.addEventListener('resize',this.handleResize);
      this.handleResize();
    },
}

</script>

<template>
<div class="recommand">
  <div class="recommand_box">
    <div class="swiper-button-next" ref="nextButton"></div>
    <swiper 
    :slidesPerView="slidesPerView"
    :spaceBetween="30"
    
    :navigation="{
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }"
    :modules="modules"
    class="mySwiper"
    >
      <swiper-slide  v-for="(item,index) in displayData" :key="index">
        <ProductCard
        :displayData="item"
        />
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