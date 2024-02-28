<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      slidesPerView: 3,
      thisSwiperId: `swiper-${new Date().getTime()}`,
    };
  },
  setup() {
    return {
      modules: [Navigation],
    };
  },
  props: ["displayData"], //這邊再開一個格子，只存一個物件的資料
  created() {},
  methods: {
    getProductImgSrc(imgName) {
      return new URL(
        `${import.meta.env.VITE_IMG_BASE_URL}/product/new_products/${imgName}`
      ).href;
    },
    handleResize() {
      this.slidesPerView = window.innerWidth >= 1024 ? 3 : 1;
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
};
</script>

<template>
<div class="gameResult" :id="thisSwiperId">
  <div class="gameResultBox">
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
      <swiper-slide  v-for="item in displayData" :key="item.pro_id">
        <div class="product_card">
          <RouterLink :to="'/Product/' + item.pro_id">
            <div class="pro_card_img">
                <img :src="getProductImgSrc(item.img_name)" alt="Product Image">
            </div>
            <div class="pro_crad_info">
              <h6>{{ item.pro_name }}</h6>
              <p :style="{ color: item.promo_state === 1 ? 'red' : 'black' }">
                ${{ item.promo_state === 1 ? item.pro_sale : item.pro_price }}
              </p>
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
.product_card {
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

.pro_crad_info * {
  width: fit-content;
  color: $blackWord;
  margin: auto;
}

.pro_crad_info h6 {
  font-size: $h4;
}

.pro_crad_info p {
  font-size: $p;
}
</style>
