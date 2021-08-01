import { debounce } from './utils'
import BackTop from 'components/content/backTop/BackTop'

export const itemImgListener = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    //在挂载的时候使用事件总线监听，并实时刷新better-scroll
    const refresh = debounce(this.$refs.scroll.refresh, 50);

     //保存监听的事件
     this.itemImgListener = () => {
       refresh();
     }
     console.log("mixin.....")
     this.$bus.$on('imgItemLoad', this.itemImgListener)
  },
    
}

export const backTopMixin = {
  data() {
    return {
      isBackShow: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick() {
        this.$refs.scroll.scrollTo(0, 0)
    },
     backTopListener(position) {
        this.isBackShow = (-position.y) > 1000;

      }
  }

}