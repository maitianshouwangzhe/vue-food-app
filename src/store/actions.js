import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from './mutations-types'

import {
  reqAddress,
  reqCategorys,
  reqShops
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
    const {latitude, longitude} = state
    const result = await reqShops(longitude, latitude)   // 传递多个参数时， 参数的顺序很重要， 要根据接口请求函数的顺序，进行传参
    if (result.code === 0){
      const shops = result.data
      commit(RECEIVE_SHOPS, {shops})
    }
  }
}
