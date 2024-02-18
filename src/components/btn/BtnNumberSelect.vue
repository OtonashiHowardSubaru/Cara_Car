<script>
export default {
  // data() {
  //   return {
  //     qtyValue: 1,
  //   };
  // },
  props: {
    qtyValue: {
      type: Number,
      default: 1,
    }
  },
  // props:[
  // // 'qtyValue'
  // ],
    
  methods: {
    handleQtyChange(increment) {
      let qtyValue = parseInt(this.$refs.qtyInput.value);
      qtyValue = isNaN(qtyValue) || qtyValue < 1 ? 1 : qtyValue + increment;
      this.$refs.qtyInput.value = qtyValue;
      this.qtyValue = qtyValue;
      this.$emit('qtyValue',this.qtyValue);
      this.$emit('change', this.qtyValue);
    },
  },
};
</script>
<template>
  <div class="number_select">
    <input type="button" value="-" class="qtyMinus" @click="handleQtyChange(-1)">
    <input type="text" name="quantity" :value="qtyValue" class="qty" ref="qtyInput" @keydown.enter.prevent>
    <input type="button" value="+" class="qtyPlus" @click="handleQtyChange(1)">
  </div>
</template>
<style lang="scss" scoped>
  // @import '@/assets/scss/components/btn.scss';
</style>