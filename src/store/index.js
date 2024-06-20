import {createStore} from 'vuex'

export default createStore({
    state:{
        isLoading: false,
        isPass: false,
        token: ''
    }, 
    mutations:{

        setIsLoading(state, status){
            state.isLoading = status
        },
        
    },

    actions:{

    },

    module:{

    }
})