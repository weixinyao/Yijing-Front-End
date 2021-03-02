import {get} from '@/network/network.js'
export function getcollectmessage(url,param){
    return get(url,param)
}