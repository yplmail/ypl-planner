import Vue from 'vue';
import App from './App';
import Directive from './common/directive';
import VueRouter from './common/router';
import Popup from './components/popup/vue-popup';
import {environment,serverHost,imgHost} from './resource/config';

Vue.use(Popup);

let vm = new Vue({
	el         : '#app',
	template   : '<App :show="show"/>',
	data       : {show:false},
	router     : VueRouter,
	components : {App}
});

Vue.http.interceptors.push((request, next)=>{
	vm.show = true
	next((response) => {
		vm.show = false
		return response
	});
}); 



