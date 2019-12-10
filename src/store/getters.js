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

}
