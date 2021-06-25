<template>
  <div id="home">
    <nav-bar class="navbar"><div slot="center">购物街</div></nav-bar>
    <home-swiper :cbanners="banner"></home-swiper>
    <recommends-view :recommends="recommend"></recommends-view>
    <feature-view></feature-view>
    <tab-control :TabItem="['流行', '新款', '精选']" class="tabcontrol"></tab-control>
    
    <ul>
      <li>ddd</li>
      <li>ddd</li>
      <li>ddd</li>
      <li>ddd</li>
      <li>ddd</li>
      <li>ddd</li>
      <li>ddd</li>
      <li>ddd</li>
      <li>ddd</li>
      <li>ddd</li>
      <li>ddd</li>
      <li>ddd</li>
      <li>ddd</li>
      <li>ddd</li>
      <li>ddd</li>
      <li>ddd</li>
      <li>ddd</li>
      <li>ddd</li>
      <li>ddd</li>
      <li>ddd</li>
      <li>ddd</li>
      <li>ddd</li>
      <li>ddd</li>
      <li>ddd</li>
      <li>ddd</li>
      <li>ddd</li>
      <li>ddd</li>
      <li>ddd</li>
      <li>ddd</li>
      <li>ddd</li>
    </ul>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabcontrol/TabControl'

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendsView from './childComps/RecommendsView.vue'
  import FeatureView from './childComps/FeatureView.vue'

  import {getHomeData} from 'network/home'

  export default {
    name:"Home",
    data(){
      return {
        banner:[],
        recommend:[],
        goods: {
          'pop':{page:0, list:[]},
          'news':{page:0, list:[]},
          'sell':{page:0, list:[]}
        }
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      RecommendsView,
      FeatureView,
      TabControl
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
  #home {
    padding-top: 44px;
  }

  .navbar {
    background-color: var(--color-tint);
    color: #fff;
    box-shadow: 0px 1px 1px rgba(100, 100, 100, .2);

    position:fixed;
    right: 0px;
    left:0px;
    top:0px;
    z-index: 9;
  }

  .tabcontrol {
    position:sticky;
    top:44px;
  }
</style>