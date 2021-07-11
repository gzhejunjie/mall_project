<template>
  <div>
    <nav-bar>
      <div slot="left" class="left-nav" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>

      <div slot="center" class="detail">
        <div v-for="(item, index) in titles" :key="index" 
            class="item-navbar" 
            :class="{active: currentIndex === index}" @click="itemClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

  export default {
    name:"DetailNavbar",
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    components: {
      NavBar
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
      },
      
      backClick() {
        // this.$router.go(-1)
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .detail {
    display: flex;
  }

  .item-navbar {
    flex: 1;
    font-size: 13px;

  }

  .active {
    color: var(--color-high-text)
  }

  .left-nav img {
    margin-top: 10px;
    margin-left: 10px;
  }
</style>