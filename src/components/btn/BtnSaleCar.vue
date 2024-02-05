<template>
    <!-- 我要賣車的表格按鈕lightbox -->
    <div id="SellCarFormOverlay" @click="handleClick">
        <div id="SellCarFormModal">
            <span class="close" @click.stop="closeLightbox">&times;</span>
            <div class="SellCarForm_container">
                <h2>我要賣車</h2>
                <div class="SellCarForm_textarea">
                    <!-- @submit.prevent="sign_up" id="sign_up_form" method="post" -->
                    <div class="SellCarFormItem">
                        <div class="ContactName">
                            <p>聯絡人姓名</p>
                            <input 
                            type="name" 
                            id="ContactName" 
                            name="ContactName"
                            placeholder="輸入姓名" 
                            v-model="ContactName" 
                            required 
                            />
                        </div>
                        <div class="sex">
                            <input 
                            type="radio" 
                            id="sex" 
                            name="sex"
                            value="sex" 
                            v-model="sex" 
                            />
                            <label for="man">先生</label>

                            <input 
                            type="radio" 
                            id="sex" 
                            name="sex"
                            value="sex" 
                            v-model="picked" 
                            />
                            <label for="lady">小姐</label>
                        </div>
                    </div>

                    <div class="SellCarFormItem">
                        <div class="ContactEmail">
                            <p>電子郵件</p>
                            <div class="email">
                                <input 
                                name="mem_account" 
                                id="mem_account" 
                                type="email" 
                                placeholder="cara_car@gmail.com"
                                v-model="ContactEmail" 
                                required 
                                />
                            </div>
                        </div>
                        <div class="phone">
                            <p>連絡電話</p>
                            <div class="ContactPhone">
                                <input 
                                type="phone" 
                                id="ContactPhone" 
                                name="ContactPhone" 
                                placeholder="連絡電話"
                                v-model="ContactPhone" 
                                required 
                                />
                            </div>
                        </div>
                    </div>

                    <div class="SellCarFormItem">
                        <div class="time">
                            <p>連絡時間</p>
                            <!-- <div class="ContactTime">
                                <input 
                                type="date" 
                                id="date" 
                                name="ContactTime" 
                                placeholder="聯絡時間"
                                v-model="ContactTime" 
                                required 
                                />
                            </div> -->
                            <select v-model="ContactTime" >
                                <option disabled value="聯絡時間">請選擇</option>
                                <option>10:00-11:00</option>
                                <option>11:00-12:00</option>
                                <option>12:00-13:30</option>
                                <option>13:30-15:30</option>
                                <option>15:30-17:30</option>
                                <option>17:30-19:30</option>
                                <option>19:30-20:30</option>
                                <option>我整天都有空!!</option>
                            </select>
                        </div>

                        <div class="residence">
                            <p>居住地區</p>
                            <div class="residence">
                                <input 
                                type="text" 
                                id="residence" 
                                name="residence" 
                                placeholder="桃園中壢"
                                v-model="residence" 
                                required 
                                />
                            </div>
                        </div>
                    </div>
                    <div class="SellCarFormItem">
                        <div class="carNum">
                            <p>車型編號</p>
                            <div class="carNum">
                                <input 
                                type="text" 
                                id="carNum" 
                                name="carNum" 
                                placeholder="ABC-123"
                                v-model="carNum" 
                                required 
                                />
                            </div>
                        </div>

                        <div class="carColor">
                            <p>車輛顏色</p>
                            <div class="carColor_input">
                                <input 
                                type="carColor" 
                                id="carColor" 
                                name="carColor" 
                                placeholder="白色+紅色"
                                v-model="carColor" 
                                required 
                                />
                            </div>
                        </div>
                    </div>

                </div>

                <div class="other_SellCarForm">
                    <h2>照片及影片上傳</h2>
                    <div class="SellCarForm_upload">
                        <div class="SellCarForm_upload_video">
                            影片
                            <input 
                            type="file" 
                            id="video" 
                            name="uploadVideo" 
                            placeholder="">
                        </div>
                        <div class="SellCarForm_upload_pic">
                            照片
                            <input type="file" id="picture" name="uploadPic" placeholder="">
                        </div>
                        <div class="SellCarForm_upload_pic">
                            照片
                            <input type="file" id="picture" name="uploadPic" placeholder="">
                        </div>
                        <div class="SellCarForm_upload_pic">
                            照片
                            <input type="file" id="picture" name="uploadPic" placeholder="">
                        </div>
                        <div class="SellCarForm_upload_pic">
                            照片
                            <input type="file" id="picture" name="uploadPic" placeholder="">
                        </div>
                        <div class="SellCarForm_upload_pic">
                            照片
                            <input type="file" id="picture" name="uploadPic" placeholder="">
                        </div>
                    </div>
                    <div class="SellCarForm_price">
                        <div class="carColor">
                            <p>期望價格</p>
                            <div class="carColor_input">
                                <input type="carColor" id="carColor" name="carColor" placeholder="6000">元
                            </div>
                        </div>
                    </div>
                    <div class="submit">
                        <p>確定送出</p>
                        <div class="submit_input">
                            <input type="submit" id="submit" name="submit" placeholder="">
                        </div>
                    </div>
                    <div class="SellCarForm_price">
                        <p>注意事項 : 請注意車輛照片及影片的清晰度，想好之後再送出，謝謝您。</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import lightBoxForm from "@/stores/lightBoxForm.js"
export default {
    data() {
        return {
            lightBoxForm: lightBoxForm(),
        };
    },
    methods: {
        closeLightbox() {
            this.lightBoxForm.closeLightbox()
        },

        handleClick(e) {
            // console.log(e)
            if (e.target.id === 'SellCarFormOverlay') {
                this.closeLightbox();
            }
            // else if (e.target.tagName === 'A' && e.target.href.endsWith('/Register')) {
            //     this.$router.push('/Register');
            //     this.closeLightbox();
            // }
        },
    },
}

</script>


<style lang="scss" scoped>
// @import "@/assets/scss/page/second_hand_sale.scss";
@import "@/assets/scss/components/saleCarbtn.scss";
</style>

