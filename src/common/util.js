/**
 * ----------------------------------------------------------
 * 一些公共函数的封装
 *
 * @module src/common/util/util
 * ----------------------------------------------------------
 */
import Vue from 'vue';
import {environment,evnHost} from '../resource/config';
let util = {};

/**
 * 获取url中search部分字符串为json对象
 */
util.getQueryString = (search) => {
    var url = decodeURIComponent ( search);
    var request = {};
    if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      arr = str.split("&");
      for(var i = 0; i < arr.length; i ++) {
         request[arr[i].split("=")[0]] = unescape(arr[i].split("=")[1]);
      }
    }
    return request || {};
}

util.redirect = (url,isPush) => {
    if(util.isWebChat() && environment != 'dev') {
        let posUrl = evnHost[environment] + url;
        location = 'https://nliecai.toobei.com/redirect.html?appid=wx83677e6da548b99e&redirect_uri=' + encodeURIComponent(posUrl) + '&scope=snsapi_base&state=1#wechat_redirect';
    } else {
        location.hash = url;
    }
}

util.isWebChat = () => {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }   
} 

util.getParameter = (pops) => {
    var regexp = new RegExp(pops + "=([^\&]*)", "i");
    var arr = regexp.exec (document.location.search);
    if (arr == null ) return '';
    return arr[1];
};

export default util;
