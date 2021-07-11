<template>
    <swiper class="home-swiper">
      <swiper-item v-for="(item,index) in cbanners" :key="index" >
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
 import {Swiper, SwiperItem} from 'components/common/swiper'
  export default {
    name:"HomeSwiper",
    data() {
      return {
        isLoad:false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      cbanners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      imgLoad() {
        if(!this.isLoad){
          this.$emit("imgLoad");
          this.isLoad=true
        }
      }
    },
  }
</script>

<style  scoped>

</style>