<template>
<div class="picpreview">
   <!-- 图片展示 -->
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item,index) in trueimglist" :key="index">
        <img :src="'http://localhost:8080/'+item" alt="" preview="1" preview-text="描述"/>
      </div>
    </div>
  </div>
  <!-- 返回按钮 -->
  <div class="returnarrow iconfont" @click="returnpre"> 
      &#xe604;
  </div>
  <!-- 物品详细信息 -->
     <div class="goodmessage">
          <mt-field label="物品名"  v-model="goodname" disabled></mt-field>
          <mt-field label="物品简介"  v-model="goodinfo" disabled></mt-field>
          <mt-field label="物品详细描述"  v-model="goodcontent" type="textarea" disabled></mt-field>
          <mt-field label="物品价格"  v-model="goodprice" disabled></mt-field>
          <mt-field label="物品数量"  v-model="goodnums" type="number" disabled></mt-field>
          <mt-field label="分类名"  v-model="classifyname" disabled></mt-field>
      </div>
      <van-button type="primary" @click="permitgood" v-if="isdown == 1" size="large">审核通过</van-button>
      <van-button disabled type="primary" v-else size="large">已审核</van-button>
  
</div>
</template>
<script>
import {getgoodbyid} from '@/network/findgoodbyid/findgoodbyid.js'
import {permit} from '@/network/permitgood/permitgood.js'
import Swiper from 'swiper';
export default {
    name: 'picpreview',
    data() {
        return {
            goodNum: 0,  //购买数量
            goodnums: 0, //商品总数
            selnum: 0,//已卖出数量
            restnum: 0, //剩余数量
            goodname: "",
            goodinfo: "",
            price: 0,
            imgsrc: "",
            commentnums: 0,
            commentlist: [],
            imglist: "",
            trueimglist: [],
            goodcontent: "",
            goodprice: 0,
            classifyname: "",
            isdown: 1

        }
    },
    components: {
        
    },
    created(){
       console.log(this.$route.params.id)
       getgoodbyid('/shenhegood/'+this.$route.params.id).then(response => {
         console.log(response)
         this.goodname = response.data.classifygood.good.goodname
         this.goodinfo = response.data.classifygood.good.goodinfo
         this.price = response.data.classifygood.good.goodprice
         this.goodnums = response.data.classifygood.good.totalcount
         this.selnum = response.data.classifygood.good.seld
         this.restnum = response.data.classifygood.good.rest
         this.imgsrc = response.data.classifygood.good.firstimgurl
         this.imglist = response.data.classifygood.good.imgurl
         this.goodprice = response.data.classifygood.good.goodprice
         this.classifyname = response.data.classifygood.classify.classifyname
         this.goodcontent = response.data.classifygood.good.goodContent
         this.trueimglist = this.imglist.split(",")
         this.trueimglist.pop()
         this.$previewRefresh()
         var mySwiper = new Swiper('.swiper-container', {
          autoplay: {
            delay: 3000,
      stopOnLastSlide: false,
       disableOnInteraction: false
          },
          loop:true,
           observer:true,//修改swiper自己或子元素时，自动初始化swiper
    	observeParents:true,//修改swiper的父元素时，自动初始化swiper
        })
       })
      
       
    },
    mounted(){
      
      },
      methods: {
       returnpre() {
           this.$router.go(-1)
       },
       permitgood(){
          permit("/permitgood/"+this.$route.params.id).then(response => {
              console.log(response)
              if(response.data.hasOwnProperty("success")){
                  this.$toast(response.data.success)
                  this.isdown = 0
              }else {
                  this.$toast(response.data.error)
              }
          })
       }
           
         
      }
}
</script>
<style lang="stylus" scoped>
  .swiper-slide
    img
      width: 100%
      height: 6rem
  .returnarrow
    font-size: .866667rem
    color: #000
    position: absolute
    left: .1rem
    top: .2rem
    z-index: 999
  
</style>