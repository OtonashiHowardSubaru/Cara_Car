import { defineStore } from "pinia";
export default defineStore("lightBoxForm", {
    // 對應 data
    state: () => ({
        // 
        showLightbox: false,
    }),
    // 對應 computed (物件形式)
    getters: {
        // getUserName: (state) => `歡迎 ${state.name}`,
    },
    // 對應 methods (物件形式)
    actions: {
        openLightbox() {
            this.showLightbox = true;
        },
        closeLightbox() {
            this.showLightbox = false;
        },
    },
});
