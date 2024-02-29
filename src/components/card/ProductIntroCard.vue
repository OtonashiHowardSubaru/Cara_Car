<script>
export default {
    props: [
        'thisProductInfo',
    ],
    data() {
        return {
            activeTab: 0,
        }
    },
    methods: {
        changeTab(tabIndex) {
            // 頁籤跳轉
            this.activeTab = tabIndex;
        },
        // 轉換pro_info到比較合適的版型
        replaceLineBreaks(text) {
            // console.log(text);
            return text.replace(/\r\n/g, "<br>");
        },
    },
    computed:{
    },
    mounted() {
    }
}

</script>
<template>
    <div class="introduction">
        <div id="searchItem" class="searchItem">
            <ul>
                <li :class="{ 'onSearch': activeTab === 0 }" @click="changeTab(0)">商品介紹</li>
                <li :class="{ 'onSearch': activeTab === 1 }" @click="changeTab(1)">購物須知</li>
                <li :class="{ 'onSearch': activeTab === 2 }" @click="changeTab(2)">常見問題</li>
            </ul>
        </div>
        <div class="detail">
            <div id="searchCont" class="searchCont">
                <ul>
                    <li v-show="activeTab === 0">
                        <div>
                            <div class="form">
                                <h2>{{ thisProductInfo.pro_name }}</h2>
                                <div 
                                class="productInfoBox"
                                >
                                    {{thisProductInfo.pro_info}}
                                </div>

                            </div>
                        </div>
                    </li> <!-- no.1 -->

                    <li v-show="activeTab === 1">
                        <div class="form">
                            <h2>購物須知</h2>
                            <div class="detail_content">
                                <div class="articlel">
                                    <ul>
                                        <li>
                                            <span>商品資訊 :</span>
                                            <p>我們提供詳細的商品資訊，包括尺寸、顏色、材質等。商品圖片是實物拍攝，以確保您能夠充分了解商品的外觀。</p>
                                        </li>
                                        <li>
                                            <span>價格與折扣：</span>
                                            <p>所有商品價格均已包含相關稅金。運費將在結帳時顯示。
                                                如果有促銷或折扣活動，請在結帳前輸入優惠碼以享受相應優惠。
                                            </p>
                                        </li>
                                        <li>
                                            <span>庫存與供應鏈：</span>
                                            <p>我們定期更新庫存狀態，確保您看到的商品均為現貨。發貨時間可能會受到節假日等因素的影響。
                                                預計發貨時間僅供參考，實際發貨時間可能因不可抗力因素而有所變動。
                                            </p>
                                        </li>
                                        <li>
                                            <span>購物車與結帳：</span>
                                            <p>購物車內的商品數量和款式可在結帳前進行修改。請仔細檢查您的訂單內容。
                                                請確保在結帳前填寫正確的收件人地址和聯絡方式，以確保順利收到商品。
                                            </p>
                                        </li>
                                        <li>
                                            <span>支付選項:：</span>
                                            <p>我們接受的支付方式包括信用卡、PayPal等。請確保您的支付資訊安全。
                                            </p>
                                        </li>
                                        <li>
                                            <span>退換貨政策：</span>
                                            <p>如需辦理退換貨，請在收到商品後的指定期限內聯繫客戶服務，並提供相關訂單信息。
                                                請注意，某些商品可能不支持退換貨服務，請查看商品頁面的退換貨條件。
                                            </p>
                                        </li>

                                    </ul>
                                </div>
                                <div class="articler">
                                    <ul>
                                        <li>
                                            <span>客戶服務：</span>
                                            <p>若您有任何疑問或需要協助，請隨時聯繫我們的客戶服務團隊。我們將盡快回覆您的查詢。
                                            </p>
                                        </li>
                                        <li>
                                            <span>隱私與安全：</span>
                                            <p>保護您的隱私是我們的首要任務。請查閱我們的隱私政策以瞭解我們如何處理您的個人資訊。
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </li><!-- no.2 -->

                    <li v-show="activeTab === 2">
                        <div class="form">
                            <h2>常見問題</h2>
                            <div class="detail_content">
                                <div class="articlel">
                                    <ul>
                                        <li>
                                            <span>如何購物？</span>
                                            <p>在我們的網站上購物非常簡單！您只需瀏覽我們的商品頁面，選擇您喜歡的商品，並將其加入購物車。然後，進行結帳並提供您的收貨信息和支付方式。完成付款後，您將收到一封訂單確認郵件。
                                            </p>
                                        </li>
                                        <li>
                                            <span>我該如何追蹤我的訂單？</span>
                                            <p>在您的帳戶中，您可以點擊「訂單追蹤」以查看您的訂單狀態。一旦我們發貨，您將收到包含訂單追蹤號碼的通知郵件，您可以使用此號碼在運輸公司的網站上追蹤包裹。
                                            </p>
                                        </li>
                                        <li>
                                            <span>有免費送貨的選項嗎？</span>
                                            <p>是的，我們提供訂單金額達到一定標準時的免費送貨服務。您可以在結帳頁面查看相關選項，以確認是否有資格享受免費送貨。
                                            </p>
                                        </li>
                                        <li>
                                            <span>如何辦理退換貨？</span>
                                            <p>如需辦理退換貨，請在收到商品後的指定期限內聯繫我們的客戶服務，提供相關的訂單信息。我們將指導您完成退換貨流程。請注意，某些商品可能不支持退換貨，請查看商品頁面的退換貨條件。
                                            </p>
                                        </li>
                                        <li>
                                            <span>如何聯絡客戶服務？</span>
                                            <p>您可以透過我們的聯絡頁面與我們的客戶服務團隊聯繫。我們會盡快回覆您的查詢。您也可以通過電子郵件或客服熱線聯繫我們。
                                            </p>
                                        </li>
                                        <li>
                                            <span>如何確保支付安全？</span>
                                            <p>我們使用安全的支付系統，包括SSL加密技術，以確保您的支付資訊安全。我們不會儲存您的信用卡信息。
                                            </p>
                                        </li>

                                    </ul>
                                </div>
                                <div class="articler">
                                    <ul>
                                        <li>
                                            <span>產品是否有保固？</span>
                                            <p>是的，我們的產品通常都有一定的保固期限。詳細的保固信息可以在商品頁面找到，也可以在收到商品時附帶的保固卡上查閱。
                                            </p>
                                        </li>
                                        <li>
                                            <span>是否支持國際運送？</span>
                                            <p>是的，我們提供國際運送服務。在結帳時，您可以選擇您的國家並檢視相應的運費和交貨時間。
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </li><!-- no.3 -->
                </ul>
            </div>
            <img class="hello" src="/src/assets/imgs/product/product_detail_hello.png" alt="">
            <img class="hike" src="/src/assets/imgs/product/hike.png" alt="">
        </div>
    </div>
</template>
<style lang="scss" scope>
@import '@/assets/scss/components/productInfoCard.scss';
</style>