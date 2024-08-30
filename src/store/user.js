import { defineStore } from 'pinia' 
import axios  from 'axios'
import store from '@/store'

export const useUserStore = defineStore({
    id: 'user',
    state: () =>({
        user: {
            isPass: false,
            id: null,   
            username: null,
            email: null,
            access: null,
            refresh: null,
            nikename: '',
        }
    }),

    actions: {
        initializeStore(){
            if (localStorage.getItem('user.access')) {
                for (const key of ["access", "refresh", "id", "username", "email"]){
                    this.user[key] = localStorage.getItem(`user.${key}`)
                }

                this.user.isPass = true
                store.state.isPass = true
                this.refreshToken()
            }
        },
        
        setToken(data){
            console.log('setToken')

            this.user.access = data.access
            this.user.refresh = data.refresh
            this.user.isPass = true
            store.state.isPass = true

            localStorage.setItem('user.access', data.access)
            localStorage.setItem('user.refresh', data.refresh)
            
        },

        removeToken (){
            console.log('removeToken')

            for (const key of ["access", "refresh", "id", "username", "nikename", "email"]){
                this.user[key] = null
                localStorage.removeItem(`user.${key}`)
            }
            this.user.isPass = false
            store.state.isPass = false
        },

        setNikeName(nikename){
            this.user.nikename = nikename
            localStorage.setItem('user.nikename', this.user.nikename)
        },

        setUserInfo(user){
            this.user.id = user.id
            this.user.username = user.username
            this.user.email = user.email
            this.user.nikename = user.nikename

            for (const key of ["id", "username", "email", "nikename"]){
                localStorage.setItem(`user.${key}`, this.user[key])
            }
        },

        refreshToken() {
            axios
                .post('api/refresh/', {
                    refresh: this.user.refresh
                })
                .then((response) =>{
                    this.user.access = response.data.access
                    localStorage.setItem('user.access', response.data.access)
                    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access
                })
                .catch((error)=>{
                    console.log(error)
                    this.removeToken()
                })
        }
    }
})
