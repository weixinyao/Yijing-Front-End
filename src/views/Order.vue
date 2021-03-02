<template>
    <div class="order">
        <div class="orderheader">
            <div class="iconfont back" @click="returnmy">&#xe604;</div>
            <div class="orderfont">我的订单</div>
        </div>
        <div class="ordercontent" v-for="(orders,index) in orderlist" :key="index">
        <van-card
          :num="orders.order.buynumber"
          :price="orders.good.goodprice"
          :desc="orders.good.goodinfo"
          :title="orders.good.goodname"
          :thumb="'http://localhost:8080/'+orders.good.firstimgurl"
          />
        </div>
    </div>
</template>
<script>
import {getordermessage} from '@/network/getorder/getorder.js'
export default {
    name: 'collect',
    data() {
        return {
          orderlist: []
        }
    },
    created(){
      getordermessage("/order/"+this.$store.getters.userid).then(response => {
          console.log(response)
          this.orderlist = response.data.myorder
      })
    },
    methods: {
        returnmy() {
            this.$router.push('/my')
        }
    }
}
</script>
<style lang="stylus" scoped>
  .orderheader
    display: flex
    .back 
      font-size: .8rem
      color: #666
      margin-left: .2rem
    .orderfont
      font-size: .4rem
      color: #666
      margin-left: 1.666667rem
      margin-top: .143333rem
</style>