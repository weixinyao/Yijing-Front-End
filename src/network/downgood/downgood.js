import {get} from '@/network/network.js'
export function down(url,param){
    return get(url,param)
}