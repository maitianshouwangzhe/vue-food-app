import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  CLEAR_USER_INFO,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS
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

}
