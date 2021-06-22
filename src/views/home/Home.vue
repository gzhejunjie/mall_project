<template>
  <div id="home">
    <nav-bar class="navbar"><div slot="center">购物街</div></nav-bar>
    <home-swiper :cbanners="banner"></home-swiper>
    <recommends-view :recommends="recommend"></recommends-view>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendsView from './childComps/RecommendsView.vue'

  import {getHomeData} from 'network/home'

  export default {
    name:"Home",
    data(){
      return {
        banner:[],
        recommend:[]
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      RecommendsView
    },
   created() {
     getHomeData().then(res => {
       this.banner = res.data.data.banner.list;
       this.recommend = res.data.data.recommend.list;
     }) 
    }
  }
</script>

<style scoped>
  .navbar {
    background-color: var(--color-tint);
    color: #fff;
    box-shadow: 0px 1px 1px rgba(100, 100, 100, .2);
  }
</style>