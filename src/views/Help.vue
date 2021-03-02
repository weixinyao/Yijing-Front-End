<template>
<div class="help">
   <div class="helpheader">
            <div class="iconfont back" @click="returnmy">&#xe604;</div>
            <div class="helpfont">帮助</div>
    </div>
    <van-collapse v-model="activeNames" accordion>
  <van-collapse-item name="1">
    <div slot="title">如何发布物品</div>
    <div class="content">
      <img src="~@/assets/img/publishgood.png" alt="">
      <div>
        首先进入发布物品界面，上传物品图片，同时填写有关物品的信息，点击发布物品即可！
      </div>
    </div>
  </van-collapse-item>

  <van-collapse-item
name="2" >
<div slot="title">如何修改个人信息</div>
    <div class="content">
      <img src="~@/assets/img/updateuser.png" alt="">
      <div>
        首先进入个人信息界面，修改有关个人的信息，点击修改即可！
      </div>
    </div>
  </van-collapse-item>
  <van-collapse-item
name="3" >
<div slot="title">如何收藏物品</div>
    <div class="content">
      <img src="~@/assets/img/collectgood.png" alt="">
      <div>
        首先进入物品详情界面，点击收藏即可！
      </div>
    </div>
  </van-collapse-item>
</van-collapse>
</div>
</template>
<script>
export default {
    name: 'help',
    data() {
    return {
      activeNames: ['1']
    };
  },
  methods: {
    returnmy() {
      this.$router.push('/my')
    }
  }
}
</script>
<style lang="stylus" scoped>
 .helpheader
    display: flex
    .back 
      font-size: .8rem
      color: #666
      margin-left: .2rem
    .helpfont
      font-size: .4rem
      color: #666
      margin-left: 2.666667rem
      margin-top: .143333rem
</style>