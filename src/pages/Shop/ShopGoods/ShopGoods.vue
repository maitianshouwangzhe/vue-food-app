<template>
  <div>
    <div class="goods">

      <!--   左侧导航栏  -->
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li class="menu-item" v-for="(item, index) in goods" :key="index" :class="{current: index === currentIndex}">
            <span class="text bottom-border-1px">
              <!--  使用v-if， 若有图片, 则解析图片； 若无图片，则不加载图片   -->
              <img class="icon" :src="item.icon" v-if="item.icon">
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>

      <!-- 右侧的商品详情   -->
      <div class="foods-wrapper" ref="foodsWrapper" v-if="goods.length">   <!-- 数组goods的长度为0时， 不显示右侧商品 -->
        <ul>
          <!-- 双重v-if -->
          <li class="food-list-hook" v-for="(item, index) in goods" :key="index">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in item.foods" :key="index">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon"
                  >
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{food.sellCount}} 份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    CartControl
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>


<script>
  import {mapState} from 'vuex'
  export default {
    data(){
      return {
        scrollY: 0, // 右侧滑动时Y轴坐标 (滑动过程时实时变化)
        tops: [],  // 所有右侧分类li的top组成的数组  (列表第一次显示后就不再变化)
        food: {},  // 需要显示的food
      }
    },

    computed: {
      ...mapState(['goods']),

      // 计算得到当前分类的下标
      currentIndex(){
      }
    },

    mounted () {
      this.$store.dispatch('getShopGoods')
    }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
