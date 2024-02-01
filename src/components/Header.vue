<script>
import lightBoxStore from "@/stores/lightBox.js"
import LoginBox from '@/components/LoginBox.vue'
export default {
    components: {
        LoginBox,
    },
    data() {
        return {
            lightBoxStore: lightBoxStore(),
            username: '',
            psw6666: '',
            showLightbox: false,
            //header v-for v-show
            currentTitle: '',
            currentHoverIndex: -1,
            name: [
                '/ProductList',
                '/SecondHandList',
                '/Game',
                '/ShopInformation',
                '/MemberCenter',
                '/Cart',
            ],
            img: [
                { i: 'nav/nav-icon-01.png' },
                { i: 'nav/nav-icon-02.png' },
                { i: 'nav/nav-icon-03.png' },
                { i: 'nav/nav-icon-04.png' },
                { i: 'nav/nav-icon-05.png' },
                { i: 'nav/nav-icon-06.png' },
            ],
            title: [
                { p: 'PRODUCT' },
                { p: '2nd HAND' },
                { p: 'GAME' },
                { p: 'SHOP INFO' },
                { p: 'MEMBER' },
                { p: 'MY CART' },
            ],
        }
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
        handleClick(e) {
            if (e.target.id === 'loginOverlay') {
                this.closeLightbox();
            } else if (e.target.tagName === 'A' && e.target.href.endsWith('/Register')) {
                this.$router.push('/Register');
                this.closeLightbox();
            }
        },
        openLightbox() {
            // this.showLightbox = true;
            this.lightBoxStore.openLightbox()
        },
        closeLightbox() {
            // this.showLightbox = false;
            this.lightBoxStore.closeLightbox()
        },
        onScroll(){
            const scrollTop = document.documentElement.scrollTop + document.body.scrollTop
            const headerDom = this.$refs.header
            if(headerDom){
                if(scrollTop >= 100){
                    if(!headerDom.classList.contains('hidden')){
                        headerDom.classList.add('hidden');
                    }
                }else{
                    headerDom.classList.remove('hidden');
                }
            }
        }
    },
    mounted(){
        document.addEventListener('scroll',this.onScroll);
    },
    beforeDestroy(){
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
                <img src="../assets/imgs/nav/nav-logo.png" alt="caraCarLogo" class="indexNavLogo">
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
                <div class="indexHeaderLogin">
                    <img src="../assets/imgs/nav/nav-icon-Login.png" alt="login" class="indexHeaderButtonLogin"
                        @click="openLightbox">
                </div>
            </ul>
        </nav>
    </header>
    <Transition name="fade">
        <LoginBox v-if="lightBoxStore.showLightbox"/>
    </Transition>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/layout/header.scss';
@import '@/assets/scss/layout/login.scss';
</style>
