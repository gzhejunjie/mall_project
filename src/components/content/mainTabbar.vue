<template>
<div id="mainTabbar">
  <TabBar>
    <tab-bar-item  path="/home" activeClass="blue">
      <img slot="item-icon" src="~assets/img/page01.png" alt="">
      <img slot="item-icon-active" src="~assets/img/page01_active.png" alt="">
      <div slot="item-text" >首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img slot="item-icon" src="~assets/img/page02.png" alt="">
      <img slot="item-icon-active" src="~assets/img/page02_active.png" alt="">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img slot="item-icon" src="~assets/img/page03.png" alt="">
      <img slot="item-icon-active" src="~assets/img/page03_active.png" alt="">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="profile">
      <img slot="item-icon" src="~assets/img/page04.png" alt="">
      <img slot="item-icon-active" src="~assets/img/page04_active.png" alt="">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </TabBar>
</div>

</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'

export default {
  name: 'mainTabbar',
  components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>
  /* @import "./assets/css/base.css"; */


</style>
