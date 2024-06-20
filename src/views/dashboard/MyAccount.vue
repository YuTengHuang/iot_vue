<template>
    <div class="container">
        <div class="row justify-content-center align-items-center">
            <div class="col-6 m-5">
                <h1 class="text-center">會員中心</h1>
                <div class="row text-center mb-3">
                    <table class="account">
                        <tr>
                            <td><router-link :to="{ name:'MyAccountData' }" class="me-2 text-decoration-none"><strong>查看個人資料</strong></router-link></td>
                        </tr>
                        <tr>
                            <td><router-link :to="{name: 'MyOrder'}" class="me-2 text-decoration-none"><strong>我的訂單</strong></router-link></td>
                        </tr>
                        <tr>
                            <td><router-link to="#" class="me-2"><strong>折價卷</strong></router-link></td>
                        </tr>
                        <tr>
                            <td><router-link to="#" class="me-2"><strong>常見Q&amp;A</strong></router-link></td>
                        </tr>
                        <tr>
                            <td><router-link to="#" class="me-2"><strong>聯絡客服</strong></router-link></td>                            
                        </tr>
                    </table>
                </div>
                
                <template v-if="userStore.user.isPass">
                    <div class="row">
                        <button @click="logout()" class="btn btn-danger">登出</button>
                    </div>
                </template>
                <template v-else>
                    <div class="row">
                        <router-link to="/log-in" class="btn btn-danger">登入會員</router-link>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { useToastStore } from '@/JSFunction/toast.js'
import { useUserStore } from '@/store/user' 
import { onBeforeMount } from 'vue'
export default {
    setup() {
        const userStore = useUserStore()
        const toastStore = useToastStore()
        onBeforeMount(() => {
            document.title = "會員中心"
        })

        return{
            userStore,
            toastStore
        } 
    },
    name: 'MyAccount',

    methods: {
        logout () {

            this.userStore.removeToken()

            this.$router.push('/')
            
            this.toastStore.showSingupToast('success', "登出成功!")
        },
    },
}
</script>
<style>
    .account table {
        border-radius: 10px;
        overflow: hidden; 
    }
    .account td{
        border-bottom: 2px solid #8d8d8d !important;
        background-color: #eee;
        height: 50px;
    }
    .router-link-exact-active {   /* 這是router-link 的預設class名稱 */
        text-decoration: none;
    }
</style>