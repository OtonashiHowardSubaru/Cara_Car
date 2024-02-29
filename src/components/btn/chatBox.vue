<template>
    <button @click="show = !show" class="chatBoxBird">
        <div class="birdCloud">
            <div class="bird"><img src="@/assets/imgs/draw/ChatBoxBird1.png" alt=""></div>
            <div class="cloud"><img src="@/assets/imgs/draw/ChatBoxCloud.png" alt=""></div>
        </div>
    </button>
    <Transition>
        <!-- 消息顯示區域 -->
        <!-- <div v-if="show" :class="{'--is-show': show}"> -->
        <div v-if="show" class="afterChatBird">
            <section class="chatBoxTop">
                <div class="chatBoxTitle">\ Cara Car 客服小幫手 /</div>
                <div class="close" @click.stop="closeBox">&times;</div>
            </section>
            <section ref="chatArea" class="chat-area">
                <div class="newsSpeaker">
                    <i class="fa-solid fa-bullhorn" style="color: #6f7f9b;"></i>
                    <div class="marqueee">
                        <div class="marquee">
                            <p> 新年快樂!!親愛的CaRa Car顧客：新的一年開始，CaRa Car將帶給您嶄新的驚喜！我們推出了「網上預訂折扣」活動，讓您在2024年的第一天即可享受購物的超讚優惠。</p>
                        </div>
                    </div>
                </div>
                <div class="newsSpeaker"></div>
                <div v-for="message in messages" :key="message.body" class="HeadMess">
                    <div class="avatar"><img src="@/assets/imgs/draw/ChatBoxAvatar.png" alt=""></div>
                    <div class="avatar2"><img src="@/assets/imgs/draw/ChatBoxAvatar2.png" alt=""></div>
                    <p v-if="message.hasLinkButton" class="message-with-link">
                        {{ message.body }}
                        <br>
                        <button><router-link class="RouterLink" :to="message.routerLink">{{ message.routerLinkText ||
                            '前往了解更多' }} <i class="fa-solid fa-arrow-up-right-from-square"></i></router-link></button>

                    </p>
                    <p v-else class="message"
                        :class="{ 'message-out': message.author === 'you', 'message-in': message.author !== 'you' }">
                        {{ message.body }}
                    </p>
                    <!-- <div v-if="isUser" >ICON</div> -->
                </div>
            </section>
            <section class="chat-inputs">
                <div class="swiperQ" ref="swiperQ" @wheel="handleWheel" @mousedown="startDrag" @mousemove="handleDrag" @mouseup="endDrag">
                    <div class="QButton">
                        <div class="QButton1">
                            <button @click="askDefaultQuestion1">了解更多<br>Cara Car</button>
                            <button @click="askDefaultQuestion2">查看<br>最新優惠</button>
                            <button @click="askDefaultQuestion3">我想了解<br>二手車</button>
                        </div>
                        <div class="QButton2">
                            <button @click="askDefaultQuestion4">想知道<br>購物流程</button>
                            <button @click="askDefaultQuestion5">成為<br>Cara Car</button>
                            <button @click="askDefaultQuestion6">測驗<br>小遊戲</button>
                        </div>
                    </div>
                </div>
                <div class="inPutArea">
                    <form @submit.prevent="sendMessage('in')" id="person1-form">
                        <label for="person1-input">Cara</label>
                        <input v-model="CaraMessage" id="person1-input" type="text" placeholder="Type your message">
                        <button type="submit">Send</button>
                    </form>
                    <!-- <button @click="clearAllMessages">Clear All</button> -->
                    <form @submit.prevent="sendMessage('out')" id="person2-form">
                        <label for="person2-input"></label>
                        <input v-model="youMessage" id="person2-input" type="text" placeholder="請輸入您的提問">
                        <button type="submit"><i class="fa-regular fa-paper-plane fa-xl"></i></button>
                    </form>
                </div>
            </section>
        </div>
    </Transition>
</template>
  
<script>
import { ref, nextTick, watch } from 'vue';

export default {
    setup() {
        const show = ref(false)
        const CaraMessage = ref('');
        const youMessage = ref('');
        const messages = ref([
            {
                body: '歡迎來到 Cara Car, I\'m Cara!',
                author: 'Cara',
            },
            {
                body: 'Hello, Cara! 我有問題想要發問!',
                author: 'you',
            },
            {
                body: '很高興為您服務!儘管提問吧!',
                author: 'Cara',
            },
        ]);
        let isDragging = false;
        let startX = 0;
        let scrollLeft = 0;

        const startDrag = (event) => {
            isDragging = true;
            startX = event.clientX;
            scrollLeft = event.currentTarget.scrollLeft;
        };

        const handleDrag = (event) => {
            if (!isDragging) return;

            const deltaX = event.clientX - startX;
            event.currentTarget.scrollLeft = scrollLeft - deltaX;

        };

        const endDrag = () => {
            isDragging = false;
        };
        const swiperQ = ref(null);


        // onMounted(() => {
        //   swiperQ.value = document.querySelector('.swiperQ');
        // });
        const handleWheel = (event) => {
            // 檢查是否有 deltaX 或 deltaY 屬性，若無則設置為 0
            const delta = event?.deltaX || event?.deltaY || 0;            
             // 阻止滾輪事件的默認行為，防止其他滾輪的滾動
            event.preventDefault();
            // 根據滾輪的滾動方向調整 swiperQ 容器的左右滾動位置
            if (swiperQ.value) {
                swiperQ.value.scrollLeft -= delta;
            }
        };




        const askDefaultQuestion1 = () => {
            // 將預設 問題 填入消息框中
            messages.value.push({
                body: "我想了解更多Cara Car",
                author: 'you',  // 使用者提出問題
            });
            // 將相對應的預設 回答 填入消息框中
            const defaultAnswer1 = "好呀!!沒問題!可以前往關於我們的頁面查看哦~";
            messages.value.push({
                body: defaultAnswer1,
                author: 'Cara',  // 回答由Cara提供
                hasLinkButton: true,
                routerLink: "/About",   //導到其他頁面
            });
            // 滾動到聊天室底部
            nextTick(() => {
                if (chatArea.value) {
                    chatArea.value.scrollTop = chatArea.value.scrollHeight;
                }
            });

        };
        const askDefaultQuestion2 = () => {
            messages.value.push({
                body: "我想查看最新優惠。",
                author: 'you',
            });
            const defaultAnswer1 = "Cara Car不定期會推出優惠活動，歡迎參考最新消息的頁面。";
            messages.value.push({
                body: defaultAnswer1,
                author: 'Cara',
                hasLinkButton: true,
                routerLink: "/News",
            });
            nextTick(() => {
                if (chatArea.value) {
                    chatArea.value.scrollTop = chatArea.value.scrollHeight;
                }
            });

        };
        const askDefaultQuestion3 = () => {
            messages.value.push({
                body: "我想了解二手車相關資訊。",
                author: 'you',
            });
            const defaultAnswer1 = "歡迎您將二手兒童車輛賣給Cara Car，請聯絡我們客服進行詳細的交易流程。";
            messages.value.push({
                body: defaultAnswer1,
                author: 'Cara',
                hasLinkButton: true,
                routerLink: "/SecondHandSale",
            });
            nextTick(() => {
                if (chatArea.value) {
                    chatArea.value.scrollTop = chatArea.value.scrollHeight;
                }
            });

        };
        const askDefaultQuestion4 = () => {
            messages.value.push({
                body: "我想知道購物流程。",
                author: 'you',
            });
            const defaultAnswer1 = "1.加入購物車：點擊加入購物車，確認購物內容。2.結帳：進入結帳頁面，填寫收件資訊及選擇付款方式。3.付款：選擇適合的付款方式完成交易。4.確認訂單：完成付款後，確認訂單明細及付款資訊。5.寄送商品：等待Cara Car寄送商品到您指定的地址。";
            messages.value.push({
                body: defaultAnswer1,
                author: 'Cara',
            });
            nextTick(() => {
                if (chatArea.value) {
                    chatArea.value.scrollTop = chatArea.value.scrollHeight;
                }
            });

        };
        const askDefaultQuestion5 = () => {
            messages.value.push({
                body: "我想成為Cara Car的一員。",
                author: 'you',
            });
            const defaultAnswer1 = "歡迎光臨Cara Car!點選網站右上角註冊按鈕,填寫資料即可成為會員。";
            messages.value.push({
                body: defaultAnswer1,
                author: 'Cara',
                hasLinkButton: true,
                routerLink: "/MemberCenter",
            });
            nextTick(() => {
                if (chatArea.value) {
                    chatArea.value.scrollTop = chatArea.value.scrollHeight;
                }
            });

        };
        const askDefaultQuestion6 = () => {
            messages.value.push({
                body: "我要去哪裡玩小遊戲呢?",
                author: 'you',
            });
            const defaultAnswer1 = "歡迎進行我們的小遊戲測驗，找出屬於您的兒童車吧~";
            messages.value.push({
                body: defaultAnswer1,
                author: 'Cara',
                hasLinkButton: true,
                routerLink: "/Game",
            });
            nextTick(() => {
                if (chatArea.value) {
                    chatArea.value.scrollTop = chatArea.value.scrollHeight;
                }
            });

        };

        const chatArea = ref()
        // onMounted(() => {
        //     nextTick(() => {
        //         chatArea.value.scrollTop = chatArea.value.scrollHeight;
        //     });
        // });

        watch(show, () => {
            nextTick(() => {
                chatArea.value.scrollTop = chatArea.value.scrollHeight;
                handleWheel();
            });
        })

        const sendMessage = (direction) => {
            if (!youMessage.value && !CaraMessage.value) {
                return;
            }

            if (direction === 'out') {
                messages.value.push({ body: youMessage.value, author: 'you' });
                // 檢查 youMessage 是否包含汽車關鍵字
                if (youMessage.value.toLowerCase().includes('汽車')) {
                    // 如果包含，自動回覆預設的答案
                    messages.value.push({ body: "哇，汽車真是個有趣的話題！歡迎到Cara Car 挑選您喜愛的兒童汽車哦!", author: 'Cara' });
                } else if (youMessage.value.toLowerCase().includes('二手車')) {
                    // 檢查 youMessage 是否包含二手車關鍵字
                    messages.value.push({ body: "如果有興趣知道販售二手車的流程的話，可以參考我們要賣車的網頁唷~裡面有詳細資訊~", author: 'Cara' , hasLinkButton: true, routerLink: "/SecondHandSale"});
                } else if (youMessage.value.toLowerCase().includes('購物車')) {
                    // 檢查 youMessage 是否包含購物車
                    messages.value.push({ body: "快把你喜愛的車款加到購物車!!喜歡就不要錯過囉~購物車要記得結帳唷!", author: 'Cara' });
                } else if (youMessage.value.toLowerCase().includes('cara')) {
                    // 檢查 youMessage 是否包含cara
                    messages.value.push({ body: "Cara Car 很讚哦!是全國第一的兒童汽車及模型車的販賣公司唷~~", author: 'Cara' });
                } else if (youMessage.value.toLowerCase().includes('會員')) {
                    // 檢查 youMessage 是否包含會員
                    messages.value.push({ body: "歡迎光臨Cara Car!點選網站右上角註冊按鈕,填寫資料即可成為會員。", author: 'Cara' , hasLinkButton: true, routerLink: "/MemberCenter"});
                } else if (youMessage.value.toLowerCase().includes('優惠')) {
                    // 檢查 youMessage 是否包含優惠
                    messages.value.push({ body: "Cara Car不定期會推出優惠活動，歡迎參考最新消息的頁面。", author: 'Cara' ,  hasLinkButton: true, routerLink: "/News" });

                } else {
                    // 如果 youMessage 没有包含設定的關鍵字，就自動回復默認訊息
                    messages.value.push({ body: "Cara 聽不懂你的意思耶~請洽客服人員，進一步為您協助哦!!", author: 'Cara' });
                }

                youMessage.value = '';
            } else if (direction === 'in') {
                messages.value.push({ body: CaraMessage.value, author: 'Cara' });
                CaraMessage.value = '';
            } else {
                alert('something went wrong');
            }
            //受sendMessage影響
            nextTick(() => {
                if (chatArea.value) {
                    chatArea.value.scrollTop = chatArea.value.scrollHeight;
                }
            });
        };

        const clearAllMessages = () => {
            messages.value = [];
        };
        const closeBox = () => {
            show.value = false;
        };

        return {
            swiperQ,
            chatArea,
            show,
            CaraMessage,
            youMessage,
            messages,
            sendMessage,
            clearAllMessages,
            closeBox,
            askDefaultQuestion1,
            askDefaultQuestion2,
            askDefaultQuestion3,
            askDefaultQuestion4,
            askDefaultQuestion5,
            askDefaultQuestion6,
            startDrag,
            handleDrag,
            endDrag,
            handleWheel,
        };
    },

};
</script>
  
<style lang="scss" scoped>
@import '@/assets/scss/components/chatBox.scss';
</style>
  