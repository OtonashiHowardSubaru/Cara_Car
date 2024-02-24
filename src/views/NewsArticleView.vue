
<template>
    <MainHeader />
    <main class="newsArticle">
        <div class="topDecoBg"></div>
        <article v-if="thisNews" :key="thisNews.news_id" class="infoInner">
            <header>
                <div class="infoImg">
                    <img :src="getNewsImgSrc(thisNews.img_path)" alt="thisNews.img">
                </div>
                <div class="infoInnerText">
                    <div class="decoBirdGroup">
                        <GreenBird class="GreenBird" />
                        <YellowBird class="YellowBird" />
                        <BlueBird class="BlueBird" />
                    </div>
                    <div class="infoInnerTextTitle">
                        <h1>【{{ thisNews.news_category == '0' ? '優惠' : '活動'}}】{{ thisNews.news_title }}
                        </h1>
                        <p class="timingTag" :style="{ backgroundColor: getBackgroundColor(thisNews), borderColor: getBorderColor(thisNews) }">
                            {{ calculateDateStatus(thisNews) }}
                        </p>
                        <span class="beginTime">
                            活動期間 
                            {{ thisNews.news_start_date }} ~ 
                            {{ thisNews.news_end_date }}
                        </span>
                    </div>
                    <div class="infoInnerTextScroll">
                        <span class="scrollText">SCROLL</span>
                        <span class="scrollLine"></span>
                    </div>
                </div>
            </header>
            <div class="newsCardListDecoBg"></div>
            <div class="infoTextWord">
                <p v-if="thisNews.news_content" v-html="textBreak(thisNews.news_content)"></p>
            </div>

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
import MainHeader from '@/components/MainHeader.vue'
import EventCardSlider from '@/components/card/EventCardSlider.vue'

import YellowBird from '@/components/animation/YellowBird.vue'
import BlueBird from '@/components/animation/BlueBird.vue'
import GreenBird from '@/components/animation/GreenBird.vue'

import axios from 'axios'; //引入函式庫

export default {
    components:{
        MainHeader,
        EventCardSlider,
        YellowBird,
        BlueBird,
        GreenBird,
        
    },
    data() {
        return{
            // 資料
            allNews : [],
            thisNews: {},
        }
    },
    created() {//在頁面載入時同時載入function
        this.fetchData()
    },
    watch: {
        '$route'(to, from) {
        // 間丁 $route 有變化
        // 在路徑參數有變化時,執行一次fetchData(抓取資料)
            this.fetchData();
        }
    },
    methods: {
        fetchData() {
             // 定義頁碼
        const pageId = this.$route.params.news_id
        // console.log(pageId)
        
        //axios的get方法(`$import.meta.env.{變數}/檔名.php`)用.env檔中寫的網址來判斷網址URL的前贅
        // 取得全部商品資料用作商品資料，以及swiper用的所有資料
        axios.get(`${import.meta.env.VITE_LPHP_URL}/front/frontNewsInfo.php`)
        .then((response) => {
            // console.log(response.data)
            // 成功取得資料後，將資料存入陣列
            this.allNews = response.data;
            // 找到相符合的news並設置給 thisNews
            this.thisNews = this.allNews.find((thisNews) =>thisNews.news_id == pageId)
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            this.errorMessage = "執行失敗: " + error.message; // 存儲錯誤訊息
        });
        },
        // 文字換行
        textBreak(text) {
            return text.replace(/\r\n/g,"<br>");
        },
        // 取得圖片的路徑函式
        getNewsImgSrc(imgName){
            return new URL(`../../../imgs/event/${imgName}`, import.meta.url).href
        },

        // 更改timing tag的背景顏色
        getBackgroundColor(thisNews) {
            const status = this.calculateDateStatus(thisNews);
            switch (status) {
                case '進行中':
                    return '#008673';
                case '即將舉辦':
                    return '#C0AA88';
                case '已結束':
                    return '#A3A3A3';
            }
        },
        // 更改timing tag的border顏色
        getBorderColor(thisNews) {
            const status = this.calculateDateStatus(thisNews);
            switch (status) {
                case '進行中':
                    return '#016B5C';
                case '即將舉辦':
                    return '#B99D73';
                case '已結束':
                    return '#DBDFE4';
            }
        },
    },
    computed: {
        // 新增的 computed 屬性用來計算日期狀態
        calculateDateStatus() {
            return (thisNews) => {
                const currentDate = new Date();
                const startDate = new Date(thisNews.news_start_date);
                const endDate = new Date(thisNews.news_end_date);
                
                // 檢查當前日期是否在指定範圍內
                if (currentDate >= startDate && currentDate <= endDate) {
                    return '進行中';
                } else if (currentDate > startDate) {
                    return '已結束';
                } else {
                    return '即將舉辦';
                }
            };
        },
    },


}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/page/newsArticle.scss';
</style>