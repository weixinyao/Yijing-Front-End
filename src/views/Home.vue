<template>
  <div class="home">
    
    <homecontent></homecontent>
    <tabbar></tabbar>
  </div>
</template>

<script>
// @ is an alias to /src
import homecontent from '@/views/homecomponents/homecontent.vue'
import tabbar from '@/views/homecomponents/tabbar.vue'
export default {
  name: 'home',
  components: {
    homecontent,
    tabbar
  }
}
</script>
