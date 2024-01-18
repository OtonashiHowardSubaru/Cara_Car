<template>
  <header class="mainHeader" id="mainHeader">
    <h2>讓我推</h2>
    <nav>
      <ul>
        <li>
          <div class="indexHeaderButton">
            <a href="#">
              <img src="" alt="">
            </a>
          </div>
        </li>
      </ul>
    </nav>
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
import { VueElement } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
export default{
  components: {
    RouterLink,
    RouterView,
  },
}
// Vue.creatApp({

// }).mount('#mainHeader')
</script>

<style>
  .RouterLink{
    padding: 0 50px;
    border: 1px solid black;
    margin: 0 10px;
  }
  .indexHeaderButton{
    background-color: blue;
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
</style>
