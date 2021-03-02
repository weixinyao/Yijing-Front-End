import {get} from '@/network/network.js'
export function querycommentbygoodid(url,param){
    return get(url,param)
}