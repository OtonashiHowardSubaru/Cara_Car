<script>
import MainHeader from '@/components/MainHeader.vue'
// import MemberCenterSidebarPCVue from '@/components/MemberCenterSidebarPC.vue'
// import MemberCenterSidebarMB from '@/components/MemberCenterSidebarMB.vue'
import userImage from '@/assets/imgs/memberCenter/userImage(default).png'
export default {
    components: {
        MainHeader,
    },
    data() {
        return {
            user:{
                name : 'Yee'
            },
            showSubMenu: false,
            currentProfile: 'default',
            currentOrder: 'noPay',
            activeTab: 'noPay',
            currentReturn: 'default2',
            activeTab2: 'default2',
            imageUrl: null,
            selectedFile: null,
            isMobile: window.innerWidth >= 325 && window.innerWidth < 768,
            isDesktop: window.innerWidth >= 768,
            storedImage: '',
            // innerWidth: 500,
        }
    },
    created() {
        // 監聽視窗大小變化，更新 isMobile 和 isDesktop 的值
        window.addEventListener('resize', this.updateWindowSize);
        this.updateWindowSize()
    },
    computed: {
        imagePreviewUrl() {
            return this.storedImage || userImage
        },
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.updateWindowSize);
    },
    methods: {
        updateWindowSize() {
            this.isMobile = window.innerWidth >= 325 && window.innerWidth < 768;
            this.isDesktop = window.innerWidth >= 768;
        },
        // beforeDestroy() {
        //     // 移除事件監聽器，避免在組件銷毀時仍然觸發事件
        //     window.removeEventListener('resize', this.updateWindowSize);
        // },
        toggleSubMenu() {
            this.showSubMenu = !this.showSubMenu;
        },
        showProfile(profile) {
            this.currentProfile = profile;
        },
        orderState(order) {
            this.currentOrder = order;
            this.activeTab = order;
        },
        returnState(ret) {
            this.currentReturn = ret;
            this.activeTab2 = ret;
        },
        changeFile() {
            document.getElementById('upFile').click();
        },
        showFile(e) {
            const files = e.target.files;
            if (files.length === 0) {
                return;
            }
            const file = files[0];
            const reader = new FileReader();

            reader.onload = () => {
                localStorage.setItem('imagePreview', reader.result);
                this.storedImage = reader.result
            }
            reader.readAsDataURL(file);
        }
    },
    mounted() {
        // this.innerWidth = window.innerWidth
        // window.addEventListener
        document.getElementById("upFile").addEventListener("change", this.showFile);
        this.storedImage = localStorage.getItem('imagePreview');
        // if (storedImage) {
        //     var imagePreviews = document.querySelectorAll('.imagePreview')
        //         imagePreviews.forEach(function (element) {
        //         element.src = storedImage;
        //         });
        // }
    },
}
</script>

<template>
    <MainHeader />

    <div class="memberCenter">
        <div class="memberTitle">
            <h1>新品專區
            </h1>
        </div>
        <div class="memberContent">

            <div class="member_sidebar" v-if="isDesktop">
                <h2>我的Cara Car</h2>
                <nav>
                    <ul>
                        <li @click="toggleSubMenu">
                            會員專區
                            <transition name="fade">
                                <ul v-if="showSubMenu">
                                    <li class="subMenu" @click="showProfile('default')">會員中心</li>
                                    <li class="subMenu" @click="showProfile('basic')">基本資料</li>
                                </ul>
                            </transition>
                        </li>
                        <li @click="showProfile('order')">購買訂單</li>
                        <li @click="showProfile('return')">退貨申請</li>
                        <li @click="showProfile('collect')">收藏清單</li>
                    </ul>
                </nav>
            </div>

            <div class="member_profile" v-show="currentProfile === 'default'">

                <div class="mb_user_image" v-if="isMobile">
                    <img :src="imagePreviewUrl" alt="User Avatar" class="imagePreview">
                </div>

                <div class="welcome">
                    <h3>
                        您好{{user.name}}，歡迎光臨<br>Cara Car官網購物帳號
                    </h3>
                    <div class="user_image" v-if="isDesktop">
                        <img :src="imagePreviewUrl" alt="User Avatar" class="imagePreview">
                    </div>
                </div>

                <div class="currentOrder">
                    <div class="state">
                        <p id="count1">0</p>
                        <p class="state_name">待出貨</p>
                    </div>
                    <div class="state">
                        <p id="count2">1</p>
                        <p class="state_name">已出貨</p>
                    </div>
                    <div class="state">
                        <p id="count3">3</p>
                        <p class="state_name">待取貨</p>
                    </div>
                    <button class="memberButton" @click="showProfile('order')">查看訂單</button>
                </div>

                <div class="userCollect">
                    <div class="user">
                        <img src="../assets/imgs/memberCenter/user 1.svg" alt="user_icon" @click="showProfile('basic')">
                        <p>會員基本資料</p>
                    </div>
                    <div class="collect">
                        <img src="../assets/imgs/memberCenter/collect.svg" alt="collect_icon" @click="showProfile('collect')">
                        <p>我的收藏</p>
                    </div>
                </div>

            </div>
            <div class="basic" v-show="currentProfile === 'basic'">

                <div class="sub_title">
                    <h2 v-if="isMobile" @click="showProfile('default')">返回會員中心</h2>
                    <h3>基本資料</h3>
                    <div class="sub_title_line"></div>
                </div>

                <div class="user_edit">
                    <div class="user_image">
                        <img :src="imagePreviewUrl" alt="User Avatar" class="imagePreview">
                    </div>
                    <label for="upFile">
                        <input type="file" name="upFile" id="upFile" style="display:none;">
                    </label>
                    <button class="change_user_image" @click="changeFile">+上傳檔案</button>
                </div>

                <div class="user_profile">
                    <form action="" method="post" name="" id="">
                        <div class="table">
                            <p>會員姓名</p>
                            <input type="text" name="memName" id="memName" placeholder="Cara Car">
                        </div>
                        <div class="table">
                            <p>連絡電話</p>
                            <input type="tel" name="memTel" id="memTel" placeholder="00-12345678">
                        </div>
                        <div class="table">
                            <p>電子郵件</p>
                            <input type="email" name="memEmail" id="memEmail" placeholder="cara_car@mail.com">
                        </div>
                        <div class="table">
                            <p>會員地址</p>
                            <input type="address" name="memAddress" id="memAddress" placeholder="桃園市中壢區復興路46號">
                        </div>
                        <div class="table">
                            <p>原密碼　</p>
                            <input type="password" name="memOldPsw" id="memOldPsw" placeholder="請輸入原密碼">
                        </div>
                        <div class="table">
                            <p>新密碼　</p>
                            <input type="password" name="memNewPsw" id="memNewPsw" placeholder="請輸入新密碼">
                        </div>
                        <div class="table">
                            <p>確認密碼</p>
                            <input type="password" name="memConPsw" id="memConPsw" placeholder="請再次輸入新密碼">
                        </div>
                    </form>
                    <input id="send" type="submit" name="button" value="我要修改">
                </div>

            </div>

            <div class="order" v-show="currentProfile === 'order'">

                <div class="sub_title">
                    <h2 v-if="isMobile" @click="showProfile('default')">返回會員中心</h2>
                    <h3 class="order_title">購買訂單</h3>
                </div>

                <div class="order_filter">
                    <nav>
                        <ul>
                            <li :class="{ active: activeTab === 'noPay' }" @click="orderState('noPay')">尚未付款</li>
                            <li :class="{ active: activeTab === 'handle' }" @click="orderState('handle')">處理中</li>
                            <li :class="{ active: activeTab === 'pick_up' }" @click="orderState('pick_up')">待取貨</li>
                            <li :class="{ active: activeTab === 'done' }" @click="orderState('done')">已完成</li>
                            <li :class="{ active: activeTab === 'cancel' }" @click="orderState('cancel')">已取消</li>
                        </ul>
                    </nav>
                    <div class="sub_title_line"></div>
                </div>

                <div v-show="currentOrder === 'noPay'" class="order_content">

                    <div class="empty_img">
                        <img src="../assets/imgs/memberCenter/order-empty-image.png" alt="noOrder">
                    </div>
                    <p class="order_none">尚未有訂單</p>
                </div>
            </div>

            <div class="return" v-show="currentProfile === 'return'">

                <div class="sub_title">
                    <h2 v-if="isMobile" @click="showProfile('default')">返回會員中心</h2>
                    <h3 class="return_title">退貨申請</h3>
                </div>

                <div class="return_filter">
                    <nav>
                        <ul>
                            <li :class="{ active: activeTab2 === 'handle2' }" @click="returnState('handle2')">處理中</li>
                            <li :class="{ active: activeTab2 === 'refund' }" @click="returnState('refund')">已退款</li>
                            <li :class="{ active: activeTab2 === 'unRefund' }" @click="returnState('unRefund')">不同意退款</li>
                        </ul>
                    </nav>
                    <div class="sub_title_line"></div>
                </div>

                <div v-show="currentReturn === 'handle2'" class="return_content">

                    <div class="empty_img">
                        <img src="../assets/imgs/memberCenter/return-empty-image.png" alt="noReturn">
                    </div>
                    <p class="return_none">您沒有退貨/退款案件</p>
                </div>


            </div>
            <div class="collect_content" v-show="currentProfile === 'collect'">
                <div class="sub_title">
                    <h2 v-if="isMobile" @click="showProfile('default')">返回會員中心</h2>
                    <h3 class="collect_title">收藏清單</h3>
                    <div class="sub_title_line"></div>
                </div>
                <div class="collect_icon">
                    <img src="../assets/imgs/memberCenter/heart-regular.svg" alt="noCollect">
                </div>
                <p class="collect_none">收藏清單目前沒有商品</p>
                <RouterLink to="/ProductList" class="linkToProductList">
                    <div class="productListLink">繼續購物</div>
                </RouterLink>
            </div>
            <div class="mb_member_sidebar" v-if="isMobile">
                    <nav>
                        <ul>
                            <li @click="toggleSubMenu">
                                會員專區
                                <transition name="fade">
                                    <ul v-if="showSubMenu">
                                        <li class="subMenu" @click="showProfile('default')">會員中心</li>
                                        <li class="subMenu" @click="showProfile('basic')">基本資料</li>
                                    </ul>
                                </transition>
                            </li>
                            <li @click="showProfile('order')">購買訂單</li>
                            <li @click="showProfile('return')">退貨申請</li>
                            <li @click="showProfile('collect')">收藏清單</li>
                        </ul>
                    </nav>
                </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/page/memberCenter.scss';
@import '@/assets/scss/components/memberCenterSidebar.scss';
@import '@/assets/scss/layout/memberCenterBasic.scss';
@import '@/assets/scss/layout/memberCenterOrder.scss';
@import '@/assets/scss/layout/memberCenterReturn.scss';
@import '@/assets/scss/layout/memberCenterCollect.scss';
</style>