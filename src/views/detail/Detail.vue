<template>
  <div id="detail">
    <detail-navbar @itemClick="itemClick" ref="nav"></detail-navbar>
    <better-scroll class="content" ref="scroll" :probeType="3" @scrollTop="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-params :paramInfo="goodsParam" ref="params"/>
      <detail-comments-info :commentInfo="commentsInfo" ref="comment"/>
      <goods-list :goodsItem="recommendInfo" ref="recommend"/>
    </better-scroll>
    <detail-bottom-bar @addToCart="addCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isBackShow"/>
  </div>
</template>

<script>
import DetailNavbar from './childDetail/DetailNavbar.vue'
import DetailSwiper from './childDetail/DetailSwiper.vue'
import DetailBaseInfo from './childDetail/DetailBaseInfo.vue'
import DetailShopInfo from './childDetail/DetailShopInfo.vue'
import DetailGoodsInfo from './childDetail/DetailGoodsInfo.vue'
import DetailParams from './childDetail/DetailParams.vue'
import DetailCommentsInfo from './childDetail/DetailCommentsInfo.vue'
import DetailBottomBar from './childDetail/DetailBottomBar.vue'


import BetterScroll from 'components/common/betterscroll/BetterScroll'
import GoodsList from 'components/content/goods/GoodsList.vue'


import {getDetailPage, DetailGoods, shop, GoodsParam, getRecommendInfo} from 'network/detail'
import {debounce} from 'common/utils'
import {itemImgListener, backTopMixin} from 'common/mixin'

  export default {
    name:"Detail",

    components: {
      DetailNavbar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      BetterScroll,
      DetailGoodsInfo,
      DetailParams,
      DetailCommentsInfo,
      GoodsList,
      DetailBottomBar
    },

    mixins: [itemImgListener,backTopMixin],

    data() {
      return {
        iid: null,
        topImages:[],
        goods: {},
        shop: {},
        detailInfo: {},
        goodsParam: {},
        commentsInfo: {},
        recommendInfo: [],
        // itemImgListener: null
        getItemTopYs:[],
        itemDebounce: null,
        currentIndex: 0
        
      }
    },

    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid;

      //2.获取请求数据
      getDetailPage(this.iid).then(res => {
        // console.log(res);
        const data = res.data.result;
        //1.获取轮播图数据
        this.topImages = data.itemInfo.topImages;

        //2.获取商品信息
        this.goods = new DetailGoods(data.itemInfo, data.columns, data.shopInfo.services);

        //3.获取商家信息
        this.shop = new shop(data.shopInfo);

        //4.获取商品详情
        this.detailInfo = data.detailInfo;

        //5.获取商品参数尺寸
        this.goodsParam = new GoodsParam(data.itemParams.info, data.itemParams.rule);

        //6.获取评论信息
        if(data.rate.cRate !== 0){
          this.commentsInfo = data.rate.list[0];
        }

        this.itemDebounce = debounce(() => {
          this.getItemTopYs = [];
          this.getItemTopYs.push(0);
          this.getItemTopYs.push(this.$refs.params.$el.offsetTop);
          this.getItemTopYs.push(this.$refs.comment.$el.offsetTop);
          this.getItemTopYs.push(this.$refs.recommend.$el.offsetTop);
          this.getItemTopYs.push(Number.MAX_VALUE)
          // console.log(this.getItemTopYs)
        },50)
        
        
      })

      //3.获取推荐商品的信息
      getRecommendInfo().then(res => {
        // console.log(res)
        this.recommendInfo = res.data.data.list;
        // console.log(this.recommendInfo)
      })
    },

    mounted() {
    
    },

    //销毁时取消全局监听，detail没有使用router，所有用destroyed
    destroyed() {
      console.log('destroyed!!')
      this.$bus.$off('imgItemLoad', this.itemImgListener)
    },
    
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()

        //图片加载完后获取组件的offsetTop,注意使用防抖
        this.itemDebounce();
        // console.log(this.getItemTopYs)
      },

      //点击后滚动到对应组件位置
      itemClick(index) {
        this.$refs.scroll.scrollTo(0, -this.getItemTopYs[index], 200)
      },

      contentScroll(position) {
        const positionY = -position.y;
        this.backTopListener(position);

        //getItemTopYs[0, 5871, 6926, 7162, 1.7976931348623157e+308]
        // 0 <= positionY < 5871 --> 0
        // 5871 <= positionY <6926 --> 1
        // 6962 <= positionY < 7162 --> 2
        // 7162 <= positionY < MAX_VALUE --> 3 
        const length = this.getItemTopYs.length;
        for(let i = 0; i<length-1; i++){
          if((this.currentIndex !== i) && (positionY >= this.getItemTopYs[i] && positionY < this.getItemTopYs[i+1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        }

      },

      addCart() {
        //获取购物车要展示的商品信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        //将商品信息放入vuex，记得必须通过mutations的方式
        this.$store.dispatch('addCart', product);
      }

     
      
    }
  }

</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.content {
    overflow: hidden;
    position:absolute;
    top:44px;
    bottom: 58px;
    right:0px;
    left:0px;
  }
</style>