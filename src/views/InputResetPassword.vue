<template>
    <div class="container">
        <div class="row justify-content-center align-items-center">
            <div class="col-6 m-5">
                <h1 class="text-center">修改密碼</h1>

                <form class="px-4 py-3" @submit.prevent="submitForm">
                    <div class="mb-3">
                        <label>新密碼:</label>
                        <div class="form-label">
                            <input type="password" name="new_password" class="form-control" v-model="sendData.new_password">
                        </div>
                    </div>
                    <div class="mb-3">
                        <label>確認密碼:</label>
                        <div class="form-label">
                            <input type="password" name="new_password2" class="form-control" v-model="sendData.new_password2">
                        </div>
                    </div>

                    <hr>

                    <div class="mb-3">
                        <div class="form-label">
                            <button class="btn w-100 fw-bolder" style="background-color: #ed188d; color: white">確認修改</button>
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
                sendData: {
                    new_password: '',
                    new_password2: '',
                }
            } 
        },

        methods:{
            async submitForm(){
                try{
                    if (this.sendData.new_password != this.sendData.new_password2 || this.sendData.new_password == '' || this.sendData.new_password == null){
                        this.toastStore.warningToast("密碼不一致!")
                        return;
                    }else{
                        const currentUrl = window.location.href;
                        
                        const params = new URLSearchParams(currentUrl.split('?')[1]);
                        
                        const token = params.get('token');
                        
                        const config = {
                            headers: {
                                'Authorization': `Bearer ${token}` 
                            }
                        };

                        const res = await axios.post('api/resetpassword/', this.sendData, config)
                        
                        if (res.status === 200){
                            this.toastStore.ResetPasswordOK().then(res =>{
                                if (res.isConfirmed) {

                                    this.$router.push('/log-in')

                                    setTimeout(()=>{
                                        window.location.reload()
                                    }, 0)
                                    
                                }
                                
                            })
                        }
                    }
                }
                catch(error){
                    console.log(error)
                }
            }
        }

    }


</script>
