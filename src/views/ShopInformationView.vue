<template>
    <MainHeader />
    <main class="ShopInformation">
        <div class="infoBg">
            <div class="bgAnime">
                <img src="/src/assets/imgs/shopInfo/InfoLongImg.png" alt="InfoLongImg">
            </div>
        </div>

        <section class="infoText">
            <img src="/src/assets/imgs/shopInfo/infoTitle.svg" alt="infoTitle" class="infoTitle">

            <InfoTextCards />
            <div class="shopInfoMap">
                <ShopMap />
            </div>

            <div class="shopInfoBtnGroup">
                <BtnAboutUs />
                <BtnEvent />
            </div>
        </section>
    </main>
</template>

<script>
import BtnAboutUs from '@/components/btn/BtnAboutUs.vue'
import BtnEvent from '@/components/btn/BtnEvent.vue'
import MainHeader from '@/components/MainHeader.vue';
import ShopMap from '@/components/ShopMap.vue';
import InfoTextCards from '@/components/InfoTextCards.vue';


export default {
    components:{
        BtnAboutUs,
        BtnEvent,
        MainHeader,
        ShopMap,
        InfoTextCards,
    },
    data() {
        return{
            infoText: [{
                    shopAddress: " 桃園市中壢區復興路46號8樓",
                    contactNumber: " (03)425-1108",
                    contactEmail: " Cara_car@gmail.com",
                    openTime: " 10 : 00 ~ 20 :30",
                    holiday: " 每周一、四"
                }],
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