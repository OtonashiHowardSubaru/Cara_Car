<template>
  <header class="mainHeader">
    <h1>我是header的h1</h1>
    <h2>Test init</h2>

    <nav>
        <RouterLink class="RouterLink" to="/">Home</RouterLink>
        <RouterLink class="RouterLink" to="/about">About</RouterLink>
        <RouterLink class="RouterLink" to="/Product">Product</RouterLink>
        <RouterLink class="RouterLink" to="/Test">Test</RouterLink>
        <RouterLink class="RouterLink" to="/Login">Login</RouterLink>
        <RouterLink class="RouterLink" to="/BackLogin">BackLogin</RouterLink>
      </nav>
  </header>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
export default{
  components: {
    RouterLink,
    RouterView,
  }
}
</script>

<style>
  .RouterLink{
    padding: 0 50px;
    border: 1px solid black;
    margin: 0 10px;
  }
</style>
