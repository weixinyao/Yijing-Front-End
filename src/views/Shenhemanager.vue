<template>
    <div class="shenhemanager">
        <div class="goods clearfix">
            <ul class="clearfix">
                <router-link tag="li" class="goods-list" v-for="(item,index) in list" :to="{name:'shenhegooddetail',params:{id: item.goodid}}" :key="index">
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
</template>
<script>
import {getshenhegoods} from '@/network/getallshenhegood/getallshenhegood.js'
export default {
    name: 'shenhemanager',
    data() {
        return {
          list: []
        }
    },
    created() {
       getshenhegoods("/getallshenhegood").then(response => {
           console.log(response)
           this.list = response.data.shenhegood
       })
    }
}
</script>
<style scoped>
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