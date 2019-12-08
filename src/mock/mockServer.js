/*
* 使用mockjs提供mock数据接口
* */

import Mock from 'mockjs'
import data from './data'

// 这个文件不需要暴漏出去，当匹配请求的url后，自动返回数据

// 这里的url和路由链接 可以不一致



// 返回商品goods的接口
Mock.mock('/goods', {code: 0, data: data.goods})


// 返回评分rating的接口
Mock.mock('/ratings', {code: 0, data: data.ratings})


// 返回商家信息的接口info的接口
Mock.mock('/info', {code: 0, data: data.info})
