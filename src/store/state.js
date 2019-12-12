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
  shops: [], // 包含所有商家的数组
  userInfo: {},  // 当前登录的用户信息
  goods: [],     // 某个商家的商品
  ratings: [],   // 某个商家的评分
  info: {},       // 某个商家的信息
  // 购物车中食物的列表
  cardFoods: [],
  // 搜索得到的商家列表
  searchShops: [],
}
