<template>
	<div class="container">  
		<transition :name="transitionName" appear>
				<router-view></router-view>
		</transition>
		<Loading v-show="show"></Loading>
	</div>
</template>

<script>
	import Login   from './pages/login/login';
	import Loading from './components/loading/loading';
	export default {
		props:{
			show:{
				types: Boolean
			},
		},
	    data(){
	      return {
	        transitionName: 'slide-left'
	      }
	    },	
		watch: {
			'$route' (to, from) {		
				let toDepth = to.path.split('/').length;
				let fromDepth = from.path.split('/').length;
				this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
			}
		},
		components: {
			Login,
			Loading
		}
	}
</script>

<style>

	@import '../static/reset/reset.css';
	@import '../static/reset/public.css';
	@import '../static/reset/popup.css';

	/* 可以设置不同的进入和离开动画 */
	/* 设置持续时间和动画函数 */
	.slide-left-enter-active{
	  transition: all .3s ease;
	  transform :translate3d(0, 0, 0);
	}
	
	.slide-left-enter{
	  transform:translate3d(200%, 0, 0);
	}


	.slide-right-enter-active{
	  transition: all .3s ease;
	  transform :translate3d(0, 0, 0);	
	}

	.slide-right-enter{
	  transform:translate3d(-200%, 0, 0);		
	}
</style>
