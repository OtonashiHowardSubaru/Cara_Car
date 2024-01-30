<template>
    <div class="newsCardList">
        <router-link to="/NewsArticle" class="newsCard" v-for="newsInfo in newsCard" :key="newsInfo.title">
            <div class="newsCardImg">
                <div class="newsInfoImg">
                    <img :src="newsInfo.img" alt="newsInfo.img">
                </div>
                <span class="timingTag">{{ newsInfo.timingTag }}</span>
            </div>
            <div class="newsCardText">
                <div class="cardTitle">
                    <h3>【{{ newsInfo.activeTag }}】{{ newsInfo.title }}</h3>
                </div>
                <p>{{ newsInfo.beginTime }}</p>
            </div>
        </router-link>
    </div>
</template>



<script>
export default { 
    data() {
        return{
            newsCard:[
                {
                    img: "/imgs/event/infoCard01.jpg",
                    title: "當月小壽星特別禮遇",
                    timingTag: "進行中",
                    activeTag: "優惠",
                    beginTime: "2024/1/1 ~ 2024/12/31",
                },
                {
                    img: "/imgs/event/infoCard02.jpg",
                    title: "網上預訂折扣",
                    timingTag: "進行中",
                    activeTag: "優惠",
                    beginTime: "2024/1/1 ~ 2024/12/31",
                },
                {
                    img: "/imgs/event/infoCard03.jpg",
                    title: "玩具車攝影比賽",
                    timingTag: "進行中",
                    activeTag: "活動",
                    beginTime: " 2024/2/1 ~ 2024/4/1",
                },
                {
                    img: "/imgs/event/infoCard04.jpg",
                    title: "玩具車組裝講座",
                    timingTag: "進行中",
                    activeTag: "活動",
                    beginTime: " 2024/2/1 ~ 2024/12/31",
                },
                {
                    img: "/imgs/event/infoCard05.jpg",
                    title: "新春特別優惠",
                    timingTag: "即將舉辦",
                    activeTag: "優惠",
                    beginTime: "2024/2/5 ~ 2024/2/18",
                },
                {
                    img: "/imgs/event/infoCard06.jpg",
                    title: "玩具車繪畫大賽",
                    timingTag: "即將舉辦",
                    activeTag: "活動",
                    beginTime: "2024/3/1 ~ 2024/5/31",
                },
                {
                    img: "/imgs/event/infoCard07.jpg",
                    title: "限時快閃活動",
                    timingTag: "即將舉辦",
                    activeTag: "優惠",
                    beginTime: " 2024/3/12 ~ 2024/3/31",
                },
                {
                    img: "/imgs/event/infoCard08.jpg",
                    title: "玩具車比例模型製作",
                    timingTag: "即將舉辦",
                    activeTag: "活動",
                    beginTime: " 2024/4/20 ~ 2024/6/20",
                },
                {
                    img: "/imgs/event/infoCard09.jpg",
                    title: "玩具車展覽會",
                    timingTag: "即將舉辦",
                    activeTag: "活動",
                    beginTime: "2024/5/20 ~ 2024/12/31",
                },
            ]
        }
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/eventCard.scss';
</style>