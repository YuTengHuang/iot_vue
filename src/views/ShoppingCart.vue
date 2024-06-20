<template>
    <div class="container">
        <div class="row">
            <div class="col-12 my-3">
                <h1 class="text-center">購物車</h1>
            </div>
            <div class="col-12 my-3">
                <template v-if="cartTotalLength()">
                    <table class="table table-striped table-hover table-bordered cart-table mb-0">
                        <thead class="table-dark text-center">
                            <tr>
                                <td>名稱</td>
                                <td>規格</td>
                                <td>顏色</td>
                                <td>單價</td>
                                <td>數量</td>
                                <td>小記</td>
                                <td>刪除</td>
                            </tr>
                        </thead>
                        <tbody>
                            <CartItems v-for="(item, index) in cart" :key="index" :initialitem="item" @delete="DeleteiTem" @minus="minusItem" @plus="plusItem"/>
                        </tbody>
                    </table> 
                    <div class="bg-light">
                        <div class="row">
                            <div class="col-10 text-end">
                                <p>
                                    共 <span class="text-danger fw-bolder">{{ totalQuantity() }}</span> 件
                                    總計 <span class="text-danger fw-bolder">{{ TotalPrice() }}</span> 元
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col justify-content-center mt-5 sticky-bottom text-center">
                            <router-link to="/" class="btn btn-danger p-2 me-2 fw-bold">繼續購物</router-link>
                            <router-link to="/CheckOut" class="btn btn-warning p-2 me-2 fw-bold text-white">直接結帳</router-link>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="my-5">
                        <h1 class="text-center">(這裡可放圖)</h1>
                    </div>
                    <div class="my-5 fs-5 fw-bold text-center">
                        <p>快去吧! 我把所有商品都放在那了</p>
                    </div>
                    <div class="row">
                        <div class="col d-flex justify-content-center mt-5 sticky-bottom">
                            <router-link to="/" class="btn btn-danger">開始逛吧!</router-link>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    // import { getActivePrice } from '@/JSFunction/isActive';
    import { useToastStore } from '@/JSFunction/toast.js'
    import CartItems from '@/components/CartItems.vue';
    import axios from 'axios';

    export default {
        name: 'ShoppingCart',

        setup() {
            const toastStore = useToastStore()
            return {
                toastStore: toastStore
            }
        },

        data(){
            return {
                cart: []
            }
        },
        components: {
            CartItems
        },

        mounted(){

            this.getCartData()
            document.title = "購物車"
            // console.log('Cart:', this.cart);
        },

        methods:{

            async getCartData(){
                this.toastStore.isLoadingToast()
                this.cart = [];
                
                await axios
                    .post("api/shop/getdata/")
                    .then(response =>{
                        // console.log("response", response.data)
                        
                        setTimeout(() => {

                            this.cart = this.cart.concat(response.data);
                            // console.log("CCATR", this.cart)   
                            this.cartTotalLength()
                            // eslint-disable-next-line no-undef
                            Swal.close()
                        }, 500)
                        
                    })
                    .catch(error =>{
                        console.log(error)
                    })
            },

            cartTotalLength(){
                let initNum = 0
                const res  = this.cart.reduce(
                    (num, item) => num += item.quantity, initNum
                )
                
                return res
            },

            // getActivePrice,

            TotalPrice() {
                let totalprice = 0;
                this.cart.forEach(item => {

                    totalprice += parseInt(item.quantity * item.product_price, 10);

                });
                return totalprice? totalprice : "--";
            },

            totalQuantity(){
                let totalQuantitySum = 0
                this.cart.forEach(item => {

                    totalQuantitySum += item.quantity

                });

                return totalQuantitySum? totalQuantitySum:"--"
            },

            DeleteiTem(item){
                // console.log("delete", item)
                
                this.toastStore.DeleteItem().then((result) => {
                    if (result.isConfirmed) {
                        axios
                            .delete('api/shop/DeleteiTem/', { data: { id: item.id } })
                            .then(response =>{
                                // console.log("response",response)
                                if (response.data.message === 'success'){
                                    // eslint-disable-next-line no-undef
                                    Swal.fire({
                                        title: "操作成功!",
                                        text: "您的商品已移除!",
                                        icon: "success"
                                    }).then(res=>{
                                        if (res.isConfirmed){
                                            this.getCartData()
                                        }
                                    })
                                    this.$emit('cart-updated');
                                }else{
                                    // eslint-disable-next-line no-undef
                                    Swal.fire({
                                        title: "操作失敗!",
                                        text: "請重新操作一次!",
                                        icon: "error"
                                    });
                                }
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    }
                });
            },
            
            minusItem(item){
                // console.log("min",item)
                axios
                    .post('api/shop/minusItem/', item)
                    .then(() =>{
                        // console.log(response)
                        this.getCartData()
                        this.$emit('cart-updated');
                    })
                    .catch(error => {
                        console.log(error)
                    })

            },

            plusItem(item){
                // console.log("plu", item)
                axios
                    .post('api/shop/plusItem/', item)
                    .then(() =>{
                        // console.log(response)
                        this.getCartData()
                        this.$emit('cart-updated');  
                    })
                    .catch(error => {
                        console.log(error)
                    })
                  
            }
        }
        
    }
</script>