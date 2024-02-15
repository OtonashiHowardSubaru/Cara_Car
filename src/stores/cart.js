import{defineStore} from 'pinia';

export const useCartStore = defineStore('cartStore',{
    state:()=>{
        return{
            cartList: JSON.parse(localStorage.getItem("items")) || [],
            userInput:'',


        }
    },
    actions:{
        addToCart(product){
            // console.log('Adding to cart:', product);
            // if (!product || typeof product.prod_img1 === 'undefined') {
            // console.error('Invalid product object or missing prod_img1 property');
            // return;
            // }

            //判斷商品是否已在購物車
            const index = this.cartList.findIndex(p=>p.id===product.id)
            if(index !== -1){
                const cartItem = this.cartList.find(item=>item.id === product.id)
                if(cartItem){
                    cartItem.quantity += product.quantity;
                }
            }else{
                this.cartList.push(product)
            };
            this.saveLocalstorage();
    },
    newQuantityUpdate(id, action){
        //判斷是否已在購物車中
        const cartItem = this.cartList.find(item => item.id === id)
        if(!cartItem) return;
        if(action === 'increment'){
            cartItem.quantity += 1
        }else if(action === 'decrement'&& cartItem.quantity>1){
            cartItem.quantity -= 1
        }
        this.saveLocalstorage();
    },
    saveLocalstorage(){
        localStorage.setItem("item",JSON.stringify(this.cartList))
    },
}
})

