/*
封装ajax请求,
*
* */
import axios from 'axios'

// 请求参数：以对象的形式，则为query参数
export default function ajax(url, data={}, type = 'GET') {
  return new Promise((resolve, reject) => {
    let promise
    if (type === 'GET'){
      // 准备url 和 query参数数据
      let dataStr = ''     // 数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送get请求
      promise = axios.get(url)
    } else {
      promise = axios.post(url, data)
    }
    promise.then(response => {
      // 正确的请求
      resolve(response.data)
    })
      .catch(error => {
        // 失败的请求
        reject(error)
      })
  })
}


/*
以前的做法
const response = await ajax()
const result = response.data


使用new Promise, 可以直接得到自己想要的数据, 即： Promise对返回的数据做了进一步的处理
const result = await ajax()
 */
