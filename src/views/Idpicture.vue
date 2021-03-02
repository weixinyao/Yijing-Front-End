<template>
<div class="idpicture">
    <div class="idheader">
            <div class="iconfont back" @click="returnmy">&#xe604;</div>
            <div class="idfont">智能识图</div>
        </div>
        <div class="idcontent">
            <div class="contentle">
                 <div class="uploadimg">
          <p style="clear:both;text-align: left;margin:0px 0px 0px 10px ;color: #999999;padding: 0;">商品图片信息：（最多10张）</p>

         <van-uploader
         v-model="imgList"
          multiple
         :max-count="10"
         :preview-size="60"
         :after-read="afterread"
         style="margin:5px 0px 0px 10px"
          />
              </div>
            </div>
        </div>
        <div class="showresult">
          <h1>结果:</h1>
          <div class="content">
            <textarea name="" id="" cols="30" rows="10" v-model = "resultcontent" style="border:1px solid lightblue;"></textarea>
          </div>
        </div>
</div>
</template>
<script>
import {applygood} from '@/network/uploadgood/uploadgood.js'
export default {
    name: 'idpicture',
    data() {
      return {
          imgList: [],
          resultcontent: ""
      }
    },
    methods: {
        returnmy() {
            this.$router.go(-1)
        },
        afterread(){
            let param = new FormData();
            for(let i=0;i<this.imgList.length;i++) {
              let file = this.imgList[i].file;
              param.append('file', file);
            }
             applygood('/ocr',param).then(response => {
                 console.log(response)
                for(var i = 0;i < response.data.words_result.length;i++){
                  this. resultcontent += response.data.words_result[i].words
                } 
             })
        }

    }
}
</script>
<style scoped>
.idheader {
  display: flex;
  border-bottom: .013333rem solid #ccc;
  margin-bottom: .133333rem;
}
.back {
  font-size: .8rem;
  color: #666;
  margin-left: .2rem;
}
.idfont {
    font-size: .4rem;
    color: #666;
    margin-left: 1.666667rem;
    margin-top: .143333rem;
}
.content {
  margin-top: .133333rem;
}
</style>