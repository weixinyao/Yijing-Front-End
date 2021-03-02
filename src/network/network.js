/*引入axios */
import axios from 'axios'

/*创建axios实例*/
const instance = axios.create({
    /*baseURL: 'https://shiyaming1994.github.io/mi/static/',*/
    baseURL: 'http://localhost:8080/',
    timeout: 50000, //请求超时时间
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    
    } //设置请求头
})
/*创建axios实例2 */
const instancetwo = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 50000,
    headers: {
        "Content-Type": "multipart/form-data"
    }
})
/*创建axios实例3*/
const instancethree = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 50000,
    header: {
        "Content-Type": "application/json;charset=utf-8"
    }
})
//设置请求拦截器
instance.interceptors.request.use(
    config => {
        // 每次发送请求之前判断vuex中是否存在token        
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
        // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie       
        // token && (config.headers.Authorization = token);        
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

//添加response拦截器
instance.interceptors.response.use(
    response => {
        // if(response.data.code ==2){
        //     这里判断请求返回的状态码做逻辑处理
        // }
        return response
    },
    error => {
        return Promise.reject(error)
    }
)


//封装get方法
export function get(url, params = {}) {
    return instance.get(url, params)
}

//封装post方法
export function post(url, data = {}) {
    return instance.post(url, data)
}

//封装post方法用于文件上传
export function postupload(url,data = {}){
    return instancetwo.post(url,data)
}
//封装post方法用于对应后端的@RequestBody
export function postT(url,data = {}) {
    return instancethree.post(url,data)
}