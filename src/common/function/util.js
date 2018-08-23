import Vue from 'vue'
import {Message} from 'element-ui'

Vue.component(Message.name, Message)

//sessionStorage
export const session = function (key, value) {
    if (value === void(0)) {
        var lsVal = sessionStorage.getItem(key);
        if (lsVal && lsVal.indexOf('autostringify-') === 0) {
            return JSON.parse(lsVal.split('autostringify-')[1]);
        } else {
            return lsVal;
        }
    } else {
        if (typeof(value) === "object" || Array.isArray(value)) {
            value = 'autostringify-' + JSON.stringify(value);
        }
        ;
        return sessionStorage.setItem(key, value);
    }
}

//生成随机数
export const getUUID = function (len) {
    len = len || 6;
    len = parseInt(len, 10);
    len = isNaN(len) ? 6 : len;
    var seed = "0123456789abcdefghijklmnopqrstubwxyzABCEDFGHIJKLMNOPQRSTUVWXYZ";
    var seedLen = seed.length - 1;
    var uuid = "";
    while (len--) {
        uuid += seed[Math.round(Math.random() * seedLen)];
    }
    return uuid;
};
//深拷贝
export const deepcopy = function (source) {
    if (!source) {
        return source;
    }
    let sourceCopy = source instanceof Array ? [] : {};
    for (let item in source) {
        sourceCopy[item] = typeof source[item] === 'object' ? deepcopy(source[item]) : source[item];
    }
    return sourceCopy;
};

//ajax错误处理
export const catchError = function (error) {
    if (error.response) {
        switch (error.response.status) {
            case 400:
                Vue.prototype.$message({
                    message: error.response.data.message || '请求参数异常',
                    type: 'error',
                    center:true
                });
                break;
            case 404:
                Vue.prototype.$message({
                    message: error.response.data.message || '请求地址不存在，请联系技术支持',
                    type: 'warning',
                    center:true
                });
                break;
            default:
                Vue.prototype.$message({
                    message: error.response.data.message || '服务端异常，请联系技术支持',
                    type: 'error',
                    center:true
                });
        }
    }
    return Promise.reject(error);
};

export const sendMessage = function (postdata, successCallback, errorCallback) {
    chrome.runtime.sendMessage(
        postdata,
        (res) => {
            if (res && res.success) {
                typeof successCallback === 'function' && successCallback(res.data);
            } else {
                typeof errorCallback === 'function' && errorCallback(res.err);
            }
        }
    );
};
//获取浏览器参数
export const getQueryString= (name)=>{
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
};
