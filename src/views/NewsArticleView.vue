
<template>
    <MainHeader />
    <main class="newsArticle">
        <article v-for="newsInfo in newsCard" :key="newsInfo.title" class="infoInner">
            <header>
                <div class="infoImg">
                    <img :src="newsInfo.img" alt="newsInfo.img"></div>
                <div class="infoInnerText">
                    <div class="infoInnerTextTitle">
                        <h1>【{{ newsInfo.activeTag }}】{{ newsInfo.title }}</h1>
                        <p class="timingTag">{{ newsInfo.timingTag }}</p>
                        <span class="beginTime">活動期間 {{ newsInfo.beginTime }}</span>
                    </div>
                    <div class="infoInnerTextScroll">
                        <span class="scrollText">SCROLL</span>
                        <span class="scrollLine"></span>
                    </div>
                </div>
            </header>

            <div class="infoTextWord">
            <!-- <div class="infoTextWord" v-if="newsInfo.infoText1 && newsInfo.infoText2 && newsInfo.infoText3"> -->
                <!-- <p>{{ newsInfo.infoText1 }}</p>
                <p>{{ newsInfo.infoText2 }}</p>
                <p>{{ newsInfo.infoText3 }}</p> -->
                <p>
                    準備好讓你的玩具車閃耀舞台了嗎？ <br>
                    我們邀請你和你的小車夥伴們參加這場充滿樂趣和創意的攝影比賽！
                </p>
                <p>
                    用你的相機捕捉最美的瞬間，參賽作品將由專業評審評選，並有豐富獎品等你拿！
                </p>
                <p>
                    【參與方式】<br>
                    Facebook、Instagram： <br>
                    活動期間，發表符合要求的攝影作品附上Hashtag「#Cara-Car」並將投稿貼文和投稿平臺的個人帳號設為公開，即視爲投稿成功！

                </p>
                <p>
                    【活動規則】<br>
                    參與活動的作品須為近三個月內拍攝的作品。
                </p>
                <p>
                    【活動獎勵】<br>
                    一等獎（1名） : 3000NTD 禮品券<br>
                    二等獎（3名） : 1500NTD 禮品券<br>
                    三等獎（5名） : 1000NTD 禮品券<br>
                    最佳人氣獎（1名） : 價值 800NTD 的周邊商品
                </p>
                <p>
                    【活動時間】<br>
                    2024/2/1 ~ 2024/4/1 23:59 <br>
                    結果公告：2024/4/20 12:00
                </p>
            </div>
            
            <!-- <RouterLink to="/NewsArticle" class="">立即前往報名</RouterLink> -->
        </article>

        <div class="otherEvent">
            <div class="otherEventTitle">
                <h2>其他活動</h2>
                <RouterLink to="/News">More</RouterLink>
            </div>
            <div class="otherEventCards">
                <EventCardSlider class="otherEventCard" />
            </div>
        </div>
    </main>
</template>

<script>
import MainHeader from '@/components/Header.vue'
import EventCardSlider from '@/components/card/EventCardSlider.vue'
export default {
    components:{
        MainHeader,
        EventCardSlider,
        
    },
    data() {
        return{
            newsCard:[
                {
                    img: "/imgs/event/infoCard03.jpg",
                    title: "玩具車攝影比賽",
                    timingTag: "進行中",
                    activeTag: "活動",
                    beginTime: " 2024/2/1 ~ 2024/4/1",
                    // infoText1: "為了迎接2024年而推出的特別優惠!",
                    // infoText2: "如購買任何電動車即可享受9折優惠，",
                    // infoText3: "並贈送小型玩具車模型。",
                
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