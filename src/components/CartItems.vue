<template>
    <tr>
        <td class="dont-center"><img :src="this.initialitem.get_thumbnail" class="img-thumbnail me-3 cart-thumbnail"><router-link :to="'/product'+this.initialitem.get_url">{{ this.initialitem.product_name }}</router-link></td>
        <td>{{ this.initialitem.spec? this.initialitem.spec : '--' }}</td>
        <td>{{ this.initialitem.color? this.initialitem.color : '--' }}</td>
        <template v-if="this.initialitem.isActive">
            <td>(特價) ${{ this.initialitem.product_price }}</td>
        </template>
        <template v-else>
            <td>${{ (this.initialitem.product_price) }}</td>
        </template>
        <td>
            <div class="quantity-control">
                <button @click="minusItem()" class="btn flex-fill border-0" :disabled="this.initialitem.quantity === 1">-</button>
                {{ this.initialitem.quantity }}
                <button @click="plusItem()" class="btn flex-fill border-0">+</button>
            </div>
        </td>
        <td class="fw-bolder text-danger">${{ this.initialitem.totalPrice }}</td>
        <td><button class="btn-close" @click="DeleteiTem"></button></td>
    </tr>
</template>

<script>
    import { isActive, getActivePrice } from '@/JSFunction/isActive';
    export default {
        name: 'CartItems',

        props: {
            initialitem: Object,
            getTotalPrice: Function,
        },

        computed:{
            SingleTotalPrice() {
                return this.getTotalPrice(this.initialitem);
            }
        },

        methods: {
            isActive,
            getActivePrice,
            DeleteiTem(){
                this.$emit('delete', this.initialitem)
            },

            minusItem(){
                this.$emit('minus', this.initialitem)
            },

            plusItem(){
                this.$emit('plus', this.initialitem)
            },
        },
    }
</script>
<style>
    .cart-table td:not(.dont-center){
        text-align: center;
        text-align: center; 
        vertical-align: middle;
    }
    .cart-thumbnail{
        width: 15%;
        height: 15%;
    }
    .quantity-control{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .quantity-control .btn.disabled {
        pointer-events: none;
        border: none;
    }
</style>