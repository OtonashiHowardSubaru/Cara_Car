<script>
import MainHeader from "@/components/MainHeader.vue";
import apiInstance from "@/stores/auth";
import chatBox from "@/components/btn/chatBox.vue";

export default {
  data() {
    return {
      name: "",
      birthday: "",
      email: "",
      phone: "",
      city: "",
      district: "",
      address: "",
      psw666: "",
      psw666again: "",
      passwordVisibleLeft: false,
      passwordVisibleRight: false,
    };
  },
  components: {
    MainHeader,
    chatBox,
  },
  methods: {
    togglePswLeft() {
      this.passwordVisibleLeft = !this.passwordVisibleLeft;
    },
    togglePswRight() {
      this.passwordVisibleRight = !this.passwordVisibleRight;
    },

    // 註冊事件
    register() {

      // 所有欄位都要填才能送出
      if (!this.name ||
        !this.birthday ||
        !this.email ||
        !this.phone ||
        !this.city ||
        !this.district ||
        !this.address ||
        !this.psw666 ||
        !this.psw666again) {
      alert("請填寫所有必填欄位");
      return;
    }

      // 條款一定要勾選才能送出
    const termsChecked = document.getElementById('registerChecked').checked;
    if (!termsChecked) {
      alert("請勾選同意所有條款");
      return;
    }

      if (this.psw666 !== this.psw666again) {
        alert("請確認密碼");
      } else if (this.psw666.length < 8 && this.psw666.length < 8) {
        alert("密碼至少8個字");
      } else {
        const bodyFormData = new FormData();
        bodyFormData.append("m_name", this.name);
        bodyFormData.append("m_birthday", this.birthday);
        bodyFormData.append("m_email", this.email);
        bodyFormData.append("m_phone", this.phone);
        bodyFormData.append("m_city", this.city);
        bodyFormData.append("m_district", this.district);
        bodyFormData.append("m_address", this.address);
        bodyFormData.append("member_psw", this.psw666);

        apiInstance({
          method: "post",
          url: `${import.meta.env.VITE_PHP_URL}/front/register.php`, // 改成我們的php
          headers: { "Content-Type": "multipart/form-data" }, // 跨域存取
          data: bodyFormData,
        })
          .then((res) => {
            // console.log(res);
            if (res && res.data && res.data.msg === "會員註冊成功") {
              alert("註冊成功");
              location.reload();
            } else {
              alert("註冊失敗");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  // mounted() {

  // }
};
</script>

<template>
  <MainHeader />
  <div class="register">
    <div class="registerTitle">
      <!-- <div class="line"></div> -->
      <div class="title">
        <img src="@/assets/imgs/login/JoinUsTitle.png" alt="title" />
      </div>
    </div>
    <div class="registerContent">
      <div class="textarea">
        <div class="name_birth">
          <div class="space">
            <p>會員姓名</p>
            <input v-model="name" type="text" placeholder="輸入您的姓名" />
          </div>
          <div class="space">
            <p>會員生日</p>
            <input v-model="birthday" type="date" placeholder="2024/01/01" />
          </div>
        </div>
        <div class="email_tel">
          <div class="space">
            <p>電子郵件</p>
            <input
              v-model="email"
              type="email"
              placeholder="cara_car@gmail.com"
            />
          </div>
          <div class="space">
            <p>連絡電話</p>
            <input
              v-model="phone"
              type="tel"
              placeholder="0912345678"
              maxlength="10"
            />
          </div>
        </div>
        <div class="address">
          <div class="space">
            <p>聯絡地址</p>
            <input v-model="city" type="address" placeholder="桃園市" />
          </div>
          <div class="space">
            <p>　　　　</p>
            <input v-model="district" type="address" placeholder="中壢區" />
          </div>
          <p>　　　　</p>
          <input v-model="address" type="address" placeholder="復興路46號" />
        </div>
        <div class="register_psw">
          <div class="keyin_psw">
            <p>輸入密碼</p>
            <input
              :type="passwordVisibleLeft ? 'text' : 'password'"
              v-model="psw666"
              placeholder="請輸入密碼"
              maxlength="12"
            />
            <img
              v-if="passwordVisibleLeft"
              src="@/assets/imgs/register/open-eye.svg"
              alt="closeEye"
              class="eye1"
              @click="togglePswLeft"
            />
            <img
              v-else
              src="@/assets/imgs/register/close-eye.svg"
              alt="closeOpen"
              class="eye1"
              @click="togglePswLeft"
            />
          </div>
          <div class="confirm_psw">
            <p>確認密碼</p>
            <input
              :type="passwordVisibleRight ? 'text' : 'password'"
              v-model="psw666again"
              placeholder="確認密碼"
              maxlength="12"
            />
            <img
              v-if="passwordVisibleRight"
              src="@/assets/imgs/register/open-eye.svg"
              alt="closeEye"
              class="eye2"
              @click="togglePswRight"
            />
            <img
              v-else
              src="@/assets/imgs/register/close-eye.svg"
              alt="closeOpen"
              class="eye2"
              @click="togglePswRight"
            />
          </div>
        </div>
      </div>
      <div class="check">
        <input type="checkbox" id="registerChecked" name="registerChecked" />
        <label for="registerChecked">我已閱讀並同意所有條款</label>
        <!-- <span>我已閱讀並同意所有條款</span> -->
        <div class="terms-and-privacy">
          <span>使用條款</span>
          <span>隱私政策</span>
          <span class="no-slash">推播通知</span>
        </div>
      </div>
      <div class="register_btn">
        <!-- <button @click.prevent="signup">送出並成為會員</button> -->
        <button @click="register">送出並成為會員</button>
        <RouterLink to="/">已經是會員了嗎? 在此登入</RouterLink>
      </div>
      <div class="other_register">
        <div class="other_register_title">
          <div class="other_line"></div>
          <h2>更多註冊方式</h2>
          <div class="other_line"></div>
        </div>
        <div class="register_group">
          <a href="#">
            <img
              src="@/assets/imgs/login/loginGoogle.png"
              alt="otherRegister"
            />
          </a>
          <a href="#">
            <img
              src="@/assets/imgs/login/loginFacebbok.png"
              alt="otherRegister"
            />
          </a>
          <a href="#">
            <img src="@/assets/imgs/login/loginLine.png" alt="otherRegister" />
          </a>
        </div>
      </div>
    </div>
  </div>
  <chatBox />
</template>

<style lang="scss" scoped>
@import "@/assets/scss/page/register.scss";
</style>
