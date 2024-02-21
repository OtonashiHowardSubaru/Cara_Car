// import { defineStore } from "pinia";
// export default defineStore("userStore", {
// 對應 data
// state: () => ({
// 
// token: "",
// name: "",
// userData:{}
// }),
// 對應 computed (物件形式)
// getters: {
// getUserName: (state) => `歡迎 ${state.name}`,
// },
// 對應 methods (物件形式)
// actions: {
//         updateToken(val){
//             console.log(val);
//             this.token = val;
//         }
//     },
// });

// https://pinia.vuejs.org/core-concepts/state.html
import { defineStore } from 'pinia'

export default defineStore('userStore', {
    // 對應 data
    state: () => ({
        token: localStorage.getItem("token") || "",
        // token: '',   // 後端僅返回token(通行證/令牌)
        userData: {}, // 可以在login API中返回user資訊
        name: '',
        // wallet: '',
    }),

    // 對應 computed (物件形式)
    getters: {
        // getUserName: (state) => `歡迎 ${state.name}`
    },

    // 對應 methods (物件形式)
    actions: {
        checkLogin() {
            const storageToken = localStorage.getItem("userToken");
            if (this.token) {
                return this.token; // 如果存儲庫中已經設定了 token，則返回它。
            } else if (storageToken) {
                this.token = storageToken
                return storageToken; // 如果 localStorage 中存儲有 token，則返回它。
            } else {
                return ""; // 如果找不到 token，則返回空字串。
            }
        },
        updateToken(payload) {
            console.log(payload);
            // 定義一個名為 updateToken 的方法，接受一個 payload 作為參數。
            if (payload) {
              this.token = payload; // 將存儲庫中的 token 設定為提供的 payload。
              localStorage.setItem("token", payload); // 將 token 存儲到 localStorage 中。
            } else {
              this.token = ""; // 如果未提供 payload，則清除存儲庫中的 token。
              localStorage.removeItem("token"); // 從 localStorage 中刪除 token。
            }
        },
        // updateName(val) {
        //     // 定義一個名為 updateName 的方法，接受一個 payload 作為參數。
        //     this.name = val.m_name; // 使用提供的 payload 更新存儲庫中的名稱。
        //     localStorage.setItem('userName',JSON.stringify(this.name));
        // },
        updateUserData(val) {
            // console.log(val);
            this.userData = {
                id: val.member_id,
                name: val.m_name,
                phone: val.m_phone,
                email: val.m_email,
                birthday: val.m_birthday,
                address: val.m_city+val.m_district+val.m_address,
                state: val.m_state,
                imgUrl: val.img_path,
                // 如果有權限可以把權限角色記載資料庫
                role: "editor",
            };
            localStorage.setItem("userData", JSON.stringify(this.userData));
        },
        // updateUserData(payload) {
        //     this.userData = {
        //         name: payload.mem_name,
        //         validation: payload.mem_validation,
        //         state: payload.mem_state,
        //         role: "editor",
        //     };
        //     localStorage.setItem("userData", JSON.stringify(this.userData));
        // },
        checkUserData() {
            const storageUserData = localStorage.getItem("userData");
            console.log(Object.keys(this.userData).length);
            if (Object.keys(this.userData).length > 0) {
                return this.userData;
            } else if (storageUserData) {
                this.userData = JSON.parse(storageUserData);
                return storageUserData;
            } else {
                return "";
            }
        },
    }
})
