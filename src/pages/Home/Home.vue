<template>
  <section class="msite">
        <!-- 首页头部   -->
        <!-- 给定义的插槽传递标签数据  -->
        <TopHeader :title="address.name">
          <span class="header_search" slot="left">
            <i class="iconfont icon-sousuo"></i>
          </span>
          <span class="header_login" slot="right">
            <span class="header_login_text">登录|注册</span>
          </span>
        </TopHeader>

        <!--首页导航-->
        <nav class="msite_nav">
          <!--  categorys数组中有数组时，才显示。 注： 空数组为false  -->
          <div class="swiper-container" v-if="categorys.length">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">    <!--  v-for 在哪一行， 就循环生成该行 -->
                <a href="javascript:" class="link_to_food" v-for="(item, index) in categorys" :key="index">
                  <div class="food_container">
                    <!--  第一种方法： 使用data中的数据进行拼接字符串 -->
                    <img :src="baseImageUrl + item.image_url">

                    <!--  第二种方法： 直接拼接字符串  -->
                    <!--    <img :src= "`https://fuss10.elemecdn.com${item.image_url}`" >    -->
                  </div>
                  <span>{{item.title}}</span>
                </a>
              </div>
            </div>
            <!-- 添加分页器 -->
            <div class="swiper-pagination"></div>
          </div>
          <img src="./images/msite_back.svg" alt="" v-else />
        </nav>


        <!--首页附近的商家列表-->
        <div class="msite_shop_list">
          <div class="shop_header">
            <i class="iconfont icon-xuanxiang"></i>
            <span class="shop_header_title">附近商家</span>
          </div>

          <ShopList/>

        </div>
      </section>
</template>

<script>
  import {mapState} from 'vuex'
  import TopHeader from '../../components/TopHeader/TopHeader'
  import ShopList from '../../components/ShopList/ShopList'
  // 引入轮播图及其样式 https://www.swiper.com.cn/usage/index.html
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'

  export default {
    data(){
      return {
        baseImageUrl: 'https://fuss10.elemecdn.com',
      }
    },

    // 由于Swiper之前已经显示了，则在生命周期中创建最好
    mounted(){


      this.$store.dispatch('getCategorys')
      this.$store.dispatch('getShops')
    },


    // 轮播图只有在有categorys列表数据之后才能显示，因此只能监视分类列表的变化
    watch: {
      // categorys 后面是回调函数
      categorys (value) {    // categorys数组中有数据了，但是界面显示是异步显示的。 因此，只有在界面更新后，立即创建Swiper实例。使用this.$nextTick
        this.$nextTick( () => {
          // 创建一个Swiper实例对象，用于实现轮播
          new Swiper ('.swiper-container', {
            direction: 'horizontal', // 水平切换选项
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
          })
        })
      },
    },

    computed: {
      //  读取 最新的状态
      ...mapState(['address', 'categorys']),

      // 根据请求得到的一维数据categorys, 生成自己所需的二维数组categorysArr。 注,二维数组： [ [],  [], [], [], ... , [] ]
      // 内部小数组中的元素个数最大是8
      categorysArr(){
        const {categorys} = this
        // 准备空的2维数组
        let arr = []
        // 准备一个小数组(最大长度为8)
        let minArr = []
        // 遍历categorys
        categorys.forEach(c => {
          // 如果当前小数组已经满了, 创建一个新的
          if(minArr.length===8) {
            minArr = []
          }
          // 如果minArr是空的, 将小数组保存到大数组中
          if(minArr.length===0) {
            arr.push(minArr)
          }
          // 将当前分类保存到小数组中
          minArr.push(c)
        })
        return arr
      },

    },

    components: {
      TopHeader,
      ShopList
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
        .msite  //首页
          width 100%
          .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
            height 200px
            background #fff
            .swiper-container
              width 100%
              height 100%
              .swiper-wrapper
                width 100%
                height 100%
                .swiper-slide
                  display flex
                  justify-content center
                  align-items flex-start
                  flex-wrap wrap
                  .link_to_food
                    width 25%
                    .food_container
                      display block
                      width 100%
                      text-align center
                      padding-bottom 10px
                      font-size 0
                      img
                        display inline-block
                        width 50px
                        height 50px
                    span
                      display block
                      width 100%
                      text-align center
                      font-size 13px
                      color #666
              .swiper-pagination
                >span.swiper-pagination-bullet-active
                  background #02a774
          .msite_shop_list
            top-border-1px(#e4e4e4)
            margin-top 10px
            background #fff
            .shop_header
              padding 10px 10px 0
              .shop_icon
                margin-left 5px
                color #999
              .shop_header_title
                color #999
                font-size 14px
                line-height 20px
  </style>
