import Vue from 'vue'
import moment from 'moment'

// 自定义过滤器： 对请求得到的数据做进一步地处理，并显示
// 如： 格式化显示时间

Vue.filter('formate_date', function (value) {
  return moment(value).format('YYYY-MM-DD HH:mm:ss')
})

