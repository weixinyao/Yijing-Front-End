import {get} from '@/network/network.js'
export function getpublishmessage(url,param){
    return get(url,param)
}