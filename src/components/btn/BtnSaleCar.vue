<template>
    <!-- 我要賣車的表格按鈕lightbox -->
    <div id="SellCarFormOverlay" @click="handleClick">
        <div id="SellCarFormModal">
            <span class="close" @click.stop="confirmCloseLightbox">&times;</span>
            <div class="SellCarForm_container">
                <h2>我要賣車</h2>
                <div class="scroll">
                    <div class="SellCarForm_textarea">
                        <div class="SellCarFormItemName">
                            <div class="ContactName">
                                <p>聯絡人姓名</p>
                                <input type="name" id="ContactName" name="ContactName" placeholder="輸入姓名"
                                    v-model="ContactName" required />
                            </div>
                            <div class="sex">
                                <input type="radio" id="sex" name="sex" value="man" v-model="sex" />
                                <label for="man">先生</label>
                                <input type="radio" id="sex" name="sex" value="lady" v-model="sex" />
                                <label for="lady">小姐</label>
                            </div>
                        </div>
                        <div class="SellCarFormItem">
                            <div class="ContactEmail">
                                <p>電子郵件</p>
                                <div class="email">
                                    <input name="email" id="email" type="email" placeholder="cara_car@gmail.com"
                                        v-model="ContactEmail" required />
                                </div>
                            </div>
                            <div class="phone">
                                <p>連絡電話</p>
                                <div class="ContactPhone">
                                    <input type="phone" id="ContactPhone" name="ContactPhone" placeholder="連絡電話"
                                        v-model="ContactPhone" required />
                                </div>
                            </div>
                        </div>
                        <div class="SellCarFormItem">
                            <div class="ContactTime">
                                <p>聯絡時間</p>
                                <select type="date" id="ContactTime" name="ContactTime" placeholder="聯絡時間"
                                    v-model="ContactTime">
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
                            <div class="residenceS">
                                <p>居住地區</p>
                                <div class="residence">
                                    <input type="text" id="residence" name="residence" placeholder="桃園中壢"
                                        v-model="residence" required />
                                </div>
                            </div>
                        </div>
                        <div class="SellCarFormItem">
                            <div class="carNumS">
                                <p>車型編號</p>
                                <div class="carNum">
                                    <input type="text" id="carNum" name="carNum" placeholder="ABC-123" v-model="carNum"
                                        required />
                                </div>
                            </div>
                            <div class="carColor">
                                <p>車輛顏色</p>
                                <div class="carColor_input">
                                    <input type="carColor" id="carColor" name="carColor" placeholder="白色+紅色"
                                        v-model="carColor" required />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="other_SellCarForm">
                        <h2>照片及影片上傳</h2>
                        <div class="SellCarForm_upload">
                            <div class="SellCarForm_uploadCC">
                                <div class="SellCarForm_upload_video">
                                    <input type="file" id="video" name="uploadVideo" placeholder="" style="display: none;">
                                    <label for="video">
                                        <img src="@/assets/imgs/SecondHandSale/uploadVideo.png" alt="upFile"
                                            style="cursor: pointer;">
                                    </label>
                                </div>
                                <div class="SellCarForm_upload_pic">
                                    <input type="file" id="picture" name="uploadPic" placeholder="" style="display: none;">
                                    <label for="picture">
                                        <img src="@/assets/imgs/SecondHandSale/uploadPic.png" alt="upFile"
                                            style="cursor: pointer;">
                                    </label>
                                </div>
                            </div>
                            <div class="SellCarForm_uploadCC">
                                <div class="SellCarForm_upload_pic">
                                    <input type="file" id="picture" name="uploadPic" placeholder="" style="display: none;">
                                    <label for="picture">
                                        <img src="@/assets/imgs/SecondHandSale/uploadPic.png" alt="upFile"
                                            style="cursor: pointer;">
                                    </label>
                                </div>
                                <div class="SellCarForm_upload_pic">
                                    <input type="file" id="picture" name="uploadPic" placeholder="" style="display: none;">
                                    <label for="picture">
                                        <img src="@/assets/imgs/SecondHandSale/uploadPic.png" alt="upFile"
                                            style="cursor: pointer;">
                                    </label>
                                </div>
                            </div>
                            <div class="SellCarForm_uploadCC">
                                <div class="SellCarForm_upload_pic">
                                    <input type="file" id="picture" name="uploadPic" placeholder="" style="display: none;">
                                    <label for="picture">
                                        <img src="@/assets/imgs/SecondHandSale/uploadPic.png" alt="upFile"
                                            style="cursor: pointer;">
                                    </label>
                                </div>
                                <div class="SellCarForm_upload_pic">
                                    <input type="file" id="picture" name="uploadPic" placeholder="" style="display: none;">
                                    <label for="picture">
                                        <img src="@/assets/imgs/SecondHandSale/uploadPic.png" alt="upFile"
                                            style="cursor: pointer;">
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="formFooter">
                            <div class="SellCarForm_price">
                                <div class="SellCarForm_priceExpect">
                                    <p>期望價格</p>
                                </div>
                                <div class="SellCarForm_priceExpectIn">
                                    <input type="text" id="SellCarForm_priceExpect" name="SellCarForm_priceExpect"
                                        placeholder="1000" v-model="SellCarForm_priceExpect" required />元
                                </div>
                            </div>
                            <div class="submit">
                                <!-- <div class="submit_input"> -->
                                <input type="submit" id="submit" name="submit" placeholder="" style="display: none;">
                                <Button class="btnSubmit" type="" @click="confirmSubmit"
                                    style="cursor: pointer;">確認並送出</Button>
                                <!-- </div> -->
                            </div>
                        </div>
                        <div class="SellCarForm_notice">
                            <p>注意事項 : 請注意車輛照片及影片的清晰度，想好之後再送出，謝謝您。</p>
                        </div>
                    </div>
                </div>
                <div class="foo"></div>
            </div>
        </div>
    </div>
</template>

<script>
import lightBoxForm from "@/stores/lightBoxForm.js"
import inputVideoImage from "@/assets/imgs/SecondHandSale/uploadVideo.png"
import inputPhotoImage from "@/assets/imgs/SecondHandSale/uploadPic.png"
export default {
    data() {
        return {
            lightBoxForm: lightBoxForm(),
            ContactName: '',
            sex: '',
            ContactEmail: '',
            ContactPhone: '',
            ContactTime: '',
            residence: '',
            carNum: '',
            carColor: '',
            SellCarForm_priceExpect: '',
        };
    },
    methods: {
        //關閉燈箱
        closeLightbox() {
            this.lightBoxForm.closeLightbox()
        },
        closeLightbox(showConfirmation = false) {
            if (showConfirmation) {
                // 顯示確認對話框
                const isConfirmed = window.confirm('您確定要提交嗎？');

                // 如果用戶確認，關閉燈箱
                if (isConfirmed) {
                    alert('已完成送出，請待客服聯絡');
                    this.lightBoxForm.closeLightbox();
                }
                // 如果用戶取消，什麼都不做或進行相應的處理
            } else {
                // 直接關閉燈箱
                this.lightBoxForm.closeLightbox();
            }
        },
        confirmCloseLightbox(showConfirmation = false) {
            const isConfirmed = showConfirmation;  // 直接使用 showConfirmation 表示確認
            if (isConfirmed) {
                // 不顯示 alert，僅關閉燈箱
                this.lightBoxForm.closeLightbox();
            }
        },
        confirmSubmit() {
            // 調用 closeLightbox 方法，傳遞 true 以顯示確認對話框
            this.closeLightbox(true);
        },
        handleClick(e) {
            if (e.target.id === 'SellCarFormOverlay') {
                // 調用 confirmCloseLightbox 方法，傳遞 false 以僅關閉燈箱
                this.closeLightbox();
            }
        },
    },
}

</script>


<style lang="scss" scoped>
// @import "@/assets/scss/page/second_hand_sale.scss";
@import "@/assets/scss/components/saleCarbtn.scss";
</style>

