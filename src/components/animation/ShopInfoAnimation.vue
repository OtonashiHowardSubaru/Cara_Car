<template>

    <div class="bgAnime">
        <img src="/src/assets/imgs/shopInfo/longStreetv2.jpg" alt="longStreetv2" class="longStreetv2">
        <img src="/src/assets/imgs/shopInfo/longStreet2v2.png" alt="longStreet2v2" class="longStreet2v2">

        <div class="animaImg">
            <img src="/src/assets/imgs/shopInfo/animaPic/car.png" alt="car" class="animaImg-car">
            <img src="/src/assets/imgs/shopInfo/animaPic/ship.png" alt="ship" class="animaImg-ship">
            <img src="/src/assets/imgs/shopInfo/animaPic/train.png" alt="train" class="animaImg-train">
            <img src="/src/assets/imgs/shopInfo/animaPic/balloon.png" alt="balloon" class="animaImg-balloon">
            <img src="/src/assets/imgs/shopInfo/animaPic/sale.png" alt="sale" class="animaImg-sale">
            <div class="animaImg-boyDoze"></div>
            <div class="animaImg-grandpama"></div>
            <div class="animaImg-girl"></div>
            <div class="animaImg-breading"></div>
            <div class="animaImg-shopping"></div>
            <div class="animaImg-purchasing"></div>
            <div class="animaImg-balloonBoy"></div>
            <div class="animaImg-chatFamily"></div>
            <div class="animaImg-sportBoy"></div>
            <div class="animaImg-sportGirl"></div>
            <img src="/src/assets/imgs/shopInfo/animaPic/football.png" alt="football" class="animaImg-football">
            <div class="animaImg-mermaid"></div>
            <div class="animaImg-fish"></div>
            <div class="animaImg-surfboardBoy"></div>
            <div class="animaImg-chattingCP"></div>
            <div class="animaImg-dogging"></div>
            <div class="animaImg-catWalk"></div>
            <div class="animaImg-watering"></div>


            <img src="/src/assets/imgs/shopInfo/animaPic/car.png" alt="car" class="animaImg-car2">
            <img src="/src/assets/imgs/shopInfo/animaPic/ship.png" alt="ship" class="animaImg-ship2">
            <img src="/src/assets/imgs/shopInfo/animaPic/train.png" alt="train" class="animaImg-train2">
            <img src="/src/assets/imgs/shopInfo/animaPic/balloon.png" alt="balloon" class="animaImg-balloon2">
            <img src="/src/assets/imgs/shopInfo/animaPic/sale.png" alt="sale" class="animaImg-sale2">
            <div class="animaImg-boyDoze2"></div>
            <div class="animaImg-grandpama2"></div>
            <div class="animaImg-girl2"></div>
            <div class="animaImg-breading2"></div>
            <div class="animaImg-shopping2"></div>
            <div class="animaImg-purchasing2"></div>
            <div class="animaImg-balloonBoy2"></div>
            <div class="animaImg-chatFamily2"></div>
            <div class="animaImg-sportBoy2"></div>
            <div class="animaImg-sportGirl2"></div>
            <img src="/src/assets/imgs/shopInfo/animaPic/football.png" alt="football" class="animaImg-football2">
            <div class="animaImg-mermaid2"></div>
            <div class="animaImg-fish2"></div>
            <div class="animaImg-surfboardBoy2"></div>
            <div class="animaImg-chattingCP2"></div>
            <div class="animaImg-dogging2"></div>
            <div class="animaImg-catWalk2"></div>
            
            <div class="animaImg-walkBoy"></div>

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
            var image = document.querySelector (".bgAnime");

            // 使用TweenMax創建動畫
            var tl = gsap.timeline({ repeat: -1 }); // 無限循環播放

            // 定義動畫
            tl.to(image, {
                duration: 70, // 動畫持續時間
                y: "-410%", // 向下移動100%的高度
                ease: "linear", // 使用線性緩動
                delay:5,
            });
            tl.to(image, {
                // duration: 20, // 動畫持續時間
                delay:8,
            });

            // 調整視口高度以匹配圖片高度
            gsap.set(document.body, { height: image.offsetHeight });

            // 調整視窗大小時更新視口高度
            window.addEventListener("resize", function() {
                gsap.set(document.body, { height: image.offsetHeight });
            });

            

            // 車車 animaImg-car
            gsap.timeline()
            .to(".animaImg-car",{
                duration: 0.2,
                // x: "-300px",
                y: "1.5px",
                // ease: "linear",
                delay:2,
            })
            .to(".animaImg-car",{
                duration: 0.5,
                // x: "-300px",
                y: "0px",
                // ease: "linear",
                // delay:2,
            })
            .to(".animaImg-car",{
                duration: 3,
                x: "-300px",
                y: "-50px",
                ease: "linear",
                delay:1,
            })

            gsap.timeline()
            .to(".animaImg-car2",{
                duration: 0.2,
                // x: "-300px",
                y: "1.5px",
                // ease: "linear",
                delay:20,
            })
            .to(".animaImg-car2",{
                duration: 0.5,
                // x: "-300px",
                y: "0px",
                // ease: "linear",
                // delay:2,
            })
            .to(".animaImg-car2",{
                duration: 3,
                x: "-300px",
                y: "-50px",
                ease: "linear",
                delay:1,
            })


            // 高鐵 animaImg-train
            gsap.timeline({repeat:-1})
            .fromTo(".animaImg-train",{
                // duration: 1,
                x: "0px",
                y: "-200px",
                ease: "linear",
                
            },{
                duration: 2.5,
                x: "1300px",
                y: "300px",
                ease: "linear",
                delay:1,
            })
            .to(".animaImg-train", {
                duration: 4,
                x: "-1300px",
                y: "-700px",
                ease: "linear",
                delay:3,
            })

            gsap.timeline({repeat:-1})
            .fromTo(".animaImg-train2",{
                // duration: 1,
                x: "0px",
                y: "-200px",
                ease: "linear",
                delay:20,
                
            },{
                duration: 3,
                x: "1300px",
                y: "300px",
                ease: "linear",
                delay:1,
            })
            .to(".animaImg-train2", {
                duration: 4,
                x: "-1300px",
                y: "-700px",
                ease: "linear",
                delay:3,
            })

            // 船 animaImg-ship
            gsap.timeline()
            .to(".animaImg-ship",{
                x:"-7px",
                y:"1px",
                rotation: 5, // 旋轉角度
                duration: 2, // 持續時間
                ease: "none", // 緩動函數
                repeat: -1, // 重複次數（-1 表示無限重複）
                yoyo: true // 反向動畫
                
            })
            gsap.timeline()
            .to(".animaImg-ship2",{
                x:"-7px",
                y:"1px",
                rotation: 5, 
                duration: 2, 
                ease: "none", 
                repeat: -1, 
                yoyo: true 
                
            })

            // 手 animaImg-sale
            gsap.timeline()
            .to(".animaImg-sale",{
                // x:"-7px",
                y:"1px",
                rotation: 10, 
                duration: 1, 
                ease: "none",
                repeat: -1, 
                yoyo: true 
                
            })

            gsap.timeline()
            .to(".animaImg-sale2",{
                // x:"-7px",
                y:"1px",
                rotation: 10, 
                duration: 1, 
                ease: "none",
                repeat: -1, 
                yoyo: true 
                
            })

            // 散步爺爺奶奶 animaImg-grandpama
            gsap.timeline()
            .to(".animaImg-grandpama",{
                x:"10px",
                y:"-20px",
                duration: 2, 
                ease: "none",  
            })
            .to(".animaImg-grandpama",{
                x:"40px",
                y:"-80px",
                duration: 6, 
                ease: "none",   
            })
            .to(".animaImg-grandpama",{
                x:"30px",
                y:"-130px",
                duration: 6, 
                ease: "none",   
            })
            .to(".animaImg-grandpama",{
                x:"20px",
                y:"-160px",
                duration: 3, 
                ease: "none",   
            })
            .to(".animaImg-grandpama",{
                x:"-110px",
                y:"-190px",
                duration: 8, 
                ease: "none",   
            })

            gsap.timeline()
            .to(".animaImg-grandpama2",{
                x:"10px",
                y:"-20px",
                duration: 2, 
                ease: "none",
                delay:20,  
            })
            .to(".animaImg-grandpama2",{
                x:"40px",
                y:"-80px",
                duration: 6, 
                ease: "none",   
            })
            .to(".animaImg-grandpama2",{
                x:"30px",
                y:"-130px",
                duration: 6, 
                ease: "none",   
            })
            .to(".animaImg-grandpama2",{
                x:"20px",
                y:"-140px",
                duration: 3, 
                ease: "none",   
            })
            .to(".animaImg-grandpama2",{
                x:"-110px",
                y:"-180px",
                duration: 8, 
                ease: "none",   
            })

            // 足球少年
            gsap.timeline()
            .to(".animaImg-sportBoy",{
                x:"-20px",
                y:"2px",
                duration: 2, 
                ease: "none", 
                repeat: -1, 
                yoyo: true   
            })
            gsap.timeline()
            .to(".animaImg-sportBoy2",{
                x:"-20px",
                y:"2px",
                duration: 2, 
                ease: "none", 
                repeat: -1, 
                yoyo: true   
            })

            // 足球少女
            gsap.timeline()
            .to(".animaImg-sportGirl",{
                x:"-35px",
                y:"-10px",
                duration: 3, 
                ease: "none", 
                repeat: -1, 
                yoyo: true 
            })
            gsap.timeline()
            .to(".animaImg-sportGirl2",{
                x:"-35px",
                y:"-10px",
                duration: 3, 
                ease: "none", 
                repeat: -1, 
                yoyo: true 
            })

            // 足球
            gsap.timeline({ repeat: -1, yoyo: true  })
            .to(".animaImg-football",{
                x:"-20px",
                y:"40px",
                duration: 1, 
                ease: "none", 
                rotation: 360,  
            })
            .to(".animaImg-football",{
                x:"10px",
                y:"-10px",
                duration: 1, 
                ease: "none", 
                rotation: 0,
            })
            .to(".animaImg-football",{
                x:"-30px",
                y:"40px",
                duration: 1, 
                ease: "none", 
                rotation: -360,
            })

            gsap.timeline({ repeat: -1, yoyo: true  })
            .to(".animaImg-football2",{
                x:"-20px",
                y:"40px",
                duration: 1, 
                ease: "none", 
                rotation: 360,  
            })
            .to(".animaImg-football2",{
                x:"10px",
                y:"-10px",
                duration: 1, 
                ease: "none", 
                rotation: 0,
            })
            .to(".animaImg-football2",{
                x:"-30px",
                y:"40px",
                duration: 1, 
                ease: "none", 
                rotation: -360,
            })

            // 美人魚
            gsap.timeline()
            .to(".animaImg-mermaid",{
                // x:"-1px",
                y:"2px",
                duration: 2, 
                ease: "none", 
                repeat: -1, 
                yoyo: true 
            })
            gsap.timeline()
            .to(".animaImg-mermaid2",{
                // x:"-1px",
                y:"2px",
                duration: 2, 
                ease: "none", 
                repeat: -1, 
                yoyo: true 
            })

            // 魚
            gsap.timeline()
            .to(".animaImg-fish",{
                // x:"3px",
                y:"-3px",
                duration: 2, 
                ease: "none", 
                repeat: -1, 
                yoyo: true 
            })
            gsap.timeline()
            .to(".animaImg-fish2",{
                // x:"3px",
                y:"-3px",
                duration: 2, 
                ease: "none", 
                repeat: -1, 
                yoyo: true 
            })

            // 貓貓
            gsap.timeline({repeat:-1})
            .to(".animaImg-catWalk",{
                x:"-80px",
                // y:"-3px",
                duration: 2, 
                ease: "none", 
                // delay:20,
            })
            .to(".animaImg-catWalk",{
                scaleX: -1,
                delay: 2,
            })
            .to(".animaImg-catWalk",{
                x:"0px",
                duration: 2, 
                ease: "none",           
            })
            .to(".animaImg-catWalk",{
                delay:8,             
            })

            gsap.timeline({repeat:-1})
            .to(".animaImg-catWalk2",{
                x:"-80px",
                duration: 2, 
                ease: "none", 
            })
            .to(".animaImg-catWalk2",{
                scaleX: -1,
                delay: 2,
            })
            .to(".animaImg-catWalk2",{
                x:"0px",
                duration: 2, 
                ease: "none",              
            })
            .to(".animaImg-catWalk2",{
                delay:8,                   
            })

            // 魚
            gsap.timeline({repeat:-1})
            .to(".animaImg-dogging",{
                x:"180px",
                y:"-15px",
                duration: 5, 
                ease: "none", 
            })
            .to(".animaImg-dogging",{
                x:"250px",
                y:"-20px",
                duration: 2, 
                ease: "none", 
            })
            .to(".animaImg-dogging",{
                x:"310px",
                y:"-10px",
                duration: 2, 
                ease: "none", 
            })
            .to(".animaImg-dogging",{
                scaleX: -1,
                delay: 1,
            })
            .to(".animaImg-dogging",{
                x:"200px",
                y:"-20px",
                duration: 4, 
                ease: "none", 
            })
            .to(".animaImg-dogging",{
                x:"-10px",
                y:"10px",
                duration: 5, 
                ease: "none", 
            })
            .to(".animaImg-dogging",{
                // delay:10,
            })

            gsap.timeline({repeat:-1})
            .to(".animaImg-dogging2",{
                x:"180px",
                y:"-15px",
                duration: 5, 
                ease: "none", 
            })
            .to(".animaImg-dogging2",{
                x:"250px",
                y:"-20px",
                duration: 2, 
                ease: "none", 
            })
            .to(".animaImg-dogging2",{
                x:"310px",
                y:"-10px",
                duration: 2, 
                ease: "none", 
            })
            .to(".animaImg-dogging2",{
                scaleX: -1,
                delay: 1,
            })
            .to(".animaImg-dogging2",{
                x:"200px",
                y:"-20px",
                duration: 4, 
                ease: "none", 
            })
            .to(".animaImg-dogging2",{
                x:"-10px",
                y:"10px",
                duration: 5, 
                ease: "none", 
            })
            .to(".animaImg-dogging2",{
                delay:10,
            })


            // 走路boy
            gsap.timeline({repeat: -1})
            .to(".animaImg-walkBoy",{
                x:"-20px",
                y:"350%",
                duration: 6, 
                ease: "none", 
            })
            .to(".animaImg-walkBoy",{
                x:"-20px",
                y:"1100%",
                duration: 20, 
                ease: "none", 
            })
            .to(".animaImg-walkBoy",{
                x:"20px",
                y:"1500%",
                duration: 7, 
                ease: "none", 
            })
            .to(".animaImg-walkBoy",{
                x:"-10px",
                y:"1800%",
                duration: 7, 
                ease: "none", 
            })
            .to(".animaImg-walkBoy",{
                x:"0px",
                y:"2100%",
                duration: 8, 
                ease: "none", 
            })
            .to(".animaImg-walkBoy",{
                x:"-20px",
                y:"3100%",
                duration: 25, 
                ease: "none", 
            })
            .to(".animaImg-walkBoy",{
                x:"10px",
                y:"3400%",
                duration: 5.4, 
                ease: "none", 
            })
            .to(".animaImg-walkBoy",{
                x:"-10px",
                y:"3800%",
                duration: 6, 
                ease: "none", 
            })


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