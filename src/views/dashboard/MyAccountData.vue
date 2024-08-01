<template>
    <div class="container">
        <div class="row justify-content-center align-items-center">
            <div class="col m-3">
                <h1 class="text-center">會員中心</h1>
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
                            <label for="member_nickname" class="form-label">暱稱</label>
                            <input v-model="memberData.member_nickname" type="text" class="form-control" id="member_nickname" name="member_nickname" autocomplete="off">
                        </div>
                        <div class="col-lg-6 col-sm-12 mb-3 justify-content-center">
                            <h6>*是否要選為預設訂單資料?</h6>
                            <input type="checkbox" class="btn-check" id="address_default" autocomplete="off" v-model="memberData.address_default">
                            <label class="btn btn-outline-secondary" for="address_default">{{ memberData.address_default ? '已選用' : '未選用' }}</label><br>
                        </div>
                        <div class="col-lg-6 col-sm-12 mb-3">
                            <label for="recipient" class="form-label">*收件人</label>
                            <input v-model="memberData.recipient" type="text" class="form-control" id="recipient" name="recipient" autocomplete="off"> 
                        </div>
                        <div class="col-lg-6 col-sm-12 mb-3">
                            <label for="phone" class="form-label">*手機號碼</label>
                            <input v-model="memberData.phone" type="text" class="form-control" id="phone" name="phone" autocomplete="off" maxlength="10">
                        </div>
                    </div>
                    <div class="row row-cols-1 row-cols-lg-6 mb-3">
                        <div class="col-lg-6 col-sm-12 mb-3">
                            <label for="postal_code" class="form-label">*郵遞區號</label>
                            <input v-model="memberData.postal_code" type="text" class="form-control" id="postal_code" name="postal_code" autocomplete="off">
                        </div>
                        <div class="col-lg-6 col-sm-12 mb-3">
                            <label for="address" class="form-label">*地址</label>
                            <input v-model="memberData.address" type="text" class="form-control" id="address" name="address" autocomplete="off">
                        </div>
                    </div>
                    <div class="row mb-3 d-flex justify-content-center">
                        <div class="col-6 m-3 d-flex justify-content-evenly">
                            <button class="btn btn-danger w-50 mx-2" style="background-color: red;">確認儲存</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

</template>
<script>
    import axios from 'axios';
    import { useUserStore } from '@/store/user' 
    import { useToastStore } from '@/JSFunction/toast.js'
    export default{
        name: 'MyAccountData',

        setup() {
            const userStore = useUserStore()
            const toastStore = useToastStore()

            return{
                userStore,
                toastStore
            } 
        },


        data(){
            return {

                memberData :{
                    member_username:'',
                    member_email: '',
                    member_nickname: '',
                    phone:'',
                    recipient:'',
                    postal_code:'',
                    address:'',
                    address_default: null,
                },
                errors: [],
            }
        },
        mounted() {
            this.getMemberInfo()
            document.title = "會員資料"
        },
        methods:{
            async getMemberInfo(){
                await axios
                    .get('api/member/get/')
                    .then(response=>{
                        const {
                            ...userData
                        } = response.data
                        
                        this.memberData  = { 
                            ...userData
                        }
                        this.userStore.setNikeName(response.data.member_nickname)
                    })
                    .catch(error=>{
                        console.log(error)
                    })
            },
            
            async submitForm(){

                await axios
                
                    .post('api/member/create-data/', this.memberData)
                    .then((response) => {
                        
                        const { member, address } = response.data;
        
                        this.memberData = {

                            member_username: this.member_username, 
                            member_email: this.member_email, 
                            member_nickname: member.member_nickname,

                            phone: address.phone,
                            recipient: address.recipient,
                            postal_code: address.postal_code,
                            address: address.address,
                            address_default: address.address_default,

                        };
                        this.toastStore.AccountUpdateOK()
                        this.getMemberInfo()
                        
                    })
                    .catch(error=>{
                        console.log(error.response.data); 
                    })
            },
        }
    }
</script>
