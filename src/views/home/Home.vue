<template>
  <div id="home">
    <nav-bar class="navbar"><div slot="center">购物车</div></nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name:"Home",
    components: {
      NavBar
    }
  }
</script>

<style scoped>
  .navbar {
    background-color: var(--color-tint);
    color: #fff;
    box-shadow: 0px 1px 1px rgba(100, 100, 100, .2);
  }
</style>