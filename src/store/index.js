import Vue from 'vue'
import Vuex from 'vuex'
import { getad,getlogin } from '../axios/dataaxios/dealadmin'
import { getuser } from '../axios/dataaxios/userdeal'
import { getworks } from '../axios/dataaxios/woksdeal'
import { getgoods } from '../axios/dataaxios/goodsdeal'

Vue.use(Vuex)

const state = {
    adphone: '',
    adlist: [],
    userlist: [],
    wokslist: [],
    goodslist: []
}
const mutations = {
    changadlist(state,list){
        state.adlist = list
    },
    changuserlist(state,listx){
        state.userlist = listx
    },
    changworks(state,lists){
        state.wokslist = lists
    },
    changegoods(state,list){
        state.goodslist = list
    },
    changeadphone(state,list){
        state.adphone = list
    }
}
const actions = {
    getadminif({ commit }){
        getad().then((res)=>{
            commit('changadlist',res)
        })
    },
    getuserlist({ commit }){
        getuser().then((res)=>{
            commit('changuserlist',res)
        })
    },
    getworkslist({ commit }){
        getworks().then((res)=>{
            commit('changworks',res)
        })
    },
    getgoodslist({ commit }){
        getgoods().then((res)=>{
            commit('changegoods',res)
        })
    },
    getlogininfo({ commit }){
        getlogin('get=true').then((res)=>{
            commit('changeadphone',res.adphone)
        })
    }
}
const getters = {

}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
