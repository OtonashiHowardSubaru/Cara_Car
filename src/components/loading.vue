<template>
  <div class="loadingBox" v-if="this.isLoading">
    <div class="loadingContainer">
      <div class="container1">
        <div class="dot">
          <img src="../assets/imgs/nav/logoC.png" alt="logoC">
        </div>
        <div class="dot">
          <img src="../assets/imgs/nav/logoA.png" alt="logoA">
        </div>
        <div class="dot">
          <img src="../assets/imgs/nav/logoR.png" alt="logoR">
        </div>
        <div class="dot">
          <img src="../assets/imgs/nav/logoA2.png" alt="logoA2">
        </div>
      </div>
      <div class="container2">
        <div class="dot shadow">
          <img src="../assets/imgs/nav/logoC.png" alt="logoC">
        </div>
        <div class="dot shadow">
          <img src="../assets/imgs/nav/logoA.png" alt="logoA">
        </div>
        <div class="dot shadow">
          <img src="../assets/imgs/nav/logoR.png" alt="logoR">
        </div>
        <div class="dot shadow">
          <img src="../assets/imgs/nav/logoA2.png" alt="logoA2">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";

export default {
  data() {
    return {};
  },
  props: ["isLoading"],
  mounted() {
    gsap.from(".container1 .dot", {
      y: -40,
      duration: 0.5,
      stagger: {
        each: 0.2,
        repeat: -1,
        yoyo: true,
      },
      ease: "power1.in",
    });

    gsap.from(".container2 .dot", {
      y: 60,
      duration: 0.5,
      stagger: {
        each: 0.2,
        repeat: -1,
        yoyo: true,
      },
      ease: "power1.in",
      opacity: 0,
    });
  },
  methods: {},
};
</script>
<style></style>
