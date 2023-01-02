import { createStore } from 'vuex'
const store = createStore({
    state(){
        return {
            nowRouter:'/'
        }
    },
    mutations:{
        changeNowRouter(state,path){
            // console.log('store改变',state,path)
            state.nowRouter = path
        }
    }
})
export default store 