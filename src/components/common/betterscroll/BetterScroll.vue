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
      },
      pullUpLoad: {
        type:Boolean,
        default:false
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        observeDOM:true,
        click:true,
        probeType:this.probeType,   //监听滚动
        pullUpLoad: this.pullUpLoad    //监听上拉加载更多
      })

      if(this.probeType === 2 || this.probeType ===3){  //增加监听函数的判断，设置了监听才进入，保证代码更加严谨，提高性能
        this.scroll.on('scroll', (position) => {
          this.$emit('scrollTop', position)
        })
      }
      
      if(this.pullUpLoad) {    //增加监听函数的判断，设置了监听才进入，保证代码更加严谨，提高性能
        this.scroll.on('pullingUp', ()=> {
          this.$emit('pullMore');
        })
      }
      

      console.log(this.scroll)

    },

    methods: {
      scrollTo(x, y, time=1000) {
        //判断scroll是否加载完成，然后再执行scrollTo
        this.scroll && this.scroll.scrollTo(x, y, time)
      },

      finishPullUp() {
        this.scroll.finishPullUp();
      },

      refresh() {
        //判断scroll是否加载完成，然后再执行refresh
        // console.log("refresh");
        this.scroll && this.scroll.refresh();
      },

      //获取better-scroll滚动后的纵轴的值
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    },
  }
</script>

<style scoped>

</style>