import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  CLEAR_USER_INFO,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
} from './mutations-types'


export default {
  [RECEIVE_ADDRESS] (state, {address}){
    state.address = address
  },

  [RECEIVE_CATEGORYS] (state, {categorys}) {
    state.categorys = categorys
  },

  [RECEIVE_SHOPS](state, {shops}){
    state.shops = shops
  },

  [RECEIVE_USER_INFO](state, {userInfo}){
    state.userInfo = userInfo
  },

  [CLEAR_USER_INFO](state){
    state.userInfo = {}
  },

  [RECEIVE_GOODS](state, {goods}){
    state.goods = goods
  },

  [RECEIVE_RATINGS](state, {ratings}){
    state.ratings = ratings
  },

  [RECEIVE_INFO](state, {info}){
    state.info = info
  },


  // 注意到，food并不在state中，而food在foods中，foods又在goods中。
  // 此时操作的是food的属性变化，随之也隐形地改变goods。
  // 但前提是：若food没有某个属性时，需要使用Vue.set(food,  'count', 1)，只有这样才能绑定数据，异步显示界面
  [INCREMENT_FOOD_COUNT](state, {food}){
    // 如果food没有count属性时
    if (!food.count){
      // food.count = 1   //   这是新增一个属性， 则没有数据绑定，无法更新显示页面（错误代码）

      /*
      对象   属性名       属性值
       */
      Vue.set(food, 'count', 1)   // 让新增的属性数据，也有数据绑定
      // 只有第一次时，才向添加购物车中添加food，
      // 以后该food的数量count发生变化时，只要有food就能取出该数量
      state.cardFoods.push(food)
    } else {
      food.count++
    }
  },
  [DECREMENT_FOOD_COUNT](state, {food}){
    // 只有有值时，才减少防止变为负数
    if(food.count > 0){
      food.count--
      if (food.count === 0){
        // 找出该食物的下标
        state.cardFoods.splice(state.cardFoods.indexOf(food), 1)

        // 逐个遍历一遍，不好
        // state.cardFoods = state.cardFoods.filter(food => food.count > 0)
      }
    } else {
      console.log('减少的食物的数量', food.count)
      food.count = 0
    }
  },

  CLEARSHOPCART(state){
    // 有两步，缺一不可
    // 第一步：将food中的count置为0，不然count的值仍然存在
    state.cardFoods.forEach(food => food.count = 0)
    // 第二步、清空购物车
    state.cardFoods = []
  },



}
