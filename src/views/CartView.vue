<script>
import axios from 'axios'; //引入函式庫
import MainHeader from '@/components/MainHeader.vue';
import ProCardSwiper from '@/components/ProCardSwiper.vue';
// import NumberSelect from '@/components/btn/BtnNumberSelect.vue';
import DoubleCloud from "@/components/animation/DoubleCloud.vue";
import BlueBird from "@/components/animation/BlueBird.vue";
import GreenBird from "@/components/animation/GreenBird.vue";
import YellowBird from "@/components/animation/YellowBird.vue";

import { mapState, mapActions } from "pinia";
import cartStore from "@/stores/cart";

export default {
components:{
    MainHeader,DoubleCloud,BlueBird,GreenBird,YellowBird,ProCardSwiper,
    // NumberSelect,
},
data(){
    return {
        allProducts:[],
        // cart:'',
        qtyValue: 0,
        // count: 1,
        expanded:false,
        cartStore: cartStore(),
        // city:[
        //     {c:'台北市'},
        //     {c:'新北市'},
        //     {c:'基隆市'},
        //     {c:'基隆縣'},
        //     {c:'桃園市'},
        //     {c:'新竹市'},
        //     {c:'新竹縣'},
        //     {c:'苗栗縣'},
        //     {c:'台中市'},
        //     {c:'彰化縣'},
        //     {c:'南投縣'},
        //     {c:'雲林縣'},
        //     {c:'嘉義縣'},
        //     {c:'台南市'},
        //     {c:'高雄市'},
        //     {c:'屏東縣'},
        //     {c:'台東縣'},
        //     {c:'花蓮縣'},
        //     {c:'宜蘭縣'},
        //     {c:'澎湖縣'},
        // ],
    }
},
created() {
    this.getLocalCartData();
    this.fetchData();

   //從LocalStorage中讀取購物車資料
    // const localCartData = JSON.parse(localStorage.getItem('cartItems'));
    // if (localCartData) {
    //     this.cartItems = localCartData; // 將資料存儲在Vue的data屬性中
    // }; 

},
computed: {
    ...mapState(cartStore,[
        "cartItems",
        "subtotal",
        "subFreight",
        "total",
    ]),

    // subtotal() {
    // let total = 0;
    // for (let item of this.cartItems) {
    //   total += item.price * item.quantity;
    // }
    // return total;
    // },
    // subFreight(){
    //     const baseSubFreight = 120;
    //     const totalQuantity = this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    //     return baseSubFreight * totalQuantity;
    // },
    // total(){
    //     return this.subtotal + this.subFreight;
    // },
},
methods: {
    fetchData(){
        // 定義頁碼
        const pageId = this.$route.params.pro_id
    
        // 取得所有商品資料用做本頁資料以及swiper
        axios.get(`${import.meta.env.VITE_LPHP_URL}/front/productlist.php?`)
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

    // handleQtyChange(index,increment) {
    //     let qtyValue = parseInt(this.cartItems[index].quantity);
    //     qtyValue = isNaN(qtyValue) || qtyValue < 1 ? 1 : qtyValue + increment;
    //     // this.$refs['qtyInput_' + index][0].value = qtyValue;
    //     this.updateQuantity(index, qtyValue)
    // },
    //抓取圖片路徑
    // getProductImgSrc(imgName){
    // return new URL(`${import.meta.env.VITE_LIMG_BASE_URL}/new_products/${imgName}`).href
    // },
    toggleCartContent(){
        this.expanded = !this.expanded;
    },
    updateQuantity(index, newQuantity){
        // 更新購物車内商品數量
        if (newQuantity < 1) {
            // 如果數量小於1，則從購物車中删除該商品
            this.cartItems.splice(index, 1);
        } else {
            this.cartItems[index].quantity = newQuantity;
            //更新商品總金額
            this.updateTotalPrice(index);
        }
        this.saveCartData();
    },
    // updateTotalPrice(index){
    //     const item = this.cartItems[index];
    //     item.total = item.price * item.quantity;
    // },
    // saveCartData() {
    //     localStorage.setItem('cart', JSON.stringify(this.shCartItems));
    // },
    ...mapActions(cartStore, [
        "reduceFromCart",
        "increaseFromCart",
        "getLocalCartData",
        "addToCart",
        "getProductImgSrc",
    ]),

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
            
            <div class="notInCart" v-show="cartItems.length == 0 ">
                <img src="../assets/imgs/draw/cara_sign.png" alt="">

                <h2 class="notInCartP">你尚未購買商品</h2>

            </div>

            <div class="cartProcess1" v-show="cartItems.length !=0 ">
                <div class="cartProcessCircle" id="circle1">1</div>
                <div class="cartLine"></div>
                <div class="cartProcessCircle">2</div>
                <div class="cartLine"></div>
                <div class="cartProcessCircle">3</div>
            </div>
            <div class="cartProcess2" v-show="cartItems.length !=0 ">
                <span class="cartProcessname" id="process1">你的訂單</span>
                <span class="cartProcessname">填寫資料</span>
                <span class="cartProcessname">完成訂單</span>
            </div>
            <div class="cartContent" v-show="cartItems.length !=0 ">
                <span class="productName">商品名稱與單價</span>
                <span class="count">數量</span>
                <span class="countTotal">合計</span>
            </div>
            <!-- 這裡是商品內容 -->
            <div class="productCard" v-for="(item, index) in cartItems" :key="index">
                <img :src=" getProductImgSrc(item.imageUrl)" alt="ProductImage">
                    <div class="proCardP">
                        <p class="pro_name">{{ item.name }}</p>
                        <p class="pro_price">${{ item.price }}</p>
                    </div>
                    <div class="number_select">
                        <input type="button" value="-" class="qtyMinus" @click="reduceFromCart(item)">
                        <input type="text" name="quantity" :value="item.quantity" class="qty" ref="`qtyInput_${index}`" @keydown.enter.prevent>
                        <input type="button" value="+" class="qtyPlus" @click="increaseFromCart(item)">
                    </div>
                    <p class="proCount">{{ item.price*item.quantity}}</p>
            </div>
            <!-- 結束 -->
            
            <!-- 這是客製化車牌內容 -->
            <div class="cartContent" v-show="cartItems.length !=0">
                <span class="custom">客製化</span>
            </div>
            <!-- <form action="">
                <div class="customPlate">
                    <span class="customPlateNumber">車牌號碼</span>
                    <input type="text" maxlength="8" class="customNumber">
                </div>
            </form> -->
            <!-- 結束 -->
        </section>
        <section class="cartFunction" v-show="cartItems.length !=0">
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
            <!-- <div class="cartBtn">
                <router-link to="/ProductList">
                    <button class="continue">繼續購物</button>
                </router-link>
                <router-link to="/CartPart2">
                    <button class="pay">直接結帳</button>
                </router-link>
            </div>
        </section> -->
    
            <div class="cartButton" v-show="cartItems.length !=0">
                <router-link to="/ProductList">
                    <button type="button" id="goToProduct">繼續購買</button>
                </router-link>
                <router-link to="/CartPart2">
                    <button type="button" id="goToCart">前往結帳</button>
                </router-link>
            </div>
        </section>
        <!-- <form class="cartReceiptInformation">
            <div class="receiptnformation">
                <span class="informationTitle">
                    填寫收件人資料
                    <span class="informationTitle2"><input type="checkbox" class="cartCheckbox">同會員資料</span>
                </span>
                <p class="cartInputTitle">收件人姓名</p>
                <input type="text" name="name" class="cartInput">
                <p class="cartInputTitle">連絡電話</p>
                <input type="tel" minlength="10" maxlength="10" class="cartInput">
                <p class="cartInputTitle">收件地址</p>
                <div class="col66">
                    <select name="city" id="city" >
                        <option value="">請選擇縣市</option>
                        <option v-for="item in city" :key="item">{{ (item).c }}</option>
                    </select>
                    <input type="text" placeholder=" 中正區"  class="area">
                </div>
                <input type="text" placeholder="OO路O段O號O樓" class="cartInputRoad"> 
                <p class="cartInputTitle">備註欄</p>
                <textarea name="remark" id="remark" cols="20" rows="5"></textarea>
                <span class="informationTitle">
                    填寫付款資訊
                </span>
                <p class="cartInputTitle">信用卡卡號</p>
                <div class="allCardNumber">
                    <input type="text" name="cardNumber" class="cardNumber">
                    <input type="text" name="cardNumber" class="cardNumber">
                    <input type="text" name="cardNumber" class="cardNumber">
                    <input type="text" name="cardNumber" class="cardNumber">
                </div>
                <p class="cartInputTitle">持卡人姓名</p>
                <input type="text" name="name" class="cartInput">
                <p class="cartInputTitle">帳單地址</p>
                <div class="col66">
                    <select name="city" id="city" >
                        <option value="">請選擇縣市</option>
                        <option v-for="item in city" :key="item">{{ (item).c }}</option>
                    </select>
                    <input type="text" placeholder=" 中正區"  class="area">
                </div>
                <input type="text" placeholder="OO路O段O號O樓" class="cartInputRoad">
                <button type="submit" class="subButton">確認並送出訂單</button>
            </div>
        </form> -->
        
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
</style>