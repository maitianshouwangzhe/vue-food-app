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

//  根据经纬度获取商铺列表, 参数的顺序也很重要
//  取名很重要
// export const reqShops = (aaa, bbb) => ajax('/shops', {longitude: aaa, latitude: bbb})
export const reqShops = (longitude, latitude) => ajax(BASE_URL +'/shops', {longitude, latitude})



