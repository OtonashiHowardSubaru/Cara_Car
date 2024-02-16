<template>
    <button @click="show = !show">客服小幫手</button>
    <Transition>
        <!-- 消息顯示區域 -->
        <div id="app" >
            <section ref="chatArea" class="chat-area">
                <p v-for="message in messages" :key="message.body" class="message"
                    :class="{ 'message-out': message.author === 'you', 'message-in': message.author !== 'you' }">
                    {{ message.body }}
                </p>
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
                    <button type="submit"><i class="fa-regular fa-paper-plane"></i></button>
                </form>
            </section>
        </div>
    </Transition>
</template>
  
<script>
import { ref, nextTick } from 'vue';

export default {
    setup() {
        const show = ref(false)
        const CaraMessage = ref('');
        const youMessage = ref('');
        const messages = ref([
            {
                body: 'Welcome to the Cara Car, I\'m Cara!',
                author: 'Cara',
            },
            {
                body: 'Thank you, Cara!',
                author: 'you',
            },
            {
                body: 'You\'re most welcome.',
                author: 'Cara',
            },
        ]);

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

            nextTick(() => {
                const messageDisplay = this.$refs.chatArea;
                messageDisplay.scrollTop = messageDisplay.scrollHeight;
            });
        };

        const clearAllMessages = () => {
            messages.value = [];
        };

        return {
            CaraMessage,
            youMessage,
            messages,
            sendMessage,
            clearAllMessages,
        };
    },
};
</script>
  
<style lang="scss" scoped>
@import '@/assets/scss/components/chatBox.scss';
</style>
  