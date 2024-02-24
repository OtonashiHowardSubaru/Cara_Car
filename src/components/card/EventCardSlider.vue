<template>

    <div class="newsCardListSwiper">
    
        <swiper
        :slidesPerView="slidesPerView"
        :spaceBetween="10"
        :navigation="{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }"
        :pagination="{
            clickable: true,
        }"
        :modules="modules"
        class="newsCardList"
        >
            <swiper-slide v-for="newsInfo in displayData" :key="newsInfo.news_id">
                <div class="newsCardGroup">
                    <router-link :to="'/NewsArticle/' + newsInfo.news_id" class="newsCards">
                        <div class="newsCard">
                            <div class="newsCardImg">
                                <div class="newsInfoImg">
                                    <img :src="getNewsImgSrc(newsInfo.img_path)" alt="newsInfo.img">
                                </div>
                                <span class="timingTag" :style="{ backgroundColor: getBackgroundColor(newsInfo), borderColor: getBorderColor(newsInfo) }">
                                    {{ calculateDateStatus(newsInfo) }}
                                </span>
                            </div>
                            <div class="newsCardText">
                                <div class="cardTitle">
                                    <h3>【{{ newsInfo.news_category == '0' ? '優惠' : '活動' }}】{{ newsInfo.news_title }}</h3>
                                </div>
                                <p>{{ newsInfo.news_start_date }} ~ {{ newsInfo.news_end_date }}</p>
                            </div>
                        </div>
                    </router-link>
    
                </div>
            </swiper-slide>
    
            
        </swiper>
        
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
    
    
    </template>
    
    
    
    <script>
    import axios from 'axios'; //引入函式庫

    // import Swiper core and required modules
    import { Navigation} from 'swiper/modules';
    
    // Import Swiper Vue.js components
    import { Swiper, SwiperSlide } from 'swiper/vue';
    
    // Import Swiper styles
    import 'swiper/css';
    import 'swiper/css/navigation';
    import 'swiper/css/pagination';
    import 'swiper/css/scrollbar';
    
    
    export default { 
        components:{
            Swiper,
            SwiperSlide,
        },
        data() {
            return{
                // 資料
                responseData : [],
                displayData: [],

                slidesPerView: 1,
            }
        },
        setup() {
            const onSwiper = (swiper) => {
                console.log(swiper);
            };
            const onSlideChange = () => {
                console.log('slide change');
            };
            return {
                onSwiper,
                onSlideChange,
                modules: [Navigation],
            };
        },
        
        mounted() {
            window.addEventListener('resize', this.handleResize);
            this.handleResize(); // 初始調用一次，確保初始值正確
        },
        created() {
            //axios的get方法(`$import.meta.env.{變數}/檔名.php`)用.env檔中寫的網址來判斷網址URL的前贅
            // 取得全部商品資料用作商品資料，以及swiper用的所有資料
            axios.get(`${import.meta.env.VITE_LPHP_URL}/front/newsList.php`)
            .then((response) => {
                // 成功取得資料後，將資料存入陣列
                // console.log(response.data)
                this.responseData = response.data;
                this.displayData = response.data.sort((a, b) => {
                    const statusA = this.calculateDateStatus(a);
                    const statusB = this.calculateDateStatus(b);
                    
                    if (statusA === '已結束' && statusB !== '已結束') {
                        return 1; // 將已結束的活動排到後面
                    } else if (statusB === '已結束' && statusA !== '已結束') {
                        return -1; // 將已結束的活動排到後面
                    } else {
                        return 0; // 其他情況保持不變
                    }
                });
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                this.errorMessage = "執行失敗: " + error.message; // 存儲錯誤訊息
            });
        },
        methods: {
            handleResize() {
                // 根據視口寬度動態設置 slidesPerView
                this.slidesPerView = window.innerWidth >= 768 ? 3 : 1;
            },
            // 取得圖片的路徑函式
            getNewsImgSrc(imgName){
                return new URL(`../../../../imgs/event/${imgName}`, import.meta.url).href
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
        },
        computed: {
            modules() {
                return [Navigation];
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
        },
    }
    </script>
    
    <style lang="scss" scoped>
    @import '@/assets/scss/components/eventCardSlider.scss';
    </style>