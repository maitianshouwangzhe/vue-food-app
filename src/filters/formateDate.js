import Vue from 'vue'
// import moment from 'moment'

// ate-fns是一个函数库， 只引入format这个函数
import format from 'date-fns/format'

// 自定义过滤器： 对请求得到的数据做进一步地处理，并显示
// 如： 格式化显示时间

Vue.filter('formate_date', function (value, formatStr) {
  // return moment(value).format('YYYY-MM-DD HH:mm:ss')
  return format(value, formatStr || 'YYYY-MM-DD HH:mm:ss' )
})

