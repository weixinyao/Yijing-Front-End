<template>
    <div class="writecomment">
      <div class="commentheader">
          <!-- 返回按钮 -->
            <div class="returnarrow iconfont" @click="returnpre">
             &#xe604;
             </div>
          <div class="goodpic">
              <img :src="'http://localhost:8080/'+goodimgsrc" alt="">
          </div>
          <div class="goodname">{{goodname}}</div>
      </div>
      <div class="commentcontent">
            <textarea name="" id="" cols="30" rows="10" class="commentcon" placeholder="请填写您的意见" v-model="commentcontent"></textarea>
      </div>
        <div id="star" class="row">
            <div class="form-group clearfix">
                <label class="control-label">您对该商品的满意度:<span class="store">{{starNum}}</span>分</label>
                <div>
                    <div class="grade-box">
                        <img v-for="(star,index) in stars" :src="star.src" v-on:click="rating(index)" alt="星星图片" :key="index" class="starimg"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="button" @click="applycomment">提交</div>
    </div>
</template>
<script>
import {getgoodbyid} from '@/network/findgoodbyid/findgoodbyid.js'
import starOffImg from '@/assets/img/staroff.png'
import starOnImg from '@/assets/img/staron.png'
import {commitcomment} from '@/network/applycomment/applycomment.js'
export default {
    name: 'writecomment',
    data(){
        return {
            stars: [{
                            src: starOffImg,
                            active: false
                        }, {
                            src: starOffImg,
                            active: false
                        }, {
                            src: starOffImg,
                            active: false
                        },
                        {
                            src: starOffImg,
                            active: false
                        }, {
                            src: starOffImg,
                            active: false
                        }
                    ],
                    starNum: 0,
                    goodimgsrc: "",
                    goodname: "",
                    commentcontent: ""
        }
    },
    created(){
          getgoodbyid('/good/'+this.$route.params.id).then(response => {
                 this.goodimgsrc = response.data.good.firstimgurl
                 this.goodname = response.data.good.goodname
          })
          console.log("userid="+this.$store.getters.userid)
    },
    methods: {
        //评分
                    rating: function(index) {
                        var total = this.stars.length; //星星总数
                        var idx = index + 1; //这代表选的第idx颗星-也代表应该显示的星星数量

                        //进入if说明页面为初始状态
                        if(this.starNum == 0) {
                            this.starNum = idx;
                            for(var i = 0; i < idx; i++) {
                                this.stars[i].src = starOnImg;
                                this.stars[i].active = true;
                            }
                        } else {
                            //如果再次点击当前选中的星级-仅取消掉当前星级，保留之前的。
                            if(idx == this.starNum) {
                                for(var i = index; i < total; i++) {
                                    this.stars[i].src = starOffImg;
                                    this.stars[i].active = false;
                                }
                            }
                            //如果小于当前最高星级，则直接保留当前星级
                            if(idx < this.starNum) {
                                for(var i = idx; i < this.starNum; i++) {
                                    this.stars[i].src = starOffImg;
                                    this.stars[i].active = false;
                                }
                            }
                            //如果大于当前星级，则直接选到该星级
                            if(idx > this.starNum) {
                                for(var i = 0; i < idx; i++) {
                                    this.stars[i].src = starOnImg;
                                    this.stars[i].active = true;
                                }
                            }

                            var count = 0; //计数器-统计当前有几颗星
                            for(var i = 0; i < total; i++) {
                                if(this.stars[i].active) {
                                    count++;
                                }
                            }
                            this.starNum = count;
                        }
                    },
                    returnpre(){
                        this.$router.go(-1)
                    },
                    applycomment(){
                        let params = {
                            "userid": this.$store.getters.userid,
                            "goodid": this.$route.params.id,
                            "commentcontent": this.commentcontent,
                            "score": this.starNum
                        }
                        commitcomment("/addcomment",params).then(response => {
                            console.log(response)
                            if(response.data.hasOwnProperty("success")){
                                this.$toast(response.data.success)
                            }else {
                                this.$toast(response.data.error)
                            }
                        })

                    }

                }
            
    

}
</script>
<style scoped>
  .commentheader {
      text-align: center;
      margin-top: .24rem;
      margin-bottom: .106667rem;
  }
  .commentheader img {
      width: 2.333333rem;
      height: 2.333333rem;
  }
  .returnarrow {
    font-size: .866667rem;
    color: #000;
    position: absolute;
    left: .1rem;
    top: .2rem;
    z-index: 999;
  }
  .goodname {
      margin-top: .106667rem;
  }
  .commentcontent {
      text-align: center;
      margin-bottom: .106667rem;
  }
  .commentcon {
      border: .026667rem solid #ccc;
  }
  .form-group {
      text-align: center;
  }
  .control-label {
      font-size: .34rem;
  }
  .store {
      color: yellow;
      font-size: .44rem;
  }
  .starimg {
      width: .466667rem;
      height: .566667rem;
      margin-left: .466667rem;
      
  }
  .button {
      width: 1.833333rem;
      height: 0.833333rem;
      border-radius: .426667rem;
      margin: 0 auto;
      background-color: pink;
      text-align: center;
      line-height: 0.833333rem;
      color: #fff;
      margin-top: 1.306667rem;
  }
</style>