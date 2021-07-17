<template>
    <swiper class="detail-swiper" v-if="topImages.length">
      <swiper-item v-for="(item,index) in topImages" :key="index" class="item">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name:'DetailSwiper',
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    }
  }
</script>

<style scoped>

.item {
  height: 300px;
  /* overflow: hidden; */
  text-align: center;
}

</style>