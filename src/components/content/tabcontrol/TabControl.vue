<template>
  <div class="tab-control">
    <div v-for="(item,index) in TabItem" :key="index" 
    :class="{active: index == currentIndex}" 
    class="tab-control-item"
    @click="clickTab(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name:"TabControl",
    props: {
      TabItem: {
        type:[],
        default() {
          return []
        }
      }
    },
    data(){
      return {
        currentIndex:0
      }
    },
    methods: {
      clickTab(num) {
        this.currentIndex = num;
        this.$emit('clickTab',num);
      }
    },
  }
</script>

<style scoped>
  .tab-control {
    display:flex;
    font-size: 15px;
    /* position:sticky;
    top:44px; 放到首页的组件去，因为不是每次用这个组件都会用这个一模一样的top位置*/
    background-color: #fff;
  }

  .tab-control-item {
    flex:1;
    text-align: center;
    height: 40px;
    line-height: 40px;

  }

  .tab-control-item span {
    padding: 5px;
   }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 3px solid var(--color-tint);
  }

</style>