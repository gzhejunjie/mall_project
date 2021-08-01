<template>
    <nav-bar class="cart-navbar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import {mapGetters} from 'vuex'


  export default {
    name:"Cart",
    components: {
      NavBar
    },
    computed: {
      ...mapGetters(['cartLength'])
    }

  }
</script>

<style  scoped>
.cart-navbar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>