<template>
<div>
    <canvas ref="canvas"></canvas>
</div>
</template>

<script>
export default {
    data(){
        return{
            pic1:'',
            pic2: new Image(),
            pic4: new Image(),
            x: 400,
            y: 260,
            startX: 400,
            speedX: 1.5,
            speedY: 0,
            startMovingYAtX: 500,
            gap: 40,
            range: 0,
        };

        
    },
mounted() {
    this.bannerCanvas();
    window.addEventListener('resize', this.handleResize);
},
beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
},
methods: {
    handleResize(){
        this.setCanvasWidth();
        this.animate();
    },
    setCanvasWidth(){
        const canvas = this.$refs.canvas;
        canvas.width = document.documentElement.clientWidth;
        canvas.height = 1100;
    },
    bannerCanvas() {
    let canvas = this.$refs.canvas;
    let context = canvas.getContext('2d');

    canvas.width = document.documentElement.clientWidth;
    canvas.height = 1100;

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
    pic1.src = 'src/assets/imgs/Home/indexBannerImg.svg';
    pic1.onload = () => {
        console.log('pic1 loaded successfully');
        this.pic1 = pic1;
        this.animate();
    };

    let pic2 = this.pic2;
    pic2.src = 'src/assets/imgs/Home/IMG_0970.png';
    pic2.onload = () => {
        console.log('pic2 loaded successfully');
        this.pic2 = pic2;
    };

    let pic4 = this.pic4;
    pic4.src = 'src/assets/imgs/Home/IMG_0946.png';
    pic4.onload = () => {
        console.log('pic4 loaded successfully');
        this.pic4 = pic4;
    };

    // let x = 700;
    // let y = 260;
    // let startX = x;
    // let speedX = 0.5;
    // let speedY = 0;
    // let startMovingYAtX = 590;

    // this.pic1 = pic1;
    // this.pic2 = pic2;
    // this.pic4 = pic4;
    // this.x = x;
    // this.y = y;
    // this.startX = startX;
    // this.speedX = speedX;
    // this.speedY = speedY;
    // this.startMovingYAtX = startMovingYAtX;
    },

    // animate(){
    //     // 將 this.animate 綁定到 requestAnimationFrame

    // },
    loadImage() {
    // Handle image loading
    this.pic1 = new Image();
    this.pic1.src = 'src/assets/imgs/Home/indexBannerImg.svg';


    this.pic1.onload = () => {
        console.log('pic1 loaded successfully');
        // 在這裡執行 animate 或其他操作
    };

    this.pic1.onerror = (error) => {
        console.error('Error loading image:', error);
    };
    },
    animate() {
    let gap = 40;
    // let range;
    let canvas = this.$refs.canvas;
    let context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i <= 100; i++) {
        let interval = i * 40;

        context.moveTo(0, interval);
        context.lineTo(canvas.width, interval);

        context.moveTo(interval, 0);
        context.lineTo(interval, canvas.height);
    }
    context.strokeStyle = 'rgba(0,0,0,0.3)';

    if (this.pic1) {
        context.drawImage(this.pic1, 280, 80, 1000, 965);
        
    }

    let x = this.x;  // 使用 this.x 取得資料
    let y = this.y;
    let startX = this.startX;
    let speedX = this.speedX;
    let speedY = this.speedY;
    let startMovingYAtX = this.startMovingYAtX;

    x += speedX;

    if (x >= startX + startMovingYAtX) {
        speedY = 0.5;
    }

    y += speedY;

    context.drawImage(this.pic4, x, y, 200, 150);
    context.drawImage(this.pic2, 400, 182, 375, 350);

    if (y > 400) {
        y = 260;
        x = startX;
        speedY = 0;
    }

    this.x = x;  // 更新資料
    this.y = y;
    this.speedY = speedY;

    requestAnimationFrame(this.animate.bind(this));
    },
},
};
</script>

<style>

</style>
