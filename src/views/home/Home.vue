<template>
  <div id="home">
    <nav-bar class="navbar"><div slot="center">购物街</div></nav-bar>
    <tab-control :TabItem="['流行', '新款', '精选']" 
                    class="fixed-tabcontrol" 
                    @clickTab="clickTab" 
                    ref="tabControl2"
                    v-show="isPositionFixed"></tab-control>
    <better-scroll 
      class="content" 
      ref="scroll" 
      :probe-type="3" 
      @scrollTop="contentTop" 
      :pull-up-load="true"
      @pullMore="pullMore">
      <home-swiper :cbanners="banner" @imgLoad="imgLoad"></home-swiper>
      <recommends-view :recommends="recommend"></recommends-view>
      <feature-view></feature-view>
      <tab-control :TabItem="['流行', '新款', '精选']" 
                    class="tabcontrol" 
                    @clickTab="clickTab" 
                    ref="tabControl1"></tab-control>
      <goods-list :goodsItem="showGoods"></goods-list>
    </better-scroll>
    
    <back-top @click.native="backClick" v-show="isBackShow"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import BetterScroll from 'components/common/betterscroll/BetterScroll'
  import TabControl from 'components/content/tabcontrol/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  // import BackTop from 'components/content/backTop/BackTop'

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendsView from './childComps/RecommendsView.vue'
  import FeatureView from './childComps/FeatureView.vue'

  import {getHomeData, getHomeGoods} from 'network/home'
  import {itemImgListener, backTopMixin} from 'common/mixin'
  // import {debounce} from 'common/utils'

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
        currentType:'pop',
        // isShowTop:false,
        offsetTop:0,
        isPositionFixed:false,
        saveY:0,       //保存滚动的位置
        // itemImgListener: null
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

  mixins: [itemImgListener, backTopMixin],

   created() {
     this.getHomeData()
     
     this.getHomeGoods('pop')
     this.getHomeGoods('new')
     this.getHomeGoods('sell')

    
    },

    mounted() {
      // console.log("混入合并")
    },

    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0);
      this.$refs.scroll.refresh();
    },

    deactivated() {
      //1.离开时保存上拉的Y值
      this.saveY = this.$refs.scroll.getScrollY();
      // console.log(this.$refs.scroll.scroll.y);

      //2.取消全局事件监听
      this.$bus.$off('imgItemLoad', this.itemImgListener)
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

        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },

      //监听轮播图是否加载完成，用户tab-control的吸顶效果
      imgLoad() {
        console.log(this.$refs.tabControl1.$el.offsetTop);
        this.offsetTop = this.$refs.tabControl1.$el.offsetTop;
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

          //完成下拉加载更多，通知better-scroll
          this.$refs.scroll.finishPullUp();
        })

      },

      // backClick() {
      //   this.$refs.scroll.scrollTo(0,0)
      // },

      contentTop(position) {
        //1.监听是否显示backTop图标
        // this.isBackShow = (-position.y) > 1000;
        this.backTopListener(position)

        //2、监听滚动位置是否大于tab-constrol需要吸顶的位置
        this.isPositionFixed = (-position.y) > this.offsetTop;
      },

      pullMore() {
        this.getHomeGoods(this.currentType);
      }


    }

  }
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh;   /**设置视口高度，使用better-scroll的时候必备 */
    position: relative;
  }

  .navbar {
    background-color: var(--color-tint);
    color: #fff;
    box-shadow: 0px 1px 1px rgba(100, 100, 100, .2);

    /* position:fixed;
    right: 0px;
    left:0px;
    top:0px;
    z-index: 9; */
  }

  /* .tabcontrol {
    position:sticky;
    top:44px;
    z-index: 9;
  } */

  .content {
    overflow: hidden;
    position:absolute;
    top:44px;
    bottom: 49px;
    right:0px;
    left:0px;
    /* height: 300px;
    overflow: hidden; */
  }

  .fixed-tabcontrol {
    position: relative;
    z-index: 9;
  }

</style>