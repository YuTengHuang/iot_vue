<template>
    <div class="container">
        <div class="row justify-content-center align-items-center">
            <div class="col-6 m-5">
                <h1 class="text-center">忘記密碼?</h1>

                <form class="px-4 py-3" @submit.prevent="submitForm">
                    <div class="mb-3">
                        <label>電子信箱:</label>
                        <div class="form-label">
                            <input type="text" name="email" class="form-control" v-model="sendEmail.email">
                        </div>
                    </div>

                    <hr>

                    <div class="mb-3">
                        <div class="form-label">
                            <button class="btn w-100 fw-bolder" style="background-color: #ed188d; color: white">寄送驗證</button>
                        </div>
                    </div>

                </form>

            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { useToastStore } from '@/JSFunction/toast.js'

    export default{
        name: "ResetPassword",

        setup() {
            const toastStore = useToastStore()

            return{
                toastStore,
                sendEmail: {
                    email: '',
                }
            } 
        },

        methods:{
            async submitForm(){
                try{
                    if (this.sendEmail.email == ''){
                        this.toastStore.warningToast("信箱不可為空!")
                        return;
                    }
                    const res = await axios.post('api/sendemail/', this.sendEmail)
                    // console.log("RES",res)
                    if (res.data['msg'] === "success"){
                        this.toastStore.SendEmailOK()
                    }
                    else if (res.data['msg'] === "error"){
                        this.toastStore.warningToast("此信箱不是會員!")
                    }
                    else{
                        this.toastStore.warningToast("有意外發生!請重新嘗試!")
                    }
                }
                catch(error){
                    console.log(error)
                }
            }
        }

    }


</script>