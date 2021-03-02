import {get} from '@/network/network.js'
export function permit(url,param){
    return get(url,param)
}