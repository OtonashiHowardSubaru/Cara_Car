
<template>
    <main class="newsArticle">
        <article v-for="newsInfo in newsCard" :key="newsInfo.title">
            <header>
                <img :src="newsInfo.img" alt="newsInfo.img">
                <h1>【{{ newsInfo.activeTag }}】{{ newsInfo.title }}</h1>
                <span class="timingTag">{{ newsInfo.timingTag }}</span>
            </header>
            <p>{{ newsInfo.infoText }}</p>
            <span>活動期間 {{ newsInfo.beginTime }}</span>
            <RouterLink to="/ProductList">立即前往</RouterLink>
        </article>

        <section>
            <div class="otherEvent">
                <h2>其他活動</h2>
                <RouterLink to="/News">More</RouterLink>
            </div>
        </section>
    </main>
</template>

<script>
export default {
    // components:{
        
    // },
    data() {
        return{
            newsCard:[
                {
                    img: "src/assets/imgs/event/infocard01.jpg",
                    title: "新年特惠活動",
                    timingTag: "進行中",
                    activeTag: "優惠",
                    beginTime: "2024/1/1 ~ 2024/1/31",
                    infoText: " 為了迎接2024年而推出的特別優惠!<br>如購買任何電動車即可享受9折優惠，<br>並贈送小型玩具車模型。",
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
@import '@/assets/scss/page/newsArticle.scss';
</style>