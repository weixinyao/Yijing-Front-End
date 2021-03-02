<template>
    <div class="upload">
      <div class="uploadheader">
            <div class="iconfont back" @click="returnmy">&#xe604;</div>
            <div class="uploadgoodfont">发布物品</div>
      </div>
      <div class="uploadimg">
      <p style="clear:both;text-align: left;margin:0px 0px 0px 10px ;color: #999999;padding: 0;">商品图片信息：（最多3张）</p>

    <van-uploader
      v-model="imgList"
      multiple
      :max-count="10"
      :preview-size="60"
    style="margin:5px 0px 0px 10px"
    />
    </div>
    <div class="goodmessage">
      <mt-field label="物品名" placeholder="请输入您想要发布的物品名" v-model="goodname"></mt-field>
      <mt-field label="物品简介" placeholder="请输入物品简介" v-model="goodinfo"></mt-field>
      <mt-field label="物品详细描述" placeholder="请输入物品详细描述" v-model="goodcontent" type="textarea"></mt-field>
      <mt-field label="物品价格" placeholder="请输入物品价格" v-model="goodprice"></mt-field>
      <div class="choose">
        <div class="classifyfont">请选择分类名</div>
      <select class="chooseclassify" v-model="classifysymbol">
    <option  v-for="classify  in classifyList" name="classifySymbolId" :value="classify.classifyid" :key="classify.classifyid">{{classify.classifyname}}</option>
       </select>
      </div>
      <mt-field label="物品数量" placeholder="请输入物品数量" v-model="goodnums" type="number"></mt-field>
    </div>
    <div class="button" @click="applygood">发布</div>
    </div>
</template>
<script>
import {getallclassify} from '@/network/classify/classify.js'
import {applygood} from '@/network/uploadgood/uploadgood.js'
export default {
    name: 'uploadgood',
    data() {
      return {
          imgList: [],
          update: false,
          classifyList: [
            
          ],
          classifysymbol: 1,
          goodname: "",
          goodinfo: "",
          goodcontent: "",
          goodprice: 0,
          goodnums: 0

      }
    },
    created() {
       getallclassify("/getallclassify").then(response => {
         console.log(response)
         this.classifyList = response.data.allclassify
       })
    },
    mounted() {
        this.update = false
    },
    methods: {
      returnmy() {
         this.$router.go(-1)
      },
        applygood() {
          var then = this
           // 图片上传
            let param = new FormData();
            for(let i=0;i<this.imgList.length;i++) {
              let file = this.imgList[i].file;
              param.append('file', file);
            }
            let obj = {
               goodname: this.goodname,
               goodinfo: this.goodinfo,
               goodprice: this.goodprice,
               goodcontent: this.goodcontent,
               classifyid: this.classifysymbol,
               totalcount: this.goodnums,
               publisherid: this.$store.getters.userid
            }
            param.append("goodname",obj.goodname)
            param.append("goodinfo",obj.goodinfo)
            param.append("goodprice",obj.goodprice)
            param.append("goodcontent",obj.goodcontent)
            param.append("classifyid",obj.classifyid)
            param.append("totalcount",obj.totalcount)
            param.append("publisherid",obj.publisherid)
            // param.append('feedPicture', this.feedPicture);
            // param.append('feedProblem', this.description);
            // param.append('feedDescription', this.problem);
            // param.append('feedState', this.feedState);

            // param.append('file', file);
              let config = {
                headers: {'Content-Type': 'multipart/form-data'}
              }; //添加请求头
            //   this.$http.post('feedBack/uploadImg', param, config)
            //     .then(response => {
            //       console.log(response);
            //     });
            
                applygood('/uploadgood',param).then((response) => {
                    console.log(response)
                    if(response.data.hasOwnProperty("OK")){
                      this.$toast("发布成功待管理员审核即可上架")
                      this.$router.go(0)
                    }else {
                      this.$toast("发布物品失败请重试")
                    }
                })
                
        }
    }
}
</script>
<style scoped>
.uploadheader {
  display: flex;
}
.back {
  font-size: .8rem;
  color: #666;
  margin-left: .2rem;
}
.uploadgoodfont {
  font-size: .4rem;
  color: #666;
  margin-left: 1.066667rem;
  margin-top: .143333rem;
}

.uploadimg {
  margin-top: .386667rem
}
.choose {
  width: 100%;
  height: .866667rem;
  display: flex;
  font-size: .313333rem;
  color: #666;
}
.classifyfont {
  width: 2.333333rem;
  height: .866667rem;
  font-size: .313333rem;
  color: #666;
  line-height: .866667rem;
  margin-left: .106667rem;
}
.chooseclassify {
  width: fit-content;
  font-size: .313333rem;
  color: #666;
}
.button {
  margin-top: .186667rem;
  border-radius: .426667rem;
  background-color: pink;
  width: 1.666667rem;
  margin: 0 auto;
  text-align: center;
  line-height: .666667rem;
  height: .666667rem;
  color: #fff;
}
</style>