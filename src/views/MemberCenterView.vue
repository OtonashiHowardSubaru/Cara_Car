<script>
export default {
    data() {
        return {
            isSubMenuVisible: false,
            selectedFile: null,
            imageUrl: null,

        }
    },
    methods: {
        toggleSubMenu() {
            this.isSubMenuVisible = !this.isSubMenuVisible;
        },
        handleFileChange(e) {
            // 獲取選擇的文件
            this.selectedFile = e.target.files[0];
            // 使用 FileReader 讀取文件內容，並顯示在圖片上
            if (this.selectedFile) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imageUrl = e.target.result;
                };
                reader.readAsDataURL(this.selectedFile);
            }
        }
    },
}
</script>

<template>
    <div class="memberCenter">
        <div class="memberTitle">
            <div class="line"></div>
            <div class="title">
                <div class="title_icon">
                    <img src="../assets/imgs/nav/nav-icon-05.png" alt="title_icon">
                </div>
                <h1>會員中心</h1>
                <div class="title_icon">
                    <img src="../assets/imgs/nav/nav-icon-05.png" alt="title_icon">
                </div>
            </div>
            <div class="line"></div>
        </div>
        <div class="memberContent">
            <div class="member_sidebar">
                <h2>我的Cara Car</h2>
                <nav>
                    <ul>
                        <li @click="toggleSubMenu">
                            會員專區
                            <ul>
                                <li v-if="isSubMenuVisible" class="subMenu">基本資料</li>
                            </ul>
                        </li>
                        <li>購買訂單</li>
                        <li>退貨申請</li>
                        <li>收藏清單</li>
                    </ul>
                </nav>
            </div>
            <div class="member_profile">
                <div class="welcome">
                    <h3>
                        您好，歡迎光臨<br>CARA CAR官網購物帳號
                    </h3>
                    <input type="file" @change="handleFileChange" v-if="!imageUrl">
                    <div class="user_image" v-else>
                            <img :src="imageUrl" alt="User Avatar">
                    </div>
                </div>
                <div class="orderState">
                    <div class="state1">
                        <p id="count1">0</p>
                        <p class="state_name">待出貨</p>
                    </div>
                    <div class="state2">
                        <p id="count2">1</p>
                        <p class="state_name">已出貨</p>
                    </div>
                    <div class="state3">
                        <p id="count1">3</p>
                        <p class="state_name">待取貨</p>
                    </div>
                    <button @click="toOrderList">查看訂單</button>
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
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/page/memberCenter.scss'
</style>