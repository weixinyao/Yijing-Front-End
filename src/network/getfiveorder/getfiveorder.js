import {get} from '@/network/network.js'
export function getorders(url,param){
    return get(url,param)
}