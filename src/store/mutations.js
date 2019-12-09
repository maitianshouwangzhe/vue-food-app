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

  [INCREMENT_FOOD_COUNT](state, {food}){
    // 如果food没有count属性时
    if (!food.count){
      // food.count = 1   //   这是新增一个属性， 则没有数据绑定，无法更新显示页面（错误代码）

      /*
      对象
      属性名
      属性值
       */
      Vue.set(food, 'count', 1)   // 让新增的属性数据，也有数据绑定
    } else {
      food.count++
    }
  },
  [DECREMENT_FOOD_COUNT](state, {food}){
    // 只有有值时，才减少防止变为负数
    if(food.count > 0){
      food.count--
    } else {
      console.log('减少的食物的数量', food.count)
      food.count = 0
    }
  }


}
