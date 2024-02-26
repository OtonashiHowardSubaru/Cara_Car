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
            y: 235,
            startX: 400,
            speedX: 0.8,
            speedY: 0,
            startMovingYAtX: 565,
            gap: 40,
            range: 0,
        };

        
    },
mounted() {
    this.bannerCanvas();
    this.animate();
    // window.addEventListener('resize', this.handleResize);
},
// beforeDestroy() {
//     window.removeEventListener('resize', this.handleResize);
// },
methods: {
    // handleResize(){
    //     this.setCanvasWidth();
    //     // this.animateR();
    // },
    // setCanvasWidth(){
    //     const canvas = this.$refs.canvas;

    //     canvas.width = document.documentElement.clientWidth;
    //     canvas.height = 1100;
    // },
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
    pic2.src = 'src/assets/imgs/Home/indexBannerImg2.svg';
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

    },

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
        let canvas = this.$refs.canvas;
        let context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);



        let x = this.x;  // 使用 this.x 取得資料
        let y = this.y;
        let startX = this.startX;
        let speedX = this.speedX;
        let speedY = this.speedY;

        
        x += speedX;    
        let startMovingYAtX = this.startMovingYAtX;    

        if (x >= startX + startMovingYAtX) {
            speedY = 0.4;
        }

        y += speedY;


        if (this.pic1) {
            context.drawImage(this.pic1, 280, 80, 1000, 965);
            
        }

        context.drawImage(this.pic4, x, y, 200, 150);
        context.drawImage(this.pic2, 286, 80, 1010, 965);

        if (y > 400) {
            y = 270;
            x = startX;
            speedY = 0;
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

<style>

</style>
