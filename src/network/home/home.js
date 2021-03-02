import {get } from '@/network/network.js'

//请求猜你喜欢的数据
export function getLikeList(url, params = {}) {
    return get(url, params)
}