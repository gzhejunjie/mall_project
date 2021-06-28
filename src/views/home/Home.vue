<template>
  <div id="home">
    <nav-bar class="navbar"><div slot="center">购物街</div></nav-bar>
    <better-scroll class="content">
      <home-swiper :cbanners="banner"></home-swiper>
      <recommends-view :recommends="recommend"></recommends-view>
      <feature-view></feature-view>
      <tab-control :TabItem="['流行', '新款', '精选']" class="tabcontrol" @clickTab="clickTab"></tab-control>
      <goods-list :goodsItem="showGoods"></goods-list>
    </better-scroll>
    
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import BetterScroll from 'components/common/betterscroll/BetterScroll'
  import TabControl from 'components/content/tabcontrol/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendsView from './childComps/RecommendsView.vue'
  import FeatureView from './childComps/FeatureView.vue'

  import {getHomeData, getHomeGoods} from 'network/home'

  export default {
    name:"Home",

    data(){
      return {
        banner:[],
        recommend:[],
        goods: {
          'pop':{page:0, list:[]},
          'new':{page:0, list:[]},
          'sell':{page:0, list:[]}
        },
        currentType:'pop'
      }
    },

    components: {
      NavBar,
      HomeSwiper,
      RecommendsView,
      FeatureView,
      TabControl,
      GoodsList,
      BetterScroll
    },

   created() {
     this.getHomeData()
     
     this.getHomeGoods('pop')
     this.getHomeGoods('new')
     this.getHomeGoods('sell')
    },

    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },

    methods: {
      /***
       * 事件监听相关的方法
       */
      clickTab(index) {
        // console.log(index);
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
      },


      /***
       * 网络请求相关的方法
       */
      getHomeData() {
        getHomeData().then(res => {
          this.banner = res.data.data.banner.list;
          this.recommend = res.data.data.recommend.list;
        })
      },

      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.data.list);
          this.goods[type].page = page;
        })
      }
    }

  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;   /**设置视口高度，使用better-scroll的时候必备 */
    position: relative;
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
    z-index: 9;
  }

  .content {
    /* overflow: hidden; */

    position:absolute;
    top:44px;
    bottom: 49px;
    right:0px;
    left:0px;
    /* height: 300px;
    overflow: hidden; */
  }
</style>