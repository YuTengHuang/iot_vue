<template>
    <div class="container">
        <div class="row justify-content-center align-items-center bgcolor">
            <h1 class="text-center my-3">訂單明細</h1>

            <!-- 訂單明細 -->
            <div class="col mb-5">
                <table class="table table-primary mb-0  border border-3 border-primary border-bottom-0">
                    <thead>
                        <tr>
                            <td class="col-4" scope="col">交易編號:&nbsp;&nbsp; <strong>{{ this.trackid }}</strong></td>
                            <td class="col-3" scope="col">時間:&nbsp;&nbsp;{{ resData && resData.createTime? getTime() : ''}}</td>
                        </tr>
                    </thead>
                </table>
                
                <table class="table table-secondary mb-0 border border-3 border-primary border-bottom-0 border-top-0 table-borderless">
                    <thead>
                        <tr class="text-center">
                            <th class="col-4">商品名稱</th>
                            <th class="col-2">商品規格</th>
                            <th class="col-2">商品顏色</th>
                            <th class="col-2">數量</th>
                            <th class="col-2">金額</th>
                        </tr>
                    </thead>
                </table>

                <table class="table table-bordered mb-0 border border-3 border-primary border-bottom-0 border-top-0 table-borderless"
                v-for="order in resData.order_details" :key="order">
                    <tbody>
                        <tr class="text-center border-bottom-0">
                            <td class="col-4 text-start">{{ order.product_name }}</td>
                            <td class="col-2">{{ order.spec? order.spec:"--" }}</td>
                            <td class="col-2">{{ order.color? order.color:"--" }}</td>
                            <td class="col-2">{{ order.quantity }}</td>
                            <td class="col-2">{{ order.price }}</td>
                        </tr>
                    </tbody>
                </table>

                <table class="table mb-0 border border-3 border-primary border-top-0 table-borderless">
                    <tbody>
                        <tr class="border-top border-primary text-end">
                            <td>實付金額:&nbsp;&nbsp;<strong class="text-danger">${{ resData && resData.order_amount? getAmount():""}}</strong></td>
                        </tr>
                    </tbody>
                </table>                        
            </div>
            <!-- 訂單明細 -->

            <!-- 訂單資訊 -->
            
            <div class="row position-relative">
                <div class="col">
                    <div class="row bg-white p-5 mb-5">
                        <div class="col-sm-6 mb-3 mb-sm-0">
                            <div class="card" style="height: 200px;">
                                <div class="card-body">
                                    <h5 class="card-title">收貨資訊</h5>
                                    <p class="card-text">收件人: {{ resData && resData.order_recipient_name? dontShowName(resData.order_recipient_name) : ''}}</p>
                                    <p class="card-text">收件地址: {{ resData && resData.order_recipient_address? dontShowAddr(resData.order_recipient_address) : ''}}</p>
                                    <p class="card-text">備註: {{ resData && resData.order_note? resData.order_note : ''}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="card" style="height: 200px;">
                                <div class="card-body">
                                    <h5 class="card-title">付款資訊</h5>
                                    <p class="card-text">付款方式：貨到付款</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 訂單資訊 -->

        </div>
        <!-- 按鈕 -->
        <div class="row">
            <div class="col d-flex justify-content-center my-5">
                <button @click="goBack" class="btn btn-danger">返回訂單紀錄</button>
            </div>
        </div>
        <!-- 按鈕 -->
    </div>
</template>

<script>

    import axios from 'axios';
    import { goBack } from '@/JSFunction/goback.js'

    export default{

        name: "MyOrderDateils",

        data(){
            return{
                resData:{},
                trackid: this.$route.params.trackid
            }
        },

        mounted(){
            this.getDetails()
            document.title = "訂單明細"
        },

        methods:{

            async getDetails(){

                try{
                    const res = await axios.get(`api/getOneDateils/${this.trackid}`)
                    this.resData = res.data
                }
                catch(error){
                    console.log(error)
                }
            },

            getTime(){
                const time = this.resData.createTime
                const date = time.substring(0, 10)
                const t = time.substring(11, 19)
                return `${date} - ${t}`
            },

            getAmount(){
                const money = this.resData.order_amount
                return money.toLocaleString('zh-TW',{style:'currency',currency: 'TWD'})
            },
            goBack,

            dontShowName(name){
                if (name.length <= 2) {
                    return name[0] + '*'.repeat(name.length - 1);
                }
                const maskedPart = '*'.repeat(name.length - 2);
                return name[0] + maskedPart + name.slice(-1);
            },
            dontShowAddr(name){
                if (name.length <= 2) {
                    return name[0] + '*'.repeat(name.length - 1);
                }
                const maskedPart = '*'.repeat(name.length - 6);
                return maskedPart + name.slice(-6);
            },
        },
    }

</script>
