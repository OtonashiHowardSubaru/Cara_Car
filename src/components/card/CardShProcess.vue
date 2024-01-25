<script>
export default {
    data(){
      return {
        sh_contact: [
          {
            img: "src/assets/imgs/product/sh_process_bird.png",
            shSubtitle:'CONTACT',
            context: '透過電子郵件聯繫我們',
            arrowImg: "src/assets/imgs/product/sh_process_arrow.png"
          },
          {
            img: "/src/assets/imgs/product/sh_process_second_hand.png",
            shSubtitle:'SECOND-HAND',
            context: '查看二手車輛商品',
            arrowImg: "src/assets/imgs/product/sh_process_arrow.png"
          },
          {
            img: "/src/assets/imgs/product/sh_process_recycle_car.png",
            shSubtitle:'RECYCLE CAR',
            context: '了解二手車輛販賣',
            arrowImg: "src/assets/imgs/product/sh_process_arrow.png"
          },
        ],

      }
    }
}

</script>
<template>
    <div class="sh_contact">
    <div class="sh_text">
      <h4>舊車新生，回憶傳承</h4>
      <p>如果您有二手車或是任何其他問題，歡迎聯繫我們。</p>
    </div>
      
    <div class="cards">
      <div class="contact_card" v-for="item in sh_contact">
        <div class="card_info">
          <img :src="item.img" alt="">
          <div class="item_text">
            <p>{{ item.shSubtitle }}</p>
            <p>{{ item.context }}</p>
          </div>
            
          <img :src="item.arrowImg" alt="" class="arrow">
        </div>
      </div>
    </div>  

    <div class="phone">
      <img src="/src/assets/imgs/product/sh_process_contact.png" alt="">
      <div class="tel">
        <div class="contact_detail">
          <div class="tel_title">
            <span>TELEPHONE</span>
            <span>連絡電話</span>
          </div>
          <div class="phoneNumber">
            <img src="/src/assets/imgs/product/sh_process_tel.png" alt="">
            <span>03 425 1108</span>
          </div>
        </div>

        <div class="opening">
          <span>每周一、二公休</span>
        </div> 
      </div>  
    </div>

  </div>
</template>
<style lang="scss" scope>
@import '@/assets/scss/components/card.scss';
</style>