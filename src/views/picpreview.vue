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
  <div class="gooddetail" @click="entergooddetail">详情</div>
  <div class="line">
  </div>
  <!-- 收藏按钮 -->
  <collectbutton @collect="collectgood"></collectbutton>
  <!--商品标题 -->
  <div class="goodtitle">{{goodname}}</div>
  <!--商品描述 -->
  <div class="gooddesc">{{goodinfo}}</div>
  <div class="price">
      ￥{{price}}
  </div>
  <!-- 选择商品 -->
  <div class="choosegood" @click="showgooddialog">
      <div class="alreadychoose">已选</div>
      <div class="goodname">{{goodname}}</div>
      <div class="iconfont arrow">&#xe603;</div>
  </div>
  <!-- 商品选择弹框 -->
  <div class="gooddialog" v-if="isshow">
      <div class="close iconfont" @click="closedialog">
         &#xe60a;
      </div>
      <div class="good">
          <div class="goodpic">
              <img :src="'http://localhost:8080/'+imgsrc" alt="">
          </div>
          <div class="gname">{{goodname}}</div>
      </div>
      <div class="goodnum">
          商品总数：{{goodnums}}  
      </div>
      <div class="goodsel">
        已卖出: {{selnum}}
      </div>
      <div class="rest">
        剩余： {{restnum}}
      </div>
<div class="choosenum">
  <div class="choosegoodnum">
    请选择购买数量：
  </div>
  <div class="goodnu">
     <div class="mul" @click="mulNum">-</div>
     {{goodNum}}
     <div class="add" @click="addNum">+</div>
  </div>
</div>
<mt-button type="default" size="large" @click="buy" v-if="goodnums == selnum" disabled>物品已售完</mt-button>
<mt-button type="danger" size="large" @click="buy" v-else>购买</mt-button>
  </div>
  <!-- 评论展示 -->
  <div class="showcomment">
    <div class="commentheader">
      <div class="commentnum">评论总数（{{ commentnums}}）</div>
      <div class="writecomment" @click="writecomment">写评论</div>
    </div>
    <div class="commentcontent" v-for="(item,index) in commentlist" :key="index">
      <div class="contentleft">
            <div class="userimg">
              <img :src="'http://localhost:8080/'+item.user.userimg" alt="">
            </div>
            <div class="username">{{item.user.username}}</div>
      </div>
      <div class="contentright">
          <div class="showstaron" v-for="num of item.comment.score">
            <img src="~@/assets/img/staron.png" alt="">
          </div>
          <div class="showstaroff" v-for="num2 of 5-(item.comment.score)">
            <img src="~@/assets/img/staroff.png" alt="">
          </div>
          <div class="maincontent">
         {{item.comment.commentcontent}}
         </div>
         <div class="deleteicon" @click="deletemycomment(item.comment.commentid)" v-if="item.comment.userid==$store.getters.userid">删除</div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import collectbutton from '@/views/Collectbutton.vue'
import {detelecomment} from '@/network/deletecomment/deletecomment.js'
import {getgoodbyid} from '@/network/findgoodbyid/findgoodbyid.js'
import {querycommentbygoodid} from '@/network/querycommentbygoodid/querycommentbygoodid.js'
import {collect} from '@/network/collectgood/collectgood.js'
import {buyg} from '@/network/buygood/buygood.js'
import Swiper from 'swiper';
export default {
    name: 'picpreview',
    data() {
        return {
            isshow: false,
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
            trueimglist: []

        }
    },
    components: {
        collectbutton
    },
    created(){
       console.log(this.$route.params.id)
       getgoodbyid('/good/'+this.$route.params.id).then(response => {
         console.log(response)
         this.goodname = response.data.good.goodname
         this.goodinfo = response.data.good.goodinfo
         this.price = response.data.good.goodprice
         this.goodnums = response.data.good.totalcount
         this.selnum = response.data.good.seld
         this.restnum = response.data.good.rest
         this.imgsrc = response.data.good.firstimgurl
         this.imglist = response.data.good.imgurl
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
       querycommentbygoodid('/comment/'+this.$route.params.id).then(response => {
         console.log("-----")
         console.log(response)
         this.commentnums = response.data.usercomment.length
         this.commentlist = response.data.usercomment
       })
    },
    mounted(){
      //   var mySwiper = new Swiper('.swiper-container', {
      //     autoplay: {
      //       delay: 3000,
      // stopOnLastSlide: false,
      //  disableOnInteraction: false
      //     },
      //     loop:true,
      //     observer:true,//修改swiper自己或子元素时，自动初始化swiper
    	// observeParents:true,//修改swiper的父元素时，自动初始化swiper
      //   })
      },
      methods: {
        showgooddialog() {
          this.isshow = true
        },
        mulNum() {
           if(this.goodNum > 0){
               this.goodNum --
           }
        },
        addNum() {
          if(this.goodNum < this.restnum){
            this.goodNum ++
          }
        },
        closedialog(){
          this.isshow = false
        },
        writecomment() {
          this.$router.push({name: 'writecomment',params:{id: this.$route.params.id}})
        },
        returnpre() {
          this.$router.go(-1)
        },
        collectgood(){
            collect("/collectgood/"+this.$store.getters.userid+"/"+this.$route.params.id).then(response => {
              console.log(response)
              if(response.data.hasOwnProperty("success")){
                this.$toast(response.data.success)
              }else {
                this.$toast("收藏失败请重试")
              }
            })
        },
        entergooddetail() {
          this.$router.push({name: 'goodarg',params:{id: this.$route.params.id}})
        },
        buy(){
          let obj = {
            userid: this.$store.getters.userid,
            goodid: this.$route.params.id,
            buynumber: this.goodNum
          }
          buyg("/buygood",obj).then(response => {
            console.log(response)
            if(response.data.hasOwnProperty("success")){
              this.$router.push('/ordersuccess')
            }else {
              this.$toast(response.data.error)
            }
          })
        },
        deletemycomment(id){
          
           detelecomment("/deletecomment/"+id).then(response => {
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
  .line
    height: .053333rem
    border-bottom: .013333rem solid #ccc
  .gooddetail
    width: .866667rem
    height: .4rem
    line-height: .4rem
    position: absolute 
    right: .266667rem
    top: .4rem
    background-color: #cccccc
    border-radius: .426667rem
    text-align: center
    z-index: 999
  .goodtitle
    font-size: .4rem
  .gooddesc
    font-size: .3rem
  .price
    color: #f56600
    font-size: .466667rem
  .swiper-container 
    background-color: #f6f6f6
  .choosegood
    display: flex
    height: .666667rem
    background-color: #f6f6f6 
    border-radius: .426667rem
    line-height: .666667rem
    justify-content:space-between
    .alreadychoose
      margin-left: .2rem
      color: #a9a9a9
    .goodname
      margin-left: .2rem
      color: #000
    .arrow
      color: #000
      font-size: .366667rem
      margin-right: .2rem
  .gooddialog
    position: absolute 
    z-index: 999
    left: 0
    right: 0
    bottom: 0
    top: 40%
    background-color: #fff
    border-radius: .426667rem
    border: .013333rem solid #ccc
  .close
    float: right 
    margin-top: .266667rem
    margin-right: .266667rem
    font-size: .5rem
  .good
    display: flex
  .goodpic
    margin-top: .873333rem
    margin-left: .373333rem
    border: .013333rem solid #cccccc
    border-radius: .426667rem
    img 
      width: 1.6rem
      height: 1.6rem
  .gname
    height: .4rem
    margin-top: 1.266667rem
    font-size: .4rem
    width: 5.333333rem
    margin-left: .106667rem
  .goodnum
    height: .933333rem
    background-color: #f6f6f6 
    border-radius: .426667rem
    line-height: .933333rem
    text-align: center
    margin-top: .2rem
    font-size: .3rem
    color: #777
  .goodsel
    height: .933333rem
    background-color: #f6f6f6 
    border-radius: .426667rem
    line-height: .933333rem
    text-align: center
    margin-top: .2rem
    font-size: .3rem
    color: #777
  .rest
    height: .933333rem
    background-color: #f6f6f6 
    border-radius: .426667rem
    line-height: .933333rem
    text-align: center
    margin-top: .2rem
    font-size: .3rem
    color: #777
  .choosenum
    display: flex
    justify-content: space-between
    margin-top: .233333rem
    border: .013333rem solid #ccc
    height: .8rem
    line-height: .8rem
    margin-bottom: .106667rem
    .choosegoodnum
      margin-left: .133333rem
    .goodnu
      display: flex
      margin-right: .133333rem
      .add
        background-color: #ff0000
        color: #ffffff
        width: .6rem
        text-align: center
        border-radius: .426667rem
        height: .466667rem
        line-height: .466667rem
        margin-top: .206667rem
        margin-left: .106667rem
      .mul
        background-color: #ff0000
        color: #fff
        width: .6rem
        text-align: center
        border-radius: .426667rem
        height: .466667rem
        line-height: .466667rem
        margin-top: .206667rem
        margin-right: .133333rem
  .showcomment
    .commentheader
      display: flex
      justify-content: space-between
      margin-top: .306667rem
      font-size: .34rem
      .commentnum
        margin-left: .106667rem
      .writecomment
        border: .013333rem solid blue
        margin-right: .106667rem
        border-radius: .426667rem
        color: blue
        width: 1.533333rem
        height: .466667rem
        text-align: center
        line-height: .466667rem
    .commentcontent
      display: flex
      margin-top: .106667rem
      border-bottom: .013333rem solid #ccc
      padding-bottom: .106667rem
      .contentleft
        margin-left: .106667rem
        .userimg
          img 
            width: .666667rem
            height: .666667rem
            border-radius: 50%
        .username
          font-size: .24rem
          margin-top: .08rem
      .contentright
        margin-left: .233333rem
        flex: 1
        .showstaron
          float: left
          img 
            width: .266667rem
            height: .266667rem 
        .showstaroff
          float: left
          img 
            width: .266667rem
            height: .266667rem 
        .maincontent
          clear: both
          margin-top: .406667rem
        .deleteicon
          border: .013333rem solid green
          width: .966667rem
          height: .433333rem
          float: right
          border-radius: .426667rem
          text-align: center
          line-height: .433333rem
          margin-right: .12rem
        
    
</style>