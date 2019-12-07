<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">外卖App</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginWay}" @click=" loginWay = true">短信登录</a>   <!-- 点击时， 将loginWay设置为true   -->
          <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay = false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login" >
          <div :class="{on: loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <!--  当使用v-model收集的得到的数据满足条件时， 增加了一个right_phone的类名, 且rightPhone与phone有关，则使用计算属性 -->
              <!--  一旦点击，则会自动提交表单， 需要阻止表单的默认行为@click.prevent   -->
              <button :disabled="!rightPhone"
                      class="get_verification"
                      :class="{right_phone: rightPhone}"
                      @click.prevent="getCode"
              >
                {{countDown > 0 ? `已发送(${countDown}s)` : '点击获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="text" maxlength="6" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !loginWay}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-if="isShowPassword" v-model="pwd">
                <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">
                <div class="switch_button" :class=" isShowPassword ? 'on': 'off' " @click.prevent = "isShowPassword = !isShowPassword" >
                  <div class="switch_circle" :class="{right: isShowPassword}"></div>
                  <span class="switch_text">{{ isShowPassword ? 'abc' : '...' }}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification"
                     src="http://localhost:4000/captcha"
                     alt="captcha"
                     @click="getCaptcha"
                     ref="captcha"
                >
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>

    <!-- AlertTip中分发了一个事件，则在此处需要绑定监听    -->
    <alert-tip :alertText="alertText" v-show="isShowAlertTip" @closeTip="closeTip"/>
  </section>
</template>

<script>
  import AlertTip from '../../components/AlertTip/AlertTip'
  import {reqSendCode,reqPhoneLogin, reqPwdLogin, reqLogout} from '../../api'
  export default {
    data(){
      return {
        // 登录方式，默认为手机登录
        loginWay: false,
        // 倒计时
        countDown: 0,
        // 手机
        phone: '',
        // 短信验证码
        code: '',
        // 密码
        pwd: '',
        name: '',
        // 图形验证码
        captcha: '',
        // 是否显示密码
        isShowPassword: false,
        // alert的文本
        alertText: '',
        // 是否显示alert
        isShowAlertTip: false,
      }
    },

    computed: {
      rightPhone (){
        // 取出收集得到的值
        const inputValue = this.phone
        return /^1\d{10}$/.test(inputValue)
      },
    },

    methods: {
      async getCode (){
        // 如果当前没有倒计时， 才启动倒计时和 发请求 （注： 0对应为false ）。
        // this.countDown不为0时，即表明： 已经有了倒计时，若存在倒计时，不可再次点击
        if (!this.countDown){
          // 启动倒计时
          this.countDown = 30
          // 将计时器的id存到this中, 便于其它地方使用
          this.interValId = setInterval(()=>{
            this.countDown--
            if (this.countDown <=0 ){
              // 停止计时
              clearInterval(this.interValId)
            }
          }, 1000)

          // 循环定时器启动的同时，发起ajax请求，向指定手机发送验证码
          const result = await reqSendCode(this.phone)
          if (result.code === 1){
            // 显示发送失败
            this.showAlert(result.msg)
            //  （如果计时器的值大于0） 清除倒计时
            if (this.countDown){
              this.countDown = 0
              clearInterval(this.interValId)
            }
          }
        }
      },

      // (由于该方法多次使用)，则自定义一个方法
      showAlert(alertText){
        // 将alert设置为显示
        this.isShowAlertTip = true
        // alert要显示的内容
        this.alertText = alertText
        return
      },

      // 异步登录
      async login (){
        let result
        // 手机号登录
        if (this.loginWay){
          // 取出表单输入的值
          const {phone, code, rightPhone} = this
          if (!rightPhone){
            this.showAlert('手机号码不正确')
          } else if (!/^\d{6}$/.test(code)){
            this.showAlert( '短信验证码不正确, 验证必须是6位数字')
          }

          //  使用手机号登录， 发送ajax请求
          result = await reqPhoneLogin(phone, code)

        } else {
          const {name, pwd, captcha} = this
          if (!name){
            this.showAlert('用户名必须输入')
          } else if (!pwd){
            this.showAlert('密码必须输入')
          } else if (!captcha){
            this.showAlert('验证码必须输入')
          }

          //  使用密码登录， 发送ajax请求
          // 以对象的形式传入参数
          result = await reqPwdLogin( {name, pwd, captcha} )
        }

        // 无论成功或者失败，都要清理定时器
        // （如果计时器的值大于0） 清除倒计时
        if (this.countDown){
          this.countDown = 0
          clearInterval(this.interValId)
        }

        // 统一处理请求的结果
        if (result.code === 0){
          const user = result.data
          // 将user存储到vuex中, 进行管理状态
          await this.$store.dispatch('saveUser', user)
          // 跳转至个人中心页面
          await this.$router.replace('/profile')
        } else {
          // 更新图片验证码
          this.getCaptcha()
          // 清空输入的数据
          this.captcha = ''
          this.name = ''
          this.pwd =''
          // 登录失败
          this.showAlert(result.msg)
        }
      },

      //
      closeTip(){
        this.isShowAlertTip = false
        // 将提示内容清空，避免带来干扰
        this.alertText = ''
      },

      // 图形验证码是发送一般的请求，不是ajax请求，则这里不存在跨域
      // 使用event，仅仅对当前使用，当其它地方调用该方法时，没有event，则使用ref
      getCaptcha(event){
        // 每次指定的src要不一样
        // event.target.src = 'http://localhost:4000/captcha?time=' + Date.now()
        this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
      },
    },
    components: {
      AlertTip,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone   // 定义样式
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(30px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999

</style>
