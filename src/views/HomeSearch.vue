<template>
 <div class="search">
  <!-- 顶部搜索栏 -->
  <div class="header">
   <div class="head-input">
    <input
     type="text"
     ref="inputchange"
     v-model="valuetext"
     @keyup.enter="onSearch(true)"
     @keyup.tab="onSearch(true)"
     @focus="initPage"
     placeholder="请输入关键字进行搜索"
    />
    <div class="cancel" @click="returnhome">取消</div>
   </div>
 
   <div class="history-panel" v-if="!isFocus">
    <div v-if="historyxs" class="searchhistoryfont">搜索历史</div>
    <div v-if="searches_list.length>0">
     <ul class="searchitem" v-if="historyxs">
      <li
       v-for="(item,index) in searches_list"
       :key="index"
       @click="historysearch(item)"
      >{{item}}</li>
     </ul>
    </div>
    <div class="history-tips" v-else>暂无搜索记录！</div>
    <p v-if="historyxs" @click="clearhis">清空历史记录</p>
   </div>
  </div>
  <!-- ... 此处为搜索后的结果展示 -->
  <div class="underline"></div>
  <div v-if="searchcontent_list.length>0">
    <div class="goods clearfix">
            <ul class="clearfix">
                <router-link tag="li" class="goods-list" v-for="(item,index) in searchcontent_list" :to="{name: 'gooddetail',params: {id: item.goodid}}" :key="index">
                    <div class="goods-list-img">
                        <img :src="'http://localhost:8080/'+item.firstimgurl" alt="">
                    </div>
                    <div class="info">
                        <div class="name">{{ item.goodname }}</div>
                        <div class="content">{{ item.goodinfo }}</div>
                        <div class="price">￥{{ item.goodprice }}</div>
                    </div>
                </router-link>
            </ul>
  		</div>
  </div>
  <div v-else>
      <div class="noresult">
          暂无搜索结果
      </div>
  </div>
  <!-- 底部按钮 -->
  <div class="footer">
     <div class="reset" @click="clear">清除</div>
     <div class="searchnow" @click="onSearch(true)">立即搜索</div>
  </div>
 </div>
</template>
 
<script type="text/Babel">
import { saveSearch } from "@/utils/historyrecord.js"; //引用本地存储js
import {searchgoods} from '@/network/searchgood/searchgood.js'
import storage from "good-storage"; //引入good-storage包
export default {
 data() {
  return {
   isFocus: true,
   searches_list: [], //历史搜索记录列表
   historyxs: false,
   valuetext: "",
   searchcontent_list: []
  };
 },
 methods: {
  //输入框获取焦点
  initPage() {
   this.isFocus = false;  //显示历史记录
   this.$emit("initSearchPage");
   //为避免重复先清空再添加
   this.searches_list = [];
   let searches = storage.get("_search_");
   this.searches_list = searches ? searches : [];
   if (this.searches_list.length > 0) {
    this.historyxs = true;
   } else {
    this.historyxs = false;
   }
  },
  //清空历史记录
  clearhis() {
   storage.remove("_search_");
   this.searches_list = [];
   this.historyxs = false;
  },
  //点击历史搜索把搜索的记录添加到good-storage中
  historysearch(item) {
   saveSearch(item);
   this.valuetext = item;
   this.historyxs = false;
  },
  resetData() {
   // ...
   //  此次省略重置数据的逻辑代码
  },
  onSearch(isFirst) {
   this.isFocus = true;
   if (this.valuetext != "") {
    //搜索框不为空
    saveSearch(this.valuetext); // 本地存储搜索的内容
    let params = {
     majorInfo: this.valuetext //流程类型或者流程名称
    };
    this.$emit("handleSearch", params);
    this.isFocus = true;
   }
   // ...
   // 此次调用搜索接口的代码
   let param = {
       "name": this.valuetext
   }
   searchgoods("/searchgood",{params: param}).then(response => {
       console.log(response)
       this.searchcontent_list = response.data.searchresult;
   })
  },
  clear() {
   this.valuetext = "";
  },
  returnhome() {
      this.$router.push('/home')
  }
  // ... 无关代码已省略
 }
};
</script>
 
<style lang="less" rel="stylesheet/less" type="text/less" scoped>
.search {
 overflow-y: scroll;
 overflow-x: hidden;
 padding: 0.14rem 0rem 0.53rem 0rem;
 .header {
  border-bottom: 0.01rem solid #f2f2f2;
  .head-input {
   width: 100%;
   padding-bottom: 0.1rem;
   display: flex;
   justify-content: space-between;
 
   > input {
    height: .7rem;
    width: 4.5rem;
    border-radius: .426667rem;
    background-color:#f2f2f2 ;
    font-family: PingFang-SC-Regular;
    font-weight: Regular;
    color: #999999;
    font-size: .3rem;
    padding-left: 0.4rem;
    margin-left: .8rem;

   }
  }
  .history-panel {
   width: 100%;
   overflow: hidden;
   padding: 0.1rem 0;
   border-top: 1px solid #f2f2f2;
   .searchitem {
    margin-top: 0.1rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    > li {
     border: 1px solid #f2f2f2;
     border-radius: .3rem;
     display: inline-block;
     font-size: .3rem;
     padding: .09rem 0.2rem;
     width: fit-content; //div宽度自适应文字内容
     width: -webkit-fit-content;
     width: -moz-fit-content;
     height: .35rem;
     line-height: .35rem;
     text-align: center;
     margin-right: 0.1rem;
     background-color: transparent;
     margin-bottom: 0.1rem;
    }
   }
   div {
    box-sizing: border-box;
    font-size: .32rem;
    color: #666666;
    font-weight: Medium;
    font-family: PingFang-SC-Medium;
    text-align: center;
   }
   > p {
    text-align: center;
    margin-top: 0.2rem;
    font-size: 0.3rem;
    color: red;
   }
  }
  .history-tips {
   text-align: center;
    font-size: .3rem!important;
  }
 }
 .title-style {
  font-size: 0.13rem;
  font-weight: Medium;
  font-family: PingFang-SC-Medium;
 }
}
.underline {
    background-color: #ccc;
    height: .026667rem;
}
.goods {
    font-size: .3rem;
    margin-top: .106667rem;
}
.goods-list {
	width: 3.7rem;
	float: left;
}
.goods-list:nth-child(2n) {
	margin-left: .1rem
}
.goods-list-img {
	width: 3.7rem;
	height: 3.7rem;
}
.goods-list-img img {
	display: block;
	width: 100%;
}
.info {
	padding: .2rem;
	text-align: left;
}
.name {
	font-size: .35rem;
    color: rgba(0,0,0,.87);
}
.content {
	margin-top: .06rem;
    font-size: .25rem;
    line-height: .3rem;
    color: rgba(0,0,0,.54);
}
.price {
	font-size: .3rem;
    color: red;
    height: 1.5em;
    line-height: 1.5em;
}
.noresult {
    margin: 0 auto;
    text-align: center;
    height: 1.333333rem;
    width: 100%;
    font-size: .313333rem;
    line-height: 1.333333rem;

}
.footer {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
}
.reset {
   font-size: .3rem;
   background-color: #f2f2f2; 
   color: lightblue;
   flex: 1;
   text-align: center;
   height: .8rem;
   line-height: .8rem;
}
.searchnow {
    flex: 1;
    font-size: .3rem;
    background-color: #f00;
    text-align: center;
    height: .8rem;
    line-height: .8rem;
    color: #fff;
}
.cancel {
    height: .7rem;
    width: .8rem;
    font-size: .3rem;
    color: #666;
    margin-top: .18rem;
}
::-webkit-input-placeholder {  /*Webkit browsers 谷歌*/
         color: rgba(164, 164, 164, 1);
         font-size: .3rem;
     }
    
     :-moz-placeholder {  /*Mozilla Firefox 4 to 8 火狐*/
           color: rgba(164, 164, 164, 1);
           font-size: .3rem;
      }
    
     ::moz-placeholder {  /*Mozilla Firefox 19+ 火狐*/
            color: rgba(164, 164, 164, 1);
            font-size: .3rem;
      }
    
      :-ms-input-placeholder {  /*Internet Explorer 10+ IE10以上*/
             color: rgba(164, 164, 164, 1);
             font-size: .3rem;
      }
</style>