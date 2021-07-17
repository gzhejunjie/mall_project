import {debounce} from './utils'

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