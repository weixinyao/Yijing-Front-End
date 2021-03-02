<template>
    <div class="container">
    <mt-loadmore ref="loadmore" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="isAutoFill">
    <homeheader></homeheader>
    <div class="swiper">
       <mt-swipe :auto="4000">
          <mt-swipe-item>
              <img src="//imgs.qunarzz.com/vs_ceph_vs_tts/5958b155-6345-4dc8-afea-881a83d90c60.jpg_r_480x320x90_c9422665.jpg" alt="">
          </mt-swipe-item>
          <mt-swipe-item>
              <img src="//imgs.qunarzz.com/vs_ceph_vs_tts/67d500ae-a5c7-42a8-9ca8-2be5da8ba921.jpg_r_480x320x90_4c6597bf.jpg" alt="">
          </mt-swipe-item>
          <mt-swipe-item>
              <img src="//imgs.qunarzz.com/vs_ceph_vs_tts/67330f9a-837d-4dc7-b9ce-81e63d511347.jpg_r_480x320x90_c832f50f.jpg" alt="">
          </mt-swipe-item>
          <mt-swipe-item>
              <img src="//imgs.qunarzz.com/p/tts8/1607/59/e5e56c66a90e599a.jpg_r_480x320x90_dd143fb3.jpg" alt="">
          </mt-swipe-item>
       </mt-swipe>
    </div>
       
       <h3 class="like">全部商品</h3>
       <div class="underline"></div>
       <div class="goods clearfix">
            <ul class="clearfix">
                <router-link tag="li" class="goods-list" v-for="(item,index) in list" :to="{name:'gooddetail',params:{id: item.goodid}}" :key="index">
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
         </mt-loadmore>  
    </div>
</template>
<script>
import {getLikeList} from '@/network/home/home.js'
import homeheader from '@/views/homecomponents/homeheader.vue'
export default {
    name: 'homecontent',
    data() {
        return {
            list: [],
            allLoaded: false,
            isAutoFill: false,
            page: 1,
            totalpage: 0
        }
    },
    components: {
       homeheader
    },
    created() {
         getLikeList('getgoods/'+this.page).then(res => {
             console.log(res)
              this.list = res.data.goods.list
              this.totalpage = res.data.goods.pages

         }).catch(err => {
             console.log(err)
         })
    },
    methods: {
        loadTop() {
            let then = this
            getLikeList('getgoods/1').then(res => {
                setTimeout(function(){
                then.list = res.data.goods.list
                then.$refs.loadmore.onTopLoaded(); 
                then.allLoaded = false;
                },2000)
                
            })
        },
        loadBottom() {
            let then = this
            console.log(then)
            then.page = then.page+1
            console.log(then.page)
            if(then.page > then.totalpage){
                then.allLoaded = true
                then.$refs.loadmore.onBottomLoaded()
            }
            else {
                getLikeList('getgoods/'+then.page).then(res => {
                    setTimeout(function(){
                    then.list = then.list.concat(res.data.goods.list)
                    then.$refs.loadmore.onBottomLoaded()
                    },2000)
                
            }).catch(err => {
                console.log(err)
            })
            
            }
        }
    }
}
</script>
<style scoped>
  .container {
    height: 100vh;
    padding-bottom: 1rem;
    overflow:auto;
    box-sizing:border-box;
}
.mint-loadmore {
    -webkit-overflow-scrolling: touch;
}
.swiper {
    height: 3.2rem;
}
   .container img{ 
      width: 100%;
   }
    .like{
      font-size: .32rem;
      color: orange; 
      opacity: .8;
      margin-top: .16rem;
      margin-bottom: .16rem;
    }
    .underline {
	background-color: #f5f5f5;
	height: .2rem;
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
.price {
	font-size: .3rem;
    color: red;
    height: 1.5em;
    line-height: 1.5em;
}
</style>