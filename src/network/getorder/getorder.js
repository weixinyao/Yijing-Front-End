import {get} from '@/network/network.js'
export function getordermessage(url,param){
    return get(url,param)
}