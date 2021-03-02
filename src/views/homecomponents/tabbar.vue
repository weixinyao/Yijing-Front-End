<template>
    <div class="tabbar">
        
        <router-link tag="div" class="tabbarwrapper" to="/home">
            <span class="iconfont icon">&#xe601;</span>
            <div class="text">首页</div>
        </router-link>
    
        <router-link tag="div" class="tabbarwrapper" to="/classify">
            <span class="iconfont icon">&#xe625;</span>
            <div class="text">分类</div>
        </router-link>
        <router-link tag="div" class="tabbarwrapper" to="/recommend">
            <span class="iconfont icon">&#xe609;</span>
            <div class="text">推荐</div>
        </router-link>
        <router-link tag="div"  class="tabbarwrapper" to="/my">
            <span class="iconfont icon">&#xe62e;</span>
            <div class="text">我的</div>
        </router-link>
    </div>
</template>
<script>
export default {
    name: 'tabbar'
}
</script>
<style lang="stylus" scoped>
  .tabbar
    position: fixed
    bottom: 0
    left: 0
    right: 0
    display: flex
    background-color: #fff
    height: 1rem
    z-index: 99
    border-top: 1px solid #ccc
    .tabbarwrapper 
      flex: 1
      text-align: center 
      margin-top: .1rem
      .icon
        font-size: .4rem
      .text
        font-size: .28rem
        margin-top: .1rem
  .router-link-active
    color: skyblue
</style>