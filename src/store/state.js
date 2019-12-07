// 包含项目中所有状态， 暴露出去为一个对象


/*
* 从后台获取的数据，都放在state中， 进行状态管理
*
* */

export default {
  latitude: 40.10038, // 纬度
  longitude: 116.36867, // 经度
  address: {}, //地址相关信息对象
  categorys: [], // 食品分类数组
  shops: [], // 商家数组
  userInfo: {},  // 当前登录的用户信息
}
