<template>
  <div>
    <div class="goods">

      <!--   左侧的导航栏  -->
      <div class="menu-wrapper">
        <ul >
          <!-- 动态class的current表示当前选中   -->
          <!-- 给事件回调函数传参数   -->
          <li class="menu-item" v-for="(item, index) in goods"
              :key="index"
              :class="{current: index === currentIndex}"
              @click="clickMenuItem(index)"
          >
            <span class="text bottom-border-1px">
              <!--  使用v-if， 若有图片, 则解析图片； 若无图片，则不加载图片   -->
              <img class="icon" :src="item.icon" v-if="item.icon">
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>

      <!-- 右侧的商品详情   -->
      <div class="foods-wrapper" v-if="goods.length">   <!--  数组goods的长度为0时， 不显示右侧商品 -->
        <!--  定义一个唯一标识，便于快速查找  -->
        <ul ref="foodsUI">
          <!-- 双重v-for循环语句 -->
          <li class="food-list-hook" v-for="(item, index) in goods" :key="index">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in item.foods"
                  :key="index"
                  @click=" showFood(food)"
              >
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
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
                    <!--  引入组件, 并给组件传递数据 -->
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <!--  购物车  -->
      <ShopCart/>

    </div>

    <!--  食物详情的Modal框 -->
    <FoodModal :food="food" ref="foodModal"/>

  </div>
</template>


<script>
  /* 列表的长度或者高度大于div的高度，这是滚动的前提条件   */
  import BScroll from 'better-scroll'
  import {mapState} from 'vuex'
  import CartControl from '../../../components/CartControl/CartControl'
  import FoodModal from '../../../components/FoodModal/FoodModal'
  import ShopCart from '../../../components/ShopCart/ShopCart'
  export default {
    data(){
      return {
        scrollY: 0,  // 右侧滑动时Y轴坐标 (滑动过程时实时变化)
        tops: [],   // 由所有分类下商品li组成的数组tops  (列表第一次显示后就不再变化)
        food: {},  // 点击需要显示的food的Modal框
      }
    },

    computed: {
      ...mapState(['goods']),

      // 计算得到当前分类的下标
      currentIndex() {// 计算属性什么时候执行？：初始和相关数据发生了变化
        // 得到条件数据
        // scrollY是实时数据
        const {scrollY, tops} = this
        // 根据条件计算产生一个结果
        // [0, 2, 6, 8].indexOf(6)结果为3； [0, 2, 6, 8].indexOf(11)结果为-1；
        // find()方法：返回满足 通过函数内条件的 第一个元素。
        // [0, 2, 6, 8].findIndex(4)结果为1， 这是由于4处于区间2至6之间，则返回值为1
        const index = tops.findIndex((top, index) => {
          // scrollY >= 当前top && scrollY < 下一个top
          return scrollY >= top && scrollY < tops[index + 1]
        })
        // 返回结果
        return index
      }
    },

    mounted () {
      // 分发action， 并将回调函数作为参数，传递过去
      // 只有数据更新后，才在action中执行该回调函数
      this.$store.dispatch('getShopGoods', () => {
        this.$nextTick( () => {
          // 写成一个方法， 抽离出去
          // 它们不是事件回调函数，加_符号进行区分
          this._initScroll()
          this._initTops()
        })
      })
    },

    methods: {
      // 初始化滚动条
      _initScroll(){
        // 找到div的class属性
        // 列表显示后，创建滚动
        new BScroll('.menu-wrapper',{
          click: true,
        })

        // 找到div的class属性， 即可创建
        this.foodScroll = new BScroll('.foods-wrapper',{
          // 在屏幕滑动的过程中实时地派发scroll事件
          probeType: 2,   // 惯性滑动不触发事件
          click: true,
        })

        // 给右侧列表绑定scroll监听
        // 保存到this，便于其他地方调用，如：事件回调clickMenuItem
        this.foodScroll.on('scroll', ({x, y})=>{
          // console.log(x, y)
          // 更新数据，得到scrollY的值
          this.scrollY = Math.abs(y)
          // console.log(this.scrollY)
        })

        // 给右侧列表绑定scroll结束的监听
        this.foodScroll.on('scrollEnd', ({x, y}) => {
          console.log('scrollEnd滑动结束', x, y)
          this.scrollY = Math.abs(y)
        })
      },

      // 初始化tops
      _initTops(){
        // 1、初始化tops
        const tops = []
        let top = 0   // 1、累加
        tops.push(top)
        // 2、收集
        // const lis = document.getElementsByClassName('food-list-hook')    // 这是在整个页面里查找，右侧符合条件的所有li标签
        // 快速查找到右侧符合条件的所有li标签
        // const lis = this.$refs.foodsUI.getElementsByClassName('food-list-hook')   // 第一种方法
        const lis = this.$refs.foodsUI.children      // 注意： lis是一个伪数组，
        // 将 伪数组 变为 真数组
        Array.prototype.slice.call(lis).forEach(li => {
          // 网页(内容)可见区域的高度
          top += li.clientHeight
          tops.push(top)
        })
        // 更新状态， 得到tops的值
        this.tops = tops
        console.log(tops)
      },

      // 事件回调
      // 点击左侧的子菜单选项，使得右侧滑动到指定位置
      clickMenuItem(index){
        // console.log(index)
        const targetScrollY = this.tops[index]
        this.scrollY = targetScrollY
        // 由于坐标负数
        // 滑动效果
        this.foodScroll.scrollTo(0, -targetScrollY, 600)
      },

      // 点击显示food的Modal框
      showFood(food){
        // 更新状态
        this.food = food
        // 在父组件中， 调用子组件的方法
        this.$refs.foodModal.toggleShow()
      },
    },

    components: {
      CartControl,
      FoodModal,
      ShopCart
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
