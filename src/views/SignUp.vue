<template>
    <div class="container">
        <div class="row justify-content-center align-items-center">
            <div class="col-6 m-5">
                <h1 class="text-center">註冊</h1>
                <form class="px-4 py-3" @submit.prevent="submitForm">
                    <div class="mb-3">
                        <label class="form-label">使用者名稱:</label>
                        <input type="text" name="username" class="form-control" v-model="username">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">電子郵件:</label>
                        <input type="email" name="email" class="form-control" v-model="email">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">密碼:</label>
                        <input type="password" name="password" class="form-control" v-model="password">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">確認密碼:</label>
                        <input type="password" name="password2" class="form-control" v-model="password2">
                    </div>

                    <div class="notification" style="color:red" v-if="errors.length">
                        <p v-for="error in errors" :key="error">
                            {{ error }}
                        </p>
                    </div>
                    
                    <p class="d-flex justify-content-between align-items-center">
                        <span>快去<router-link to="/log-in">登入</router-link>吧!</span>
                    </p>
                    

                    <hr>

                    <div class="mb-3">
                        <button class="btn w-100 fw-bolder" style="background-color: #ed188d; color: white">註冊</button>
                    </div>


                </form>
            </div>
        </div>
    </div>
</template>


<script>
import { ref } from 'vue'
import { useToastStore } from '@/JSFunction/toast.js'
import { useUserStore } from '@/store/user' 
import axios from 'axios'
export default {

    setup() {
        const toastStore = useToastStore()
        const userStore = useUserStore()

        return {
            username: ref(''),
            email: ref(''),
            password: ref(''),
            password2: ref(''),
            errors: ref([]),
            toastStore: toastStore,
            userStore: userStore,
        }
    },

    mounted(){
        document.title = "註冊"
    },

    name: 'SignUp',
    
    methods: {

        submitForm () {

            this.errors = []
            if (this.username === ''){
                this.errors.push("Username 不可為空")
            }

            if (this.email === ''){
                this.errors.push("email 不可為空")
            }
            if (this.password === ''){
                this.errors.push("password1 不可為空")
            }
            if (this.password2 !== this.password){
                this.errors.push("密碼不相同")
            }
            
            if (!this.errors.length){
                const formData = {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    password2: this.password2,
                }

                axios
                .post("api/signup/", formData)
                .then(response =>{
                    
                    if (response.data.message === 'success'){
                        this.toastStore.showSingupToast("success", "註冊成功")

                        this.autoLogin()
                        setTimeout(async () => {
                            this.getUserInfo()
                        }, 1500);

                        this.username = ''
                        this.email = ''
                        this.password = ''
                        this.password2 = ''
                        
                        // this.$router.push("/log-in")
                    }else{
                        this.toastStore.showSingupToast("error", response.data.message)
                    }
                    
                })
                .catch(error => {
                    console.log(error)
                    // if (error.response) {
                        
                    //     if (error.response.status === 400 || error.response.status === 500) {
                    //         const errorMessage = error.response.data.detail || "此帳號或信箱已有人註冊!";
                    //         this.errors.push(errorMessage);
                    //     } else {
                    //         console.log('Unexpected error:', error.response.status);
                    //         this.errors.push("一個意料之外的問題發生了");
                    //     }
                    // } else {
                    //     console.log('Unexpected error:', error);
                    //     this.errors.push("一個非 4xx 或 5xx 的問題發生了");
                    // }
                })

            }
        },

        async autoLogin(){

            const loginData = {
                member_email: this.email,
                password: this.password,
            }
            await axios
                .post("api/login/", loginData)
                
                .then(response =>{
                    this.userStore.setToken(response.data)
                    this.toastStore.showSingupToast('success', "登入成功! 正在導向頁面!")

                    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access;
   
                })
                .catch(error =>{
                    console.log("error",  error)
                    if (error){
                        this.toastStore.showSingupToast('error', "帳號或密碼有誤!")
                    }
                })
        },

        async getUserInfo(){
            await axios
                .get('api/userinfo/')
                .then(response =>{
                    this.userStore.setUserInfo(response.data);
                    const prePath = this.$route.query.to;
                    if (prePath) {
                        this.$router.push(prePath);
                    } else {
                        this.$router.push('/');
                    }

                    setTimeout(() => {
                        window.location.reload();
                    }, 0);
                })
                .catch(error =>{
                    console.log(error)
                })
        }
            
    },
}
</script>
<style>
input{
    width: 50%;
}

</style>