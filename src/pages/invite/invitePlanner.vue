<template>
	<div class="invite-wrapper">
		<div class="qrcode-wrapper">
			<img :src="inviteData.url" alt="">
		</div> 
		<div class="qrcode-remark">
		  	推荐理财师，享受推荐收益	
		</div>  

		<div class="share-step">
			<div>
				<p><span>1</span></p>
				<p>点击“立即推荐”将推荐链接发给理财师或将二维码给理财师用微信扫描</p>				
			</div>

			<div>
				<p><span>2</span></p>
				<p>理财师通过推荐链接或扫描二维码注册即加入你的团队</p>				
			</div>

			<div>
				<p><span>3</span></p>
				<p>你推荐的理财师出单拿佣金时，你可拿到推荐奖励。点击查看<router-link :to="{name:'invitePlannerRule'}">《推荐奖励规则》</router-link></p>				
			</div>

            <a @click="recommand()" class="button">立即推荐</a>			
		</div>	

		<Layer :content="content"></Layer>
    </div>       

</template>

<script>
	import service from '../../resource/service';
	import Env     from '../../resource/env';
	import Layer   from '../../components/layer/layer';	
	import share   from '../../common/share';	
	
	export default{
	  data(){
	  	return{
	  		content : {
              status : false ,
              tip    : ''
	  		},
	  		inviteData : {}
	  	};
	  },
      created(){
			service.serverRequest('invitePlanner',(result)=>{
	            result.url =Env.imgUrl +"/"+ result.url;
                this.inviteData = result;
                share(result.shareContent);
			})
      },
      methods:{
            recommand(){
            	this.content.status = true;
            	this.content.tip = '请点击右上角将本链接发送给指定朋友或分享到朋友圈';
            }

      },
      components:{
		    Layer
      }
	}	
</script>

<style scoped>
    .invite-wrapper{
    	background-color: #fff;
        height: 100%;
    }

	.qrcode-wrapper{
		padding:.4rem 0;
		text-align: center;
	}

	.qrcode-wrapper img{
		width:3rem;
	}

	.qrcode-remark{
		height: .32rem;
		line-height: .32rem;
		text-align: center;
		font-size: .32rem;
		color:#646464;
	}

	.share-step{
		margin:0 .24rem;
	}

	.share-step > div{
		display: flex;
		margin:.5rem 0;
	}

    .share-step div p:first-child span{
		display: inline-block;
		content:'1';
		width:.4rem;
		height:.4rem;
		line-height: .4rem;
		text-align: center;
		background-color: #12b7f5;
		border-radius: 50%;
		color:#fff;
        font-size: .24rem;
	}

	.share-step div p:last-child{
        padding-left:.2rem;
        font-size: .28rem;
        line-height: .4rem;
        color: #646464;
	}

	.share-step div p:last-child span{
		font-size: .28rem;
		color:#646464;
	}

    .share-step div:nth-child(3) a{
        color:#007aff;
    }

	.share-step div:last-child a{
       display: block;
       height: 1rem;
       line-height: 1rem;
       text-align: center;
       background-color: #13b7f6;
       color:#fff;
       font-size: .36rem;
       width:100%;
       border-radius: 10px;
       margin-top:.5rem;
	}
    .button{
        width: 7.02rem;
        margin: .86rem auto 0;
    }
</style>