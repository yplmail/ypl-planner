import service from '../resource/service';
import evn     from '../resource/env';

function getChannel(){
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i) == "micromessenger") {
	    return "wechat" ;
	}else{
	    return "wap";
	}
}

function setWechatConfig(share){
	service.serverRequest('wechatShare',{
		url: location.href.replace(/#.+$/, ''),
	},(result)=>{
		wx.config({
			appId : result.appid,
			timestamp : result.timestamp,
			nonceStr : result.nonceStr,
			signature : result.signature,
			jsApiList : ['showOptionMenu','onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ']
		});
		wx.ready(function(){
			// 分享到QQ
			wx.onMenuShareQQ(share);
			// 分享到朋友圈
			wx.onMenuShareTimeline(share);
			// 分享给朋友
			wx.onMenuShareAppMessage(share);
		});
		wx.error(function (res) {

		});
	})
}

export default function share(content) {
    var shareContent = {
        title  : content.shareTitle, // 分享标题
        desc   : content.shareDesc, // 分享描述
        link   : content.shareLink + '&fromApp=leicai&platform=' + getChannel(), // 分享链接
        imgUrl : evn.imgUrl +"/"+  content.shareImgurl// 分享图标            
    };
    setWechatConfig(shareContent);
};