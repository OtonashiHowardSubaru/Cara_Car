<script>
import axios from 'axios'; //引入函式庫
import { mapState, mapActions } from 'pinia';
import MainHeader from '@/components/MainHeader.vue';
// import TitleViewed from '@/components/TitleViewed.vue';
import ProCardSwiper from '@/components/ProCardSwiper.vue';
import ordInfoStore from '@/stores/cartInfo'
import DoubleCloud from "@/components/animation/DoubleCloud.vue";
import BlueBird from "@/components/animation/BlueBird.vue";
import GreenBird from "@/components/animation/GreenBird.vue";
import YellowBird from "@/components/animation/YellowBird.vue";

export default {
components:{
    MainHeader,ProCardSwiper,DoubleCloud,BlueBird,GreenBird,YellowBird,
},
data(){
    return {
        qtyValue:'',
        count: 1,
        expanded:false,
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
        productList:[],
        ordInfoStoreData: ordInfoStore(),
    }
},
created() {
    // 從LocalStorage中讀取購物車資料
    const cartData = JSON.parse(localStorage.getItem('cart'));
    if (cartData) {
        this.cartItems = cartData; // 將資料存儲在Vue的data屬性中
    }; 

    this.userData.ord_id = localStorage.getItem("ordInfoStoreData") ? JSON.parse(localStorage.getItem("ordInfoStoreData")).id : "";
    this.userData.m_name = localStorage.getItem("ordInfoStoreData") ? JSON.parse(localStorage.getItem("ordInfoStoreData")).name : "";
    this.userData.m_phone = localStorage.getItem("ordInfoStoreData") ? JSON.parse(localStorage.getItem("ordInfoStoreData")).phone : "";
    this.userData.m_email = localStorage.getItem("ordInfoStoreData") ? JSON.parse(localStorage.getItem("ordInfoStoreData")).email : "";
    this.userData.m_city = localStorage.getItem("ordInfoStoreData") ? JSON.parse(localStorage.getItem("ordInfoStoreData")).city : "";
    this.userData.m_district = localStorage.getItem("ordInfoStoreData") ? JSON.parse(localStorage.getItem("ordInfoStoreData")).district : "";
    this.userData.m_address = localStorage.getItem("ordInfoStoreData") ? JSON.parse(localStorage.getItem("ordInfoStoreData")).address : "";
},
computed: {
    subtotal() {
    let total = 0;
    for (let item of this.cartItems) {
      total += item.price * item.quantity;
    }
    return total;
    },
    subFreight(){
        const baseSubFreight = 120;
        const totalQuantity = this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
        return baseSubFreight * totalQuantity;
    },
    total(){
        return this.subtotal + this.subFreight;
    },
    ...mapState(ordInfoStore, ['token', 'ordInfoData'])
},
methods: {
    handleQtyChange(index,increment) {
        let qtyValue = parseInt(this.cartItems[index].quantity);
        qtyValue = isNaN(qtyValue) || qtyValue < 1 ? 1 : qtyValue + increment;
        // this.$refs['qtyInput_' + index][0].value = qtyValue;
        this.updateQuantity(index, qtyValue)
    },
    toggleCartContent(){
        this.expanded = !this.expanded;
    },
    updateQuantity(index, newQuantity){
        // 更新购物车内商品数量
        if (newQuantity < 1) {
            // 如果数量小于1，则从购物车中删除该商品
            this.cartItems.splice(index, 1);
        } else {
            this.cartItems[index].quantity = newQuantity;
            //更新商品總金額
            this.updateTotalPrice(index);
        }
        this.saveCartData();
    },
    updateTotalPrice(index){
        const item = this.cartItems[index];
        item.total = item.price * item.quantity;
    },
    saveCartData() {
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
    },
    ...mapActions(ordInfoStore, ['checkLogin', 'updateToken', 'updateUserData']),
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
                            <input type="text" name="order" id="order" v-model="userData.m_name">
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
    <ProCardSwiper :displayData="productList" />
</template>

<style lang="scss">
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