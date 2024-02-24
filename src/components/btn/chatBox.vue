<template>
    <button @click="show = !show" class="chatBoxBird">
        <div class="birdCloud">
            <div class="bird"><img src="../../assets/imgs/draw/ChatBoxBird1.png" alt=""></div>
            <div class="cloud"><img src="../../assets/imgs/draw/ChatBoxCloud.png" alt=""></div>
        </div>
    </button>
    <!-- <button @click="show = !show" class="chatBoxBird"><img src="../../assets/imgs/draw/ChatBoxBird.png" alt=""></button> -->
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
                            <p> \新年快樂/!!親愛的CaRa Car顧客：新的一年開始，CaRa Car將帶給您嶄新的驚喜！我們推出了「網上預訂折扣」活動，讓您在2024年的第一天即可享受購物的超讚優惠。</p>
                        </div>
                    </div>
                </div>
                <div class="newsSpeaker"></div>
                <div v-for="message in messages" :key="message.body" class="HeadMess">
                    <div class="avatar"><img src="../../assets/imgs/draw/ChatBoxAvatar.png" alt=""></div>
                    <div class="avatar2"><img src="../../assets/imgs/draw/ChatBoxAvatar2.png" alt=""></div>
                    <p class="message"
                    :class="{ 'message-out': message.author === 'you', 'message-in': message.author !== 'you' }">
                    {{ message.body }}
                </p>
                    <!-- <div v-if="isUser" >ICON</div> -->
                </div>
            </section>
            <section class="chat-inputs">
                <form @submit.prevent="sendMessage('in')" id="person1-form">
                    <label for="person1-input">Cara</label>
                    <input v-model="CaraMessage" id="person1-input" type="text" placeholder="Type your message">
                    <button type="submit">Send</button>
                </form>
                <!-- <button @click="clearAllMessages">Clear All</button> -->
                <form @submit.prevent="sendMessage('out')" id="person2-form">
                    <label for="person2-input"></label>
                    <input v-model="youMessage" id="person2-input" type="text" placeholder="Type your message">
                    <button type="submit"><i class="fa-regular fa-paper-plane fa-xl"></i></button>
                </form>
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

        
        const chatArea = ref()
        
        watch(show, () => {
            nextTick(() => {
                chatArea.value.scrollTop = chatArea.value.scrollHeight;
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
                    messages.value.push({ body: "如果有興趣知道販售二手車的流程的話，可以參考我們要賣車的網頁唷~裡面有詳細資訊~", author: 'Cara' });
                } else if (youMessage.value.toLowerCase().includes('購物車')) {
                    // 檢查 youMessage 是否包含購物車
                    messages.value.push({ body: "購物車要記得結帳唷!", author: 'Cara' });
                } else if (youMessage.value.toLowerCase().includes('cara')) {
                    // 檢查 youMessage 是否包含cara
                    messages.value.push({ body: "Cara Car 很讚哦!", author: 'Cara' });

                } else {
                    // 如果 youMessage 没有包含設定的關鍵字，就自動回復默認訊息
                    messages.value.push({ body: "請洽客服人員", author: 'Cara' });
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
                chatArea.value.scrollTop = chatArea.value.scrollHeight;
            });
        };

        const clearAllMessages = () => {
            messages.value = [];
        };
        const closeBox = () => {
            show.value = false;
        };

        return {
            chatArea,
            show,
            CaraMessage,
            youMessage,
            messages,
            sendMessage,
            clearAllMessages,
            closeBox,
        };
    },

};
</script>
  
<style lang="scss" scoped>
@import '@/assets/scss/components/chatBox.scss';
</style>
  