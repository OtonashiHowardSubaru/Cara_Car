import { defineStore } from 'pinia';
import Swal from 'sweetalert2';

export default defineStore("cartStore", {
    state: () => {
        // cartItems: []
        return{
            cartItems: []
        }
    },
    getters: {
        subtotal() {
        return this.cartItems.reduce(
            (total, item) => total + item.price * item.quantity,0
        );
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
            return new URL(`${import.meta.env.VITE_IMG_BASE_URL}/product/new_products/${imgName}`).href
        },
        getLocalCartData(){
            console.log('getLocalCartData in')
            let localCartData = localStorage.getItem("cartItems");
            console.log(localCartData);
            if(localCartData){
                this.cartItems = JSON.parse(localCartData);
            }
        },

        //加入購物車
        addToCart(thisProduct, qtyValue = 1){
            const existingProductIndex = this.cartItems.findIndex((item) => {
                return item.id == thisProduct.pro_id ;
            });
            if (existingProductIndex === -1){
                this.cartItems.push({
                    id: thisProduct.pro_id,
                    name: thisProduct.pro_name,
                    price: thisProduct.pro_sale,
                    imageUrl:thisProduct.img_name,
                    quantity: qtyValue,
                })
            }else{
                this.cartItems[existingProductIndex].quantity += qtyValue;

                // const oldCount = this.cartItems[existingProductIndex]["quantity"];
                // this.cartItems[existingProductIndex] = {
                //     ...this.cartItems[existingProductIndex],
                //     quantity: oldCount + qtyValue,
                // };
            }
            localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
            console.log(this.cartItems);
            
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
                }else{
                    this.cartItems.splice(productIndex, 1);
                }
            }
            localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
        },
        increaseFromCart(thisProduct){
            const productIndex = this.cartItems.findIndex(
                (item) => item.id == thisProduct.id
            );

            if(productIndex !== -1){
                this.cartItems[productIndex].quantity++;
                
            }else{
                this.addToCart(thisProduct, 1);
            }
            localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
        },

        clearCartData(){
            this.cartItems = [];
        },

    },
});
