<script>
import ProductCard from '@/components/ProductCard.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';


export default{
    components:{
        ProductCard, Swiper, SwiperSlide,
    },
    data(){
        return{
        }
    },
    setup() {
      return {
        modules: [Navigation]
      };
    },
    props:['displayData', ],
    created() {},
    methods: {
        getProductImageUrl(imageFileName) {
        // 返回完整的URL
        return `https://tibamef2e.com/cgd103/g1/images/shop/${imageFileName}`;
        }
    }
}

</script>

<template>
<div class="recommand">
  <div class="view">
    <h4>別人也逛過</h4>
    <div class="swiper-button-next" ></div>
    <swiper
    :slidesPerView="3"
    :spaceBetween="30"
    :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
    :modules="modules"
    class="mySwiper"
    >
      <swiper-slide  v-for="item in displayData" :key="item.prod_id">
        <div class="product_card">
        <RouterLink to='/product'>
          <div class="pro_card_img">
              <img :src="getProductImageUrl(item.prod_img1)" alt="Product Image">
          </div>
          <div class="pro_crad_info">
              <h6>{{ item.prod_name }}</h6>
              <p>{{ item.prod_price }}</p>
          </div>
        </RouterLink>
        </div>
      </swiper-slide>
    </swiper>
    <div class="swiper-button-prev"></div>
  </div>
  <div class="maybeYouLike">
    <h4>也許你會喜歡</h4>
    <swiper
    :slidesPerView="3"
    :spaceBetween="30"
    :pagination="{
      clickable: true,
    }"
    :modules="modules"
    class="mySwiper"
    >
      <swiper-slide v-for="item in displayData" :key="item.prod_id">
        <div class="product_card" >
        <RouterLink to='/product'>
          <div class="pro_card_img">
              <img :src="getProductImageUrl(item.prod_img1)" alt="Product Image">
          </div>
          <div class="pro_crad_info">
              <h6>{{ item.prod_name }}</h6>
              <p>{{ item.prod_price }}</p>
          </div>
        </RouterLink>
      </div>
      </swiper-slide>
    </swiper>
  </div>
</div>

</template>
<style scoped lang="scss">
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
.swiper-button-next{
  position: absolute;
  // right: -10px;
}
.swiper-button-prev{
  position: absolute;
  // left: -10px;
}
</style>