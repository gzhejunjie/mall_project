<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in goodsItem" :key="index" :goodsItem="item"/>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'

  export default {
    name:'GoodsList',
    props: {
      goodsItem: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      GoodsListItem
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;  /**均等分区域内容 */
    padding:2px;
  }
</style>