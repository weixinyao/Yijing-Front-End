<template>
    <div class="addmoney">
       <div class="addheader">
            <div class="iconfont back" @click="returnmy">&#xe604;</div>
            <div class="addfont">充值</div>
        </div>
        <div class="addcontent">
            <div class="add">请输入充值金额：</div>
            <input type="number" v-model="money" class="moneynumber">
        </div>
        <van-button type="primary" @click="addmoney" class="button">充值</van-button>
    </div>
</template>
<script>
import {add} from '@/network/addmoney/addmoney.js'
export default {
    name: 'addmoney',
    data() {
     return {
         money: 0.0
     }
    },
    methods: {
        returnmy() {
            this.$router.go(-1)
        },
        addmoney() {
            let param = {
                userid: this.$store.getters.userid,
                money: this.money
            }
            add("/addmoney",param).then(response => {
                console.log(response)
                if(response.data.hasOwnProperty("success")){
                    this.$toast(response.data.success)
                    this.money = 0
                }else {
                    this.$toast(response.data.error)
                }
            })
        }
    }
}
</script>
<style scoped>
.addheader {
  display: flex;
  border-bottom: .013333rem solid #ccc;
  margin-bottom: .133333rem;
}
.back {
  font-size: .8rem;
  color: #666;
  margin-left: .2rem;
}
.addfont {
    font-size: .4rem;
    color: #666;
    margin-left: 1.666667rem;
    margin-top: .143333rem;
}
.add {
    text-align: center;
    font-size: .366667rem;
    margin-top: .666667rem;
}
.moneynumber {
    border: .013333rem solid lightblue;
    width: 4.666667rem;
    margin-top: 1.2rem;
    height: .666667rem;
    margin-left: 1.333333rem;
}
.addcontent {
    margin-bottom: .266667rem;
}
.button {
    border-radius: .426667rem;
    margin-top: 1.266667rem;
    width: 1.333333rem;
    margin-left: 2.833333rem;
}
</style>