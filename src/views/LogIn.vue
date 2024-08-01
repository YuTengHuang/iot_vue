<template>
    <div class="container">
        <div class="row justify-content-center align-items-center">
            <div class="col-6 m-5">
                <h1 class="text-center">登入會員</h1>

                <form class="px-4 py-3" @submit.prevent="submitForm">
                    <div class="mb-3">
                        <label>電子信箱:</label>
                        <div class="form-label">
                            <input type="text" name="email" class="form-control" v-model="form.member_email">
                        </div>
                    </div>

                    <div class="mb-3">
                        <label>密碼:</label>
                        <div class="form-label">
                            <input type="password" name="password" class="form-control" v-model="form.password">
                        </div>
                    </div>

                    <div class="notification" style="color:red" v-if="errors.length">
                        <p v-for="error in errors" :key="error">
                            {{ error }}
                        </p>
                    </div>
                    
                   
                    <p class="d-flex justify-content-between align-items-center">
                        <span>還沒<router-link to="/sign-up">註冊</router-link>嗎?</span>
                        <span class="text-end"><router-link to="/resetpassword">忘記密碼?</router-link></span>
                    </p>
                    

                    <hr>

                    <div class="mb-3">
                        <div class="form-label">
                            <button class="btn w-100 fw-bolder" style="background-color: #ed188d; color: white">登入</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { useToastStore } from '@/JSFunction/toast.js'
import { useUserStore } from '@/store/user' 
export default {
    name: 'LogIn',

    setup() {
        const userStore = useUserStore()
        const toastStore = useToastStore()

        return{
            userStore,
            toastStore
        } 
    },

    data () {
        return {
            form: {
                member_email:'',
                password: '',
            },
            errors: []
        }
    },

    mounted(){
        document.title = "登入"
    },
    
    methods: {
        async submitForm () {

            this.errors = []

            if (this.form.member_email === ''){
                this.errors.push("email 不可為空")
            }
            if (this.form.password === ''){
                this.errors.push("password 不可為空")
            }

            await axios
                .post("api/login/", this.form)
                
                .then(response =>{
                    this.userStore.setToken(response.data)
                    this.toastStore.showSingupToast('success', "登入成功! 正在導向頁面!")
                    
                    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access;
                    setTimeout(async () => {
                        this.getUserInfo()
                    }, 1500);
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
                    this.$emit('login');
                
                })
                .catch(error =>{
                    console.log(error)
                })
        }
    },

}
</script>
