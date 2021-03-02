import {postT} from '@/network/network.js'
export function updateuser(url,param){
    return postT(url,param)
}