<template>
    <MainHeader />
    <main class="pageNews">
        <header class="newsTitle">
            <img src="/src/assets/imgs/event/eventTitle.svg" alt="eventTitle.png">
        </header>
        <section class="newsOverview">
            <div class="selector">
                <div class="space"></div>
                <div class="btnTag">
                    <button v-for="tag in buttonTag">
                        <span>{{ tag }}</span>
                    </button>
                </div>
                <select class="holdingTime">
                    <option value="all">請選擇</option>
                    <option value="process">進行中</option>
                    <option value="coming">即將舉辦</option>
                </select>
            </div>
            <div class="newsCardList">
                <RouterLink to="/NewsArticle" class="newsCard" v-for="newsInfo in newsCard" :key="newsInfo.title">
                    <div class="newsCardImg">
                        <img :src="newsInfo.img" alt="newsInfo.img">
                    </div>
                    <span class="timingTag">{{ newsInfo.timingTag }}</span>
                    <div class="newsCardText">
                        <div class="cardTitle">
                            <h3>【{{ newsInfo.activeTag }}】{{ newsInfo.title }}</h3>
                        </div>
                        <p>{{ newsInfo.beginTime }}</p>
                    </div>
                </RouterLink>
            </div>
            <PageNumber class="newsPageNumber" />
        </section>
    </main>
</template>

<script>
import MainHeader from '@/components/Header.vue'
import PageNumber from '@/components/btn/PageNumber.vue'
export default {
    components:{
        MainHeader,
        PageNumber,
    },
    data() {
        return{
            buttonTag: [
                '全部',
                '優惠',
                '活動',
            ],
            newsCard:[
                {
                    img: "src/assets/imgs/event/infocard01.jpg",
                    title: "當月小壽星特別禮遇",
                    timingTag: "進行中",
                    activeTag: "優惠",
                    beginTime: "2024/1/1 ~ 2024/12/31",
                },
                {
                    img: "src/assets/imgs/event/infocard02.jpg",
                    title: "網上預訂折扣",
                    timingTag: "進行中",
                    activeTag: "優惠",
                    beginTime: "2024/1/1 ~ 2024/12/31",
                },
                {
                    img: "src/assets/imgs/event/infocard03.jpg",
                    title: "玩具車攝影比賽",
                    timingTag: "進行中",
                    activeTag: "活動",
                    beginTime: " 2024/2/1 ~ 2024/4/1",
                },
                {
                    img: "src/assets/imgs/event/infocard04.jpg",
                    title: "玩具車組裝講座",
                    timingTag: "進行中",
                    activeTag: "活動",
                    beginTime: " 2024/2/1 ~ 2024/12/31",
                },
                {
                    img: "src/assets/imgs/event/infocard05.jpg",
                    title: "新春特別優惠",
                    timingTag: "即將舉辦",
                    activeTag: "優惠",
                    beginTime: "2024/2/5 ~ 2024/2/18",
                },
                {
                    img: "src/assets/imgs/event/infocard06.jpg",
                    title: "玩具車繪畫大賽",
                    timingTag: "即將舉辦",
                    activeTag: "活動",
                    beginTime: "2024/3/1 ~ 2024/5/31",
                },
                {
                    img: "src/assets/imgs/event/infocard07.jpg",
                    title: "限時快閃活動",
                    timingTag: "即將舉辦",
                    activeTag: "優惠",
                    beginTime: " 2024/3/12 ~ 2024/3/31",
                },
                {
                    img: "src/assets/imgs/event/infocard08.jpg",
                    title: "玩具車比例模型製作",
                    timingTag: "即將舉辦",
                    activeTag: "活動",
                    beginTime: " 2024/4/20 ~ 2024/6/20",
                },
                {
                    img: "src/assets/imgs/event/infocard09.jpg",
                    title: "玩具車展覽會",
                    timingTag: "即將舉辦",
                    activeTag: "活動",
                    beginTime: "2024/5/20 ~ 2024/12/31",
                },
            ]
        }
    },
    methods:{
    },
    mounted() {
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/page/news.scss';
</style>