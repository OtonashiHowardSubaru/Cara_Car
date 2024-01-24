<script>
export default {
    data() {
        return {
            showSubMenu: false,
            // selectedFile: null,
            // imageUrl: null,
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
        toggleSubMenu() {
            this.showSubMenu = !this.showSubMenu;
        },
        updateWindowSize(){
            this.isMobile = window.innerWidth < 768;
            this.isDesktop = window.innerWidth >= 768;
        },
        beforeDestroy() {
            // 移除事件監聽器，避免在組件銷毀時仍然觸發事件
            window.removeEventListener('resize', this.updateWindowSize);
        },
    },
        // handleFileChange(e) {
        //     // 獲取選擇的文件
        //     this.selectedFile = e.target.files[0];
        //     // 使用 FileReader 讀取文件內容，並顯示在圖片上
        //     if (this.selectedFile) {
        //         const reader = new FileReader();
        //         reader.onload = (e) => {
        //             this.imageUrl = e.target.result;
        //         };
        //         reader.readAsDataURL(this.selectedFile);
        //     }
        // }
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
                            <transition name="fade" class="sm">
                                <ul v-if="showSubMenu">
                                    <li class="subMenu">基本資料</li>
                                </ul>
                            </transition>
                        </li>
                        <li>購買訂單</li>
                        <li>退貨申請</li>
                        <li>收藏清單</li>
                    </ul>
                </nav>
            </div>
            <div class="member_profile">
                <div class="mb_user_image" v-if="isMobile">
                    <img src="../assets/imgs/memberCenter/game-DIY-06.png" alt="User Avatar">
                </div>
                <div class="welcome">
                    <h3>
                        您好，歡迎光臨<br>CARA CAR官網購物帳號
                    </h3>
                    <!-- <input type="file" @change="handleFileChange" v-if="!imageUrl">
                    <div class="user_image" v-else>
                            <img :src="imageUrl" alt="User Avatar">
                    </div> -->
                    <div class="user_image" v-if="isDesktop">
                            <img src="../assets/imgs/memberCenter/game-DIY-06.png" alt="User Avatar">
                    </div>
                </div>
                <div class="orderState">
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
                    <button class="memberButton" @click="toOrderList">查看訂單</button>
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
                <div class="mb_member_sidebar" v-if="isMobile">
                <nav>
                    <ul>
                        <li @click="toggleSubMenu">
                            會員專區
                            <transition name="fade">
                                <ul v-if="showSubMenu" class="sm">
                                    <li class="subMenu">基本資料</li>
                                </ul>
                            </transition>
                        </li>
                        <li>購買訂單</li>
                        <li>退貨申請</li>
                        <li>收藏清單</li>
                    </ul>
                </nav>
            </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/page/memberCenter.scss'
</style>