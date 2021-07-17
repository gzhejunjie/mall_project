<template>
  <div class="goods-list-item" @click="itemClick">
    <img :src="showImage" alt="" @load="imgLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
    
  </div>
</template>

<script>
  export default {
    name:"GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    methods: {

      /**
       * 使用vue自带的load方法，在图片加载完成后使用事件总线发送加载完成的消息
       */
      imgLoad() {
        this.$bus.$emit("imgItemLoad")
      },

      itemClick() {
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
    },
    computed: {
      showImage() {
        // return this.goodsItem.show.img || this.goodsItem.image (不得行)
        // return this.goodsItem.image || this.goodsItem.show.img
        return this.goodsItem.image ? this.goodsItem.image : this.goodsItem.show.img
      }
    }
  }
</script>

<style scoped>
  .goods-list-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }

  .goods-list-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left:0px;
    right:0px;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top:-1px;
    width: 14px;
    height: 14px;
    background: url('~assets/img/home/collect.svg') 0 0/14px 14px;
  }
</style>