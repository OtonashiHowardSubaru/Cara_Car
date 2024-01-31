<script>
  export default {
    data(){
      return {
      }
    },
    methods: {
      handleQtyPlus(e) {
        e.preventDefault();
        const currentVal = parseInt(e.target.parentNode.querySelector('.qty').value) || 0;
        e.target.parentNode.querySelector('.qty').value = currentVal + 1;
      },
      handleQtyMinus(e) {
        e.preventDefault();
        const currentVal = parseInt(e.target.parentNode.querySelector('.qty').value) || 0;
        if (currentVal > 0) {
          e.target.parentNode.querySelector('.qty').value = currentVal - 1;
        }
      },
    }
}
</script>
<template>
  <div class="number_select">
    <input type="button" value="-" class="qtyMinus" @click="handleQtyMinus($event)">
    <input type="text" name="quantity" value="0" class="qty">
    <input type="button" value="+" class="qtyPlus" @click="handleQtyPlus($event)">
  </div>
</template>
<style lang="scss" scoped>
  // @import '@/assets/scss/components/btn.scss';
</style>