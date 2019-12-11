/*
* 接口请求函数, 返回值为promise对象
*
* */

import ajax from './ajax'


// const BASE_URL = 'http://localhost:4000'
const BASE_URL = '/api'


// 注： 如果后面的参数是以对象形式传入的参数, 称为这种对象形式的参数称为query参数,
//     它们是在问号后面（?）， 如：http://localhost:4000/shops?latitude=40.10038&longitude=116.36867


// 而, 例如：http://localhost:4000/position/40.10038,116.36867， 参数在路径中，这种是params参数
// 请求经纬度
export const reqAddress = (geohash) => ajax(BASE_URL + `/position/${geohash}`)

// 请求食品分类列表
export const reqCategorys = () => ajax(BASE_URL +'/index_category')

//  根据经纬度获取商铺列表,
//  参数的顺序很重要, 取名也很重要
// export const reqShops = (aaa, bbb) => ajax('/shops', {longitude: aaa, latitude: bbb})
export const reqShops = (longitude, latitude) => ajax(BASE_URL +'/shops', {longitude, latitude})

// 根据经纬度和关键字搜索商铺列表
export const reqSearchShops = (geohash, keyword) => ajax(BASE_URL + '/search_shops', {geohash, keyword})


// 用户名密码登录
// 当传入三个参数时，由于顺序不容记住，
// 则使用对象的形式传参
export const reqPwdLogin = ({name, pwd, captcha}) => ajax(BASE_URL + '/login_pwd', {name, pwd, captcha}, 'POST')

// 发送短信验证码
export const reqSendCode = (telephone) => ajax(BASE_URL + '/sendcode',{phone: telephone})

// 手机号短信验证码登录
export const reqPhoneLogin = (phone, code) => ajax(BASE_URL + '/login_sms',{phone, code}, 'POST')


// 获取用户信息
export const reqUserInfo = () => ajax(BASE_URL + '/userinfo')

// 退出登录
export const reqLogout = ()=> ajax(BASE_URL + '/logout' )




/*
* 商家的商品、评分、信息
* 是本地mock数据，不存在跨域，则不需要配置代理
* */

// 商家的商品
export const reqGoods = () => ajax('/goods')

// 商家的评分
export const reqRatings = () => ajax('/ratings')

// 商家的信息
export const reqInfo = () => ajax('/info')
