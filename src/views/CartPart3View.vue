<script>
import axios from 'axios'; //引入函式庫
import { mapState, mapActions } from 'pinia';
import MainHeader from '@/components/MainHeader.vue';
import ProCardSwiper from '@/components/ProCardSwiper.vue';
import DoubleCloud from "@/components/animation/DoubleCloud.vue";
import BlueBird from "@/components/animation/BlueBird.vue";
import GreenBird from "@/components/animation/GreenBird.vue";
import YellowBird from "@/components/animation/YellowBird.vue";

export default {
components:{
    MainHeader,DoubleCloud,BlueBird,GreenBird,YellowBird,ProCardSwiper,
},
data(){
    return {
        allProducts:[],
        cartItems: [],
        city:[
            {c:'台北市'},
            {c:'新北市'},
            {c:'基隆市'},
            {c:'基隆縣'},
            {c:'桃園市'},
            {c:'新竹市'},
            {c:'新竹縣'},
            {c:'苗栗縣'},
            {c:'台中市'},
            {c:'彰化縣'},
            {c:'南投縣'},
            {c:'雲林縣'},
            {c:'嘉義縣'},
            {c:'台南市'},
            {c:'高雄市'},
            {c:'屏東縣'},
            {c:'台東縣'},
            {c:'花蓮縣'},
            {c:'宜蘭縣'},
            {c:'澎湖縣'},
        ],
    }
},
created() {
    this.fetchData();
    
},
computed: {
    
},
methods: {
    fetchData(){
        // 定義頁碼
        const pageId = this.$route.params.pro_id
    
        // 取得所有商品資料用做本頁資料以及swiper
        axios.get(`${import.meta.env.VITE_PHP_URL}/api/front/productlist.php?`)
        .then((response) => {
          // 成功取得資料後，將資料存入陣列
          // console.log(response.data)
        this.allProducts = response.data;
        this.thisProduct = response.data.find((item) =>{
            return item.pro_id == pageId
        })
        console.log(this.allProducts);
        })
        // console.log("========",this.thisProduct)
      // })
        .catch((error) => {
        console.error("Error fetching data:", error);
          this.errorMessage = "執行失敗: " + error.message; // 存儲錯誤訊息
        });

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
                <BlueBird class="cartBlueBird"/>
                <GreenBird class="cartGreenBird"/>
                <YellowBird class="cartYellowBird"/>
            </div>
            </div>
            <DoubleCloud class="cartCloud"/>
            
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

        <!-- <section class="cartFunction">
            <div class="cartPrice">
                <span class="cartFunctionTitle">小計</span>
                <span class="cartFunctionTitle">$3,000</span>
            </div>
            <div class="cartPrice">
                <span class="cartFunctionTitle">運費</span>
                <span class="cartFunctionTitle">運費計算參考</span>
            </div>
            <p class="cartCountTotal">合計金額：$3,500</p>
        </section> -->

        <div class="orderList">
            <div class="listTitle">
                <h1>訂單資訊</h1>
            </div>
            <div class="listContent">
                <div class="left">
                    <ul>
                        <div class="row">
                            <li class="order">訂單編號</li>
                            <span>1</span>
                        </div>
                        <div class="row">
                            <li class="order">訂單日期</li>
                            <span>2024.02.21</span>
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
                            <span>阿明</span>
                        </div>
                        <div class="row">
                            <li class="order">連絡電話</li>
                            <span>0923736473</span>
                        </div>
                        <div class="row">
                            <li class="order">配送地址</li>
                            <span>桃園市中壢區復興路46號8樓</span>
                        </div>
                        <div class="row">
                            <li class="order">備註訊息</li>
                            <span>無</span>
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
            <div class="productCard" v-for="(item, index) in cartItems" :key="index">
                <img :src="(item.imageUrl)" alt="ProductImage">
                    <div class="proCardP">
                        <p class="pro_name">{{ item.name }}</p>
                        <p class="pro_price">${{ item.price }}</p>
                    </div>
                    <!-- <NumberSelect
                    :qtyValue="item.quantity" @change="updateQuantity(index, $event)"
                    /> -->
                    <div class="number_select">
                        <input type="button" value="-" class="qtyMinus" @click="handleQtyChange(index,-1)">
                        <input type="text" name="quantity" :value="item.quantity" class="qty" ref="`qtyInput_${index}`" @keydown.enter.prevent>
                        <input type="button" value="+" class="qtyPlus" @click="handleQtyChange(index,1)">
                    </div>
                    <p class="proCount">{{ item.price*item.quantity}}</p>
            </div>
            <div class="cartPrice">
                <span class="cartFunctionTitle">小計</span>
                <!-- 這裡要算小計 -->
                <span class="cartFunctionTitle">${{subtotal}}</span>
            </div>
            <div class="cartPrice">
                <span class="cartFunctionTitle">運費</span>
                <span class="cartFunctionTitle">運費計算參考</span>
            </div>
            <!-- 這裡要算加運費的總金額 -->
            <p class="cartCountTotal">合計金額：${{total}}</p>
            
        </section>
    </main>
    <ProCardSwiper
    :displayData="allProducts"
    :title="'別人也逛過'"
    />
    <ProCardSwiper
    :displayData="allProducts"
    :title="'也許你會喜歡'"
    />
</template>

<style lang="scss" scoped>
@import '@/assets/scss/page/cart.scss';
// @import '@/assets/scss/page/cartPart2.scss';
// #cartProcessTop{
//     margin-top: 90px;
// }
#circle2{
    background-color: #C0AA88;
    border:none;
    color: $whiteWord;
}

#process2{
    color: $blackWord;
}
#circle3{
    background-color: #C0AA88;
    border:none;
    color: $whiteWord;
}

#process3{
    color: $blackWord;
}
.orderList{
    width: 47%;
    display: flex;
    flex-direction: column;
    margin: 0 auto 60px;
    h1{
        font-size: 20px;
        padding-bottom: 10px;
        margin-bottom: 15px;
    }
    .left{
        width: 50%;
        margin-left: 10px;
    }
    .right{
        width: 50%;
        display: flex;
        justify-content: center;
    }
    .listContent{
        display: flex;
        border-bottom: 1px solid #222;
        padding-bottom: 15px;
        // justify-content: space-between;
        .row{
            display: flex;
            align-items: center;
        }
        li{
            font-weight: 600;
            width: 70px;
            line-height: 30px;
            margin-right: 35px;
        }
    }
    .count{
        span{
            border: none;
        }
    }
}
.cartFunction{
    border-radius: 20px;
    padding: 50px 0 80px;
    width: 50%;
    margin: 0 auto;
    background-color: $grey_1;
    .productCard{
        padding-bottom: 20px;
        border-bottom: 1px solid #222;
    }
}
</style>