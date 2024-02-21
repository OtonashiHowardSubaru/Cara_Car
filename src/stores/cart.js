import { defineStore } from 'pinia';
import Swal from 'sweetalert2';

export default defineStore("cartStore", {
    state: () => ({
        cartItems: [],
        // ImgsName: [],
        // Swal,
    }),
    getters: {
        subtotal() {
        return this.cartItems.reduce(
            (total, item) => total + item.price * item.quantity,0
        );
        // let total = 0;
        // for (let item of this.cartItems) {
        //     total += item.price * item.quantity;
        // }
        // return total;
        },
        subFreight() {
        const baseSubFreight = 120;
        const totalQuantity = this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
        return baseSubFreight * totalQuantity;
        },
        total() {
        return this.subtotal + this.subFreight;
        },
    },
    actions: {
        getProductImgSrc(imgName){
            return new URL(`../assets/imgs/product/new_products/${imgName}`, import.meta.url).href
        },
        getLocalCartData(){
            let cartImg = localStorage.getItem("cartImg")
            let localCartData = localStorage.getItem("cartItems");
            if(localCartData){
                this.cartItems = JSON.parse(localCartData);
                this.cartImg = JSON.stringify(cartImg);
            }
        },
        // initializeCart() {
        // const cartData = JSON.parse(localStorage.getItem('cart')) || [];
        // this.cartItems = cartData;
        // },

        //加入購物車
        addToCart(thisProduct, ImgsName, qtyValue = 1){
            const existingProductIndex = this.cartItems.findIndex((item) => {
                return item.id === thisProduct.pro_id;
            });
            if (existingProductIndex === -1){
                this.cartItems.push({
                    id: thisProduct.pro_id,
                    name: thisProduct.pro_name,
                    price: thisProduct.pro_price,
                    // imageUrl:ImgsName.img_id,
                    imageUrl:ImgsName.img_name,
                    quantity: qtyValue,
                })
            }else{
                // this.cartItems[existingProductIndex].quantity += qtyValue;

                const oldCount = this.cartItems[existingProductIndex]["quantity"];
                this.cartItems[existingProductIndex] = {
                    ...this.cartItems[existingProductIndex],
                    quantity: oldCount + qtyValue,
                };
            }
            localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
            console.log(this.cartItems);
            // const product = {
            // id: this.thisProduct.pro_id,
            // name: this.thisProduct.pro_name,
            // price: this.thisProduct.pro_price,
            // imageUrl: this.getProductImgSrc(this.ImgsName[0].img_name),
            // quantity: parseInt(this.qtyValue === '' ? 1 : this.qtyValue),
            // };
            // 從本地端中獲取已有的購物車內容，如果没有則初始化為空值
            // let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

            // 將當前商品添加到購物車中，重複商品時則更新數量
            // let existingProductIndex = cartItems.findIndex(item => item.id === product.id);
            // if (existingProductIndex !== -1) {
            // // 如果購物車中已有相同商品，則更新其數量
            // cartItems[existingProductIndex].quantity += product.quantity;
            // } else {
            // // 若不是則將商品添加到購物車
            // cartItems.push(product);
            // };

            // cartItems.push(product);
            // 將更新後的購物車數據保存到本地端
            // localStorage.setItem('cart', JSON.stringify(cartItems));
            
            return  Swal.fire({
                    title: '已加入購物車!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                })
        },
        reduceFromCart(thisProduct){
            const productIndex = this.cartItems.findIndex(
                (item) => item.id == thisProduct.id
            );
            if(this.cartItems[productIndex]){
                if(this.cartItems[productIndex]["quantity"]>1){
                    this.cartItems[productIndex]={
                        ...this.cartItems[productIndex],
                        quantity: this.cartItems[productIndex]["quantity"] - 1,
                    };
                }
            }
            localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
        },
        increaseFromCart(thisProduct){
            const productIndex = this.cartItems.findIndex(
                (item) => item.id == thisProduct.id
            );
            if(this.cartItems[productIndex]){
                if(this.cartItems[productIndex]){
                    this.cartItems[productIndex]={
                        ...this.cartItems[productIndex],
                        quantity: this.cartItems[productIndex]["quantity"] + 1,
                    };
                }
            }
            localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
        },
        clearCartData(){
            this.cartItems = [];
        },


        // updateQuantity(index, newQuantity) {
        // if (newQuantity < 1) {
        //     this.cartItems.splice(index, 1);
        // } else {
        //     this.cartItems[index].quantity = newQuantity;
        // }
        // this.saveCartData();
        // },
        // saveCartData() {
        // localStorage.setItem('cart', JSON.stringify(this.cartItems));
        // },
    },
});
