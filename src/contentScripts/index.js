import Readability from './Readability';

function parseDocument() {
    let documentClone = document.cloneNode(true);
    let article = new Readability(documentClone).parse();
    // console.log(article);
    return article
}

$(function () {

    chrome.runtime.onMessage.addListener(
        (request, sender, sendResponse) => {
            console.log(sender.tab ? "来自内容脚本：" + sender.tab.url : "来自扩展程序");
            if (request.readability) {
                //内容脚步 读取该网页主体
                sendResponse(parseDocument())
            }
        });
});
