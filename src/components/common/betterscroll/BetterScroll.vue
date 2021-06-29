<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

  export default {
    name:"BetterScroll",
    data() {
      return {
        scroll:null
      }
    },
    props: {
      probeType: {
        type:Number,
        default: 0
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        observeDOM:true,
        click:true,
        probeType:this.probeType,
        pullUpLoad:true
      })

      this.scroll.on('scroll', (position) => {
        this.$emit('scrollTop', position)
      }),

      this.scroll.on('pullingUp', ()=> {
        console.log("上拉加载更多");
      })
    },

    methods: {
      scrollTo(x, y, time=1000) {
        this.scroll.scrollTo(x, y, time)
      }
    },
  }
</script>

<style scoped>

</style>