import {get,post} from '@/network/network.js'
export function userlogin(url,object){
    return get(url,object)
}
export function userregister(url,object){
    return post(url,object)
}