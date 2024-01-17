<template>
    <h1>我是H1</h1>
    <h2>我是H2</h2>
    <h3>我是H3</h3>
    <h4>我是H4</h4>
    <h5>我是H5</h5>
    <h6>我是H6</h6>
    <Button type="primary">Confirm</Button>

    <Carousel class="Carousel" loop>
        <CarouselItem v-model="targetValue" loop>
            <div class="demo-carousel">1</div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">2</div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">3</div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">4</div>
        </CarouselItem>
    </Carousel>
</template>

<script>
    export default {
    data(){
        return {
            targetValue : 0,
        }
    },
    created() {
        
    },
    methods: {
        
    }
    }
</script>

<style scoped>
.Carousel{
    width: 500px;
}
    .demo-carousel{
        height: 80px;
        background-color: #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        color: slateblue;
    }
</style>