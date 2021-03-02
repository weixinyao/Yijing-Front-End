<template>
    <div class="personalmessage">
          <div class="personalmessageheader">
            <div class="iconfont back" @click="returnmy">&#xe604;</div>
            <div class="personalmessagefont">我的个人信息</div>
        </div>
        <div class="personalmessagecontent">
            <mt-field class="input" label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
            <mt-field class="input" label="密码" placeholder="请输入密码" v-model="password" type="password"></mt-field>
            <mt-field class="input" label="手机号码" placeholder="请输入手机号码" v-model="telephone"></mt-field>
            <mt-field class="input" label="邮箱" placeholder="请输入邮箱" v-model="email"></mt-field>
            <mt-field class="input" label="余额"  v-model="money" disabled></mt-field>
        </div>
        <div class="but" @click="update">修改</div>
    </div>
</template>
<script>
import {queryuser} from '@/network/queryusermessage/queryusermessage.js'
import {updateuser} from '@/network/updateusermessage/updateusermessage.js'
export default {
    name: 'personalmessage',
    data() {
        return {
                 username: "",
                 password: "",
                 telephone: "",
                 email: "",
                 money: 0

        }
    },
    created(){
       queryuser('/getusermessage/'+this.$store.getters.userid).then(response => {
        console.log(response)
        this.username = response.data.usermessage.username
        this.password = response.data.usermessage.password
        this.telephone = response.data.usermessage.telephone
        this.email = response.data.usermessage.email
        this.money = response.data.usermessage.money
        
      })
    },
    methods: {
        returnmy() {
            this.$router.push('/my')
        },
        update() {
          let param = {
            "userid": this.$store.getters.userid,
            "username": this.username,
            "password": this.password,
            "telephone": this.telephone,
            "email": this.email
          }
          updateuser("/updateusermessage",param).then(response => {
            console.log(response)
            if(response.data.hasOwnProperty("success")){
              this.$toast("修改成功")
            }else {
              this.$toast("修改失败请重试")
            }
          })
        }
    }
}
</script>
<style lang="stylus" scoped>
  .personalmessageheader
    display: flex
    .back 
      font-size: .8rem
      color: #666
      margin-left: .2rem
    .personalmessagefont
      font-size: .4rem
      color: #666
      margin-left: 1.066667rem
      margin-top: .143333rem 
  .personalmessagecontent
    .input
      margin-left: .566667rem
  .but
    width: 1.333333rem
    border-radius: .426667rem
    height: .666667rem
    margin: .24rem auto 
    background-color:pink 
    color: white
    line-height: .666667rem
    text-align: center
</style>