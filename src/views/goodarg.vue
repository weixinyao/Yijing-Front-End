<template>
    <div class="gooddetail">
        <div class="goodheader">
            <div class="iconfont back" @click="returnmy">&#xe604;</div>
            <div class="goodfont">物品详细信息</div>
        </div>
        <div class="goodcontent">
            <table class="goodtable">
               <tr class="goodtr">
                 <td class="goodtd">物品名</td> 
                 <td class="goodtd">{{goodname}}</td>   
               </tr> 
               <tr class="goodtr">
                 <td class="goodtd">物品简介</td> 
                 <td class="goodtd">{{goodinfo}}</td>   
               </tr>
               <tr class="goodtr">
                 <td class="goodtd">物品详细描述</td> 
                 <td class="goodtd">{{gooddesc}}</td>   
               </tr>
               <tr class="goodtr">
                 <td class="goodtd">物品价格</td> 
                 <td class="goodtd">{{goodprice}}元</td>   
               </tr>
                <tr class="goodtr">
                 <td class="goodtd">物品数量</td> 
                 <td class="goodtd">{{goodnum}}</td>   
               </tr> 
            </table>
        </div>
    </div>
</template>
<script>
import {getgoodbyid} from '@/network/findgoodbyid/findgoodbyid.js'
export default {
    name: 'goodarg',
    data() {
      return {
        goodname: "",
        goodinfo: "",
        gooddesc: "",
        goodprice: "",
        goodnum: 0
      }
    },
    created() {
      getgoodbyid('/good/'+this.$route.params.id).then(response => {
          console.log(response)
          this.goodname = response.data.good.goodname
          this.goodinfo = response.data.good.goodinfo
          this.gooddesc = response.data.good.goodContent
          this.goodprice = response.data.good.goodprice
          this.goodnum = response.data.good.totalcount
      })
    },
    methods: {
        returnmy() {
            this.$router.go(-1)
        }
    }
}
</script>
<style scoped>
.goodheader {
  display: flex;
  border-bottom: .013333rem solid #ccc;
  margin-bottom: .133333rem;
}
.back {
  font-size: .8rem;
  color: #666;
  margin-left: .2rem;
}
.goodfont {
    font-size: .4rem;
    color: #666;
    margin-left: 1.666667rem;
    margin-top: .143333rem;
}
.goodtable {
    border: .013333rem solid lightblue;
    width: 7.4rem;
    height:8.333333rem;
}
.goodtr {
    border-bottom: .013333rem solid lightblue;
}
.goodtd {
    border-right: .013333rem solid lightblue;
    text-align: center;
}
</style>