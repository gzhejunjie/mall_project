<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tabbar></main-tabbar>
    <!-- <MainTabbar/> -->
  </div>
</template>


<script>
import MainTabbar from 'components/content/mainTabbar.vue'
export default {
  name:'App',
  components:{
    MainTabbar
  }
}
</script>

<style>
  @import 'assets/css/base.css'
</style>
