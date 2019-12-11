export default {

  // 根据购物车cardFoods，计算属性
  //food对象里面有count
  // 食物的数量， 例如，一个买两份
  totalCount(state){
    return state.cardFoods.reduce( (pre, food) => pre + food.count, 0)
  },

  // 食物的总价格 = 数量 乘以 价格
  totalPrice(state){
    return state.cardFoods.reduce( (pre, food) => pre + (food.count) * (food.price) , 0)
  },


  // 根据总的评论ratings数组，
  // 计算出满意评论的条数
  positiveSize(state){
    return state.ratings.reduce((pre, rating) => pre + (rating.rateType ===0 ? 1: 0), 0 )
  },

  // 计算出不满意评论的条数
  negativeSize(state){
    return state.ratings.filter(rating => rating.rateType === 1).length
  },
}
