<template>
    <div class="feedbackmanager">
        <div class="ordercontent" v-for="(orderlist,index) in allorderlist" :key="index">
              <van-card
                :desc="orderlist.feedback.feedbackcontent"
                :title="orderlist.user.username"
                :thumb="'http://localhost:8080/'+orderlist.user.userimg"
           >
           <div slot="tags">
     
            </div>
           <div slot="footer">
            <van-button icon="https://img.yzcdn.cn/vant/logo.png" type="info" color="#ccc" @click="deletefeedback(orderlist.feedback.feedbackid)">删除</van-button>
          </div> 
              </van-card>
    </div>
    </div>
</template>
<script>
import {queryallfeedback} from '@/network/findallfeedback/findallfeedback.js'
import {delfeedback} from '@/network/deletefeedback/deletefeedback.js'
export default {
    name: 'feedbackmanager',
    data() {
        return {
           allorderlist: []
        }
    },
    created() {
        queryallfeedback("/findallfeedback").then(response => {
            console.log(response)
            this. allorderlist = response.data.allfeedback
        })
    },
    methods: {
        deletefeedback(id){
           delfeedback("/deletefeedback/"+id).then(response => {
               console.log(response)
               if(response.data.hasOwnProperty("success")){
                   this.$toast(response.data.success)
                   this.$router.go(0)
               }else {
                   this.$toast(response.data.error)
               }
           })
        }
    }
}
</script>
<style scoped>

</style>