import {get} from '@/network/network.js'
export function collect(url,param){
    return get(url,param)
}