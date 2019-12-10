<template>
  <div>
    <div class="shopcart">

      <!-- 购物车 -->
      <div class="content">
        <div class="content-left" @click="toggleShow">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight: totalCount > 0}">
              <i class="iconfont icon-shopping_cart" :class="{highlight: totalCount} "/>
            </div>
            <div class="num" v-if="totalCount > 0"> {{totalCount}} </div>
          </div>
          <div class="price" :class="{highlight: totalCount}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{info.deliveryPrice}} 元</div>
        </div>
        <div class="content-right">
          <!--  类名支付pay有三种状态， 设计一个计算属性 -->
          <div class="pay" :class="payClass" @click="toPay">
            {{payText}}
          </div>
        </div>
      </div>

      <!--  购物车列表 -->
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">已点食物</h1>
          <span class="empty" @click="clearCart">清空</span>
        </div>
        <div class="list-content">
          <ul>
            <li class="food" v-for="(food, index) in cardFoods" :key="index">
              <span class="name">{{food.name}}</span>
              <div class="price"><span>￥{{food.price}}</span></div>
              <div class="cartcontrol-wrapper">
                <CartControl :food="food"/>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <transition name="move">
      <!--  遮罩  -->
      <div class="list-mask" v-show="listShow" @click="toggleShow"/>
    </transition>

  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  import BScroll from 'better-scroll'
  import {MessageBox} from 'mint-ui'
  import CartControl from '../CartControl/CartControl'
  export default {
    data(){
      return {
        isShow: false,
      }
    },

    // 分析购物车组件所需的状态：购物车的食物列表，
    computed: {
      // 设计一个状态，cardFoods在vuex里面管理
      // cardFoods表示为：购物车中的食物列表
      ...mapState(['cardFoods', 'info']),
      // 与cardFoods有关，则使用计算属性
      ...mapGetters(['totalPrice', 'totalCount']),

      payClass(){
        const {totalPrice} = this
        const {minPrice} = this.info
        // 返回值为动态的class
        return totalPrice >= minPrice ? 'enough' : 'not-enough'
      },

      payText(){
        const {totalPrice} = this
        const {minPrice} = this.info
        if (totalPrice === 0){
          return `满￥${minPrice}元起送`
        }
        if (totalPrice >= minPrice){
          return '去结算'
        } else {
          return `还差￥${minPrice-totalPrice}元起送`
        }
      },

      listShow(){
        // 如果食物数量为0，直接不显示
        if(this.totalCount === 0){
          // 避免清空购物车之后，状态仍然存在
          this.isShow = false
          return false
        }

        // 当列表显示的时候，才能创建BScroll实例， 且只能创建一个实例对象
        if (this.isShow){
          this.$nextTick( () => {
            // 如果不存在实例，则创建实例，避免多次创建，使得购物车中商品的数量出现bug。
            // 实现BScroll的实例对象为单例
            if (!this.scroll){
              this.scroll = new BScroll('.list-content', {
                click: true
              })
            } else {
              // 存在实例后，让滚动条刷新一下，重新统计列表的高度
              this.scroll.refresh()
            }
          })
        }

        return this.isShow
      },
    },

    methods:{

      toggleShow(){
        // 只有总数量大于0时，才切换
        if (this.totalCount>0){
          this.isShow = !this.isShow
        }
      },

      clearCart(){
        MessageBox.confirm('你确定清空购物车吗？').then(
          action => {
            this.$store.dispatch('clearShopCart')
          },
          () => {
             //  点击取消的回调
          }
        )},

      // 去支付结算
      toPay(){
        // 如果可以结算
        if (this.payClass === 'enough'){
          MessageBox.confirm('你确定支付吗？').then(
            action => {
              alert('支付成功')
            },
            () => {
              //  点击取消的回调
            }
          )
        }
      }
    },

    components: {
      CartControl
    }


  }
</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"

  .shopcart
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 48px
    .content
      display flex
      background #141d27
      font-size 0
      color rgba(255, 255, 255, 0.4)
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          vertical-align top
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          border-radius 50%
          background #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            text-align center
            background #2b343c
            &.highlight
              background $green
            .icon-shopping_cart
              line-height 44px
              font-size 24px
              color #80858a
              &.highlight
                color #fff
          .num
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            color #ffffff
            background rgb(240, 20, 20)
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display inline-block
          vertical-align top
          margin-top 5px
          line-height 24px
          padding-right 12px
          box-sizing border-box
          font-size 16px
          font-weight 700
          color #fff
          &.highlight
            color #fff
        .desc
          display inline-block
          vertical-align bottom
          margin-bottom 15px
          margin-left -45px
          font-size 10px
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          height 48px
          line-height 48px
          text-align center
          font-size 12px
          font-weight 700
          color #fff
          &.not-enough
            background #2b333b
          &.enough
            background #00b43c
            color #fff
    .ball-container
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 200
        transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width 16px
          height 16px
          border-radius 50%
          background $green
          transition all 0.4s linear
    .shopcart-list
      position absolute
      left 0
      top 0
      z-index -1
      width 100%
      transform translateY(-100%)  // 显示时，将列表往上移
      &.move-enter-active, &.move-leave-active
        transition transform .3s
      &.move-enter, &.move-leave-to
        transform translateY(0)    // 隐藏时，将列表往下移
      .list-header
        height 40px
        line-height 40px
        padding 0 18px
        background #f3f5f7
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
        .title
          float left
          font-size 14px
          color rgb(7, 17, 27)
        .empty
          float right
          font-size 12px
          color rgb(0, 160, 220)

      .list-content
        padding 0 18px
        max-height 217px
        overflow hidden
        background #fff
        .food
          position relative
          padding 12px 0
          box-sizing border-box
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height 24px
            font-size 14px
            color rgb(7, 17, 27)
          .price
            position absolute
            right 90px
            bottom 12px
            line-height 24px
            font-size 14px
            font-weight 700
            color rgb(240, 20, 20)
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 6px

  .list-mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 40
    backdrop-filter blur(10px)
    opacity 1
    background rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition all 0.5s
    &.fade-enter, &.fade-leave-to
      opacity 0
      background rgba(7, 17, 27, 0)
</style>
