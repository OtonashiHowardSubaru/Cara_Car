<template>
    <div>
        <canvas ref="canvas"></canvas>
    </div>
</template>
    
<script>
import indexBannerImg5 from '@/assets/imgs/Home/indexBannerImg5.png';
import indexBannerImg6 from '@/assets/imgs/Home/indexBannerImg6.png';
import CaraCar from '@/assets/imgs/Home/CaraCar.svg';
import jump from '@/assets/imgs/Home/jump.png';
import think from '@/assets/imgs/Home/think.png';
import ball from '@/assets/imgs/Home/ball.png';
import sing from '@/assets/imgs/Home/sing.png';
import balloon from '@/assets/imgs/Home/balloon.png';
export default {
    data() {
        return {
            pic1: '',
            pic2: new Image(),
            pic4: new Image(),
            pic3: new Image(),
            pic5: new Image(),
            pic6: new Image(),
            pic7: new Image(),
            pic8: new Image(),
            x: 150,
            y: 180,
            startX: 150,
            startY: 180,
            speedX: 0.4,
            speedY: 0,
            startMovingYAtX: 210,
            gap: 40,
            range: 0,
        };


    },
    mounted() {
        this.bannerCanvas();
        this.animate();

    },

    methods: {

        bannerCanvas() {
            let canvas = this.$refs.canvas;
            let context = canvas.getContext('2d');
            let dpr = window.devicePixelRatio || 1;

            canvas.width = document.documentElement.clientWidth*dpr;
            canvas.height = 550*dpr;

            canvas.style.width = document.documentElement.clientWidth + "px";
            canvas.style.height = 550 + "px";
            context.scale(dpr, dpr);

            context.imageSmoothingEnabled = false;

            let gap = 40;
            let range;

            if (canvas.width > canvas.height) {
                range = canvas.width / gap;
            } else {
                range = canvas.height / gap;
            }

            for (let i = 0; i <= range; i++) {
                let interval = i * 40;

                context.moveTo(0, interval);
                context.lineTo(canvas.width, interval);

                context.moveTo(interval, 0);
                context.lineTo(interval, canvas.height);
            }

            context.strokeStyle = 'rgba(0,0,0,0.3)';


            let pic1 = new Image();
            pic1.src = indexBannerImg5;
            pic1.onload = () => {
                // console.log('pic1 loaded successfully');
                this.pic1 = pic1;
                this.animate();
            };

            let pic2 = this.pic2;
            pic2.src = indexBannerImg6;
            pic2.onload = () => {
                // console.log('pic2 loaded successfully');
                this.pic2 = pic2;
            };

            let pic4 = this.pic4;
            pic4.src = CaraCar;
            pic4.onload = () => {
                // console.log('pic4 loaded successfully');
                this.pic4 = pic4;
            };
            let pic3 = this.pic3;
            pic3.src = jump;
            pic3.onload = () => {
                this.pic3 = pic3;
            };
            let pic5 = this.pic5;
            pic5.src = think;
            pic5.onload = () => {
                this.pic5 = pic5;
            };
            let pic6 = this.pic6;
            pic6.src = ball;
            pic6.onload = () => {
                this.pic6 = pic6;
            };
            let pic7 = this.pic7;
            pic7.src = sing;
            pic7.onload = () => {
                this.pic7 = pic7;
            };
            let pic8 = this.pic8;
            pic8.src = balloon;
            pic8.onload = () => {
                this.pic8 = pic8;
            };

        },

        loadImage() {
            // Handle image loading
            this.pic1 = new Image();
            this.pic1.src = indexBannerImg;

            this.pic1.onload = () => {
                // console.log('pic1 loaded successfully');
                // 在這裡執行 animate 或其他操作
            };

            this.pic1.onerror = (error) => {
                // console.error('Error loading image:', error);
            };
        },
        animate() {
            let canvas = this.$refs.canvas;
            let context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);



            let x = this.x;  // 使用 this.x 取得資料
            let y = this.y;
            let startX = this.startX;
            let startY = this.startY;
            let speedX = this.speedX;
            let speedY = this.speedY;


            x += speedX;
            let startMovingYAtX = this.startMovingYAtX;

            if (x >= startX + startMovingYAtX) {
                speedY = 0.2;
            }

            y += speedY;


            if (this.pic1) {
                context.drawImage(this.pic1, 100, 120, 400, 378);

            }

            context.drawImage(this.pic4, x, y, 80, 55);
            context.drawImage(this.pic2, 100, 120, 400, 378);

            let pic3YOffset = Math.sin(Date.now() / 350) * 5; // Adjust the amplitude and frequency as needed
            context.drawImage(this.pic3, 250 , 290+ pic3YOffset, 65, 45);

            let pic5XOffset = Math.sin(Date.now() / 500) * 5; // Adjust the amplitude and frequency as needed
            context.drawImage(this.pic5, 120+ pic5XOffset , 375, 70, 80);

            let pic6YOffset = Math.sin(Date.now() / 400) * 3; // Adjust the amplitude and frequency as needed
            context.drawImage(this.pic6, 250 , 410+ pic6YOffset, 70, 70);

            let pic7XOffset = Math.sin(Date.now() / 500) * 3; // Adjust the amplitude and frequency as needed
            context.drawImage(this.pic7, 360+ pic7XOffset , 230, 45, 55);

            let pic8YOffset = Math.sin(Date.now() / 200) * 4; // Adjust the amplitude and frequency as needed
            context.drawImage(this.pic8, 410 , 380+ pic8YOffset, 40, 25);

            if (y > 230) {
                y = 190;
                x = startX;
                speedY = 0;

                if (y >= 190) {
                    y = startY;
                }
            }

            this.x = x;  // 更新資料
            this.y = y;
            this.speedY = speedY;

            // requestAnimationFrame(this.animate);
            // requestAnimationFrame(() => this.animate());
            requestAnimationFrame(this.animate.bind(this));
        },
    },
};
</script>
    
<style></style>
    