<template>
   <div class="recommend">
       <div class="recommendheader">
            <div class="recommendfont">推荐</div>
       </div>
       <div class="goods clearfix">
            <ul class="clearfix">
                <router-link tag="li" class="goods-list" v-for="(item,index) in list" :to="{name:'gooddetail',params:{id: item.good.goodid}}" :key="index">
                    <div class="goods-list-img">
                        <img :src="'http://localhost:8080/'+item.good.firstimgurl" alt="">
                    </div>
                    <div class="info">
                        <div class="name">{{ item.good.goodname }}</div>
                        <div class="content">{{ item.good.goodinfo }}</div>
                        <div class="order">{{ index+1}}</div>
                    </div>
                </router-link>
            </ul>
  		</div>
<tabbar></tabbar>
   </div>
</template>
<script>
  import {getorders} from '@/network/getfiveorder/getfiveorder.js'
  import tabbar from '@/views/homecomponents/tabbar.vue'
    export default {
         name: 'recommend',
         data() {
             return {
              list: []
             }
         },
         created() {
           getorders("/getfiveorder").then(response => {
               console.log(response)
               this.list = response.data.fivegood
           })
         },
        components: {
          tabbar
        }
    }
</script>
<style scoped>
.recommendheader {
    text-align: center;
    border-bottom: .013333rem solid #ccc;
    margin-bottom: .133333rem;
}
.recommendfont {
    font-size: .4rem;
    color: #666;
    margin-top: .143333rem;
    margin-bottom: .133333rem;
}
   .goods {
	font-size: .3rem;
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
.order {
	font-size: .3rem;
    color: red;
    height: 1.5em;
    line-height: 1.5em;
} 
</style>