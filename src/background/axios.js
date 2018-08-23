import axios from 'axios'
axios.defaults.baseURL = '/';
axios.defaults.withCredentials = true;
//添加响应拦截器
// axios.interceptors.response.use(function(response){
//     //对响应数据做些事
//     console.log(response);
//     if(response.status==401){
//         router.push({name:'home'})
//     }
//     return response
// },function(error){
//     //请求错误时做些事
//     router.push({name:'home'})
//     return error;
// });
export default axios;