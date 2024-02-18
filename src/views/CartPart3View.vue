<script>
import axios from 'axios'; //引入函式庫
import MainHeader from '@/components/MainHeader.vue';
// import TitleViewed from '@/components/TitleViewed.vue';
import ProCardSwiper1 from '@/components/ProCardSwiper1.vue';
import ProCardSwiper2 from '@/components/ProCardSwiper2.vue';

import product01 from '@/assets/imgs/product/product_1.png';
import product02 from '@/assets/imgs/product/product_2.png';
import product03 from '@/assets/imgs/product/product_3.png';
import product04 from '@/assets/imgs/product/product_4.png';
import product05 from '@/assets/imgs/product/product_5.png';
import product06 from '@/assets/imgs/product/product_6.png';
import product07 from '@/assets/imgs/product/product_7.png';
import product08 from '@/assets/imgs/product/product_8.png';
import product09 from '@/assets/imgs/product/product_9.png';

import DoubleCloud from "@/components/animation/DoubleCloud.vue";
import BlueBird from "@/components/animation/BlueBird.vue";
import GreenBird from "@/components/animation/GreenBird.vue";
import YellowBird from "@/components/animation/YellowBird.vue";

export default {
components:{
    MainHeader,ProCardSwiper1,ProCardSwiper2,DoubleCloud,BlueBird,GreenBird,YellowBird,
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
        productList:[
        {
            prod_img1:product01,
            prod_name:"起始玩家",
            prod_price:"5000",
            linkwhere:"/Product"
        },
        {
            prod_img1:product02,
            prod_name:"賓士少爺",
            prod_price:"10000",
            linkwhere:"/Product"
        },
        {
            prod_img1:product03,
            prod_name:"賓士少爺二代",
            prod_price:"12000",
            linkwhere:"/Product"
        },
        {
            prod_img1:product04,
            prod_name:"敞篷輕旅",
            prod_price:"12000",
            linkwhere:"/Product"
        },
        {
            prod_img1:product05,
            prod_name:"野貓戰機",
            prod_price:"8000",
            linkwhere:"/Product"
        },
        {
            prod_img1:product06,
            prod_name:"敞篷輕旅二代",
            prod_price:"14000",
            linkwhere:"/Product"
        },
        {
            prod_img1:product07,
            prod_name:"赤色風暴",
            prod_price:"8000",
            linkwhere:"/Product"
        },
        {
            prod_img1:product08,
            prod_name:"英倫經典",
            prod_price:"10000",
            linkwhere:"/Product"
        },
        {
            prod_img1:product09,
            prod_name:"F1一代",
            prod_price:"18000",
            linkwhere:"/Product"
        },
        ],
    }
},
created() {
    // 從LocalStorage中讀取購物車資料
    const cartData = JSON.parse(localStorage.getItem('cart'));
    if (cartData) {
        this.cartItems = cartData; // 將資料存儲在Vue的data屬性中
    }; 
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

        <section class="cartFunction">
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
    <ProCardSwiper1 :displayData="productList" />
    <ProCardSwiper2 :displayData="productList" />
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
</style>