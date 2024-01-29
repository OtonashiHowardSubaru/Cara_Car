<template>
    <MainHeader />
    <main class="ShopInformation">
        <div class="infoBg">
            <div class="bgAnime">
                <img src="/src/assets/imgs/shopInfo/InfoLongImg.png" alt="InfoLongImg">
            </div>
        </div>

        <section class="infoText" v-for="item in infoText">
            <img src="/src/assets/imgs/shopInfo/infoTitle.svg" alt="infoTitle" class="infoTitle">
            <div>
                <p>
                    <span>門市地址 :</span>
                    <span>{{ item.shopAddress }}</span>
                </p>
                <p>
                    <span>聯絡電話 :</span>
                    <span>{{ item.contactNumber }}</span>
                </p>
                <p>
                    <span>電子信箱 :</span>
                    <span>{{ item.contactEmail }}</span>
                </p>
                <p>
                    <span>營業時間 :</span>
                    <span>{{ item.openTime }}</span>
                </p>
                <p>
                    <span>公休日 :</span>
                    <span>{{ item.holiday }}</span>
                </p>
            </div>
            <div class="map"></div>
            <BtnAboutUs />
            <BtnEvent />
        </section>
    </main>
</template>

<script>
import BtnAboutUs from '@/components/btn/BtnAboutUs.vue'
import BtnEvent from '@/components/btn/BtnEvent.vue'
import MainHeader from '@/components/Header.vue';
export default {
    components:{
        BtnAboutUs,
        BtnEvent,
        MainHeader,
    },
    data() {
        return{
            infoText: [{
                    shopAddress: " 桃園市中壢區復興路46號8樓",
                    contactNumber: " (03)425-1108",
                    contactEmail: " Cara_car@gmail.com",
                    openTime: " 10 : 00 ~ 20 :30",
                    holiday: " 每周一、四"
                }]
        }
    },
    methods:{
    },
    mounted() {
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/page/shopInformation.scss';
</style>