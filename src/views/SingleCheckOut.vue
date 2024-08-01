<template>
    <div class="container">
        <div class="row">
            <div class="col-12 my-3">
                <div class="mb-3 justify-content-between d-flex">
                    <h3>訂購資訊</h3>
                    <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#checkout" 
                    aria-expanded="false" aria-controls="checkout" @click="btnClick">{{ btnclick ?"展開明細" : "收起明細"}}</button>
                </div>
                <hr>
                <!-- 收縮明細 -->
                <div class="collapse" id="checkout">
                    <div class="card card-body border-light">
                        <table class="table table-bordered text-center">
                            <thead class="table-secondary">
                                <tr >
                                    <th class="col-5" scope="col">商品名稱</th>
                                    <th class="col-1" scope="col">規格</th>
                                    <th class="col-1" scope="col">顏色</th>
                                    <th class="col-2" scope="col">單價</th>
                                    <th class="col-1" scope="col">數量</th>
                                    <th class="col-2" scope="col">小計</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr> 
                                    <td class="text-start">{{ productData.product_name }}</td>
                                    <td>{{ productData.spec?productData.spec:"--" }}</td>
                                    <td>{{ productData.color?productData.color:"--" }}</td>
                                    <td>{{ productData.product_price }}</td>
                                    <td>{{ productData.quantity }}</td>
                                    <td class="text-end">${{ getTotalPrice(productData.product_price, productData.quantity) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- 收縮明細 -->
                
                <h5 class="my-3" :class="{'text-start': btnclick, 'text-end': !btnclick }">本次消費金額: <span class="text-danger">{{ TotalAmount() }}</span></h5>
            </div>
        </div>
        <form class="px-4 py-3 border border-5 my-3" @submit.prevent="submitForm">
                    
            <div class="row row-cols-1 row-cols-lg-6 mb-3">
                <div class="col-lg-6 col-sm-12 mb-3">
                    <label for="member_username" class="form-label">使用者名稱</label>
                    <input v-model="memberData.member_username" type="text" class="form-control" id="member_username" name="member_username" disabled>
                </div>
                <div class="col-lg-6 col-sm-12 mb-3">
                    <label for="member_email" class="form-label">電子郵件</label>
                    <input v-model="memberData.member_email" type="email" class="form-control" id="member_email" name="member_email" disabled>
                </div>
            </div>
            <div class="row row-cols-1 row-cols-lg-6 mb-3">
                <div class="col-lg-6 col-sm-12 mb-3">
                    <label for="recipient" class="form-label">*收件人</label>
                    <input v-model="memberData.recipient" type="text" class="form-control" id="recipient" name="recipient" autocomplete="off" required> 
                </div>
                <div class="col-lg-6 col-sm-12 mb-3">
                    <label for="phone" class="form-label">*手機號碼</label>
                    <input v-model="memberData.phone" type="text" class="form-control" id="phone" name="phone" autocomplete="off"  maxlength="10" required>
                </div>
            </div>
            <div class="row row-cols-1 row-cols-lg-6 mb-3">
                <div class="col-lg-6 col-sm-12 mb-3">
                    <label for="postal_code" class="form-label">*郵遞區號</label>
                    <input v-model="memberData.postal_code" type="text" class="form-control" id="postal_code" name="postal_code" autocomplete="off" required>
                </div>
                <div class="col-lg-6 col-sm-12 mb-3">
                    <label for="address" class="form-label">*地址</label>
                    <input v-model="memberData.address" type="text" class="form-control" id="address" name="address" autocomplete="off" required>
                </div>
                <div class="row w-100 justify-content-center">
                    <div class="col-lg-12 col-sm-12 mb-3">
                        <label for="text1" class="form-label">訂單備註</label>
                        <textarea class="form-control" id="text1" rows="6" v-model="memberData.note"></textarea>
                    </div>
                </div>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="isChecked">
                <label class="form-check-label" for="flexCheckDefault">
                    我已閱讀並同意購物會員《<a @click="showToast" href="#" class="text-decoration-none">購物約定條款</a>》
                </label>
            </div>
            <div class="row mb-3 d-flex justify-content-center">
                <div class="col-6 m-3 d-flex justify-content-evenly">
                    <button class="btn btn-danger mx-2" style="background-color: red;">確認結帳 &gt;&gt;</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import { useToastStore } from '@/JSFunction/toast.js'

export default {

    name: 'CheckOut',

    setup() {
        const toastStore = useToastStore()
        return {
            toastStore: toastStore
        }
    },

    data() {
        return {
            cart:[],
            btnclick: true,
            isChecked: false,
            productData:{
                product_name: '',
                spec: '',
                color: '',
                quantity: '',
                product_price: '',
            },
            memberData :{
                id: '',
                member_username:'',
                member_email: '',
                phone:'',
                recipient:'',
                postal_code:'',
                address:'',
                address_default: null,
                amount:'',
                note: '',
            },
            trackid: '',
        }
    },


    mounted(){
        document.title = "結帳頁面"
        this.get_Product()
        this.getAddr()
    },  

    methods:{

        async submitForm(){
            if (!this.isChecked){
                this.toastStore.notCheckRule()
                return
            }
            else{

                await this.toastStore.doubleCheck().then(res=>{
                    if(res.isConfirmed){
                        const postData = {
                            uid: this.memberData.id,
                            order_phone: this.memberData.phone,
                            order_recipient_name: this.memberData.recipient,
                            order_recipient_address: this.memberData.address,
                            order_postal_code: this.memberData.postal_code,
                            order_amount: this.memberData.amount,
                            order_note: this.memberData.note,
                        }
                        
                        axios
                            .post('api/postOrder/', postData)
                            .then(response=>{
                                this.trackid  = ''
                                this.trackid = response.data.trackid
                                this.postDetail()
                            })
                            .catch(error=>{
                                console.log(error)
                            })
                    }
                })
            }
        },

        async postDetail(){

            let cart = [this.productData]
            let trackid = this.trackid
            const res = {
                cart, 
                trackid
            }
            await axios
                .post('api/OrderDetails/', res)
                .then(response =>{
    
                    if (response.data.message === 'success'){
                        this.toastStore.CheckOutOK().then((result) => {
                            if (result.isConfirmed) {
                                this.$router.push("/CheckOutOk")
                                this.$emit("cart-updated")
                            }
                        })
                    }else{
                        this.toastStore.CheckOutErr()
                    }
                })
                .catch(error =>{
                    console.log(error)
                })
        },

        async get_Product() {

            this.toastStore.isLoadingToast()

            const slug = this.$route.query.product_slug;
            this.productData = {
                spec: this.$route.query.size,
                color: this.$route.query.color,
                quantity: this.$route.query.quantity,
            }

            await axios
                .post(`api/SingleProductCheckOut${slug}`, this.productData)
                .then(response => {
                    
                    const {...resData} = response.data
                    this.productData = {...resData}
                    
                    // eslint-disable-next-line no-undef
                    Swal.close()
                })
                .catch(error => {
                    console.log(error)
                })

            },

        async getAddr(){
            await axios
                .post('api/order/addr/')
                .then(response =>{
                    
                    const {
                        address_default,
                        ...addrInfo
                    } = response.data

                    this.memberData.member_username = response.data.member_username
                    this.memberData.member_email = response.data.member_email
                    this.memberData.id = localStorage.getItem("user.id")

                    if (response.data.address_default){
                        this.memberData  = { 
                            address_default,
                            ...addrInfo
                        }
                    }
                })
                .catch(error =>{
                    console.log(error)
                })
        },

        getTotalPrice(Dataprice, Dataquantity){
            const price = parseInt(Dataprice)
            const quantity = parseInt(Dataquantity)
            return price * quantity
        },

        btnClick(){
            this.btnclick = !this.btnclick
        },

        TotalAmount(){
            let total = 0
            
            let singleprice =  this.productData.quantity * this.productData.product_price
            total += singleprice
         
            this.memberData.amount = total
            return total.toLocaleString('zh-TW',{style:'currency',currency: 'TWD'})
        },

        showToast(){
            this.toastStore.Rule()
        }
    },
}
</script>
