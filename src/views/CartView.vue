<script>
import axios from 'axios'; //引入函式庫
import MainHeader from '@/components/Header.vue';
export default {
components:{
    MainHeader,
},
data(){
    return {
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

},
methods: {

},
}
</script>

<template>
    <MainHeader />
    <main>
        <section class="cart">
            <div class="cartTitleGroup">
                <img src="../assets/imgs/cart/cart_title.svg" alt="" class="cartTitle">
            </div>

            <div class="cartContent">
                <span class="productName">商品名稱</span>
                <span class="count">數量</span>
                <span class="countTotal">合計</span>
            </div>

            <div class="customContent">
                <span class="custom">客製化</span>
            </div>

        </section>
        <section class="cartFunction">
            <div class="cartPrice">
                <span class="cartFunctionTitle">小計</span>
                <span class="cartFunctionTitle">$10,000</span>
            </div>
            <div class="cartPrice">
                <span class="cartFunctionTitle">運費</span>
                <span class="cartFunctionTitle">運費計算參考</span>
            </div>
            <p class="cartCountTotal">合計金額：$10,500</p>
            <div class="cartMatter">
                <span class="cartFunctionTitle">運費計算及注意事項</span>
                <i class="fa-solid fa-caret-down"></i>
            </div>
        </section>
        <section class="cartReceiptInformation">
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
                        <option v-for="item in city">{{ (item).c }}</option>
                    </select>
                    <input type="text" placeholder=" 中正區"  class="area">
                </div>
                <input type="text" class="cartInput"> 
                <p class="cartInputTitle">備註欄</p>
                <input type="text" size="20" class="remark">
                <button type="submit" class="subButton">確認並送出訂單</button>
            </div>
        </section>
    </main>

</template>

<style lang="scss">
@import '@/assets/scss/page/cart.scss';
</style>