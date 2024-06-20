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

            // console.log("in initializeStore")
            if (localStorage.getItem('user.access')) {
                // console.log("if get Item")

                for (const key of ["access", "refresh", "id", "username", "email"]){
                    this.user[key] = localStorage.getItem(`user.${key}`)
                }

                // this.user.access = localStorage.getItem('user.access')
                // this.user.refresh = localStorage.getItem('user.refresh')
                // this.user.id = localStorage.getItem('user.id')
                // this.user.username = localStorage.getItem('user.username')
                // this.user.email = localStorage.getItem('user.email')
                this.user.isPass = true
                store.state.isPass = true
    
                this.refreshToken()
                // console.log('init user: ', this.user)
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

            // this.user.access = null
            // this.user.refresh = null
            // this.user.id = null
            // this.user.username = null
            // this.user.nikename = null
            // this.user.email = null
            this.user.isPass = false
            store.state.isPass = false

            // localStorage.removeItem('user.access')
            // localStorage.removeItem('user.refresh')
            // localStorage.removeItem('user.id')
            // localStorage.removeItem('user.username')
            // localStorage.removeItem('user.email')
            // localStorage.removeItem('user.nikename')
        },

        setNikeName(nikename){
            this.user.nikename = nikename

            localStorage.setItem('user.nikename', this.user.nikename)
        },

        setUserInfo(user){
            console.log('setUserInfo')

            this.user.id = user.id
            this.user.username = user.username
            this.user.email = user.email
            this.user.nikename = user.nikename

            for (const key of ["id", "username", "email", "nikename"]){
                localStorage.setItem(`user.${key}`, this.user[key])
            }

            // localStorage.setItem('user.id', this.user.id)
            // localStorage.setItem('user.username', this.user.username)
            // localStorage.setItem('user.email', this.user.email)

            // console.log('User', this.user)
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