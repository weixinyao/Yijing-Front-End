import {get} from '@/network/network.js'
export function queryallfeedback(url,param){
    return get(url,param)
}