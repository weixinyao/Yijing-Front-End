<template>
    <div class="homeheader">
        <div class="search" @click="search">
            <span class="iconfont font">&#xe65a;</span>  
        </div>
      <div class="person">欢迎您，{{$store.getters.username}}</div>
    </div>
</template>
<script>
export default {
    name: 'homeheader',
    methods: {
      search() {
        this.$router.push('/homesearch')
      }
    }
}
</script>
<style lang="stylus" scoped>
  .homeheader
    width: 100%
    height: 0
    padding-bottom: 17%
    overflow: hidden
    background-color: pink
    display: flex
    .search 
      height: .72rem
      border: 1px solid #000
      border-radius: .333333rem
      background-color: #fff
      padding-left: .106667rem
      line-height: .72rem
      width: 50%
      margin-left: .666667rem
      margin-top: .266667rem
      .font
        color: orange
        font-size: .666667rem
    .person
      font-size: .333333rem
      margin-left: .24rem
      margin-top: .45rem
</style>