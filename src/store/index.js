import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const actions = {}
const mutations = {
  handleUserName: (state, username) => {
    state.username = username
    // 把登录的用户的名保存到localStorage中，防止页面刷新，导致vuex重新启动，用户名就成为初始值（初始值为空）的情况
    localStorage.setItem('username', username)
  },
  handleUserPass: (state, userpass) => {
    state.userpass = userpass
    // 把登录的用户的密码保存到localStorage中，防止页面刷新，导致vuex重新启动，用户密码就成为初始值（初始值为空）的情况
    localStorage.setItem('userpass', userpass)
  },
  handleUserid: (state, userid) => {
    state.userid = userid
    // 把登录的用户的密码保存到localStorage中，防止页面刷新，导致vuex重新启动，用户密码就成为初始值（初始值为空）的情况
    localStorage.setItem('userid', userid)
  }
}
const state = {
  username: '' || localStorage.getItem('username'),
  userpass: '' || localStorage.getItem('userpass'),
  userid: '' || localStorage.getItem('userid')
}
// getters 只会依赖 state 中的成员去更新
const getters = {
  username: (state) => state.username,
  userpass: (state) => state.userpass,
  userid: (state) => state.userid
}
export default new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions,
  modules: {
  },
  getters: getters
})
