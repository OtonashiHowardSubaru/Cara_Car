<template>
    <main class="pageNews">
        <header class="newsTitle">
            <img src="/src/assets/imgs/event/eventTitle.png" alt="eventTitle.png">
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
                <div class="newsCard" v-for="newsInfo in newsCard" :key="newsInfo.title">
                    <img :src="newsInfo.img" alt="newsInfo.img">
                    <span class="timingTag">{{ newsInfo.timingTag }}</span>
                    <div class="newsCardText">
                        <div class="cardTitle">
                            <h3>【{{ newsInfo.activeTag }}】{{ newsInfo.title }}</h3>
                        </div>
                        <p>{{ newsInfo.beginTime }}</p>
                    </div>
                </div>
            </div>
            <div class="pageSwitch"></div>
        </section>
    </main>
</template>

<script>
export default {
    // components:{
        
    // },
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
                    title: "新年特惠活動",
                    timingTag: "進行中",
                    activeTag: "優惠",
                    beginTime: "2024/1/1 ~ 2024/1/31",
                },
                {
                    img: "src/assets/imgs/event/infocard02.jpg",
                    title: "新年特惠活動",
                    timingTag: "進行中",
                    activeTag: "優惠",
                    beginTime: "2024/1/1 ~ 2024/1/31",
                },
                {
                    img: "src/assets/imgs/event/infocard02.jpg",
                    title: "新年特惠活動",
                    timingTag: "進行中",
                    activeTag: "優惠",
                    beginTime: "2024/1/1 ~ 2024/1/31",
                },
                {
                    img: "src/assets/imgs/event/infocard02.jpg",
                    title: "新年特惠活動",
                    timingTag: "進行中",
                    activeTag: "優惠",
                    beginTime: "2024/1/1 ~ 2024/1/31",
                },
                {
                    img: "src/assets/imgs/event/infocard02.jpg",
                    title: "新年特惠活動",
                    timingTag: "進行中",
                    activeTag: "優惠",
                    beginTime: "2024/1/1 ~ 2024/1/31",
                },
                {
                    img: "src/assets/imgs/event/infocard02.jpg",
                    title: "新年特惠活動",
                    timingTag: "進行中",
                    activeTag: "優惠",
                    beginTime: "2024/1/1 ~ 2024/1/31",
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