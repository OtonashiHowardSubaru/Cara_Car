<script>
import axios from 'axios'; //引入函式庫
import MainHeader from '@/components/MainHeader.vue';
import ProCardSwiper from '@/components/ProCardSwiper.vue';
import DoubleCloud from "@/components/animation/DoubleCloud.vue";
import BlueBird from "@/components/animation/BlueBird.vue";
import GreenBird from "@/components/animation/GreenBird.vue";
import YellowBird from "@/components/animation/YellowBird.vue";
import chatBox from '@/components/btn/chatBox.vue'


export default {
    components: {
        MainHeader, DoubleCloud, BlueBird, GreenBird, YellowBird, ProCardSwiper, chatBox,
    },
    data() {
        return {
            orderList: [],
            cartItems: [],
            thisOrderList:[],
            city: [
                { c: '台北市' },
                { c: '新北市' },
                { c: '基隆市' },
                { c: '基隆縣' },
                { c: '桃園市' },
                { c: '新竹市' },
                { c: '新竹縣' },
                { c: '苗栗縣' },
                { c: '台中市' },
                { c: '彰化縣' },
                { c: '南投縣' },
                { c: '雲林縣' },
                { c: '嘉義縣' },
                { c: '台南市' },
                { c: '高雄市' },
                { c: '屏東縣' },
                { c: '台東縣' },
                { c: '花蓮縣' },
                { c: '宜蘭縣' },
                { c: '澎湖縣' },
            ],
        }
    },
    created() {
        this.fetchData();
        // this.orderList = JSON.parse(localStorage.getItem('orderList')) || [];
        // console.log(this.orderList);
        this.cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        let imgName = JSON.parse(localStorage.getItem('cart')).shimageUrl;
    },
    // computed: {

    // },
    methods: {
        fetchData() {
            // 定義頁碼
            const pageId = this.$route.params.sh_pro_id

            // 取得所有商品資料用做本頁資料以及swiper
            axios.get(`${import.meta.env.VITE_PHP_URL}/back/backShOrder.php?`)
                .then((response) => {
                    // 成功取得資料後，將資料存入陣列
                    console.log(response.data)
                    this.orderList = response.data;
                    this.thisOrderList = response.data.find((item) => {
                        return item.sh_pro_id == pageId
                    })
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                    this.errorMessage = "執行失敗: " + error.message; // 存儲錯誤訊息
                });
        },
        getShProImg(imgName){
            return new URL(`${import.meta.env.VITE_IMG_BASE_URL}/sh_products/${imgName}`).href
        },
        clearshCartData() {
            localStorage.removeItem('cart');
            // console.log('清除購物車', this.cart);
        },
    },
}
</script>

<template>
    <MainHeader />
    <main>
        <section class="cart">
            <div class="cartTitle">
                <h2>購物車
                </h2>
                <div class="cartBird">
                    <BlueBird class="cartBlueBird" />
                    <GreenBird class="cartGreenBird" />
                    <YellowBird class="cartYellowBird" />
                </div>
            </div>
            <DoubleCloud class="cartCloud" />

            <div class="cartProcess1" id="cartProcessTop">
                <div class="cartProcessCircle" id="circle1">1</div>
                <div class="cartLine"></div>
                <div class="cartProcessCircle" id="circle2">2</div>
                <div class="cartLine"></div>
                <div class="cartProcessCircle" id="circle3">3</div>
            </div>
            <div class="cartProcess2">
                <span class="cartProcessname" id="process1">你的訂單</span>
                <span class="cartProcessname" id="process2">填寫資料</span>
                <span class="cartProcessname" id="process3">完成訂單</span>
            </div>

        </section>

        <div class="orderList" v-if="orderList.length > 0">
            <div class="listTitle">
                <h1>訂單資訊</h1>
            </div>
            <div class="listContent">
                <div class="left">
                    <ul>
                        <div class="row">
                            <li class="order">訂單編號</li>
                            <span>{{ orderList[orderList.length - 1].sh_ord_id }}</span>
                            <!-- <input type="text" v-model="orderList.sh_ord_id"> -->
                        </div>
                        <div class="row">
                            <li class="order">訂單日期</li>
                            <span>{{ orderList[orderList.length - 1].sh_ord_date }}</span>
                        </div>
                        <div class="row">
                            <li class="order">付款方式</li>
                            <span>線上信用卡</span>
                        </div>
                        <div class="row">
                            <li class="order">訂單狀態</li>
                            <span>未出貨</span>
                        </div>
                    </ul>
                </div>
                <div class="right">
                    <ul>
                        <div class="row">
                            <li class="order">收件人</li>
                            <span>{{ orderList[orderList.length - 1].sh_ord_reciever }}</span>
                        </div>
                        <div class="row">
                            <li class="order">連絡電話</li>
                            <span>{{ orderList[orderList.length - 1].sh_ord_phone }}</span>
                        </div>
                        <div class="row">
                            <li class="order">配送地址</li>
                            <span>桃園市中壢區復興路46號8樓</span>
                        </div>
                        <div class="row">
                            <li class="order">備註訊息</li>
                            <span>{{ orderList[orderList.length - 1].remark }}</span>
                        </div>
                    </ul>
                </div>
            </div>
            <!-- <div class="count">
                <span>訂單金額 : </span>
            </div> -->
        </div>

        <section class="cartFunction">
            <!-- 這裡是商品內容 -->

            <div class="shProductCard" v-for="item in cartItems" :key="item.id">
                <img :src="getShProImg(item.shimageUrl)" alt="ProductImage">
                <div class="sh_proCardP">
                    <p class="sh_pro_name">{{ item.shname }}</p>
                    <p class="sh_pro_price">${{ item.shprice }}</p>
                </div>
            </div>
            
            <div v-if="cartItems.length > 0">
                <div class="cartPrice">
                    <span class="cartFunctionTitle">小計</span>
                    <!-- 這裡要算小計 -->
                    <span class="cartFunctionTitle">${{ cartItems[0].shprice}}</span>
                </div>
                <div class="cartPrice">
                    <span class="cartFunctionTitle">運費</span>
                    <span class="cartFunctionTitle">$120</span>
                </div>
                <!-- 這裡要算加運費的總金額 -->
                <p class="cartCountTotal" id="cart3Total">合計金額：{{  parseInt(cartItems[0].shprice) + 120 }}</p>
            </div>

        </section>
    </main>
    <router-link to="/">
        <button type="button" class="subButton" id="goToHome" @click="clearshCartData">返回首頁</button>
    </router-link>
    <!-- <ProCardSwiper :displayData="allProducts" :title="'別人也逛過'" />
    <ProCardSwiper :displayData="allProducts" :title="'也許你會喜歡'" />
    <chatBox /> -->

</template>

<style lang="scss" scoped>
@import '@/assets/scss/page/cart.scss';
.shProductCard{
    display: flex;
    margin-left: 70px;
    img{
        width: 100px;
        margin-right: 30px;
    }
    .sh_proCardP{
        display: flex;
        align-items: center;

        .sh_pro_name{
            display: flex;
        }
        p{
            margin-right: 40px;
        }
    }
}

#circle2 {
    background-color: #C0AA88;
    border: none;
    color: $whiteWord;
}

#process2 {
    color: $blackWord;
}

#circle3 {
    background-color: #C0AA88;
    border: none;
    color: $whiteWord;
}

#process3 {
    color: $blackWord;
}

.orderList {
    width: 47%;
    display: flex;
    flex-direction: column;
    margin: 0 auto 60px;

    h1 {
        font-size: 20px;
        padding-bottom: 10px;
        margin-bottom: 15px;
    }

    .left {
        width: 50%;
        margin-left: 10px;
    }

    .right {
        width: 50%;
        display: flex;
        justify-content: center;
    }

    .listContent {
        display: flex;
        border-bottom: 1px solid #222;
        padding-bottom: 15px;

        // justify-content: space-between;
        .row {
            display: flex;
            align-items: center;
        }

        li {
            font-weight: 600;
            width: 70px;
            line-height: 30px;
            margin-right: 35px;
        }
    }

    .count {
        span {
            border: none;
        }
    }
}

.cartFunction {
    border-radius: 20px;
    padding: 50px 0 80px;
    width: 50%;
    margin: 0 auto;
    background-color: $grey_1;

    .productCard {
        padding-bottom: 20px;
        border-bottom: 1px solid #222;
    }
}
.subButton{
    display: flex;
    justify-content: center;
    font-size: $mh4;
    width: 35%;
    padding: 10px 0;
    margin: 15px auto 25px auto;
    border-style: none;
    border-radius: 16px;
    background-color: $grass_2;
    color: $whiteWord;
    cursor: pointer;
    margin-bottom: 90px;
}
</style>