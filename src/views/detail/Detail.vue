<template>
  <div id="detail">
    <detail-navbar></detail-navbar>
    <better-scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-params :paramInfo="goodsParam"/>
      <detail-comments-info :commentInfo="commentsInfo"/>
      <goods-list :goodsItem="recommendInfo"/>
    </better-scroll>
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

import BetterScroll from 'components/common/betterscroll/BetterScroll'
import GoodsList from 'components/content/goods/GoodsList.vue'

import {getDetailPage, DetailGoods, shop, GoodsParam, getRecommendInfo} from 'network/detail'
// import {debounce} from 'common/utils'
import {itemImgListener} from 'common/mixin'

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
      GoodsList
    },

    mixins: [itemImgListener],

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
      }
    },

    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid;

      //2.获取请求数据
      getDetailPage(this.iid).then(res => {
        console.log(res);
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

        
      })

      //3.获取推荐商品的信息
      getRecommendInfo().then(res => {
        console.log(res)
        this.recommendInfo = res.data.data.list;
        console.log(this.recommendInfo)
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
      }
    },
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
    bottom: 49px;
    right:0px;
    left:0px;
  }
</style>