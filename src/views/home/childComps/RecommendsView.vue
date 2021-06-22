<template>
  <div class="home-recommend">
    <div v-for="(item,index) in recommends" :key="index" class="recommend">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name:"RecommendsView",
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .home-recommend {
    display: flex;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 20px;
    border-bottom: 8px solid #eee;
  }

  .recommend {
    flex:1;
    width: 100%;
  }

  .recommend img{
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
</style>