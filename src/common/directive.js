import Vue from 'vue';

Vue.filter('desensitization',(phone)=>{
	if(phone) {
		var phone = phone.replace(/\s/g,"");
		return phone.substr(0, 3) + "****" + phone.substr(phone.length-4, 4);
	}	
});

Vue.filter('linksymbol',(val)=>{
	let str = new String(val).replace(/\s/g,'');
	if(str) {
	   return str + ' ';
	}else{
       return '~' + ' ';
	}	
});

// ((win,doc)=> {
// 	//用户来源统计
// 	if(!sessionStorage.getItem('__statistics__')){
// 	sessionStorage.setItem('__statistics__',true);
// 	sessionStorage.setItem('__href__',win.location.href);
// 	sessionStorage.setItem('__referer__',doc.referrer);
// 	}   

// 	var _hmt = _hmt || [];
// 	if(environment == "produce"){
// 	var hm = document.createElement("script");
// 	hm.src = "//hm.baidu.com/hm.js?c4003e7e22aa87aad1636556dc3bc76c";
// 	var s = document.getElementsByTagName("script")[0]; 
// 	s.parentNode.insertBefore(hm, s);
// 	}
    
// })(window, document);

