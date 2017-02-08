<template>
	<div class="login-wrapper" ref='loginWrapper'>
		<div class="login-logo">
			<img src="../../../static/images/login/login_logo_icon.png">
		</div>
		<div class="login-content">
			<div class="login-input">
			    <ul>
			    	<li class="clearfix">
			    	    <input type="password" style="position:absolute;height:0;top:-10000px;"> 
			    	    <label><img src="../../../static/images/login/login_phone_icon.png"></label>
			    		<input type="tel" name="mobile" maxlength="11"  v-model="mobile" placeholder="请输入您的手机号码" >
			    	</li>
			    	<li class="clearfix">
			    	    <label><img src="../../../static/images/login/login_lock_icon.png"></label>
			    		<input v-if="inputType=='password'" type="password" name="password" maxlength="20" v-model="password" placeholder="请输入您的登录密码"> 
			    		<input v-else type="text" name="password" maxlength="20" v-model="password" placeholder="请输入您的登录密码"> 
				    	<i class="eye" :class="eyeClass" @click="eyeOperation()"></i>   					    			
			    	</li>
			    </ul>
			</div>
			<div class="button-wrapper">
				<a @click="validate()">登录</a>
			</div>
			<div class="link-wrapper">
				<p><router-link :to="{name:'register'}">免费注册</router-link></p>			
				<p><a></a></p>			
			</div>
			<div class="link-telphone">
				客服电话 400-888-6987
			</div>					
		</div>
	</div>
</template>

<script>

  import service from "../../resource/service";
  import Util from "../../common/util";

  export default{
  	data(){
  		return {
  			'mobile'    : service.getCookie('__mobile__') || '',
  			'password'  : '',
  			'inputType' : 'password',
  			'eyeClass'  : 'close'
  		};
  	},
  	created(){
  		sessionStorage.setItem('__href__',location.href);
        sessionStorage.setItem('__referer__',document.referrer);               	
  	},
  	methods:{
      eyeOperation(){
      	 if(this.eyeClass === 'close'){
	      	 this.eyeClass  = 'open';
	      	 this.inputType = 'text';
      	 }else{
      	 	 this.eyeClass  = 'close';
      	 	 this.inputType = 'password';
      	 }
      },
      validate(){
      	if(this.mobile == ''){
      		Vue.popup.tips('请输入您的手机号码');
      		return false;
      	}
        if(!/^1\d{10}$/.test(this.mobile)){
        	Vue.popup.tips('请输入正确的手机号码');
        	return false;
        }
        if(this.password == ''){
      		Vue.popup.tips('请输入您的登录密码');
      		return false;
      	}
        if(this.password.length < 6 || this.password.length > 20){
        	Vue.popup.tips('请输入6到20位长度的登录密码');
        	return false;
        }
        this.submit();
      },
      submit : function(){
      	var mobile = this.mobile;
		service.serverRequest('login',{
			mobile   : this.mobile,
			password : this.password
		},(data)=>{
			service.setCookie("__mobile__",mobile,2);
			service.setCookie("__token__",data.token,2); 
			// safair浏览器开启无痕浏览，localStorage被禁用    			
			// localStorage.setItem('__mobile__',mobile);
			// localStorage.setItem('__token__',data.token);
            //location.hash = '/mine?t='+Date.now();
            sessionStorage.removeItem('__ISPUSHAPPID__');     
            Util.redirect('#/mine?isPush=0');
		})
      }
  	}
  } 	
</script>

<style scoped>
    .login-wrapper{
    	position: relative;
    	width:100%;
    	height:100%;
    	background-color: #fff;
    	overflow: hidden;
    }

	.login-logo{
       text-align: center;
       height:5rem;
       line-height: 5rem;
	}

	.login-logo img{
	   width:1.8rem;
	   vertical-align: middle;
	}

    .login-content{
       height:6.67rem;
    }

	.login-input ul{
		margin:0 .24rem;
	}

	.login-input li{
		position: relative;
		height: .98rem;
		line-height: .98rem;
		border-bottom:1px solid #dcdcdc;
		overflow: hidden;
	}

	.login-input li > *{
		float: left;
		margin-left:.2rem;
	}

    .login-input li img{
    	width:.4rem;
    	vertical-align: middle;
    }

    .login-input li input{
      font-size: .3rem;
      vertical-align: middle;
      height: .98rem;
      width:85%;
	}

    .login-input li > i.eye{
	    position: absolute;
	    display: block;
	    top: 0;
	    right: 0;
	    width: .98rem;
	    height: .98rem;
	    background-repeat: no-repeat;
	    background-size: 35%;
	    background-position: center center;
	    z-index: 10;
	    cursor: pointer;
	}

	.login-input li > i.close{
		background-image:url(/static/images/login/login_eye_close.png);		
	}

	.login-input li > i.open{
		background-image:url(/static/images/login/login_eye_open.png);
	}

	.button-wrapper{
		margin:.6rem .24rem;
	}

	.button-wrapper a{
		display: block;
		background-color: #12b7f5;
		border-radius: 5px;
		color:#fff;
		font-size: .38rem;
		height: 1rem;
		line-height: 1rem;
		text-align: center;
	}

	.link-wrapper{
        display: flex;
        height: .5rem;
        line-height: .5rem;
        margin:0 .24rem;
	}

	.link-wrapper p{
        flex:1;
	}

    .link-wrapper a{
	   color:#007aff;
	}

	.link-telphone{
		position: absolute;
		bottom:.45rem;
		left:0;
		width:100%;
		text-align: center;
		color:#969696;
	}
</style>