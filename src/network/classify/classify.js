import {get } from '@/network/network.js'
//获取分类数据
export function getClassifyData(url, params = {}) {
    return get(url, params)
}
export function getallclassify(url,param){
    return get(url,param)
}