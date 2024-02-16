<script>
import axios from 'axios'; //引入函式庫
import CardShProcess from "@/components/card/CardShProcess.vue";
import MainHeader from '@/components/MainHeader.vue';
import PageNumber from "@/components/btn/PageNumber.vue"
import ProductCard from "@/components/ProductCard.vue"
import PriceSorter from '@/components/PriceSorter.vue';
import GreenBird from "@/components/animation/GreenBird.vue";
import YellowBird from "@/components/animation/YellowBird.vue";
import BlueBird from "@/components/animation/BlueBird.vue";

import shProduct01 from '@/assets/imgs/product/sh_products/product001.jpg';
import shProduct02 from '@/assets/imgs/product/sh_products/product002.jpg';
import shProduct03 from '@/assets/imgs/product/sh_products/product003.jpg';
import shProduct04 from '@/assets/imgs/product/sh_products/product004.jpg';
import shProduct05 from '@/assets/imgs/product/sh_products/product005.jpg';
import shProduct06 from '@/assets/imgs/product/sh_products/product006.jpg';
import shProduct07 from '@/assets/imgs/product/sh_products/product007.jpg';
import shProduct08 from '@/assets/imgs/product/sh_products/product008.jpg';
import shProduct09 from '@/assets/imgs/product/sh_products/product009.jpg';
  export default {
    components:{
      CardShProcess,MainHeader,PageNumber,ProductCard,PriceSorter,GreenBird,BlueBird,YellowBird,shProduct09,shProduct08,shProduct07,shProduct06,shProduct05,shProduct04,shProduct03,shProduct02,shProduct01
    },
    data(){
      return {
        // 頁數切換
        activeTab: "",
        currentPage: 1,
        perPage: 9,

        search: '',
        priceSorter: '',
        responseData : [],
        displayData: [],
        productDisplayList: [],
        sh_product_list: [
            {
              img_name:"shProduct001",
              prod_name:"極光追逐者",
              prod_price:"3000",
              linkwhere:"/SecondHand"
            },
            {
              prod_img1:shProduct02,
              prod_name:"極速閃電車",
              prod_price:"5000",
              linkwhere:"/SecondHand"
            },
            {
              prod_img1:shProduct03,
              prod_name:"太空探險車",
              prod_price:"8000",
              linkwhere:"/SecondHand"
            },
            {
              prod_img1:shProduct04,
              prod_name:"科技漂移車",
              prod_price:"6000",
              linkwhere:"/SecondHand"
            },
            {
              prod_img1:shProduct05,
              prod_name:"爆炸速度狂飆車",
              prod_price:"4000",
              linkwhere:"/SecondHand"
            },
            {
              prod_img1:shProduct06,
              prod_name:"魔法變形賽車",
              prod_price:"6000",
              linkwhere:"/SecondHand"
            },
            {
              prod_img1:shProduct07,
              prod_name:"閃電漂移車",
              prod_price:"2500",
              linkwhere:"/SecondHand"
            },
            {
              prod_img1:shProduct08,
              prod_name:"太空漫步車",
              prod_price:"3500",
              linkwhere:"/SecondHand"
            },
            {
              prod_img1:shProduct09,
              prod_name:"磁浮飛行車",
              prod_price:"5500",
              linkwhere:"/SecondHand"
            },
        ],

      }
    },
    created() {
      // this.axiosGetData();
    },
    methods: {
      handleFilter() {
        this.displayData = this.responseData.filter((item) => {
          // console.log(item);
          return item.title.includes(this.search)
        })
      },
      handleSortChange(newSort){
          if (newSort === "0") {
            this.sh_product_list = this.responseData
          } else if (newSort === "desc") {
            this.sh_product_list.sort((a, b) => b.prod_price - a.prod_price);
          } else if (newSort === "asc"){
            this.sh_product_list.sort((a, b) => a.prod_price - b.prod_price);
          };
      },
      currentSidebar(item) {
          this.activeTab = item
      },
      changePage(page) {
          this.currentPage = page;
      },
    },
    computed:{
      // 頁數切換
      paginated(){
        const start = (this.currentPage - 1) * this.perPage; //將當前頁數-1再乘以頁面顯示內容筆數得到start值
        const end = start + this.perPage;//計算此頁面中的內容是否達到perPage中的數字最後索引值來得到end值
        return this.sh_product_list.slice(start, end);//用JS的.slice()方法獲取vue data中的member陣列內容顯示內容
      },
      totalPages() {
        return Math.ceil(this.sh_product_list.length / this.perPage);//用Math.ceil()無條件進位，值則是用member陣列物件長度除以顯示內容筆數取得
      },
    },
}
</script>
<template>
  <MainHeader />
  
  <div class="sh_pro_list_title">
      <img src="../assets/imgs/draw/greeting_illust.svg" alt="">
      <h1><img src="../assets/imgs/product/sh_product_list_title.png" alt="used car 二手車"></h1>
      
    </div>
  <div class="container">
    <div class="row">
      <div class="store_name col-12">
        <h2>USED CAR</h2>
          <PriceSorter 
            @sortChange="handleSortChange"
          />
          <div class="gbird">
            <GreenBird/>
          </div>
          <div class="bbird">
            <BlueBird/>
          </div>
          <div class="ybird">
            <YellowBird/>
          </div>
          
      </div>
      
      <div class="sh_pro_card_list col-9 col-md-10">
        <ProductCard
        :displayData = "sh_product_list"
        />
      </div>
    </div>
    <div class="paginator">
      <PageNumber :totalPages="totalPages" :currentPage="currentPage" @pageChange="changePage" />
    </div>

    <div class="iwantsellCar">
            <div class="iwantsellCarbutton" onclick="togglePopup()">
            <a href="./SecondHandSale"><p>我要<br>賣車</p></a>    
            </div>
            
        </div>
  </div>

<CardShProcess/>

<!-- <svg width="100%" height="100%" viewBox="0 0 1818 832" fill="none" xmlns="http://www.w3.org/2000/svg"> 
    A
    <path d="M1609.88 688.698C1636.56 741.549 1686.43 772.554 1721.26 757.948C1756.1 743.343 1762.71 688.658 1736.03 635.806C1709.35 582.954 1659.48 551.949 1624.65 566.555C1589.81 581.16 1583.2 635.846 1609.88 688.698Z" fill="#8DABE6" class="svg-elem-1"></path>
    <path d="M1630.93 668.025C1649.56 724.207 1689.86 763.482 1720.94 755.749C1752.02 748.016 1762.11 696.203 1743.48 640.021C1724.85 583.84 1684.55 544.564 1653.47 552.298C1622.39 560.031 1612.3 611.844 1630.93 668.025Z" fill="#8DABE6" class="svg-elem-2"></path>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1397.04 722.781C1404.65 743.467 1417.23 757.232 1434.48 761.207C1469.32 769.238 1514.26 735.247 1551.68 678.285C1557.24 669.825 1566.48 664.241 1576.43 663.708C1577.83 663.633 1579.22 663.555 1580.6 663.476C1590.33 662.914 1598.95 668.535 1602.79 677.149V677.149C1628.2 734.078 1678.16 770.608 1714.39 758.742C1727.36 754.493 1736.82 744.617 1742.44 731.074C1742.95 729.847 1743.54 728.647 1744.12 727.445V727.445C1773.81 665.387 1703.71 511.21 1662.98 441.832C1627.85 381.97 1594.5 368.108 1576.26 365.273C1575.95 365.196 1575.65 365.123 1575.35 365.053C1524.09 353.241 1451.01 432.347 1412.11 541.742C1390.34 602.953 1383.89 660.677 1391.41 701.722C1391.46 702.366 1391.5 702.997 1391.55 703.615C1391.79 706.594 1392.32 709.527 1393.21 712.347C1394.44 716.248 1395.72 719.717 1397.04 722.781Z" fill="#3A8FF3" class="svg-elem-3"></path>
    A左眼白 -->
    <!-- <path d="M1652.21 511.208C1650.92 526.378 1636.96 538.156 1621.04 537.514C1605.11 536.873 1593.24 524.055 1594.53 508.886C1595.82 493.716 1609.78 481.938 1625.71 482.579C1641.63 483.221 1653.5 496.038 1652.21 511.208Z" fill="white" class="svg-elem-4"></path> -->
    <!-- A左眼珠 -->
    <!-- <path d="M1630.04 511.012C1629.6 517.778 1623.23 523.105 1615.81 522.911C1608.39 522.716 1602.73 517.073 1603.17 510.307C1603.61 503.541 1609.98 498.213 1617.4 498.408C1624.82 498.603 1630.48 504.246 1630.04 511.012Z" fill="black" class="svg-elem-5"></path> -->
    <!-- A左眼白 -->
    <!-- <path d="M1561.36 502.842C1557.1 522.628 1536.91 536.925 1516.27 534.776C1495.63 532.627 1482.36 514.845 1486.62 495.059C1490.89 475.274 1511.07 460.977 1531.71 463.126C1552.35 465.275 1565.62 483.057 1561.36 502.842Z" fill="white" class="svg-elem-6"></path> -->
    <!-- A左眼珠 -->
    <!-- <path d="M1554.02 504.01C1552.74 511.785 1544.48 517.561 1535.55 516.91C1526.62 516.26 1520.41 509.43 1521.69 501.654C1522.96 493.879 1531.23 488.103 1540.15 488.754C1549.08 489.404 1555.29 496.235 1554.02 504.01Z" fill="black" class="svg-elem-7"></path> -->
    <!-- A嘴巴 -->
    <!-- <path d="M1578.74 563.152C1576.71 559.205 1571.57 558.941 1568.76 562.639L1546 592.644C1542.75 596.937 1545.02 603.166 1549.93 603.419L1589.19 605.435C1594.11 605.687 1597.61 599.754 1595.24 595.173L1578.74 563.152Z" fill="#C43131" class="svg-elem-8"></path> -->
    <!-- 三角錐 -->
    <!-- <path d="M785.162 413.288C798.712 371.054 856.97 371.054 870.52 413.288L963.107 701.86C972.669 731.662 951.022 762.336 920.428 762.336H735.254C704.66 762.336 683.013 731.662 692.575 701.86L785.162 413.288Z" fill="#FFF09F" fill-opacity="0.86" class="svg-elem-9"></path>
    <path d="M711.697 643.115C698.346 681.274 696.818 690.163 690.04 716.271C686.65 745.392 708.116 754.43 718.284 758.446C754.436 766.48 791.375 761.529 825.61 761.459C864.69 761.378 910.792 769.046 938.521 758.446C952.902 752.949 968.364 739.416 965.699 722.296C965.699 711.251 963.199 689.202 943.086 639.66C857.683 696.455 747.088 666.78 711.697 643.115Z" fill="#FFB11A" class="svg-elem-10"></path>
    <path d="M887.373 465.724C847.83 492.432 789.391 476.852 768.309 465.724C759.432 490.181 750.672 519.825 742.474 546.17C769.552 564.565 841.607 590.319 913.208 546.17C905.345 523.319 897.483 496.825 887.373 465.724Z" fill="#FFB11A" class="svg-elem-11"></path> -->
    <!-- C舌頭 -->
    <!-- <path d="M521.601 508.853C524.44 533.819 493.775 557.807 453.109 562.432C412.443 567.057 377.175 550.567 374.335 525.601C371.496 500.635 402.16 476.647 442.827 472.022C483.493 467.397 518.761 483.886 521.601 508.853Z" fill="#FF0000" class="svg-elem-12"></path> -->
    <!-- C -->
    <!-- <path fill-rule="evenodd" clip-rule="evenodd" d="M532.423 548.968C514.615 554.812 508.333 556.177 480.093 556.393C472.684 556.449 456.524 553.259 447.702 549.616C446.669 549.19 445.651 548.773 444.645 548.361C436.503 545.027 429.168 542.023 421.265 536.942C411.186 530.461 404.608 523.728 399.158 518.15C398.406 517.38 397.675 516.632 396.96 515.909C390.014 508.898 385.125 501.947 381.366 495.615C378.346 490.528 375.849 484.788 373.806 480.093C373.041 478.336 372.34 476.725 371.7 475.349C367.419 466.161 365.78 457.924 364.533 451.657C364.282 450.395 364.047 449.213 363.809 448.119C362.505 442.119 360.628 425.608 364.359 405.239C365.722 397.799 368.392 389.195 372.5 379.13C375.89 370.824 381.686 360.558 390.419 349.58C400.321 337.133 416.16 326.025 429.614 318.038C435.187 314.73 439.019 313.271 443.143 311.701C444.193 311.301 445.262 310.894 446.384 310.447C452.524 308.002 459.724 305.867 465.585 304.959C479.485 302.807 491.75 301.247 511.605 304.827C523.453 306.963 528.931 309.122 538.312 312.819C539.012 313.095 539.734 313.38 540.481 313.673C550.867 318.699 560.818 324.04 570.406 330.204C597.17 347.413 633.131 348.549 657.613 319.806C657.808 319.577 658.004 319.348 658.2 319.118C663.114 313.356 668.291 307.285 672.36 298.044C672.436 297.869 672.515 297.7 672.594 297.531C672.843 296.998 673.091 296.467 673.268 295.775C673.268 295.775 673.46 295.115 673.954 294.119C674.927 292.154 675.663 289.43 676.391 286.738C676.577 286.047 676.763 285.358 676.953 284.685C677.823 281.591 678.284 278.022 678.848 273.661C679.036 272.203 679.236 270.656 679.467 269.008C688.625 203.554 608.591 93.1923 471.231 79.2019C401.829 72.133 295.012 79.6097 211.299 150.308C152.555 199.92 96.7977 261.621 77.5318 384.02C72.4281 416.445 76.8793 462.218 84.87 497.149C92.8608 532.081 105.309 566.345 120.475 593.751C149.147 645.565 183.295 690.864 250.576 729.283C288.128 750.726 357.333 787.658 478.38 772.538C499.261 769.929 510.863 767.47 525.495 762.3L525.977 762.13C545.086 755.378 550.085 753.613 567.42 743.322C575.79 738.353 586.082 730.006 596.204 719.233C601.788 713.931 607.158 708.138 612.234 701.878C655.614 648.377 661.131 580.966 624.558 551.312C609.206 538.864 588.877 535.048 567.247 538.767C561.273 539.623 555.9 540.849 551.979 542.088C550.121 542.675 547.512 543.625 544.485 544.728C540.87 546.044 536.66 547.578 532.423 548.968Z" fill="#D0E69F" class="svg-elem-13"></path> -->
    <!-- C右眼白 -->
    <!-- <path d="M556.379 240.663C543.602 263.36 517.088 272.664 497.16 261.445C477.232 250.225 471.435 222.731 484.213 200.035C496.991 177.338 523.504 168.034 543.432 179.253C563.361 190.472 569.157 217.967 556.379 240.663Z" fill="white" class="svg-elem-14"></path> -->
    <!-- C右眼珠 -->
    <!-- <path d="M536.105 229.401C530.579 239.611 518.513 243.783 509.153 238.718C499.794 233.653 496.685 221.27 502.211 211.059C507.736 200.849 519.803 196.678 529.162 201.743C538.522 206.807 541.63 219.191 536.105 229.401Z" fill="black" class="svg-elem-15"></path> -->
    <!-- C左眼白 -->
    <!-- <path d="M438.116 216.349C422.233 246.804 387.534 260.99 360.613 248.033C333.692 235.077 324.744 199.885 340.626 169.429C356.509 138.974 391.208 124.788 418.129 137.744C445.05 150.701 453.998 185.893 438.116 216.349Z" fill="white" class="svg-elem-16"></path> -->
    <!-- C左眼珠 -->
    <!-- <path d="M414.172 202.484C408.477 214.637 394.305 220.315 382.516 215.168C370.728 210.02 365.787 195.996 371.481 183.843C377.175 171.691 391.348 166.012 403.137 171.16C414.925 176.307 419.866 190.332 414.172 202.484Z" fill="black" class="svg-elem-17"></path> -->
    <!-- R -->
    <!-- <path fill-rule="evenodd" clip-rule="evenodd" d="M1318.34 479.27C1320.12 498.365 1317.35 516.876 1310.9 533.842C1310.57 534.779 1310.24 535.72 1309.89 536.666C1298.74 567.034 1286.57 602.874 1308.21 627.546C1312.29 632.208 1316.1 636.846 1319.64 641.431C1344.96 674.277 1352.8 706.286 1351.11 722.383L1351.1 722.495C1350.92 735.229 1346.96 745.753 1338.83 752.716C1325.66 763.999 1304.04 763.797 1279.73 754.348C1278.49 753.914 1277.25 753.458 1276.02 752.981C1275.54 752.797 1275.12 752.569 1274.76 752.303C1251.77 742.333 1226.77 724.452 1204.45 700.476C1197.49 692.997 1191.17 685.336 1185.53 677.635C1185.12 677.252 1184.7 676.844 1184.26 676.41C1175.45 667.65 1167.82 669.232 1163.69 677.275C1157.7 706.032 1144.02 730.149 1126.81 744.803C1126.45 745.2 1126.12 745.542 1125.81 745.825C1107.13 762.792 1078.29 765.775 1055.63 749.814C1040.14 738.9 1027.53 719.126 1023.04 688.908C1015.44 640.47 1019.88 592.441 1020.56 585.951C1020.73 584.323 1020.9 582.69 1021.08 581.052C1028.95 505.725 1037.8 420.97 1117.92 379.185C1124.48 375.762 1132.37 372.679 1141.15 370.188C1150.91 367.071 1161.2 364.965 1171.89 364.01C1181.57 363.147 1191.1 363.27 1200.37 364.293C1214.1 365.377 1227.88 368.295 1240.72 373.595C1254.07 379.099 1280.83 393.353 1299.38 424.404C1309.75 440.541 1316.47 459.139 1318.34 479.27Z" fill="#E5C26D" class="svg-elem-18"></path>
    <path d="M1228.11 478.509C1233.81 509.637 1212.1 539.592 1179.62 545.415C1147.13 551.239 1116.17 530.726 1110.47 499.598C1104.77 468.47 1126.49 438.515 1158.97 432.691C1191.46 426.867 1222.41 447.381 1228.11 478.509Z" fill="white" class="svg-elem-19"></path>
    <path d="M1184.52 485.429C1186.1 494.05 1180.08 502.345 1171.09 503.958C1162.09 505.57 1153.52 499.89 1151.94 491.27C1150.36 482.65 1156.38 474.354 1165.37 472.742C1174.37 471.129 1182.94 476.809 1184.52 485.429Z" fill="#B79234" class="svg-elem-20"></path>
    </svg>  -->
</template>

<style lang="scss" scoped>

@import '@/assets/scss/page/shproduct.scss';

</style>
