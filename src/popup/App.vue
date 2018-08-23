<template>
    <div class="popup">
        <!--<div class="loading" v-show="loading">-->
            <!--<i class="el-icon-loading"></i>-->
            <!--{{$t('popup.text005')}}-->
        <!--</div>-->
        <div class="result" v-show="!loading">
            <div class="article" v-show="article.title">
                <div class="tip"><i class="el-icon-success"></i> {{$t('popup.text002')}}</div>
                <div class="title"><i class="fb">{{$t('popup.text003')}}</i>{{article.title}}</div>
                <div class="title"><i class="fb">{{$t('popup.text004')}}</i>{{abstract}}</div>
            </div>
            <div class="image-package" v-show="qrCodeSrc">
                <img :src="qrCodeSrc" alt="">
                <div class="desc">{{$t('popup.text001')}}</div>
            </div>
            <div class="fail" v-show="!article.title">
                <i class="el-icon-warning"></i>
                {{error_message}}
            </div>
        </div>


    </div>

</template>
<script>
    import * as util from '@/common/function/util';
    import config from '@/background/config';
    import QRCode from 'qrcode';

    export default {
        data() {
            return {
                loading:false,//从 init() 到渲染二维码
                error_message:'',//错误信息
                currentWindow:{},//当前窗口
                qrCodeSrc: '',
                repostUrlStr: '',
                article: {
                    title: '',
                    textContent: ''
                }
            }
        },
        computed:{
            abstract(){
                let str = this.article.textContent.replace(/^\s+/ig,'');
                return str.substr(0,72)+'...'
            }
        },
        methods: {
            renderQrCode(url) {
                QRCode.toDataURL(url, {
                    width: 160
                }, (err, url) => {
                    this.qrCodeSrc = url;
                    this.loading=false;
                })
            },
            init() {
                this.loading=true;
                chrome.windows.getCurrent((w) => {
                    chrome.tabs.query({active: true, windowId: w.id}, (tabs) => {
                        this.currentWindow = tabs[0];
//                        console.log(this.currentWindow)
                        if(!/^http(s)?:\/\//ig.test(this.currentWindow.url)){
                            this.error_message='网址错误，请输入https://xxxx';
                            this.loading=false;
                            return;
                        };
                        chrome.tabs.sendMessage(this.currentWindow.id, {readability: true},{}, (res)=>{
                            this.article=res;
                            this.repostUrlStr =`title:${res.title}@abstract:${this.abstract}@url:${this.currentWindow.url}`;
                            this.renderQrCode(this.repostUrlStr);
                        });


                    });
                })
            }
        },
        created() {
            this.init();
        }
    }
</script>

<style lang="stylus">
    @import "../common/stylus/variable.styl"
    @import "../common/stylus/mixin.styl"
    .popup {
        width 360px
        padding 12px 18px 24px
        box-sizing border-box
        word-break break-word
        .loading{
            padding-top 12px
            text-align center
            color $info
        }
        .fail{
            padding-top 12px
            text-align center
            color $warning
        }
        .article {
            color $info
            font-size 12px
            line-height 1.4
            > div {
                margin-bottom 12px
            }
            .tip{
                color $success
            }
        }
        .image-package{
            text-align center
            .desc {
                font-size 14px
            }
        }
    }
</style>
