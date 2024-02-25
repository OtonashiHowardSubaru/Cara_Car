<script>
import axios from 'axios'; //引入函式庫
import MainHeader from '@/components/MainHeader.vue';
import ProCardSwiper from '@/components/ProCardSwiper.vue';
// import NumberSelect from '@/components/btn/BtnNumberSelect.vue';
import DoubleCloud from "@/components/animation/DoubleCloud.vue";
import BlueBird from "@/components/animation/BlueBird.vue";
import GreenBird from "@/components/animation/GreenBird.vue";
import YellowBird from "@/components/animation/YellowBird.vue";

import userStore from '@/stores/user'

import apiInstance from '@/stores/auth'
import { nextTick } from 'vue'
import { mapState, mapActions } from "pinia";
// import cartStore from "@/stores/cart";

export default {
components:{
    MainHeader,DoubleCloud,BlueBird,GreenBird,YellowBird,ProCardSwiper,
    // NumberSelect,
},
data(){
    return {
        allProducts:[],
        shCartItems:[],
        cart:[],
        name:'',
        phone:'',
        city:'',
        area:'',
        road:'',
        remark:'',
        qtyValue:'',
        count: 1,
        expanded:false,
        memInfo:[],
        // userStoreData:userStore(),
        cityOption:[
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
        L: 40,
    }
},
created() {
    this.axiosGet();
    this.fetchData();
    
    // //從LocalStorage中讀取購物車資料
    const shCartData = JSON.parse(localStorage.getItem('cart'));
    console.log(JSON.stringify(shCartData));
    if (shCartData) {
        this.shCartItems = [shCartData]; // 將資料存儲在Vue的data屬性中
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
    fetchData(){
        // 定義頁碼
        const pageId = this.$route.params.sh_pro_id
    
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

    axiosGet(){
        axios.get(`${import.meta.env.VITE_LPHP_URL}/back/backMember.php`)
        .then(res=>{
            this.memInfo = res.data
            console.log(this.memInfo);
        })
        .catch(error=> {
            console.error("Error:", error);
        });
    },
    toggleCartContent(){
        this.expanded = !this.expanded;
    },
    //抓取圖片路徑
    getProductImgSrc(imgName){
        return new URL(`${import.meta.env.VITE_LIMG_BASE_URL}/product/sh_products/${imgName}`).href
    },
    saveCartData() {
        localStorage.setItem('cart', JSON.stringify(this.shCartItems));
    },
    
    // 購買人資料填寫
    buyDone(){
        if (!this.name || !this.phone || !this.city || !this.area || !this.road) {
        alert('請填寫完整資訊才能完成訂購');
        return; // 阻止 API 调用
        }
        const sh_pro_id = JSON.parse(localStorage.getItem('cart'))[0].id 
        const cartFromData = new FormData();
        cartFromData.append('sh_pro_id', sh_pro_id);
        cartFromData.append('sh_ord_reciever', this.name);
        cartFromData.append('sh_ord_phone', this.phone);
        cartFromData.append('sh_ord_city', this.city);
        cartFromData.append('sh_ord_district', this.area);
        cartFromData.append('sh_ord_address', this.road);
        cartFromData.append('remark', this.remark);
        cartFromData.append('member_id', 1);
        cartFromData.append('sh_ord_ship', 4);
        cartFromData.append('sh_ord_sum', 2000);
        cartFromData.append('sh_ord_total', 1000);
        cartFromData.append('ord_del_state', 1);


        apiInstance({
                method: 'post',
                url: `${import.meta.env.VITE_LPHP_URL}/front/shBuyDone.php`, // 改成我們的php
                headers: { "Content-Type": "multipart/form-data" }, // 跨域存取
                data: cartFromData
            }).then(res=>{
                console.log(res);
                if(res && res.data && res.data.msg === '完成訂購'){
                    alert("訂購完成")
                }else{
                    alert('訂購失敗')
                }
            }).catch(error=>{
                console.log(error);
            })

    },

    clearshCartData(){
        this.shCartItems = [];
        this.cart = [];
        localStorage.setItem('cart', JSON.stringify(this.shCartItems));
        console.log('清除購物車',this.cart);
    },
    subOrder(){
        this.buyDone();
    }
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
            
            <div class="cartProcess1">
                <div class="cartProcessCircle" id="circle1">1</div>
                <div class="cartLine"></div>
                <div class="cartProcessCircle" id="circle2">2</div>
                <div class="cartLine"></div>
                <div class="cartProcessCircle">3</div>
            </div>
            <div class="cartProcess2">
                <span class="cartProcessname" id="process1">你的訂單</span>
                <span class="cartProcessname" id="process2">填寫資料</span>
                <span class="cartProcessname">完成訂單</span>
            </div>
            <div class="cartContent">
                <span class="productName">商品名稱與單價</span>
                <span class="count">數量</span>
                <span>運費</span>
                <span class="countTotal">合計</span>
            </div>
            <!-- 這是二手商品內容 -->
            <div class="productCard" v-for="(item, index) in shCartItems" :key="index">
                <img :src=" getProductImgSrc(item.shimageUrl)" alt="ProductImage">
                    <div class="proCardP">
                        <p class="pro_name">{{ item.shname }}</p>
                        <p class="pro_price">${{ item.shprice }}</p>
                    </div>
                    <div class="number_select">
                        <input type="text" name="quantity" :value="item.shquantity" class="qty" ref="`qtyInput_${index}`" @keydown.enter.prevent v-bind:style="{margin: L + 'px'}" readonly>
                    </div>
                    <p>$120</p>
                    <p class="proCount">${{ item.shprice}}</p>
            </div>
            <div class="total"></div>
            <!-- 結束 -->
        </section>
        <!-- {{ this.userStoreData.userData.m_name }} -->
        <form class="cartReceiptInformation">
            <div class="receiptnformation">
                <span class="informationTitle">
                    填寫收件人資料
                    <span class="informationTitle2"><input type="checkbox" class="cartCheckbox">同會員資料</span>
                </span>
                <p class="cartInputTitle">收件人姓名</p>
                <input v-model="name" type="text" name="name" class="cartInput">
                <p class="cartInputTitle">連絡電話</p>
                <input v-model="phone" type="tel" minlength="10" maxlength="10" class="cartInput">
                <p class="cartInputTitle">收件地址</p>
                <div class="col66">
                    <select v-model="city" name="city" id="city" >
                        <option value="" >請選擇縣市</option>
                        <option v-for="item in cityOption" :key="item">{{ (item).c }}</option>
                    </select>
                    <input v-model="area" type="text" placeholder=" 中正區"  class="area">
                </div>
                <input v-model="road" type="text" placeholder="OO路O段O號O樓" class="cartInputRoad"> 
                <p class="cartInputTitle">備註欄</p>
                <textarea v-model="remark" name="remark" id="remark" cols="20" rows="5"></textarea>
                <span class="informationTitle">
                    填寫付款資訊
                </span>
                <p class="cartInputTitle">信用卡卡號</p>
                <div class="allCardNumber">
                    <input type="text" name="cardNumber" class="cardNumber" maxlength="4" placeholder="----">
                    <input type="text" name="cardNumber" class="cardNumber" maxlength="4" placeholder="----">
                    <input type="text" name="cardNumber" class="cardNumber" maxlength="4" placeholder="----">
                    <input type="text" name="cardNumber" class="cardNumber" maxlength="4" placeholder="----">
                </div>
                <p class="cartInputTitle">持卡人姓名</p>
                <input type="text" name="name" class="cartInput">
                <p class="cartInputTitle">帳單地址</p>
                <div class="col66">
                    <select name="city" id="city" >
                        <option value="">請選擇縣市</option>
                        <option v-for="item in cityOption" :key="item">{{ (item).c }}</option>
                    </select>
                    <input type="text" placeholder=" 中正區"  class="area">
                </div>
                <input type="text" placeholder="OO路O段O號O樓" class="cartInputRoad">
                <router-link to="/ShcartPart3">
                    <!-- <button type="submit" class="subButton" @click="subOrder">確認並送出訂單</button> -->
                    <input type="button" class="subButton" @click="subOrder" value="確認並送出訂單">
                </router-link>
                
                <router-link to="/secondHand">
                    <button type="submit" class="subButton2"  @click="clearshCartData">取消購買訂單</button>
                </router-link>
            </div>
        </form>
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
#circle2{
    background-color: #C0AA88;
    border:none;
    color: $whiteWord;
}

#process2{
    color: $blackWord;
}
.backButton{
    background-color: $grass_2;
    color: $whiteWord;
    position: absolute;
    left: 20%;
}
.subButton2{
    background-color: $whiteWord;
    color: $grass_2;
    border: 2px solid $grass_2;
    display: flex;
    justify-content: center;
    font-size: $mh4;
    width: 72%;
    padding: 10px 0;
    margin: 15px auto 25px auto;
    // border-style: none;
    border-radius: 16px;
    cursor: pointer;
}
</style>