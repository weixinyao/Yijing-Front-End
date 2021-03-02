<template>
    <div class="publish">
        <div class="publishheader">
            <div class="iconfont back" @click="returnmy">&#xe604;</div>
            <div class="publishfont">我的发布</div>
        </div>
        <div class="goods clearfix">
            <ul class="clearfix">
                <router-link tag="li" class="goods-list" v-for="(item,index) in list" :to="{name:'downgood',params:{id: item.good.goodid}}" :key="index">
                    <div class="goods-list-img">
                        <img :src="'http://localhost:8080/'+item.good.firstimgurl" alt="">
                    </div>
                    <div class="info">
                        <div class="name">{{ item.good.goodname }}</div>
                        <div class="content">{{ item.good.goodinfo }}</div>
                        <div class="price">￥{{ item.good.goodprice }}</div>
                    </div>
                </router-link>
            </ul>
  		</div>
    </div>
</template>
<script>
import {getpublishmessage} from '@/network/getpublish/getpublish.js'
export default {
    name: 'publish',
    data() {
     return {
        list: [] 
     }
    },
    created() {
     getpublishmessage("/publish/"+this.$store.getters.userid).then(response => {
         console.log(response)
         this.list = response.data.mypublish
     })
    },
    methods: {
        returnmy() {
            this.$router.go(-1)
        }
    }
}
</script>
<style scoped>
.publishheader {
    display: flex;
    border: .013333rem solid #ccc;
}
.back {
  font-size: .8rem;
  color: #666;
  margin-left: .2rem;
}
.publishfont {
  font-size: .4rem;
    color: #666;
    margin-left: 1.666667rem;
    margin-top: .143333rem;
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