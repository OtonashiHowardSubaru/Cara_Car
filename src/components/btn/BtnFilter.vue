<script>
export default {
  data() {
    return {
      isActive: false,
      thisArrowRef: '',
    }
  },
  props:[ 'filterName', 'filterId', ],
  created() {},
  mounted(){
    this.thisArrowRef = this.$refs.arrow;
  },
  methods: {
    handleCategory(e){
      // 設定對象
      const targetElement = e.currentTarget;
      // 取得目前right值，如果取得不到則設定預設值:0
      const currentRightValue = parseInt(targetElement.style.right) || 0;
      // 定義 toggle 的位移距離，如果目前是0則變成20，若非0則變成0
      const toggleDistance = currentRightValue === 0 ? -20 : 0;
      // 設置 toggleDistance
      targetElement.style.right = `${toggleDistance}px`;
      // 基於觸發時的right值，如果為0，則fontWeight: bold，若非0則normal
      targetElement.style.fontWeight = currentRightValue === 0 ? "bold" : "normal";
      // 旋轉當前的箭頭
      this.thisArrowRef.style.transform = `rotate(${currentRightValue == (-20) ? 45 : (-45)}deg)`

      // 清除其他正在開啟中的button、並將箭頭旋轉回來
      const allButtons = document.querySelectorAll('.pro_list_filter button');
      allButtons.forEach(button => {
        if (button !== targetElement) {
          button.style.right = '0';
          button.style.fontWeight = 'normal';
          const otherArrows = button.querySelector('.arrow_ltr');
          // console.log(otherArrows);
          otherArrows.style.transform = `rotate(45deg)`; 
        }
      });
      this.thisArrowRef.style.transform = `rotate(${currentRightValue == (-20) ? 45 : (-45)}deg)`;

      // 切換按鈕狀態
      this.isActive = !this.isActive;
      // 向父組件發送事件，傳遞篩選條件和按鈕狀態
      this.$emit('toggleFilter', this.filterName, this.isActive);
    },
  }
}
</script>
<template>
  <button @click="handleCategory" :id="filterId">
    <div class="arrow_ltr" ref="arrow"></div><p>{{ filterName }}</p>
  </button>


</template>
<style>

</style>