<template>
  <footer class="mainFooter">
    <h1>我是footer的h1</h1>
    <!-- {{ targetValue }} -->
    {{ content1 }}
    {{ content2 }}
    <input type="number" v-model="money">
    <Button @click="callMoney">給我錢</Button>

  </footer>
</template>

<script>
export default{
  data() {
    return{
      targetValue: 0
    }
  },
  props: ['content1','content2'],
  created() {},
  methods: {
    callMoney(){
      console.log('123');
      // 利用emit去呼叫父層更新資訊
      // 
      this.$emit('callParentPay', this.money);
    },
  }
}
</script>

<style>

</style>
