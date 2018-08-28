import axios from './axios';
import API from './api';
const creatLoginPage= (params, callback)=>{
    console.log('creat a login page');
    chrome.windows.getCurrent(function(w){
        console.log('windowID:',w.id);
        chrome.tabs.query({active: true,windowId:w.id}, function(tabs) {
            primas.currentTab=tabs[0].id;
            console.log('currentId',primas.currentTab)
            let left=(window.screen.width-760)/2,top=(window.screen.height-520)/2;
            let features='status=no,resizable=no,scrollbars=yes,personalbar=no,directories=no,location=no,toolbar=no,menubar=no,width=760,height=520,left='+left+',top='+top;

            if(primas.currentTab !==0) {
                callback && callback({'success': true});
                primas.externalWindow=window.open(params.loginPageOptions.url,'',features);
            }else{
                alert('页面加载未完成，请刷新重试')
            }
        });
    })
}
const loginSuccess= (params, callback)=>{
    console.log('i see u loginSuccess')
    callback && callback({'success': true});
    chrome.tabs.sendMessage(primas.currentTab, {loginSuccess: true},{}, function(response) {
        primas.externalWindow.close()
    });
};
const loginClose=(params, callback)=>{
    //当前没有弹窗则不需要清除
    console.log('i see u loginClose')
    callback && callback({'success': true});
    chrome.tabs.sendMessage(primas.currentTab, {loginClose: true},{}, function(response) {
        //手动关闭 当前弹窗已经被关闭 找不到当前弹窗id
        primas.externalWindow.close()

    });
};
const loginout =(params, callback)=>{
    axios.post(API.loginout, {}).then((res) => {
        if (res.data) {
            callback({success: true, data: res.data});
        }
    }).catch((err) => {
        callback({success: false, err});
    })
};
const primas={
    externalWindow:{},//window.open(https://ext.primas.io)  生成的窗口对象
    currentTab:0,
    creatLoginPage,
    loginSuccess,
    loginClose
};
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        primas[request.method](request.params, sendResponse);
        return true;
    }
);
chrome.runtime.onConnectExternal.addListener(
    function(port) {
        port.onMessage.addListener(function(request) {
            port.postMessage({'success': true});
            primas[request.method](request.params);
            return true;
        });

    }
);
if(process.env.NODE_ENV==='development'){
    require('./hot-reload.js');
}