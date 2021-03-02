import {postT} from '@/network/network.js'
export function addfeedback(url,param){
    return postT(url,param)
}