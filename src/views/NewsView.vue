<template>
    <MainHeader />
    <main class="pageNews">
        <header class="newsTitle">
            <h1>最新消息</h1>

            <GreenBird class="GreenBird" />
            <YellowBird class="YellowBird" />
            <RedBird class="RedBird" />
            <!-- <SingleCloud /> -->
            <!-- <DoubleCloud /> -->


        </header>
        <section class="newsOverview">
            <div class="newsCardListDecoBg"></div>
            <div class="selector">
                <div class="space"></div>
                <div class="btnTag">
                    <button v-for="tag in buttonTag" :key="tag" @click="setTag(tag)">
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
                <RouterLink :to="'/NewsArticle/' + newsInfo.news_id" class="newsCard" v-for="(newsInfo, index) in paginated" :key="index">
                    <div class="newsCardImg">
                        <div class="newsInfoImg">
                            <img :src="getNewsImgSrc(newsInfo.img_path)" alt="newsInfo.img">
                        </div>
                        <span class="timingTag" :style="{ backgroundColor: getBackgroundColor(newsInfo), borderColor: getBorderColor(newsInfo) }">{{ calculateDateStatus(newsInfo) }}</span>
                    </div>
                    <div class="newsCardText">
                        <div class="cardTitle">
                            <h3>【{{ newsInfo.news_category == '0' ? '優惠' : '活動'}}】{{ newsInfo.news_title }}</h3>
                        </div>
                        <p>{{ newsInfo.news_start_date }} ~ {{ newsInfo.news_end_date }}</p>
                    </div>
                </RouterLink>
            </div>

    <PageNumber :totalPages="totalPages" :currentPage="currentPage" @pageChange="changePage" />
            
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
import axios from 'axios'; //引入函式庫



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
            // 資料
            responseData : [],
            displayData: [],

            // 頁數切換
            activeTab: "",
            currentPage: 1,
            perPage: 6,

            // 活動標籤
            buttonTag: [
                '全部',
                '優惠',
                '活動',
            ],

            // 活動標籤篩選
            selectedTag: '' // 添加一個變量保存當前所選的按鈕標籤
        }
    },

    created() {
      //axios的get方法(`$import.meta.env.{變數}/檔名.php`)用.env檔中寫的網址來判斷網址URL的前贅
      // 取得全部商品資料用作商品資料，以及swiper用的所有資料
        axios.get(`${import.meta.env.VITE_CARA_URL}/front/newsList.php`)
        .then((response) => {
            // 成功取得資料後，將資料存入陣列
            // console.log(response.data)
            this.responseData = response.data;
            this.displayData = response.data;
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            this.errorMessage = "執行失敗: " + error.message; // 存儲錯誤訊息
        });
    },
    methods: {
        // 取得圖片的路徑函式
        getNewsImgSrc(imgName){
            return new URL(`../assets/imgs/event/${imgName}`, import.meta.url).href
        },
         // 頁數切換
        toggleStatus(index) {
            this.eventsInfo[index].status = !this.eventsInfo[index].status;
        },
        currentSidebar(item) {
            this.activeTab = item
        },
        changePage(page) {
            this.currentPage = page;
        },

        // 更改timing tag的背景顏色
        getBackgroundColor(newsInfo) {
            const status = this.calculateDateStatus(newsInfo);
            switch (status) {
                case '進行中':
                    return '#008673';
                case '即將舉辦':
                    return '#C0AA88';
                case '已結束':
                    return '#A3A3A3';
                default:
                    return 'white'; // 預設為白色
            }
        },
        // 更改timing tag的border顏色
        getBorderColor(newsInfo) {
            const status = this.calculateDateStatus(newsInfo);
            switch (status) {
                case '進行中':
                    return '#016B5C'; // 綠色邊框
                case '即將舉辦':
                    return '#B99D73'; // 紅色邊框
                case '已結束':
                    return '#DBDFE4'; // 灰色邊框
                default:
                    return 'black'; // 預設為黑色邊框
            }
        },
        // 添加一個方法用来設置所選的按鈕標籤
        setTag(tag) {
            this.selectedTag = tag;
        }

    },
    computed: {
        // 頁數切換
        paginated(){
            // 將已結束的活動放在陣列最後
            const sortedData = this.displayData.slice().sort((a, b) => {
                // 將已結束的活動放在陣列最後
                if (this.calculateDateStatus(a) === '已結束') return 1;
                if (this.calculateDateStatus(b) === '已結束') return -1;
                return 0;
            });
            const start = (this.currentPage - 1) * this.perPage; //將當前頁數-1再乘以頁面顯示內容筆數得到start值
            const end = start + this.perPage;//計算此頁面中的內容是否達到perPage中的數字最後索引值來得到end值
            return sortedData.slice(start, end);//用JS的.slice()方法獲取vue data中的member陣列內容顯示內容
        },
        totalPages() {
            return Math.ceil(this.displayData.length / this.perPage);//用Math.ceil()無條件進位，值則是用member陣列物件長度除以顯示內容筆數取得
        },

        // 新增的 computed 屬性用來計算日期狀態
        calculateDateStatus() {
            return (newsInfo) => {
                const currentDate = new Date();
                const startDate = new Date(newsInfo.news_start_date);
                const endDate = new Date(newsInfo.news_end_date);
                
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
        // 活動優惠篩選器
        filteredNews() {
            if (this.selectedTag === '全部' || !this.selectedTag) {
                return this.displayData; // 如果選擇的是全部或者沒有選擇，返回全部信息
            } else {
                // 否則，根據所選的標籤過濾信息
                return this.displayData.filter(news => {
                    return news.news_category === (this.selectedTag === '優惠' ? '0' : '1');
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/page/news.scss';
</style>