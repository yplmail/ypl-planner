/**
 * Created by ypl on 2016/12/23.
 */
import Vue from 'vue';
import Api from './api';
import Env from './env';
import VueResource from 'vue-resource';

Vue.use(VueResource);

export default {
    serverRequest(url, data, callback) {
        let self = this;
        if (typeof data === 'function') {
            callback = data;
            data = {};
        }
        var requestUrL = Env.serverUrl + Api[url];
        var params = this.extends(data);
        var promise = Vue.http.post(requestUrL, params, {
            timeout: 3000,
            emulateJSON: true
        }).then((response) => {
            if (response.body && response.body.code == 0) {
                callback && callback(response.body.data);
            } else if (response.body && response.body.code === '100003') {
                self.setCookie("__mobile__",'',-1);
                self.setCookie("__token__",'',-1); 
                location.hash = '/login/login';
            } else {
                self.onFail(response.body);
            }
        }, (response) => {
            self.onFail(response.body)
        });

        return promise;
    },

    onFail(data) {   
        var msg = '机器闹情绪了，拼命安慰中...';
        if (toString.call(data.errors) === '[object Array]') {
            msg = data.errors[0].msg;
        } else {
            if (data.msg) msg = data.msg;
        }
        Vue.popup.tips(msg);
    },

    extends(data) {
        var baseData = this.getBaseData();
        for (let attr in data) {
            baseData[attr] = data[attr];
        }
        return baseData;
    },

    getBaseData() {
        let data = {
            orgNumber: 'App_channel_wechat',
            appKind: 'channel',
            appClient: 'wechat',
            appVersion: '1.0.0',
            v: '1.0.0',
            token: this.getCookie('__token__') || '',
            timestamp: this.getNowDate()
        }
        return data;
    },

    getNowDate() {
        var d = new Date();
        var o = {};
        o.y = d.getFullYear();
        o.m = d.getMonth() + 1;
        o.d = d.getDate();
        o.h = d.getHours();
        o.min = d.getMinutes();
        o.s = d.getSeconds();
        return o.y + '-' + o.m + '-' + o.d + ' ' + o.h + ':' + o.min + ':' + o.s;

    },

    isWechat() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    },

    setCookie(name, value, expiredays) {
        var d = new Date();
        d.setDate(d.getDate() + expiredays);
        document.cookie = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + d.toGMTString()) + ";path=/";
    },

    getCookie(name) {
        if (document.cookie.length > 0) {
            var start = document.cookie.indexOf(name + "=")
            if (start != -1) {
                start = start + name.length + 1;
                var end = document.cookie.indexOf(";", start);
                if (end == -1) {
                    end = document.cookie.length;
                }
                return unescape(document.cookie.substring(start, end));
            }
        }
        return '';
    }
}
