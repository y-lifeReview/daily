import { createStore } from 'vuex'
const store = createStore({
    state(){
        return {
            nowRouter:'/', 
            dirTreeList:[],
            dirId:'',
            isDirClick:false
        }
    },
    mutations:{
        changeNowRouter(state,path){
            // console.log('store改变',state,path)
            state.nowRouter = path
        },

        updateDir(state,newDir) {
            state.dirTreeList = newDir
        },
        updataDirId(state,id){
            state.dirId = id
        },

        updataIsDirClick(state,isclick){
            state.isDirClick = isclick
        }
    }
})
export default store 