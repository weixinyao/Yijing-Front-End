<template>
    <div class="container">
<van-cell-group>
  <van-field
    class="username" 
    v-model="username"
    name="username"
    required
    clearable
    label="用户名"
    right-icon="question-o"
    placeholder="请输入用户名"
    @click-right-icon="$toast('用户名不能有特殊字符')"
  />

  <van-field
    class="password"
    v-model="password"
    name="password"
    type="password"
    label="密码"
    placeholder="请输入密码"
    required
    maxlength="18"
    show-word-limit
    right-icon="question-o"
    @click-right-icon="$toast('密码长度不能超过18位')"
  />
  <van-field
    class="modifypassword"
    v-model="modifypassword"
    name="qrwdLog"
    type="password"
    label="确认密码"
    placeholder="请输入密码"
    required
    maxlength="18"
    show-word-limit
    right-icon="question-o"
    @click-right-icon="$toast('与上面密码必须一致')"
  />
</van-cell-group>
  <van-button round type="info" size="large" color="#f00" @click="register">注册</van-button>
    </div>
</template>
<script>
import {userregister} from '@/network/login/loginregister.js'
export default {
    name: 'register',
    data() {
        return {
            username: '',
            password: '',
            modifypassword: ''
        }
    },
    methods: {
      register() {
        if(this.username == ''|| this.username == null) {
          this.$toast('用户名不能为空')
          return;
        }
        else if(this.password == ''|| this.password == null){
          this.$toast('密码不能为空')
          return;
        }
        else if(this.modifypassword == ''|| this.modifypassword == null){
          this.$toast('确认密码不能为空')
          return;
        }
        else if(this.password != this.modifypassword){
          this.$toast('密码和确认密码不一致')
          return
        }
        else {
          let param = new URLSearchParams()
          param.append("username",this.username)
          param.append("password",this.password)
             userregister('register',param).then(response => {
               console.log(response)
               if(response.data.hasOwnProperty("success")){
                 this.$toast("注册成功")
                 this.$router.go(-1)
               }else {
                 this.$toast("注册失败，用户名可能重复")
               }
             })
        }
      }
    }
}
</script>
<style lang="stylus" scoped>
  .container
    width: 100%
    height: 0
    overflow: hidden
    padding-bottom: 178%
</style>