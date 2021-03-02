<template>
<div class="my">
  <floatbutton></floatbutton>
  <div class="myheader">
    
    <div class="imgwrapper">
      <!-- 选择图片后展示 -->
    <img class="userimg" :src="f.src" v-if="f" />
    <!-- 选择图片之前展示 -->
    <img class="userimg" :src="userimgurl" @click="add()" v-else />
    </div>
    <input
      class="value"
      style="display:none"
      type="file"
      ref="file"
      accept="image/*"
      multiple="multiple"
      @change="getFile($event)"
    />
    <div class="upload">
    <!--<img :src="loadImage" width="100px" height="100px" />  -->
    <mt-button @click="submitForm($event)" size="small">
      <img src="../assets/img/upload.png" height="20" width="20" slot="icon">
      <span class="uploadfont">上传</span>
   </mt-button>
    </div>
    <div class="addmoney" @click="admoney">
      充值
    </div>
  </div>
  <div class="mycontent">
      <ul>
        <router-link tag="li" class="item" to="/personalmessage">
          <div class="iconfont icon">&#xe62c;</div>
          <div class="itemfont">个人信息</div>
          <div class="iconfont arrow">&#xe603;</div>
        </router-link>
         <router-link tag="li" class="item" to="/uploadgood">
          <div class="iconfont icon">&#xe6cc;</div>
          <div class="itemfont">发布物品</div>
          <div class="iconfont arrow">&#xe603;</div>
        </router-link>
         <router-link tag="li" class="item" to="/order">
          <div class="iconfont icon">&#xe64e;</div>
          <div class="itemfont">我的订单</div>
          <div class="iconfont arrow">&#xe603;</div>
        </router-link>
         <router-link tag="li" class="item" to="/publish">
          <div class="iconfont icon">&#xe668;</div>
          <div class="itemfont">我的发布</div>
          <div class="iconfont arrow">&#xe603;</div>
        </router-link>
        <router-link tag="li" class="item" to="/collect">
          <div class="iconfont icon">&#xe609;</div>
          <div class="itemfont">我的收藏</div>
          <div class="iconfont arrow">&#xe603;</div>
        </router-link>
         <router-link tag="li" class="item" to="/idpicture">
          <div class="iconfont icon">&#xe622;</div>
          <div class="itemfont">智能识图</div>
          <div class="iconfont arrow">&#xe603;</div>
        </router-link>
         <router-link tag="li" class="item" to="/help">
          <div class="iconfont icon">&#xe77c;</div>
          <div class="itemfont">帮助</div>
          <div class="iconfont arrow">&#xe603;</div>
        </router-link>
         <router-link tag="li" class="item" to="/feedback">
          <div class="iconfont icon">&#xe60c;</div>
          <div class="itemfont">反馈</div>
          <div class="iconfont arrow">&#xe603;</div>
        </router-link>
      </ul>
  </div>
  <tabbar></tabbar>
</div>
</template>
<script>
import tabbar from '@/views/homecomponents/tabbar.vue'
import {uploadimg} from '@/network/upload/upload.js'
import floatbutton from '@/views/Floatbutton.vue'
import {queryuser} from '@/network/queryusermessage/queryusermessage.js'
export default {
     props: {},
  data() {
    return {
      file: null,
      f: null,
      loadImage: "",
      userimgurl: ""
    }
  },
  created() {
      queryuser('/getusermessage/'+this.$store.getters.userid).then(response => {
        console.log(response)
        this.userimgurl = "http://localhost:8080/"+response.data.usermessage.userimg
      })
  },
  components: {
       tabbar,
       floatbutton
  },
  methods: {
    admoney(){
      this.$router.push("/addmoney")
    },
    add() {
      this.$refs.file.click();
    },
    getFile(event) {
      this.file = event.target.files[0];
      const item = {
        name: this.file.name,
        size: this.file.size,
        file: this.file
      };
      this.html5Reader(this.file, item);
      this.f = item;
    },
    // 将图片文件转成BASE64格式
    html5Reader(file, item) {
      const reader = new FileReader();
      reader.onload = e => {
        this.$set(item, "src", e.target.result);
      };
      reader.readAsDataURL(file);
    },
    submitForm(event) {
      event.preventDefault();
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("userid",this.$store.getters.userid);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      uploadimg("/upload",formData).then(response => {
        console.log(response)
        if(response.data.hasOwnProperty("OK")){
          this.$toast("上传成功")
        }else {
          this.$toast("上传用户头像失败，请重试")
        }

      })
    }
  }
}
</script>
<style scoped>
   .myheader {
     text-align: center;
     background-color: pink;
     padding-top: .533333rem;
     padding-bottom: .533333rem;
   }
   .imgwrapper {
     width: 2rem;
     height: 2rem;
     margin: 0 auto;
   }
    .userimg {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
    }
    .upload {
      margin-top: .133333rem;
    }
    .uploadfont {
      display: inline-block;
      height: .366667rem;
      line-height: .366667rem;
    }
    .mycontent {
      background-color: #f2f2f2;
      height: 8.4rem;

    }
    .item {
      display: flex;
      height: .9rem;
      background-color: #fff;
      border-bottom: 1px solid #f2f2f2;
      line-height: .9rem;
      margin-top: .133333rem;
      position: relative;
    }
    .icon {
      font-size: .54rem;
      margin-left: .24rem;
    }
    .itemfont {
      font-size: .34rem;
      margin-left: .24rem;
    }
    .arrow {
      font-size: .406667rem;
      position: absolute;
      top: 0;
      left: 6.8rem;

    }
    .addmoney {
      width: 1.066667rem;
      text-align: center;
      line-height: .466667rem;
      height: .466667rem;
      position: fixed;
      right: 0.9rem;
      top: 1.4rem;
      border-radius: .426667rem;
      border: .013333rem solid lightblue;
      color: white;
    }
</style>

 