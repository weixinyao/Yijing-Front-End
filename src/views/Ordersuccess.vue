<template>
    <div class="ordersuccess">
        <div class="orderheader">
            <div class="iconfont back" @click="returnpre">&#xe604;</div>
            <div class="orderfont">支付成功</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ordersuccess',
    methods: {
        returnpre() {
            this.$router.go(-1)
        }
    }
}
</script>
<style scoped>
.ordersuccess {
    background: url('~@/assets/img/ordersuccess.png') center center/cover  no-repeat fixed;
    width: 100%;
    height: 0;
    overflow: hidden;
    padding-bottom: 178%; 
}
.orderheader {
  display: flex;
  margin-bottom: .133333rem;
}
.back {
  font-size: .8rem;
  color: lightblue;
  margin-left: .2rem;
}
.orderfont {
    font-size: .4rem;
    color: #666;
    margin-left: 1.666667rem;
    margin-top: .143333rem;
}
</style>