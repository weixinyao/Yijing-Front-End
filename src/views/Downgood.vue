<template>
    <div class="downgood">
        <div class="downheader">
            <div class="iconfont back" @click="returnpre">&#xe604;</div>
            <div class="downgoodfont">物品信息</div>
      </div>
      <div class="goodmessage">
          <mt-field label="物品名"  v-model="goodname" disabled></mt-field>
          <mt-field label="物品简介"  v-model="goodinfo" disabled></mt-field>
          <mt-field label="物品详细描述"  v-model="goodcontent" type="textarea" disabled></mt-field>
          <mt-field label="物品价格"  v-model="goodprice" disabled></mt-field>
          <mt-field label="物品数量"  v-model="goodnums" type="number" disabled></mt-field>
          <mt-field label="分类名"  v-model="classifyname" disabled></mt-field>
      </div>
      <van-button type="primary" @click="downgood" v-if="isdown == 1" size="large">下架物品</van-button>
      <van-button disabled type="primary" v-else size="large">已下架</van-button>
    </div>
</template>
<script>
import {getdowngoodmessage} from '@/network/getdowngood/getdowngood.js'
import {down} from '@/network/downgood/downgood.js'
export default {
    name: 'downgood',
    data() {
        return {
      goodname: "",
      goodinfo: "",
      goodcontent: "",
      goodprice: "",
      goodnums: "",
      classifyname: "",
      isdown: 1
        }

    },
    created() {
      getdowngoodmessage("/getdowngood/"+this.$route.params.id).then(response => {
          console.log(response)
          this.goodname = response.data.gooddetail.good.goodname
          this.goodinfo = response.data.gooddetail.good.goodinfo
          this.goodcontent = response.data.gooddetail.good.goodContent
          this.goodprice = response.data.gooddetail.good.goodprice
          this.goodnums = response.data.gooddetail.good.totalcount
          this.classifyname = response.data.gooddetail.classify.classifyname
          this.isdown = response.data.gooddetail.good.goodstate
      })
    },
    methods: {
        returnpre() {
            this.$router.go(-1)
        },
        downgood() {
            down("/downgood/"+this.$route.params.id).then(response => {
                console.log(response)
                if(response.data.hasOwnProperty("success")){
                    this.$toast("下架成功")
                    this.isdown = 0
                }else {
                    this.$toast("下架失败请重试")
                }
            })
        }
    }
}
</script>
<style scoped>
.downheader {
  display: flex;
}
.back {
  font-size: .8rem;
  color: #666;
  margin-left: .2rem;
}
.downgoodfont {
  font-size: .4rem;
  color: #666;
  margin-left: 1.066667rem;
  margin-top: .143333rem;
}
.goodmessage {
    margin-bottom: .133333rem;
}
</style>