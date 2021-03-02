<template>
    <div class="managerlogin">
        <div class="iconfont return" @click="ret">&#xe6c3;</div>
       <logo></logo>
       <div class="container">
        <div class="login">
            <span class="iconfont user">&#xe60e;</span>
            <input type="text" class="username"  v-validate="'required|name'" name="userName" v-model="userName" placeholder="请输入用户昵称"><br>
            <span v-show="errors.has('userName')" class="text-style"> {{ errors.first('userName') }} </span>  
        </div>
        <div class="register">
            <span class="iconfont pas">&#xe612;</span>
            <input type="password" class="password" placeholder="请输入密码" v-model="password" v-validate="'required|logpwd'" name="loginPwd">
            <span v-show="errors.has('loginPwd')" class="text-style"> {{ errors.first('loginPwd') }} </span>
        </div>
        <van-button class="log" type="primary" round v-if="!isclick" color="linear-gradient(to right, #f2bdd8,#1f0f3e)" size="large" @click="login">登录</van-button>
        <van-button class="log" v-else loading  round type="primary" loading-type="spinner" loading-text="登录中..." disabled size="large" color="linear-gradient(to right, #f2bdd8,#1f0f3e)"></van-button>
       </div>
    </div>
</template>
<script>
import {managerlogin} from '@/network/managerlogin/managerlogin.js'
import logo from '@/views/logincomponents/logo.vue'
import login from '@/views/logincomponents/loginregister.vue'
export default {
    name: 'managerlogin',
    data() {
        return {
            userName: '',
            password: '',
            isclick: false
        }
    },
    components: {
        logo,
        login
    },
    methods: {
        login() {
            this.$validator.validateAll().then(result => {
              if(result) {
              this.isclick = true
              let param = {
                "managername": this.userName,
                "mpassword": this.password
              }
              managerlogin("/managerlogin",{params: param}).then(response => {
                if(response.data.hasOwnProperty("success")){
                  this.$router.push('/manager')
                }else {
                  this.isclick = false
                  this.$toast(response.data.error)
                }
              })

              }
            })
        },
        ret() {
            this.$router.push('/')
        }
    }
}
</script>
<style lang="stylus" scoped>
  .managerlogin
    background: url('~@/assets/img/managerbackground.jpeg') center center/cover  no-repeat fixed
    width: 100%
    height: 0
    overflow: hidden
    padding-bottom: 178%
    .return 
      position: absolute 
      top: 0
      left: 0
      font-size: .7rem
      color: pink
    .login
      margin-top: .4rem
      height: .94rem
      line-height: .94rem
      .user
        width:  .533333rem
        height: .94rem
        line-height: .94rem
        font-size: .666667rem
        display: inline-block
        margin-left: 1.066667rem
        color: #ff6700
      .username
        outline: none 
        border: .04rem solid #db707a
        background-color: #1f0f3e
        height: .54rem
        line-height: .54rem
        margin-bottom: .266667rem
        margin-left: .4rem
        color: #fff
      .text-style
        width: 100%
        height: .4rem
        display: block
        margin: 0 auto
        line-height: .4rem
        padding-left: 2rem
        color: orange
    .register
      margin-top: .6rem
      height: .94rem
      line-height: .94rem
      margin-bottom: .4rem
      .pas
        width:  .533333rem
        height: .94rem
        line-height: .94rem
        font-size: .666667rem
        display: inline-block
        margin-left: 1.066667rem
        color: #ff6700
      .password
        outline: none 
        border: .04rem solid #db707a
        background-color: #1f0f3e
        height: .54rem
        line-height: .54rem
        margin-bottom: .266667rem
        margin-left: .4rem
        color: #666
      .text-style
        width: 100%
        height: .4rem
        display: block
        margin: 0 auto
        line-height: .4rem
        padding-left: 2rem
        color: orange
    .log 
      margin-top: .4rem
    .reg
      margin-top: .266667rem
</style>