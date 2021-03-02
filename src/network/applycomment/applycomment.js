import {postT} from '@/network/network.js'
export function commitcomment(url,param) {
    return postT(url,param)
}