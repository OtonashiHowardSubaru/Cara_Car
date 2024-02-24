<script>
import axios from 'axios';
import MainHeader from '@/components/MainHeader.vue'
import userImage from '@/assets/imgs/memberCenter/userImage(default).png'
import userStore from '@/stores/user'
import { mapState, mapActions } from 'pinia'
export default {
    components: {
        MainHeader,
    },
    data() {
        return {
            //呼叫登入Pinia取得登入資訊至localStorage
            userStoreData: userStore(),
            // userDataFromStorage: JSON.parse(localStorage.getItem("userData")) || {},
            // 放localStorage也放這陣列裡面
            member: [],
            //會員頭像存放格
            storedImage: '',
            //sidebar收合
            showSubMenu: false,
            //content顯示切換
            currentProfile: 'default',
            //會員訂單顯示切換
            currentOrder: 'noPay',
            activeTab: 'noPay',
            //退貨申請顯示切換
            currentReturn: 'default2',
            activeTab2: 'default2',
            //created載入時啟動function抓視窗width
            isMobile: '',
            isDesktop: '',
            favoriteProducts: [],// 收藏清單
            imgName: '', 
            currentIndex: 0,
            favoriteProducts: [],// 收藏清單
            imgName: '', 
            currentIndex: 0,
        }
    },
    created() {
        // 監聽視窗大小變化，更新 isMobile 和 isDesktop 的值
        window.addEventListener('resize', this.updateWindowSize);
        this.updateWindowSize()
        //get在localStorage裡面
        this.userData.member_id = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")).id : "";
        this.userData.m_name = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")).name : "";
        this.userData.m_phone = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")).phone : "";
        this.userData.m_email = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")).email : "";
        this.userData.m_city = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")).city : "";
        this.userData.m_district = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")).district : "";
        this.userData.m_address = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")).address : "";
        this.userData.img_path = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")).imgUrl : "";
        this.axiosGetMem()
        // const userDataFromStorage = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : {};
        // this.userData = {
        //     member_id: userDataFromStorage.id || "",
        //     m_name: userDataFromStorage.name || "",
        //     m_phone: userDataFromStorage.phone || "",
        //     m_email: userDataFromStorage.email || "",
        //     m_city: userDataFromStorage.city || "",
        //     m_district: userDataFromStorage.district || "",
        //     m_address: userDataFromStorage.address || "",
        //     img_path: userDataFromStorage.imgUrl || "",
        // };
        // console.log(userDataFromStorage);

        // 加載收藏清單
        this.loadFavoriteProducts();
        const imgName = JSON.parse(localStorage.getItem('favoriteProducts'));
        if(imgName)
            this.favoriteProducts = imgName
            this.updateImgName();
        
    },

    computed: {
        imagePreviewUrl() {
            //可以是讀取localStorage內的照片，如果沒有就讀取預設的userImage
            return this.storedImage || userImage
            // return `${import.meta.env.VITE_IMAGES_BASE_URL}` + image
        },
        ...mapState(userStore, ['token', 'userData'])
    },

    beforeUnmount() {
        window.removeEventListener('resize', this.updateWindowSize);
    },

    methods: {
        updateWindowSize() {
            this.isMobile = window.innerWidth >= 325 && window.innerWidth < 768;
            this.isDesktop = window.innerWidth >= 768;
        },
        toggleSubMenu() {
            this.showSubMenu = !this.showSubMenu;
        },
        showProfile(profile) {
            this.currentProfile = profile;
        },
        orderState(order) {
            console.log(order);
            this.currentOrder = order;
            this.activeTab = order;
        },
        returnState(ret) {
            console.log(ret);
            this.currentReturn = ret;
            this.activeTab2 = ret;
        },
        axiosGetMem(){
            const member_id = this.userData.member_id
            axios.get(`${import.meta.env.VITE_CARA_URL}/front/getMemberName.php?member_id=${member_id}`)
            .then(res => {
                this.member = res.data
                console.log(this.member);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
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
            const formData = new FormData();
            formData.append('img_path',file)
            formData.append('member_id',this.userData.member_id)
            axios.post(`${import.meta.env.VITE_CARA_URL}/front/updateMemberImg.php?`,formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                })
                .then((res) =>{
                    console.log("上傳成功！", this.userData.img_path);
                    console.log(formData); //傳送出去的資料
                    alert('已更新會員頭像！')
                    // this.updateUserData(this.userData.img_path) //更新localStorage的資料
                    // location.reload();

                })
                .catch((error) =>{
                    console.error('錯誤', error);
                });
            reader.onload = () => {
                localStorage.setItem('imagePreview', reader.result);
                this.storedImage = reader.result
            }
            reader.readAsDataURL(file);
        },
        updateMemProfile() {
            const postData = {
                member_id: this.userData.member_id,
                m_name: this.userData.m_name,
                m_phone: this.userData.m_phone,
                m_birthday: this.userData.m_birthday,
                m_email: this.userData.m_email,
                m_city: this.userData.m_city,
                m_district: this.userData.m_district,
                m_address: this.userData.m_address,
            }
            axios.post(`${import.meta.env.VITE_CARA_URL}/front/updateMemberProfile.php`, postData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(res => {
                    console.log(postData); //傳送出去的資料
                    alert('已更新會員資料！')
                    this.updateUserData(this.userData) //更新localStorage的資料
                    location.reload();
                })

        },
        ...mapActions(userStore, ['updateUserData']),

        // 收藏功能
        loadFavoriteProducts() {
            const favoriteProducts = JSON.parse(localStorage.getItem('favoriteProducts'));
            if (favoriteProducts) {
                this.favoriteProducts = favoriteProducts;
            }
        },
        handleClick() {
            this.currentIndex = (this.currentIndex + 1) % this.favoriteProducts.length;
            this.updateImgName();
        },
        // 取得圖片的路徑函式
        getProductImgSrc(imgName) {
            return new URL(`${import.meta.env.VITE_IMG_URL}/product/new_products/${imgName}`, import.meta.url).href
        },
        updateImgName() {
            // 自动更新imgName为favoriteProducts数组中的下一个值
            // if (this.favoriteProducts.length === 0) return; // 防止数组为空时出现错误
            // this.currentIndex = (this.currentIndex + 1) % this.favoriteProducts.length;
            // this.imgName = this.favoriteProducts[this.currentIndex].img_name;
            this.imgName = this.favoriteProducts[this.currentIndex];
        }
    },
    mounted() {
        document.getElementById("upFile").addEventListener("change", this.showFile);
        this.storedImage = localStorage.getItem('imagePreview');
    },
}
</script>

<template>

    <MainHeader />
    <div class="memberCenter">

        <div class="memberTitle">
            <h1></h1>
        </div>

        <div class="memberContent">
            <!-- PC左側sidebar -->
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
                <!-- MB會員預設頭貼位置 -->
                <div class="mb_user_image" v-if="isMobile">
                    <img :src="imagePreviewUrl" alt="User Avatar" class="imagePreview">
                </div>
                <div class="welcome">
                    <h3>
                        您好{{ userData.m_name }}，歡迎光臨<br>Cara Car官網購物帳號
                    </h3>
                    <!-- PC會員預設頭貼位置 -->
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
                        <img src="../assets/imgs/memberCenter/collect.svg" alt="collect_icon"
                            @click="showProfile('collect')">
                        <p>我的收藏</p>
                    </div>
                </div>
            </div>
            <!-- 會員資料 -->
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
                    <!-- <button class="change_user_image" @click="showFile">+上傳檔案</button> -->
                </div>

                <div class="user_profile">
                    <form action="" method="post" name="" id="">
                        <div class="table">
                            <p>會員姓名</p>
                            <input type="text" name="m_name" id="m_name" v-model="userData.m_name">
                        </div>
                        <div class="table">
                            <p>連絡電話</p>
                            <input type="tel" name="m_phone" id="m_phone" v-model="userData.m_phone">
                        </div>
                        <div class="table">
                            <p>會員生日</p>
                            <input type="date" name="m_birthday" id="m_birthday" v-model="userData.m_birthday">
                        </div>
                        <div class="table">
                            <p>電子郵件</p>
                            <input type="email" name="m_email" id="m_email" v-model="userData.m_email">
                        </div>
                        <div class="table">
                            <p>聯絡地址</p>
                            <input type="address" name="m_city" id="m_city" v-model="userData.m_city">
                        </div>
                        <div class="table">
                            <p>　　　　</p>
                            <input type="address" name="m_district" id="m_district" v-model="userData.m_district">
                        </div>
                        <div class="table">
                            <p>　　　　</p>
                            <input type="address" name="m_address" id="m_address" v-model="userData.m_address">
                        </div>
                    </form>
                    <input id="send" type="submit" name="button" @click="updateMemProfile()" value="我要修改">
                </div>

            </div>
            <!-- 會員訂單 -->
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
                            <li :class="{ active2: activeTab2 === 'handle2' }" @click="returnState('handle2')">處理中</li>
                            <li :class="{ active2: activeTab2 === 'refund' }" @click="returnState('refund')">已退款</li>
                            <li :class="{ active2: activeTab2 === 'unRefund' }" @click="returnState('unRefund')">不同意退款</li>
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
                
                <div v-if="favoriteProducts.length > 0">
                    <div class="favorite-product">
                        <ul>
                            <li v-for="product in favoriteProducts" :key="product.id">
                                <router-link to="">
                                    <img :src="getProductImgSrc(product.img_name)" alt="product image" class="favorite_product_img">
                                </router-link>
                                <h3>{{ product.pro_name }}</h3>
                                <p>${{ product.pro_price }}</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="34" viewBox="0 0 38 34" fill="none" @click="toggleFavorite(thisProduct)">
                                    <path fill-rule="evenodd" clip-rule="evenodd" :fill="isFavorite ? 'red' : 'black'" d="M7.63165 3.69477C4.73707 5.01731 2.61716 8.16489 2.61716 11.9179C2.61716 15.7512 4.18746 18.7068 6.43474 21.2402C8.28943 23.327 10.5332 25.0578 12.7212 26.7433C13.2411 27.1446 13.7576 27.5441 14.2653 27.9437C15.183 28.6678 16.0013 29.3011 16.7917 29.7635C17.5804 30.2241 18.2155 30.4352 18.7563 30.4352C19.2972 30.4352 19.9323 30.2258 20.721 29.7635C21.5113 29.3011 22.3296 28.6678 23.2474 27.9437C23.7534 27.5424 24.2716 27.1446 24.7915 26.745C26.9795 25.0561 29.2233 23.327 31.078 21.2402C33.327 18.7068 34.8955 15.7512 34.8955 11.9179C34.8955 8.16663 32.7756 5.01731 29.881 3.69477C27.0685 2.40887 23.2893 2.7491 19.6985 6.48118C19.5765 6.60783 19.4301 6.70856 19.2682 6.77737C19.1063 6.84618 18.9322 6.88164 18.7563 6.88164C18.5804 6.88164 18.4064 6.84618 18.2445 6.77737C18.0826 6.70856 17.9362 6.60783 17.8142 6.48118C14.2234 2.7491 10.4442 2.40887 7.63165 3.69477ZM18.7563 3.75758C14.7224 0.145895 10.2052 -0.36009 6.54291 1.31315C2.67998 3.0841 0 7.18781 0 11.9196C0 16.5695 1.9367 20.1184 4.47884 22.9798C6.51325 25.2707 9.00305 27.1882 11.2032 28.8806C11.7022 29.2645 12.1855 29.6379 12.6444 30.0008C13.5395 30.7057 14.4991 31.4559 15.4709 32.0247C16.4428 32.5918 17.5525 33.0541 18.7563 33.0541C19.9602 33.0541 21.0699 32.5918 22.0418 32.0247C23.0153 31.4559 23.9732 30.7057 24.8683 30.0008C25.3462 29.6242 25.8266 29.2508 26.3095 28.8806C28.5079 27.1882 30.9994 25.2689 33.0339 22.9798C35.576 20.1184 37.5127 16.5695 37.5127 11.9196C37.5127 7.18781 34.8345 3.0841 30.9698 1.31664C27.3075 -0.358345 22.7903 0.14764 18.7563 3.75758Z"/>
                                </svg>
                            </li>
                        </ul>
                        
                        
                        
                    </div>
                </div>
                <div class="collect_none" v-else>
                    <div class="collect_icon">
                        <img src="../assets/imgs/memberCenter/heart-regular.svg" alt="noCollect">
                    </div>
                    <p>收藏清單目前沒有商品</p>
                    <RouterLink to="/ProductList" class="linkToProductList">
                        <div class="productListLink">瀏覽商品</div>
                    </RouterLink>
                </div>
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