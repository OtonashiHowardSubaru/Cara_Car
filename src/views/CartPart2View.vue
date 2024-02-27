<script>
import axios from 'axios'; //引入函式庫
// import { router } from '@/router'; 
import MainHeader from '@/components/MainHeader.vue';
import ProCardSwiper from '@/components/ProCardSwiper.vue';
// import NumberSelect from '@/components/btn/BtnNumberSelect.vue';
import DoubleCloud from "@/components/animation/DoubleCloud.vue";
import BlueBird from "@/components/animation/BlueBird.vue";
import GreenBird from "@/components/animation/GreenBird.vue";
import YellowBird from "@/components/animation/YellowBird.vue";
import Swal from 'sweetalert2';

import apiInstance from '@/stores/auth'
import { mapState, mapActions } from "pinia";
import cartStore from "@/stores/cart";

export default {
    components: {
        MainHeader, DoubleCloud, BlueBird, GreenBird, YellowBird, ProCardSwiper,
        // NumberSelect,
        Swal,
    },
    data() {
        return {
            allProducts: [],
            // cartItems:[],
            name: '',
            phone: '',
            city: '',
            area: '',
            road: '',
            remark: '',
            qtyValue: '',
            count: 1,
            expanded: false,
            memInfo: [],
            cartStore: cartStore(),
            cityOption: [
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
        this.axiosGet();
        this.fetchData();
        this.getLocalCartData();
        // console.log(cartItems);
        //要抓取localStorage裡面cartItems的JSON裡面第一個物件的陣列，取不出來

        // 從LocalStorage中讀取購物車資料
        // const cartData = JSON.parse(localStorage.getItem('cart'));
        // if (cartData) {
        //     this.cartItems = cartData; // 將資料存儲在Vue的data屬性中
        // }; 
    },
    computed: {
        ...mapState(cartStore, [
            "cartItems",
            "subtotal",
            "subFreight",
            "total",
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

        },

        axiosGet() {
            axios.get(`${import.meta.env.VITE_PHP_URL}/back/backMember.php`)
                .then(res => {
                    this.memInfo = res.data
                    console.log(this.memInfo);
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        },

        updateQuantity(index, newQuantity) {
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
        updateTotalPrice(index) {
            const item = this.cartItems[index];
            item.total = item.price * item.quantity;
        },
        saveCartData() {
            localStorage.setItem('cart', JSON.stringify(this.cartItems));
        },
        ...mapActions(cartStore, [
            "reduceFromCart",
            "increaseFromCart",
            "getLocalCartData",
            "addToCart",
            "getProductImgSrc",
        ]),
        //抓取商品資料
        getProduct() {
            const cartBuyData = new FormData();

            let cartArray = []
            if (this.cartItems.length > 0) {
                for (let i = 0; i < this.cartItems.length; i++) {
                    const item = this.cartItems[i]
                    const cart = {
                        'pro_id': item.id,
                        'pro_name': item.name,
                        'pro_price': item.price,
                        'ord_qty': item.quantity,
                        'promo_ratio': 1,
                        'pro_sale': item.price * 1,
                        'ord_sum': item.price * 1 * item.quantity
                    }
                    cartArray.push(cart)
                }
            }
            console.log(cartArray)

            const cartArrayJSON = JSON.stringify(cartArray);
            cartBuyData.append('cartArray', cartArrayJSON);


            // console.log(cartStore.cartItems);
            // cartBuyData.append('pro_name',cartStore.cartItems[0].name);

            apiInstance({
                method: 'post',
                url: `${import.meta.env.VITE_PHP_URL}/front/getProduct.php`, // 改成我們的php
                headers: { "Content-Type": "multipart/form-data" }, // 跨域存取
                data: cartBuyData
            }).then(res => {
                console.log(cartBuyData);
                if (res && res.data && res.data.msg === '已抓取商品資訊') {
                    alert("成功");
                    // this.$router.push('/CartPart3');
                } else {

                    alert('失敗')
                }
            }).catch(error => {
                console.log(error);
            })

        },
        //購買人資料填寫
        buyDone() {
            if (!this.name || !this.phone || !this.city || !this.area || !this.road) {
                Swal.fire({
                    icon: "error",
                    text: '請填寫完整資訊才能完成訂購',
                });
                // alert('請填寫完整資訊才能完成訂購');
                return; // 阻止 API 调用
            }
            const subtotal = this.subtotal;
            const subFreight = this.subFreight;
            const total = this.total;

            const cartFromData = new FormData();
            cartFromData.append('ord_reciever', this.name);
            cartFromData.append('ord_phone', this.phone);
            cartFromData.append('ord_city', this.city);
            cartFromData.append('ord_district', this.area);
            cartFromData.append('ord_address', this.road);
            cartFromData.append('remark', this.remark);
            cartFromData.append('member_id', 18);
            cartFromData.append('ord_ship', subFreight);
            cartFromData.append('ord_sum', subtotal);
            cartFromData.append('ord_total', total);
            cartFromData.append('ord_del_state', 0);



            apiInstance({
                method: 'post',
                url: `${import.meta.env.VITE_PHP_URL}/front/buyDone.php`, // 改成我們的php
                headers: { "Content-Type": "multipart/form-data" }, // 跨域存取
                data: cartFromData
            }).then(res => {
                console.log(cartFromData);
                if (res && res.data && res.data.msg === '完成訂購') {
                    alert("訂購完成");
                    this.$router.push('/CartPart3');
                } else {
                    alert('訂購失敗')
                }
            }).catch(error => {
                console.log(error);
            })

        },
        subOrder() {
            this.buyDone();
            this.getProduct();

            //將總金額傳遞到後端
            // const subtotal = this.subtotal;
            // axios.post('後端接口URL',{subtotal: subtotal})
            // .then(response => {
            //     console.log(response);
            // })
            // .catch(error =>{
            //     console.error('Error:', error);
            // });
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
                    <BlueBird class="cartBlueBird" />
                    <GreenBird class="cartGreenBird" />
                    <YellowBird class="cartYellowBird" />
                </div>
            </div>
            <DoubleCloud class="cartCloud" />

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

        </section>
        <!-- {{ cartItems }} -->
        <!-- {{ subFreight }} -->
        <!-- {{ subtotal}} -->
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
                    <select v-model="city" name="city" id="city">
                        <option value="">請選擇縣市</option>
                        <option v-for="item in cityOption" :key="item">{{ (item).c }}</option>
                    </select>
                    <input v-model="area" type="text" placeholder=" 中正區" class="area">
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
                    <select name="city" id="city">
                        <option value="">請選擇縣市</option>
                        <option v-for="item in cityOption" :key="item">{{ (item).c }}</option>
                    </select>
                    <input type="text" placeholder=" 中正區" class="area">
                </div>
                <input type="text" placeholder="OO路O段O號O樓" class="cartInputRoad">
                <!-- <router-link to="/cartPart3"> -->
                <input type="button" class="subButton" @click="subOrder" value="確認並送出訂單">
                <!-- </router-link> -->
            </div>
        </form>
        <router-link to="/cart">
            <button class="backButton">
                回上一頁修改
            </button>
        </router-link>
    </main>
    <ProCardSwiper :displayData="allProducts" :title="'別人也逛過'" />
    <ProCardSwiper :displayData="allProducts" :title="'也許你會喜歡'" />
</template>

<style lang="scss" scoped>
@import '@/assets/scss/page/cart.scss';

// @import '@/assets/scss/page/cartPart2.scss';
#circle2 {
    background-color: #C0AA88;
    border: none;
    color: $whiteWord;
}

#process2 {
    color: $blackWord;
}

.backButton {
    background-color: $grass_2;
    color: $whiteWord;
    position: absolute;
    left: 20%;
}
</style>