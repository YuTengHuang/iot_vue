<template>
    <div class="container">
        <div class="row">
            <div class="col-12 my-3">
                <h1 class="text-center">{{ getName() }} 感謝您的購買!</h1>
                <hr>
                <pre class="h5 text-center">
親愛的用戶，感謝您選擇我們的服務並完成了購買！

再次感謝您的支持與信任！祝您生活愉快，購物愉快！
                </pre>
                <hr>
            </div>
            <div class="col-12 my-3 text-center">
                <h4>您的訂單編號為:&nbsp;&nbsp;<router-link :to="'/order/'+orderData.order_trackid+'/'">{{ orderData.order_trackid }}</router-link></h4>
                <h4>訂購日期: {{ orderData && orderData.createTime ? getTime() : ''  }}</h4>
                <h4>總計: <span class="text-danger">${{ orderData && orderData.order_amount ? getAmount() : ''  }}</span>元</h4>
            </div>

            <div class="col-6 mx-auto">
                <table class="table table-bordered text-center">
                    <thead class="table-secondary">
                        <tr >
                            <th class="col" scope="col">商品名稱</th>
                            <th class="col" scope="col">規格</th>
                            <th class="col" scope="col">顏色</th>
                            <th class="col" scope="col">數量</th>
                            <th class="col-2" scope="col">單價</th>
                        </tr>
                    </thead>
                    <tbody v-for="(item, index) in detailsData" :key="index">
                        <tr> 
                            <td class="text-center">{{ item.product_name}}</td>
                            <td>{{ item.spec }}</td>
                            <td>{{ item.color? item.color: "--" }}</td>
                            <td>{{ item.quantity }}</td>
                            <td>{{ item.price }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
        <div class="row justify-content-center">
            <div class="col-auto">
                <router-link to="/" class="btn btn-success my-3">返回首頁</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import { useUserStore } from '@/store/user' 
    export default {
        name: 'CheckOut',

        setup() {
            const userStore = useUserStore()

            return{
                userStore,
            } 
        },

        data(){
            return {
                orderData:{},
                detailsData: {},
            }
        },

        mounted() {
            this.getTrackid()
            document.title = "感謝購買!"
        },

        methods: {

            async getTrackid(){
                
                try{
                    const res = await axios.get('api/getOrderid/')
                    // console.log(res.data)
                    this.orderData = res.data
                    const details = await axios.get('api/OrderDetails/')
                    // console.log(details.data)
                    this.detailsData = details.data

                }catch (error){
                    console.log(error)
                }

            },

            getName(){
                return this.userStore.user.nikename === '' ? this.userStore.user.username : this.userStore.user.nikename
            },

            getTime(){
                const time = this.orderData.createTime
                const date = time.substring(0, 10)
                const t = time.substring(11, 19)
                return `${date} - ${t}`
            },

            getAmount(){
                const money = this.orderData.order_amount
                return money.toLocaleString('zh-TW',{style:'currency',currency: 'TWD'})
            },
        },
    }
</script>