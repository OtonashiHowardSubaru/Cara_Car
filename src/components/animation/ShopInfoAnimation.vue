<template>

    <div class="bgAnime">
        <img src="/src/assets/imgs/shopInfo/longStreetv2.jpg" alt="longStreetv2">
        <img src="/src/assets/imgs/shopInfo/longStreet2v2.png" alt="longStreet2v2">

        <div class="animaImg">
            <img src="/src/assets/imgs/shopInfo/animaPic/car.png" alt="car" class="animaImg-car">
            <!-- <img src="/src/assets/imgs/shopInfo/animaPic/boy-doze.png" alt="boy-doze" id="animaImg-boyDoze"> -->
            <div id="animaImg-boyDoze"></div>

        </div>

        

    </div>

</template>

<script>
import gsap from 'gsap';
import { onMounted, onUnmounted } from 'vue';

export default {
    setup() {
        onMounted(() => {

            // 設定底圖動畫
            var image = document.querySelector(".bgAnime");

            // 使用TweenMax創建動畫
            var tl = gsap.timeline({ repeat: -1 }); // 無限循環播放

            // 定義動畫
            tl.to(image, {
                duration: 20, // 動畫持續時間
                y: "-100%", // 向下移動100%的高度
                ease: "linear" // 使用線性緩動
            });

            // 調整視口高度以匹配圖片高度
            gsap.set(document.body, { height: image.offsetHeight });

            // 調整視窗大小時更新視口高度
            window.addEventListener("resize", function() {
                gsap.set(document.body, { height: image.offsetHeight });
            });

            

        });

        onUnmounted(() => {
            // Cleanup code if needed
            // For example, remove event listeners
            window.removeEventListener("resize", function() {
                // Your event listener removal logic
            });
        });
    }
}
</script>




<style lang="scss" scoped>
@import '@/assets/scss/components/animation/shopInfoAnimation.scss';
</style>