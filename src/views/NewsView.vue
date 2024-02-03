<template>
    <MainHeader />
    <main class="pageNews">
        <header class="newsTitle">
            <img src="../assets/imgs/event/eventTitle.svg" alt="eventTitle.png">

            <GreenBird class="GreenBird" />
            <YellowBird class="YellowBird" />
            <RedBird class="RedBird" />
            <!-- <SingleCloud /> -->
            <!-- <DoubleCloud /> -->


        </header>
        <section class="newsOverview">
            <div class="selector">
                <div class="space"></div>
                <div class="btnTag">
                    <button v-for="tag in buttonTag" :key="tag">
                        <span>{{ tag }}</span>
                    </button>
                </div>
                <select class="holdingTime">
                    <option value="all">請選擇</option>
                    <option value="process">進行中</option>
                    <option value="coming">即將舉辦</option>
                </select>
            </div>
            <EventCard />
            <PageNumber class="newsPageNumber" />
        </section>
    </main>
</template>

<script>
import MainHeader from '@/components/MainHeader.vue'
import EventCard from '@/components/card/EventCard.vue'
import PageNumber from '@/components/btn/PageNumber.vue'
import YellowBird from '@/components/animation/YellowBird.vue'
import RedBird from '@/components/animation/RedBird.vue'
import GreenBird from '@/components/animation/GreenBird.vue'
import DoubleCloud from '@/components/animation/DoubleCloud.vue'
import SingleCloud from '@/components/animation/SingleCloud.vue'



export default {
    components:{
        MainHeader,
        EventCard,
        PageNumber,
        YellowBird,
        RedBird,
        GreenBird,
        DoubleCloud,
        SingleCloud,
    },
    data() {
        return{
            buttonTag: [
                '全部',
                '優惠',
                '活動',
            ],
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