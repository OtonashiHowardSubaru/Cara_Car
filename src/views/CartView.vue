<script>
import axios from 'axios'; //引入函式庫
import MainHeader from '@/components/MainHeader.vue';
// import TitleViewed from '@/components/TitleViewed.vue';
import ProCardSwiper1 from '@/components/ProCardSwiper1.vue';
import ProCardSwiper2 from '@/components/ProCardSwiper2.vue';
import NumberSelect from '@/components/btn/BtnNumberSelect.vue';

import product01 from '@/assets/imgs/product/product_1.png'
import product02 from '@/assets/imgs/product/product_2.png'
import product03 from '@/assets/imgs/product/product_3.png'
import product04 from '@/assets/imgs/product/product_4.png'
import product05 from '@/assets/imgs/product/product_5.png'
import product06 from '@/assets/imgs/product/product_6.png'
import product07 from '@/assets/imgs/product/product_7.png'
import product08 from '@/assets/imgs/product/product_8.png'
import product09 from '@/assets/imgs/product/product_9.png'

export default {
components:{
    MainHeader,NumberSelect,ProCardSwiper1,ProCardSwiper2
},
data(){
    return {
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
    }
},
methods: {
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
            <div class="cartContent">
                <span class="productName">商品名稱</span>
                <span class="count">數量</span>
                <span class="countTotal">合計</span>
            </div>
            <!-- 這裡是購物車內容 -->
            <div class="productCard" v-for="(item, index) in cartItems" :key="index">
                <img :src="(item.imageUrl)" alt="ProductImage">
                    <div class="proCardP">
                        <p class="pro_name">{{ item.name }}</p>
                        <p class="pro_price">${{ item.price }}</p>
                    </div>
                    <!-- @change="updateQuantity(index, $event)" -->
                    <NumberSelect
                    :qtyValue="item.quantity" @change="updateQuantity(index, $event)"
                    />
                    <p class="proCount">{{ item.total}}</p>
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
            <div class="cartContent">
                <span class="custom">客製化</span>
            </div>
            <form action="">
                <div class="customPlate">
                    <span class="customPlateNumber">車牌號碼</span>
                    <input type="text" maxlength="8" class="customNumber">
                </div>
            </form>
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
            <div class="cartMatter" @click="toggleCartContent">
                <span class="cartFunctionTitle">運費計算及注意事項</span>
                <i class="fa-solid fa-caret-down" :class="{ rotated: expanded }"></i>
                <div v-if="expanded" class="CartContent">
                    <p class="cartContentTitle">運費計算規則：</p>
                    <p>運費=基本運費+額外費用</p>
                    <p>基本運費：每個訂單都需要支付的固定費用，包括包裝、處理和基本運輸費用。</p>
                    <p>距離成本：根據運送的地理距離而定。</p>
                    <p class="cartContentTitle">運送注意事項：</p>
                    <p>法規遵守： 確保商品符合兒童玩具的相關安全標準和法規。</p>
                    <p>標籤和包裝： 提供完整的標籤和堅固的包裝，以確保運送過程中的安全。</p>
                    <p>保險和追踪： 提供商品運送保險，使用能追踪包裹的服務。</p>
                    <p>包裝堅固性： 使用堅固的包裝材料，減少損壞的風險。</p>
                    <p>運送時間： 提供預期的運送時間範圍，並提供即時更新。</p>
                    <p>客戶支援： 提供客戶支援服務，處理問題和查詢。</p>
                </div>
            </div>
            <div class="cartBtn">
                <router-link to="/ProductList">
                    <button class="continue">繼續購物</button>
                </router-link>
                <router-link to="/CartPart2">
                    <button class="pay">直接結帳</button>
                </router-link>
            </div>
        </section>
       
    </main>
    <ProCardSwiper1 :displayData="productList" />
    <ProCardSwiper2 :displayData="productList" />
</template>

<style lang="scss">
@import '@/assets/scss/page/cart.scss';
</style>