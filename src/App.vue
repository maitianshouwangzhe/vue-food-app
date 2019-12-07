<template>
  <div>
    <!-- 上面为路由显示的部分 -->
    <router-view/>
    <!-- 配置某些路由组件显示Footer组件   -->
    <Footer v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'   // 在methods中，使用映射函数， 触发action调用去更新状态，
  import Footer from './components/FooterNav/FooterNav'
  export default {

    mounted(){
      // 第一种：触发action调用，去更新状态
      // this.$store.dispatch('getAddress')
      this.getAddress()
      this.getUserInfo()
    },


    methods: {
      ...mapActions(['getAddress', 'getUserInfo'])      // 相当于得到了 getAddress() 这个方法，
    },


    components: {
      Footer,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
