<script>
import axios from 'axios'; //引入函式庫
import { mapState, mapActions } from 'pinia';
import cartStore from "@/stores/cart";
import MainHeader from '@/components/MainHeader.vue';
import ProCardSwiper from '@/components/ProCardSwiper.vue';
import DoubleCloud from "@/components/animation/DoubleCloud.vue";
import BlueBird from "@/components/animation/BlueBird.vue";
import GreenBird from "@/components/animation/GreenBird.vue";
import YellowBird from "@/components/animation/YellowBird.vue";
import chatBox from '@/components/btn/chatBox.vue'


export default {
    components: {
        MainHeader, DoubleCloud, BlueBird, GreenBird, YellowBird, ProCardSwiper,chatBox,
    },
    data() {
        return {
            orderList: [],
            allProducts: [],
        }
    },
    created() {
        this.fetchData();
        this.orderList = JSON.parse(localStorage.getItem('orderList')) || [];

    },
    computed: {
        ...mapState(cartStore, [
            "cartItems",
        ]),
    },
    methods: {
        fetchData() {
            // 定義頁碼
            const pageId = this.$route.params.pro_id

            // 取得所有商品資料用做本頁資料以及swiper
            axios.get(`${import.meta.env.VITE_PHP_URL}/front/productlist.php?`)
                .then((response) => {
                    // 成功取得資料後，將資料存入陣列
                    // console.log(response.data)
                    this.allProducts = response.data;
                    this.thisProduct = response.data.find((item) => {
                        return item.pro_id == pageId
                    })
                    // console.log(this.allProducts);
                })
                // console.log("========",this.thisProduct)
                // })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                    this.errorMessage = "執行失敗: " + error.message; // 存儲錯誤訊息
                });
                

        // const pageId2 = this.$route.params.pro_id
        //取得該筆訂單資訊
        axios.get(`${import.meta.env.VITE_PHP_URL}/back/backOrder.php?`)
        .then((response) => {
          // 成功取得資料後，將資料存入陣列
          // console.log(response.data)
        this.orderList = response.data;
        this.thisOrderList = response.data.find((item) =>{
            return item.pro_id == pageId
        })
        // console.log(this.orderList);
        // console.log(this.thisOrderList);
        })
        // console.log("========",this.thisProduct)
        // })
        .catch((error) => {
        console.error("Error fetching data:", error);
          this.errorMessage = "執行失敗: " + error.message; // 存儲錯誤訊息
        });
    },
    ...mapActions(cartStore, [
            "getLocalCartData",
            "getProductImgSrc",
            "clearCartData",
        ]),
    // clearCartData() {
    //         localStorage.removeItem('cartItems');
    //         console.log('清除購物車', this.cartItems);
    // },
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

        <div class="orderList" v-if="orderList.length > 0">
            <div class="listTitle">
                <h1>訂單資訊</h1>
            </div>
            <div class="listContent">
                <div class="left">
                    <ul>
                        <div class="row">
                            <li class="order">訂單編號</li>
                            <span>{{ orderList[orderList.length - 1].ord_id }}</span>
                        </div>
                        <div class="row">
                            <li class="order">訂單日期</li>
                            <span>{{ orderList[orderList.length - 1].ord_date }}</span>
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
                            <span>{{ orderList[orderList.length - 1].ord_reciever }}</span>
                        </div>
                        <div class="row">
                            <li class="order">連絡電話</li>
                            <span>{{ orderList[orderList.length - 1].ord_phone }}</span>
                        </div>
                        <div class="row">
                            <li class="order">配送地址</li>
                            <span>{{ orderList[orderList.length - 1].ord_city }}</span>
                            <span>{{ orderList[orderList.length - 1].ord_district }}</span>
                            <span>{{ orderList[orderList.length - 1].ord_address }}</span>
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

        <section class="cartFunction" >
            <!-- 這裡是商品內容 -->
            <!-- {{ cartItems }} -->
            <div class="productCard" v-for="(pro, index) in cartItems" :key="index">
                <img :src="getProductImgSrc(pro.imageUrl)" alt="ProductImage">
                <div class="proCardP">
                    <p class="pro_name">{{ pro.name }}</p>
                    <p class="pro_price">${{ pro.price }}</p>
                </div>
                
                <input type="text" name="quantity" :value="pro.quantity" class="qty"
                    ref="`qtyInput_${index}`" @keydown.enter.prevent>
                
                <p class="proCount">${{ pro.price * pro.quantity }}</p>
            </div>
            <div v-if="orderList.length > 0">
                <div class="cartPrice">
                    <span class="cartFunctionTitle">小計</span>
                    <!-- 這裡要算小計 -->
                    <span class="cartFunctionTitle">${{ orderList[orderList.length - 1].ord_sum }}</span>
                </div>
                <div class="cartPrice">
                    <span class="cartFunctionTitle">運費</span>
                    <span class="cartFunctionTitle">${{ orderList[orderList.length - 1].ord_ship }}</span>
                </div>
                <!-- 這裡要算加運費的總金額 -->
                <p class="cartCountTotal" id="cart3Total">合計金額：${{ orderList[orderList.length - 1].ord_total }}</p>
            </div>

        </section>
        <router-link to="/">
            <button type="button" class="subButton" id="goToHome" @click="clearCartData">返回首頁</button>
        </router-link>
    </main>
    <ProCardSwiper :displayData="allProducts" :title="'別人也逛過'" />
    <ProCardSwiper :displayData="allProducts" :title="'也許你會喜歡'" />
    <chatBox />

</template>

<style lang="scss" scoped>
@import '@/assets/scss/page/cart.scss';

// @import '@/assets/scss/page/cartPart2.scss';
// #cartProcessTop{
//     margin-top: 90px;
// }
#goToHome{
    width:35%;
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
        width: 80%;
        display: flex;
        flex-direction: column;
        margin: 0 auto 60px;
    
        h1 {
            font-size: 18px;
            padding-bottom: 8px;
            margin-bottom: 10px;
        }
    
        .left {
            width: 45%;
            margin-left: 10px;
        }
    
        .right {
            width: 45%;
            display: flex;
            justify-content: center;
        }
    
        .listContent {
            display: flex;
            border-bottom: 1px solid #222;
            padding-bottom: 15px;
            // border:1px solid red;
            // justify-content: space-between;
            .row {
                display: flex;
                align-items: center;
                width: 100%;
                // margin: 2px 0px;
                // border:1px solid red;
            }
    
            li {
                font-weight: 600;
                width: 50%;
                line-height: 30px;
                margin-right: 28px;
                // border:1px solid red;
            }
            span{
                width: 60%;
                // border:1px solid red;
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
        width: 75%;
        margin: 0 auto;
        background-color: $grey_1;
    
        .productCard {
            padding-bottom: 20px;
            border-bottom: 1px solid #222;
        }
    }

@media (min-width: 768px) {
    .orderList {
        width: 50%;
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
            // border:1px solid red;
            // justify-content: space-between;
            .row {
                display: flex;
                align-items: center;
                width: 100%;
                margin: 2px 0px;
            }
    
            li {
                font-weight: 600;
                width: 40%;
                line-height: 30px;
                margin-right: 30px;
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
    #cart3Total{
        margin-right: 3%;
    }
    
}

</style>