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

    <Menu mode="horizontal" :theme="theme" active-name="1">
        <MenuItem name="1">
            <Icon type="ios-paper" />
            内容管理
        </MenuItem>
        <MenuItem name="2">
            <Icon type="ios-people" />
            用户管理
        </MenuItem>
        <Submenu name="3">
            <template #title>
                <Icon type="ios-stats" />
                统计分析
            </template>
            <MenuGroup title="使用">
                <MenuItem name="3-1">新增和启动</MenuItem>
                <MenuItem name="3-2">活跃分析</MenuItem>
                <MenuItem name="3-3">时段分析</MenuItem>
            </MenuGroup>
            <MenuGroup title="留存">
                <MenuItem name="3-4">用户留存</MenuItem>
                <MenuItem name="3-5">流失用户</MenuItem>
            </MenuGroup>
        </Submenu>
        <MenuItem name="4">
            <Icon type="ios-construct" />
            综合设置
        </MenuItem>
    </Menu>
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
    width: 600px;
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