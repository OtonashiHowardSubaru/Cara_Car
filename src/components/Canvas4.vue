<template>
    <div>
        <canvas ref="canvas"></canvas>
    </div>
</template>
    
<script>
import indexBannerImg from '@/assets/imgs/Home/indexBannerImg.svg';
import indexBannerImg2 from '@/assets/imgs/Home/indexBannerImg2.svg';
import CaraCar from '@/assets/imgs/Home/CaraCar.svg';
export default {
    data() {
        return {
            pic1: '',
            pic2: new Image(),
            pic4: new Image(),
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

            canvas.width = document.documentElement.clientWidth;
            canvas.height = 550;

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
            pic1.src = indexBannerImg;
            pic1.onload = () => {
                // console.log('pic1 loaded successfully');
                this.pic1 = pic1;
                this.animate();
            };

            let pic2 = this.pic2;
            pic2.src = indexBannerImg2;
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
                context.drawImage(this.pic1, 100, 120, 400, 383);

            }

            context.drawImage(this.pic4, x, y, 80, 55);
            context.drawImage(this.pic2, 100, 120, 400, 383);

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
    