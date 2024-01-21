<script> //這一段是定義import圖片的方法
const imgUrl = new URL('../assets/imgs/cat.jpg', import.meta.url).href
export default {
  data() {
    return{}
  },
  methods:{
  },
  mounted() {
  }
}
</script>


<template>
  <div class="home">
      <h1>This is a home page</h1>
      <h2>Test init</h2>
  </div>
</template>

<style></style>

<style scoped>

</style>
