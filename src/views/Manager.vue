<template>
    <div class="manager">
        <div class="managerheader">
            
        </div>
        <div class="managercontent">
        <van-tabs @click="onClick">
         <van-tab title="订单管理">
           <div class="ordercontent" v-for="(orderlist,index) in allorderlist" :key="index">
              <van-card
                :num="orderlist.order.buynumber"
                :price="orderlist.good.goodprice"
                :desc="orderlist.user.username"
                :title="orderlist.good.goodname"
                :thumb="'http://localhost:8080/'+orderlist.good.firstimgurl"
           >
           <div slot="tags">
     
            </div>
          <!-- <div slot="footer">
            <van-button icon="https://img.yzcdn.cn/vant/logo.png" type="info" color="#ccc" @click="deleteorder(orderlist.order.orderid)">删除</van-button>
          </div> -->
            </van-card>
           </div>
         </van-tab>
         <van-tab title="总体分析">
           <echart></echart>
         </van-tab>
         <van-tab title="反馈管理">
           <feedbackmanager></feedbackmanager>
         </van-tab>
         <van-tab title="审核管理">
           <shenhemanager></shenhemanager>
         </van-tab>
        </van-tabs>
        </div>
    </div>
</template>
<script>
import echart from '@/views/Analyseorder.vue'
import {getallord} from '@/network/getallorder/getallorder.js'
import feedbackmanager from '@/views/Feedbackmanager.vue'
import shenhemanager from '@/views/Shenhemanager.vue'
export default {
    name: 'manager',
    data(){
      return {
        allorderlist: []
      }
    },
    created(){
      getallord("/getallorder").then(response => {
        console.log(response)
        this.allorderlist = response.data.allorder
      })
    },
    methods: {
    onClick(name, title) {
      this.$toast(title);
    },
    deleteorder(id){
       console.log(id)
    }
  },
  components: {
    echart,
    feedbackmanager,
    shenhemanager
  }
}
</script>
<style lang="stylus" scoped>

</style>