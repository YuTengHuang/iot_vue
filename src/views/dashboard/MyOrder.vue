<template>
    <div class="container">
        <div class="row justify-content-center align-items-center bgcolor">
            <h1 class="text-center my-3">訂單紀錄</h1>
            <div class="col mb-5">
                
                <template v-if="orderData.data && orderData.data.length">

                    <!-- 歷史訂單 -->
                    <div v-for="order in orderData.data" :key="order" class="mb-5">
                        <table class="table table-primary mb-0  border border-3 border-primary border-bottom-0">
                            <thead>
                                <tr>
                                    <td class="col-4" scope="col">交易編號:&nbsp;&nbsp; <strong>{{ order.order_trackid }}</strong></td>
                                    <td class="col-3" scope="col">時間:&nbsp;&nbsp;{{ getTime(order) }}</td>
                                    <td class="col-4 text-end" scope="col"><router-link :to="'/order/'+order.order_trackid+'/'" class="text-decoration-none text-dark"><strong>查看明細</strong></router-link></td>
                                </tr>
                            </thead>
                        </table>
                        
                        <table class="table table-secondary mb-0 border border-3 border-primary border-bottom-0 border-top-0 table-borderless">
                            <thead>
                                <tr class="text-center">
                                    <th class="col-4">商品名稱</th>
                                    <th class="col-2">實付金額</th>
                                </tr>
                            </thead>
                        </table>

                        <table class="table table-bordered mb-0 border border-3 border-primary border-bottom-0 border-top-0 table-borderless" >
                            <tbody>
                                <tr class="text-center border-bottom-0">
                                    <td class="col-4 text-start">
                                        <span v-for="(detail, index) in order.order_details" :key="index">{{ detail.product_name }} x {{ detail.quantity }}&nbsp;&nbsp; </span>
                                    </td>
                                    <td class="col-2 pe-4">&nbsp;&nbsp;{{ order.order_amount }}</td>
                                </tr>
                            </tbody>
                        </table>

                        <table class="table mb-0 border border-3 border-primary border-top-0 table-borderless">
                            <tbody>
                                <tr class="border-top border-primary">
                                    <td>訂單狀態:&nbsp;&nbsp;<span :class="{'text-success': order.order_status, 'text-danger':!order.order_status}">{{ order.order_status? "已送達":"配送中" }}</span></td>
                                </tr>
                            </tbody>
                        </table>                        
                    </div>
                    <!-- 歷史訂單 -->
                </template>

                <template v-else>
                    <div class="my-5">
                        <h1 class="text-center">無訂單紀錄</h1>
                    </div>
                    <div class="my-5 fs-5 fw-bold text-center">
                        <p>快去新增訂單吧! 我把所有商品都放在那了</p>
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
    import axios from 'axios';

    export default{
        name: 'MyOrder',
        data(){
            return{
                orderData: {}
            }
        },

        mounted(){
            this.getAllOrder()
            document.title = "我的訂單"
        },

        methods:{
            async getAllOrder(){
                try{
                    const res = await axios.post('api/getAllOrder/')
                    this.orderData = res.data
                    // console.log("WWWW",this.orderData)
                }
                catch (error){
                    console.log(error)
                }

            },

            getTime(order){
                const time = order.createTime
                const date = time.substring(0, 10)
                return date
            },
        }
    }


</script>

<style>
    .bgcolor{
        background-color: #eee;
    }
</style>