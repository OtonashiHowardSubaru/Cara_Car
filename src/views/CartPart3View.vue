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

export default {
components:{
    MainHeader,ProCardSwiper1,ProCardSwiper2,
},
data(){
    return {
        count: 1,
        expanded:false,
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

},
methods: {
    minus(){
        if(this.count>1){
            this.count--;
        }
    },
    add(){
        this.count++;
    },
    updataCount(){

    },
    toggleCartContent(){
        this.expanded = !this.expanded;
    }
},
}
</script>

<template>
    <MainHeader />
    <main>
        <section class="cart">
            <div class="cartTitle">
                <h1>購物車
                </h1>
            </div>
            <div class="progress">
                <div class="part1">
                    <span>1</span>
                    <p>您的訂單</p>
                </div>
                <div class="hr"></div>
                <div class="part2">
                    <span>2</span>
                    <p>填寫資料</p>
                </div>
                <div class="hr"></div>
                <div class="part3">
                    <span>3</span>
                    <p>完成訂單</p>
                </div>
            </div>
            <div class="orderDetail">
                <div class="title">
                    <h1>訂單資訊</h1>
                </div>
                <div class="list">
                    <span>訂單編號</span>
                    <span>訂單日期</span>
                    <span>付款方式</span>
                    <span>訂單狀態</span>
                    <span>收件人</span>
                    <span>連絡電話</span>
                    <span>配送地址</span>
                    <span>備註訊息</span>
                </div>

            </div>
            <!-- <div class="productCard">
                    <img src="../assets/imgs/cart/cart_product_img.png" alt="ProductImage">
                    <div class="proCardP">
                        <p class="pro_name">閃電漂移車</p>
                        <p class="pro_price">$2500</p>
                    </div>
                    <div class="countButton">
                        <button @click="minus">-</button>
                        <input type="number" v-model="count" @input="updataCount">
                        <button @click="add">+</button>
                    </div>
                    <p class="proCount">$3,000</p>
            </div> -->
            <!-- 結束 -->

        </section>
        <section class="cartFunction">
            <div class="cartPrice">
                <span class="cartFunctionTitle">小計</span>
                <span class="cartFunctionTitle">$3,000</span>
            </div>
            <div class="cartPrice">
                <span class="cartFunctionTitle">運費</span>
                <span class="cartFunctionTitle">運費計算參考</span>
            </div>
            <p class="cartCountTotal">合計金額：$3,500</p>
        </section>
        
    </main>
    <ProCardSwiper1 :displayData="productList" />
    <ProCardSwiper2 :displayData="productList" />
</template>

<style lang="scss">
@import '@/assets/scss/page/cart.scss';
@import '@/assets/scss/page/cartPart2.scss';
</style>