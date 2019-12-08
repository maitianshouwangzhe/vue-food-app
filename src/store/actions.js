import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  CLEAR_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
} from './mutations-types'

import {
  reqAddress,
  reqCategorys, reqLogout,
  reqShops,
  reqUserInfo,
  reqGoods,
  reqInfo,
  reqRatings
} from '../api'




// 注意：命名的技巧性。  如：
// 发送请求，使用req开头；
// 请求结束后，就得到了数据，使用get开头；
// commit时， 则用receive开头。 （注： 将接收到的数据（无论是数组、对象，数字），commit时， 均将其当做封装成一个大的对象）




// 在action中发送异步ajax请求
export default {

  async getAddress({commit, state}){
    // 取出发请求的参数
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    if (result.code === 0){
      const address = result.data
      commit(RECEIVE_ADDRESS, {address})  // 注： 将接收到的数据（无论是数组、对象，数字），commit时， 均将其当做封装成一个大的对象
    }
  },

  async getCategorys( {commit, state} ){
    const result = await reqCategorys()
    if (result.code === 0){
      const categorys = result.data
      commit(RECEIVE_CATEGORYS,  {categorys} )
    }
  },

  async getShops({commit, state}){
    // 取出state的参数
    const {latitude, longitude} = state
    const result = await reqShops(longitude, latitude)   // 传递多个参数时， 参数的顺序很重要， 要根据接口请求函数的顺序，进行传参
    if (result.code === 0){
      const shops = result.data
      commit(RECEIVE_SHOPS, {shops})
    }
  },


  // 同步的action
  // 以对象的形式commit
  saveUser({commit}, userInfo){
    commit(RECEIVE_USER_INFO, {userInfo})
  },

  // 异步的action
  // 查看用户是否登录
  async getUserInfo({commit}){
    const result = await reqUserInfo()
    if (result.code === 0){
      const userInfo = result.data
      // 共用 同一个mutation
      commit(RECEIVE_USER_INFO,  {userInfo} )
    }
  },


  async logout({commit}){
    const result = await reqLogout()
    if (result.code === 0){
      commit(CLEAR_USER_INFO)
    }
  },

  async getShopGoods({commit}){
    const result = await reqGoods()
    if (result.code === 0){
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
    }
  },

  async getShopRatings({commit}){
    const result = await reqRatings()
    if (result.code === 0){
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
    }
  },

  async getShopInfo({commit}){
    const result = await reqInfo()
    if (result.code === 0){
      const info = result.data
      commit(RECEIVE_INFO, {info})
    }
  },
}
