import{get} from '@/network/network.js'
export function queryuser(url,param){
    return get(url,param)
}