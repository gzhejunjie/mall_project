import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList:[]
  },
  mutations: {
    addCounter(state, payLoad) {
      payLoad.count++;
    },

    addToCart(state, payLoad) {
      state.cartList.push(payLoad)
    }
  },
  actions: {
    addCart(context, payLoad) {
      //根据是否存在商品来添加商品数量
      let oldProduct = null;
      // for (let item of state.cartList) {
      //   if (payLoad.iid === item.iid) {
      //     oldProduct = item;
      //   }
      // }

      oldProduct = context.state.cartList.find(item => item.iid === payLoad.iid)

      if (oldProduct) {
        context.commit('addCounter', oldProduct);
      } else {
        payLoad.count = 1;
        // state.cartList.push(payLoad);
        context.commit('addToCart', payLoad);
      }
    }
  },
  getters: {
    cartLength(state) {
      return state.cartList.length
    }
  },
  modules: {
  }
})
