import {postT} from '@/network/network.js'
export function add(url,param){
    return postT(url,param)
}