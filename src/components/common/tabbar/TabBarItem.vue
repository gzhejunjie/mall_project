<template>
  <!-- <div> -->
    <div class="tab-box"  @click="btn">
      <div v-if="!isActive"><slot name="item-icon"></slot></div>
      <div v-else><slot name="item-icon-active"></slot></div>
      <div :style="activeColor"><slot name="item-text"></slot></div>
    </div>

  <!-- </div> -->
</template>

<script>
  export default {
    name: "TabBarItem",
    props:{
      path:String,
      activeClass:{
        type:String,
        default: 'red'
      }
    },
    data(){
      return {
        // isActive:true
      }
    },
    methods: {
      btn:function(){
        if(this.$route.path != this.path){

          this.$router.push(this.path)
        }
        console.log(this.path);
        this.isActive = false;
      }
    },
    computed: {
      isActive: {
        get(){
          return this.$route.path.indexOf(this.path) !== -1
        },
        set(v){
          // this.path = v
        }
      },
      activeColor(){
        return this.isActive ? {color:this.activeClass} : {};
      }
    }
  }
</script>

<style scoped>
 .tab-box {
    flex: 1;
    text-align: center;
    height:49px;
    font-size: 14px;
  }

  .tab-box img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }

  /* .active {
    color:red;
  } */

</style>