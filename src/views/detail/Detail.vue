<template>
  <div>
    <detail-navbar></detail-navbar>
    <detail-swiper :topImages="topImages"/>
    <detail-base-info :goods="goods"></detail-base-info>
  </div>
</template>

<script>
import DetailNavbar from './childDetail/DetailNavbar.vue'
import DetailSwiper from './childDetail/DetailSwiper.vue'
import DetailBaseInfo from './childDetail/DetailBaseInfo.vue'
import {getDetailPage, DetailGoods} from 'network/detail'

  export default {
    name:"Detail",

    components: {
      DetailNavbar,
      DetailSwiper,
      DetailBaseInfo
    },

    data() {
      return {
        iid: null,
        topImages:[],
        goods: {}
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
        // console.log(this.goods)
      })
    }
  }
</script>

<style scoped>

</style>