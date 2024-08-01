<template>
    <div class="container product-img">
        <div class="col h3">
            <button @click="goBack" class="btn btn-primary mt-3">&lsaquo; 返回</button>
        </div>

        <div class="row row-cols-1">
            <div class="col-lg-6 ">
                <figure>
                    <img :src="this.products.get_image" class="img-thumbnail">
                </figure>
            </div>
            <div class="col-lg-6 text-break">

                <h1>{{ this.products.product_name }}</h1>
                <div class="overflow-auto" style="height: 300px;">
                    <p>{{ this.products.product_desc }}</p>
                </div>

                <!-- 規格按鈕 -->

                <!-- size -->
                <div class="m-3">   
                    <div class="row row-cols-auto">
                        <div v-for="(product, index) in this.product_specs" :key="index" :class="{'d-none': product.spec === null}">
                            <template v-if="product.spec !== null">
                                <input type="radio" class="btn-check" name="size" :id="'spec'+product.spec" autocomplete="off" v-model="size" :value="product.spec">
                                <label :for="'spec'+product.spec" class="btn btn-outline-dark" :class="{ 'disabled': !product.product_spec_stock || product.product_spec_stock === null}">{{ product.spec_size }}</label>
                            </template>
                        </div>
                    </div>
                </div>
                <!-- size -->

                <!-- color -->
                <div class="m-3">
                    <div class="row row-cols-auto">
                        <div v-for="(product, index) in this.product_specs" :key="index" :class="{'d-none': product.color === null}">
                            <template v-if="product.color !== null">
                                <input type="radio" class="btn-check" name="color" :id="'color'+product.color" autocomplete="off" v-model="color" :value="product.color">
                                <label :for="'color'+product.color" class="btn btn-outline-dark" :class="{ 'disabled': !product.product_spec_stock || product.product_spec_stock === null}">{{ product.color_color }}</label>
                            </template>
                        </div>
                    </div>
                </div>
                <!-- color -->

                <!-- 規格按鈕 -->
                
                <template v-if="itisActive()">
                    <div class="m-3">
                        <p class="card-text h5"><del class="align-top h6 text-body-tertiary">${{ this.products.product_price }}</del>${{ActivePrice()}}</p>
                    </div>
                </template>

                <template v-else>
                    <div class="m-3">
                        <p class="card-text h5">${{ this.products.product_price }}</p>
                    </div>
                </template>
                
                <div class="row">
                    <div class="col-3">
                        <label>數量:</label>
                        <input type="number" class="form-control" v-model="quantity" min="1" @input="QuantityCantInputZero">
                    </div>
                    <div class="col mt-4 d-flex">
                        <a class="btn btn-secondary me-3" @click="AddToCart">+購物車</a>
                        <a class="btn btn-pink me-3" @click="SingleBuy">直接購買</a>
                    </div>
                </div>
            </div>
        </div>

        <hr>
        <div class="row row-cols-1">
            <div class="col-lg-6 ">
                <figure>
                    <img :src="this.products.get_image2" class="img-thumbnail">
                    <img :src="this.products.get_image3" class="img-thumbnail">
                </figure>
            </div>

        </div>

    </div>
</template>

<script>
    import { useUserStore } from '@/store/user.js'
    import { useToastStore } from '@/JSFunction/toast.js'
    import { goBack } from '@/JSFunction/goback.js'
    import axios from 'axios';
    export default{
        name: 'ProDuct',
        setup() {
            const toastStore = useToastStore()
            const userStore = useUserStore()

            return {
                toastStore: toastStore,
                userStore: userStore
            }
        },
        data(){
            return {
                // 全部的商品跟規格資訊
                products: [],
                product_specs: [],

                // 選擇的規格
                size:'',
                color:'',
                quantity: 1,

                // 總數
                totalSpec: 0,
                totalColor: 0,
            }
        },
        
        mounted(){
            this.get_Product()
            this.totalInputs()
        },

        computed: {
            isSpecSelected() {
            return this.size !== null && this.color !== null;
            },
            generateLink() {
            
                return {
                    path: '/SingleCheckOut',
                    query: {
                        product_slug: this.products.get_url,
                        size: this.size,
                        color: this.color,
                        quantity: this.quantity
                    }
                };
            }
        },

        methods: {
            async get_Product() {

                this.toastStore.isLoadingToast()

                const slug = this.$route.params.slug; 

                await axios
                    .get(`api/productInfo/${slug}/`)
                    .then(response => {

                        if (!response.data[0]){
                            // eslint-disable-next-line no-undef
                            Swal.close()
                            this.toastStore.NoSpecColor().then((result) => {
                                if (result.isConfirmed) {
                                    this.$router.back()
                                }
                            })
                            return;
                        }

                        this.products = response.data[0].pid
                        this.product_specs = response.data[0].product_specs

                        
                        document.title = this.products.product_name
                        
                        this.$nextTick(() => {
                            this.totalInputs()
                            if (this.totalSpec === 1) {
                                this.product_specs.forEach(product => {
                                    if (product.spec !== null && product.spec !== undefined) {
                                        const inputElement = document.getElementById('spec' + product.spec);
                                        if (inputElement) {
                                            inputElement.checked = true;
                                            this.size = product.spec
                                        }
                                    }
                                    
                                });
                            }
                            if (this.totalColor === 1){
                                this.product_specs.forEach(product => {
                                    if (product.color !== null && product.color !== undefined) {
                                        const inputElement2 = document.getElementById('color' + product.color);
                                    
                                        if (inputElement2) {
                                            inputElement2.checked = true;
                                            this.color = product.color
                                        }
                                    }
                                });
                            }
                        });
                        // eslint-disable-next-line no-undef
                        Swal.close()
                    })
                    .catch(error => {
                        console.log(error)
                    })

            },
            totalInputs() {
                
                let s = 0
                let c = 0
                for (const product of this.product_specs) {
                    if (product.spec !== null) {
                        s++;
                    }
                    if (product.color !== null) {
                        c++;
                    }
                }
                this.totalSpec = s
                this.totalColor = c
            },
            goBack,

            QuantityCantInputZero(){
                if (isNaN(this.quantity) || this.quantity < 1){
                    this.quantity = 1
                }
            },
            
            itisActive(){
                if (this.products.length === 0 || !this.products) {
                    return false;
                }
                const curDate = new Date();
                const activeDate = new Date(this.products.product_active_at);
                const inactiveDate = new Date(this.products.product_inactive_at);
                return curDate >= activeDate && curDate <= inactiveDate;
            },
            ActivePrice(){
                if (this.itisActive){
                    const res = this.products.product_price * 0.5
                    return res
                }else{
                    return this.products.product_price
                }
            },

            async AddToCart(){
                if (!this.$store.state.isPass) {
                    // eslint-disable-next-line no-undef
                    Swal.fire({
                        title: "尚未登入!",
                        text: "立即登入或加入我們吧!",
                        icon: "warning"
                    });
                    this.$router.push({ name: 'LogIn', query: { to: this.$route.path } });
                    return;
                }
                

                if ((this.totalSpec > 1 && this.size === '') || (this.totalColor > 1 && this.color === '')){
                    this.toastStore.SelectSpecColor()
                }else{
                    const shopcartData = {
                        uid: this.userStore.user.id,
                        pid: this.products.product_id,
                        cid: this.color,
                        sid: this.size,
                        quantity: this.quantity
                    }
                    await axios
                        .post('api/shop/postdata/', shopcartData)
                        .then(response =>{
                       
                            if (response.data.message === 'success'){
                                this.toastStore.addCartToast()
                                this.$emit('cart-updated');
                            }else{
                                this.toastStore.ErroraddCartToast()
                            }
                        })
                        .catch(error =>{
                            console.log(error)
                        })

                }
            },

            SingleBuy(){
                if (!this.$store.state.isPass) {
                    // eslint-disable-next-line no-undef
                    Swal.fire({
                        title: "尚未登入!",
                        text: "立即登入或加入我們吧!",
                        icon: "warning"
                    });
                    this.$router.push({ name: 'LogIn', query: { to: this.$route.path } });
                    return;
                }

                if ((this.totalSpec > 1 && this.size === '') || (this.totalColor > 1 && this.color === '')){
                    this.toastStore.SelectSpecColor()
                }else{
                    this.$router.push({ 
                        path: '/SingleCheckOut', 
                        query: { 
                            product_slug: this.products.get_url, 
                            size: this.size, 
                            color: this.color, 
                            quantity: this.quantity 
                        } 
                    });
                }
                
            }
            
        }
    }
    
</script>

<style>
    .btn-pink{
        background-color: #ed188d !important; 
        color: white !important;
    }
    .btn-pink:hover{
        background-color: #dc1683 !important;
        color: white !important;
    }
    .product-img img{
        margin: 1rem;
        width: 100%;
        height: 100%;
    }
</style>
