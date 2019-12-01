/*
* 接口请求函数, 返回值为promise对象
*
* */

import ajax from './ajax'

// 注： 如果后面的参数是以对象形式传入的参数, 称为这种对象形式的参数称为query参数,
//     它们是在问号后面（?）， 如：http://localhost:3000/shops?latitude=40.10038&longitude=116.36867
//
// 而, 例如：http://localhost:3000/position/40.10038,116.36867， 参数在路径中，这种是params参数

// 请求经纬度
export const reqAddress = (geohash) => ajax(`/position/${geohash}`)

// 请求食品分类列表
export const reqFoodTypes = () => ajax('/index_category')

// 根据经纬度获取商铺列表
// 取名字很重要
// export const reqShops = (aaa, bbb) => ajax('/shops', {longitude: aaa, latitude: bbb})
export const reqShops = (longitude, latitude) => ajax('/shops', {longitude, latitude})



