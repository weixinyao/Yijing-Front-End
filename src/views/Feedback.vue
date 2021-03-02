<template>
    <div class="feedback">
        <div class="feedbackheader">
            <div class="iconfont back" @click="returnmy">&#xe604;</div>
            <div class="feedbackfont">反馈</div>
        </div>
        <div class="feedbackcontent">
            <textarea name="" id="" cols="30" rows="10" class="feedbackcon" placeholder="请填写您的意见" v-model="feedcontent"></textarea>
        </div>
        <div class="button" @click="submitfeedback">提交反馈</div>
    </div>
</template>
<script>
import {addfeedback} from '@/network/applyfeedback/applyfeedback.js'
export default {
    name: 'feedback',
    data() {
        return {
          feedcontent: ""
        }
    },
    methods: {
        returnmy() {
            this.$router.push('/my')
        },
        //提交反馈
        submitfeedback(){
            let obj = {
                userid: this.$store.getters.userid,
                feedbackcontent: this.feedcontent
            }
            addfeedback("/addfeedback",obj).then(response => {
                console.log(response)
                if(response.data.hasOwnProperty("success")){
                    this.$toast(response.data.success)
                }else {
                    this.$toast("反馈失败请重试")
                }
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
  .feedbackheader
    display: flex
    .back 
      font-size: .8rem
      color: #666
      margin-left: .2rem
    .feedbackfont
      font-size: .4rem
      color: #666
      margin-left: 2.666667rem
      margin-top: .143333rem
  .feedbackcontent
    text-align: center
    .feedbackcon
      border: 0
      width: 5.333333rem
      height: 5.333333rem
      background-color:rgba(241,241,241,.98)
      border-radius: .166667rem
      resize: none
      font-size: .306667rem
  .button
    width: 1.866667rem
    height: .8rem
    font-size: .333333rem
    color: #fff
    background-color: lightblue
    margin: .266667rem auto
    border-radius: .426667rem
    text-align: center
    line-height: .8rem

</style>