import {get} from '@/network/network.js'
export function managerlogin(url,param){
    return get(url,param)
}