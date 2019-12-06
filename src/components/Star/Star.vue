<template>
  <!--  class="star star-24" 中的star-24为变量，应该写为  -->
  <div class="star star-24" :class="'star-' + size ">
    <!--   starClass数组中， 有5个 scItem。 注： 由于starClass数组由score确定生成，则需要计算属性   -->
    <span class="star-item" v-for="(scItem, index) in starClass" :key="index" :class="scItem"></span>

    <!--
      静态的评分。 仔细观察静态地评分，生成动态的评分
      <span class="star-item on"></span>
      <span class="star-item on"></span>
      <span class="star-item on"></span>
      <span class="star-item half"></span>
      <span class="star-item off"></span>
    -->
  </div>
</template>

<script>
  // 类名常量

  const CLASS_ON = 'on'
  const CLASS_HALF = 'half'
  const CLASS_OFF = 'off'

  export default {
    props: {
      score: Number,
      size: Number,
    },

    computed: {
      /*
      算法： （ 分数部分大于0.5才出现半星 ）
      3.2: 3个全星 + 0个半星 + 2 个灰星
      3.5: 3 + 1 + 1

       */
      starClass (){
        const {score} = this
        const scs = []
        // 1、向scs中添加n个CLASS_ON
        const scoreInteger = Math.floor(score)   // 取score的整数部分
        for (let i = 0;  i < scoreInteger ;  i++ ){
          scs.push(CLASS_ON)
        }
        // 2、向scs中添加0/1个CLASS_HALF
        // (由于小数的加减不精确，则不等式两边同时乘以10， 变为整数的运算)
        if (score*10 - scoreInteger*10 >= 5){
          scs.push(CLASS_HALF)
        }
        // 3、向scs中添加n个CLASS_OFF
        while (scs.length < 5){
          scs.push(CLASS_OFF)
        }
        return scs
      },
    },
  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/star48_on')
        &.half
          bg-image('./images/star48_half')
        &.off
          bg-image('./images/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star36_on')
        &.half
          bg-image('./images/star36_half')
        &.off
          bg-image('./images/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star24_on')
        &.half
          bg-image('./images/star24_half')
        &.off
          bg-image('./images/star24_off')
</style>
