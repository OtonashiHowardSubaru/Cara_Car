<script>
export default {
    data() {
        return {
            showSubMenu: false,
            currentProfile: 'default',
            currentOrder: 'noPay',
            activeTab: 'noPay',
            imageUrl: null,
            selectedFile: null,
            isMobile: window.innerWidth < 768,
            isDesktop: window.innerWidth >= 768,
        }
    },
    created() {
        // 監聽視窗大小變化，更新 isMobile 和 isDesktop 的值
        window.addEventListener('resize', this.updateWindowSize);
        this.updateWindowSize()
    },
    methods: {
        updateWindowSize() {
            this.isMobile = window.innerWidth < 768;
            this.isDesktop = window.innerWidth >= 768;
        },
        beforeDestroy() {
            // 移除事件監聽器，避免在組件銷毀時仍然觸發事件
            window.removeEventListener('resize', this.updateWindowSize);
        },
        toggleSubMenu() {
            this.showSubMenu = !this.showSubMenu;
            // this.currentProfile = 'default';
        },
        showProfile(profile) {
            this.currentProfile = profile;
        },
        orderState(order) {
            this.currentOrder = order;
            this.activeTab = order;
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
            reader.onload = function () {
                document.getElementById('imagePreview').src = reader.result;
            }
            reader.readAsDataURL(file);
        }
    },
    mounted() {
        document.getElementById("upFile").addEventListener("change", this.showFile);
    },
}
</script>

<template>
    <div class="memberCenter">
        <div class="memberTitle">
            <div class="line"></div>
            <div class="title">
                <img src="../assets/imgs/memberCenter/memberCenterTitle.png" alt="title">
            </div>
            <div class="line"></div>
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
                    <img src="../assets/imgs/memberCenter/userImage(default).png" alt="User Avatar">
                </div>
                <div class="welcome">
                    <h3>
                        您好，歡迎光臨<br>CARA CAR官網購物帳號
                    </h3>
                    <div class="user_image" v-if="isDesktop">
                        <img src="../assets/imgs/memberCenter/userImage(default).png" alt="User Avatar">
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
                        <img src="../assets/imgs/memberCenter/user 1.svg" alt="user_icon">
                        <p>會員基本資料</p>
                    </div>
                    <div class="collect">
                        <img src="../assets/imgs/memberCenter/collect.svg" alt="collect_icon">
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
                        <img src="../assets/imgs/memberCenter/userImage(default).png" alt="User Avatar" id="imagePreview">
                    </div>
                    <label for="upFile">
                        <button class="change_user_image" @click="changeFile">+上傳檔案</button>
                        <input type="file" name="upFile" id="upFile" style="display:none;">
                    </label>
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
                    <div v-show="currentOrder === 'noPay'" class="order_content">
                        <div class="empty_img">
                            <img src="../assets/imgs/memberCenter/order-empty-image.png" alt="noOrder">
                        </div>
                        <p class="order_none">尚未有訂單</p>
                    </div>
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
                            <li :class="{ active: activeTab === 'handle2' }" @click="orderState('handle2')">處理中</li>
                            <li :class="{ active: activeTab === 'refund' }" @click="orderState('refund')">已退款</li>
                            <li :class="{ active: activeTab === 'unRefund' }" @click="orderState('unRefund')">不同意退款</li>
                        </ul>
                    </nav>
                </div>
                <div class="sub_title_line"></div>
                    <div v-show="currentOrder === 'handle2'" class="return_content">
                        <div class="empty_img">
                            <img src="../assets/imgs/memberCenter/return-empty-image.png" alt="noReturn">
                        </div>
                        <p class="return_none">您沒有退貨/退款案件</p>
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
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/page/memberCenter.scss';
@import '@/assets/scss/layout/memberCenterBasic.scss';
@import '@/assets/scss/layout/memberCenterOrder.scss';
@import '@/assets/scss/layout/memberCenterReturn.scss';
</style>