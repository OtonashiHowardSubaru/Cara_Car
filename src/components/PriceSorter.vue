<script>
export default {
    data() {
        return {
        selectedSort: "0", // 預設為0，也就是不排序
        };
    },
    methods: { 
        handleSortChange() { 
            //當發生變化，觸發sortChange呼叫，並通過newSort來傳遞value
            //改成methods的寫法則需要在下方追加@change
            this.$emit("sortChange", this.selectedSort);
        },
    },
};
</script>
<template>
    <select name="" id="priceSorter" v-model="selectedSort" @change="handleSortChange">
        <option value="0"></option>
        <option value="desc">價格  ↓</option>
        <option value="asc">價格  ↑</option>
    </select>
</template>
<style>

</style>