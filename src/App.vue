<template>
  <div>
    <!-- 上面为路由显示的部分 -->
    <router-view/>
    <!-- 配置某些路由组件显示Footer组件   -->
    <Footer v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
  import Footer from './components/FooterNav/FooterNav'
  export default {

    mounted(){
      // 第一种：触发action调用
      this.$store.dispatch('getAddress')
    },

    components: {
      Footer,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
