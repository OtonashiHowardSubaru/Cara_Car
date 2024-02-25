<script>
import lightBoxStore from "@/stores/lightBox.js"
import LoginBox from '@/components/LoginBox.vue'
import { mapActions } from 'pinia'
import userStore from '@/stores/user'


export default {
    components: {
        LoginBox,
    },
    data() {
        return {
            userStoreData: userStore(),
            lightBoxStore: lightBoxStore(),
            username: '',
            psw6666: '',
            showLightbox: false,
            //header v-for v-show
            currentTitle: '',
            currentHoverIndex: -1,
            currentTitlePh: '',
            currentHoverIndexPh: -1,

            name: [
                '/ProductList',
                '/SecondHandList',
                '/News',
                '/ShopInformation',
                '/MemberCenter',
                '/Cart',
            ],
            img: [
                { i: 'nav/nav-icon-01.png' },
                { i: 'nav/nav-icon-02.png' },
                { i: 'nav/nav-icon-07.png' },
                { i: 'nav/nav-icon-04.png' },
                { i: 'nav/nav-icon-05.png' },
                { i: 'nav/nav-icon-06.png' },
            ],
            title: [
                { p: 'PRODUCT' },
                { p: '2nd HAND' },
                { p: 'EVENTS' },
                { p: 'SHOP INFO' },
                { p: 'MEMBER' },
                { p: 'MY CART' },
            ],
            namePh: [
                '/ProductList',
                '/SecondHandList',
                '/News',
                '/ShopInformation',
                '/MemberCenter',
                '/Cart',
            ],
            imgPh: [
                { i: 'nav/nav-icon-01.png' },
                { i: 'nav/nav-icon-02.png' },
                { i: 'nav/nav-icon-07.png' },
                { i: 'nav/nav-icon-04.png' },
                { i: 'nav/nav-icon-05.png' },
                { i: 'nav/nav-icon-06.png' },
            ],
            titlePh: [
                { ph: 'PRODUCT' },
                { ph: '2nd HAND' },
                { ph: 'EVENTS' },
                { ph: 'SHOP INFO' },
                { ph: 'MEMBER' },
                { ph: 'MY CART' },
            ],
        }
    },
    created() {
        // 判斷有沒有登入過
        this.checkLogin()
    },
    methods: {
        getImageUrl(paths) {
            return new URL(`../assets/imgs/${paths}`, import.meta.url).href
        },
        changeImageTitle(index) {
            this.currentTitle = this.title[index].p;
            this.currentHoverIndex = index;
        },
        resetImageTitle() {
            this.currentHoverIndex = -1;
        },
        changeImageTitlePh($index) {
            console.log('Index:', $index);
            console.log('titlePh[index]:', this.titlePh[$index]);

            if (this.titlePh[$index]) {
                this.currentTitle = this.titlePh[$index].ph;
                this.currentHoverIndexPh = $index;
            }
        },
        resetImageTitlePh() {
            this.currentHoverIndexPh = -1;
        },
        openLightbox() {
            this.lightBoxStore.openLightbox()
        },
        closeLightbox() {
            this.lightBoxStore.closeLightbox()
        },
        ...mapActions(userStore, ['checkLogin', 'updateToken']),
        logout() {
            // 調用pinia的updateToken
            const confirmLogout = confirm('確定要登出嗎？');

            if (confirmLogout) {
                //清除token和userData
                this.userStoreData.updateToken('')
                this.userStoreData.updateUserData('')
                localStorage.removeItem("imagePreview")
                //登入是燈箱沒有頁面就不跳轉頁面了
                location.reload()
                // this.$router.push('/')
            }
        },
        handleClick(e) {
            if (e.target.id === 'loginOverlay') {
                this.closeLightbox();
            } else if (e.target.tagName === 'A' && e.target.href.endsWith('/Register')) {
                this.$router.push('/Register');
                this.closeLightbox();
            }
        },
        onScroll() {
            const scrollTop = document.documentElement.scrollTop + document.body.scrollTop
            const headerDom = this.$refs.header
            if (headerDom) {
                if (scrollTop >= 100) {
                    if (!headerDom.classList.contains('hidden')) {
                        headerDom.classList.add('hidden');
                    }
                } else {
                    headerDom.classList.remove('hidden');
                }
            }
        }
    },
    mounted() {
        document.addEventListener('scroll', this.onScroll);
    },
    computed: {
        isLoggedIn() {
            return !!this.userStoreData.token
        },
    },
    beforeDestroy() {
        document.removeEventListener('scroll', this.onScroll)
    },
}
</script>

<template>
    <header class="mainHeaderIndex" ref="header">
        <nav>
            <!-- 電腦版header -->
            <!-- 內頁才有這個LOGO圖 -->
            <RouterLink to="/">
                <img src="@/assets/imgs/nav/nav-logo.png" alt="caraCarLogo" class="indexNavLogo">
            </RouterLink>
            <ul class="indexHeaderNav">
                <li class="indexHeaderButton" v-for="(item, index) in img" :key="item" @mouseenter="changeImageTitle(index)"
                    @mouseleave="resetImageTitle()">
                    <RouterLink :to="name[index]">
                        <img :src="getImageUrl(item.i)" class="indexHeaderButtonIcon" v-show="currentHoverIndex !== index">
                        <div class="indexHeaderButtonP" v-if="currentHoverIndex === index">{{ title[index].p }}</div>
                    </RouterLink>
                </li>
                <div class="line"></div>
                <div class="indexHeaderLogin" v-if="!isLoggedIn">
                    <img src="@/assets/imgs/nav/nav-icon-Login.png" alt="login" class="indexHeaderButtonLogin"
                        @click="openLightbox">
                </div>
                <div class="indexHeaderLogin" v-else>
                    <img src="@/assets/imgs/nav/nav-icon-Logout.png" alt="Logout" class="indexHeaderButtonLogin"
                        @click="logout">
                </div>
            </ul>
        </nav>
    </header>
    <!-- 手機板haeder -->
    <ul class="indexHeaderNavPh">
        <li class="indexHeaderButtonPh" v-for="(item, $index) in imgPh" :key="item">
            <RouterLink :to="namePh[$index]">
                <img :src="getImageUrl(item.i)" class="indexHeaderButtonIconPh">
                <div class="indexHeaderButtonPhP">{{ titlePh[$index].ph }}</div>
            </RouterLink>
        </li>
        <div class="linePh"></div>
        <div class="indexHeaderLoginPh" v-if="!isLoggedIn">
            <img src="@/assets/imgs/nav/nav-icon-Login-Ph.png" alt="login" class="indexHeaderButtonLoginPh"
                @click="openLightbox">
        </div>
        <div class="indexHeaderLoginPh" v-else>
            <img src="@/assets/imgs/nav/nav-icon-Logout-Ph.png" alt="logout" class="indexHeaderButtonLoginPh"
                @click="logout">
        </div>
    </ul>
    <Transition name="fade">
        <LoginBox v-if="lightBoxStore.showLightbox" />
    </Transition>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/layout/header.scss';
</style>
