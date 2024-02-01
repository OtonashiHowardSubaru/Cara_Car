<template>
    <MainHeader />
    <div class="SecondHandSale">
        <div class="SecondHandSaleTitle">
            <h2>我要賣車</h2>
        </div>
        <div class="saleCarStepTopText">
            <p>這部玩具汽車可能充滿回憶，曾陪伴您與孩子歡樂成長。現在雖然用不到了，但還是充滿溫馨。以合理價格轉讓給需要的人，讓歡笑傳承，尋找新主人吧！</p>
            <div class="drawPic"><img src="../assets/imgs/draw/person_love.png" alt="插圖"></div>
        </div>
        <section class="saleCarSteps">


            <div class="saleCarStep">
                <div class="saleCarStepImg"><img src="../assets/imgs/SecondHandSale/SecondHandSaleStep1.png" alt="">
                </div>
                <div class="saleCarStepType">
                    <div class="saleCarStepNum">
                        <h3>01</h3>
                    </div>
                    <div class="saleCarStepContent">
                        <h5>填寫資料表格</h5>
                        <p>在官網填寫方便的線上表格，告訴我們您的二手兒童玩具車輛基本資訊。這方便且快速的方式，讓您能輕鬆且迅速地告訴我們您的需求。</p>
                    </div>
                </div>
            </div>
            <div class="saleCarStep">
                <div class="saleCarStepImg"><img src="../assets/imgs/SecondHandSale/SecondHandSaleStep2.png" alt="">
                </div>
                <div class="saleCarStepType">
                    <div class="saleCarStepNum">
                        <h3>02</h3>
                    </div>
                    <div class="saleCarStepContent">
                        <h5>提交表格並預約檢查</h5>
                        <p>當您提交填好的表格後，我們會主動聯絡您，安排一個方便的時間進行現場檢查和估價。這個步驟讓我們專業團隊關注到您的需求，以確保後續的評估能夠順利進行。</p>
                    </div>
                </div>
            </div>
            <div class="saleCarStep">
                <div class="saleCarStepImg"><img src="../assets/imgs/SecondHandSale/SecondHandSaleStep3.png" alt="">
                </div>
                <div class="saleCarStepType">
                    <div class="saleCarStepNum">
                        <h3>03</h3>
                    </div>
                    <div class="saleCarStepContent">
                        <h5>車輛檢查及估價</h5>
                        <p>專業團隊仔細檢查您的二手車輛，提供公正且合理的估價報告。我們注重客觀且透明的評估過程，以確保您收到公正的價格。</p>
                    </div>
                </div>
            </div>
            <div class="saleCarStep">
                <div class="saleCarStepImg"><img src="../assets/imgs/SecondHandSale/SecondHandSaleStep4.png" alt="">
                </div>
                <div class="saleCarStepType">
                    <div class="saleCarStepNum">
                        <h3>04</h3>
                    </div>
                    <div class="saleCarStepContent">
                        <h5>簽訂契約與支付款項</h5>
                        <p>達成共識後，我們提供正式的收購契約，確保內容清晰明確以保護雙方權益。完成契約簽署後，即時支付協商好的款項，讓整個交易過程更加順利。</p>
                    </div>
                </div>
            </div>
            <div class="saleCarStep">
                <div class="saleCarStepImg"><img src="../assets/imgs/SecondHandSale/SecondHandSaleStep5.png" alt="">
                </div>
                <div class="saleCarStepType">
                    <div class="saleCarStepNum">
                        <h3>05</h3>
                    </div>
                    <div class="saleCarStepContent">
                        <h5>完成交易</h5>
                        <p>收到支付後，我們提供相應文件，以確保整個收購交易的合法性和透明性。您可以安心完成整個流程，得到我們專業團隊的協助，確保您的交易安全可靠。</p>
                    </div>
                </div>
            </div>

        </section>
        <section class="infoTextSale">

            <div class="InfoTextCards">
                <div class="InfoTextText">
                    <InfoTextCards />
                </div>
                <div class="shopInfoMapSale">
                    <ShopMap />
                </div>
            </div>
            <BtnAboutUs class="AboutUsBtnSale" />

        </section>

        <!-- <div class="iWantSellCarButton">
            <div @click="openBtnSaleCar">填寫表格</div>
        </div> -->
        <div class="SellCarFormButton">
        <button @click="openLightbox">填寫表格2</button>
    </div>
        <Transition name="fade">
            <BtnSaleCar v-if="lightBoxForm.showLightbox"/>
        </Transition>
        <!-- <BtnSaleCar/> -->
        
    </div>
    
</template>

<script>
import BtnAboutUs from '@/components/btn/BtnAboutUs.vue'
import MainHeader from '@/components/MainHeader.vue';
import ShopMap from '@/components/ShopMap.vue';
import InfoTextCards from '@/components/InfoTextCards.vue';
import lightBoxForm from "@/stores/lightBoxForm.js"
import BtnSaleCar from '@/components/btn/BtnSaleCar.vue';


export default {
    components: {
        BtnAboutUs,
        MainHeader,
        ShopMap,
        InfoTextCards,
        BtnSaleCar,
        
    },
    data() {
        return {
            lightBoxForm: lightBoxForm(),
            showLightbox: false,
            
            infoText: [
                {
                    shopAddress: "桃園市中壢區復興路46號8樓",
                    contactNumber: "(03)425-1108",
                    contactEmail: "Cara_car@gmail.com",
                    openTime: "10:00 ~ 20:30",
                    holiday: "每周一、四",
                },
            ],
        };
    },
    methods: {
        openLightbox() {
          // this.showLightbox = true;
            this.lightBoxForm.openLightbox()
        },
        closeLightbox() {
          // this.showLightbox = false;
            this.lightBoxForm.closeLightbox()
        },
        // handleClick(e) {
        //     if (e.target.id === 'loginOverlay') {
        //         this.closeLightbox();
        //     }
        // },
    },
    mounted() {
    },
};

</script>
<!-- <script src="https://unpkg.com/vue@3.4.5/dist/vue.global.js">
        import MainHeader from '@/components/Header.vue'
        
        export default {
            components: {
                MainHeader
            },
            data() {
                return {
        
                }
            },
            methods: {
            },
            mounted() {
            }
        };
    Vue.createApp({
        data() {
            return {
                brewingSteps: [
                    {
                        stepNumber: "01",
                        title: "填寫資料表格",
                        description: "在官網填寫方便的線上表格，告訴我們您的二手兒童玩具車輛基本資訊。這方便且快速的方式，讓您能輕鬆且迅速地告訴我們您的需求。",
                        imgSrc: "../assets/imgs/SecondHandSale/SecondHandSaleStep1.png",
                        alt: "步驟1",
                        type: 1,
                        flow: 1
                    },
                    {
                        stepNumber: "02",
                        title: "提交表格並預約檢查",
                        description: "當您提交填好的表格後，我們會主動聯絡您，安排一個方便的時間進行現場檢查和估價。這個步驟讓我們專業團隊關注到您的需求，以確保後續的評估能夠順利進行。",
                        imgSrc: "../assets/imgs/SecondHandSale/SecondHandSaleStep1.png",
                        alt: "步驟2",
                        type: 2,
                        flow: 2
                    },
                    {
                        stepNumber: "03",
                        title: "車輛檢查及估價",
                        description: "專業團隊仔細檢查您的二手車輛，提供公正且合理的估價報告。我們注重客觀且透明的評估過程，以確保您收到公正的價格。",
                        imgSrc: "../assets/imgs/SecondHandSale/SecondHandSaleStep1.png",
                        alt: "步驟3",
                        type: 1,
                        flow: 1
                    },
                    {
                        stepNumber: "04",
                        title: "簽訂契約與支付款項",
                        description: "達成共識後，我們提供正式的收購契約，確保內容清晰明確以保護雙方權益。完成契約簽署後，即時支付協商好的款項，讓整個交易過程更加順利。",
                        imgSrc: "../assets/imgs/SecondHandSale/SecondHandSaleStep1.png",
                        alt: "步驟4",
                        type: 2,
                        flow: 2
                    },
                    {
                        stepNumber: "05",
                        title: "完成交易",
                        description: "收到支付後，我們提供相應文件，以確保整個收購交易的合法性和透明性。您可以安心完成整個流程，得到我們專業團隊的協助，確保您的交易安全可靠。",
                        imgSrc: "../assets/imgs/SecondHandSale/SecondHandSaleStep1.png",
                        alt: "步驟5",
                        type: 1,
                        flow: 1
                    },
                ],

                
            }
        },
    }).mount('#app'); -->

<!-- </script> -->


<style lang="scss" scoped>
@import "@/assets/scss/page/second_hand_sale.scss";
</style>
  


<!-- <section class="section-about-123">

    <div class="about_top_contect">
        <p>這部玩具汽車可能充滿回憶，曾陪伴您與孩子歡樂成長。現在雖然用不到了，但還是充滿溫馨。以合理價格轉讓給需要的人，讓歡笑傳承，尋找新主人吧！</p>
    </div>

    <div class="about_flow_bg">
        <section class="about_flow" id="flow">
            <img src="./bruhabeer/about_flow.png" alt="">
            <h2>製作流程</h2>

            <div class="chart_area">
                <div v-for="item1 in brewingSteps" class="chart_area_type1">
                    <div class="flow1">
                        <h3>{{item1.stepNumber}}<br>{{item1.title}}</h3>
                    </div>
                    <div class="chart_area_content">
                        <p>{{item1.description}}</p>
                        <img :src="item1.imgSrc">
                    </div>
                </div>
            </div><!-- chart_area -->
        <!-- </section>
    </div>

</section> -->