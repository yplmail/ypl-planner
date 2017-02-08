import Vue from 'vue';
import VueRouter from 'vue-router';
import {titles} from "./vuex";
import service from "../resource/service";
import {environment} from  '../resource/config';
import Mine from    '../pages/mine/mine.vue';
import Detail from  '../pages/product/detail.vue';
import Login from   '../pages/login/login.vue';
import Setting from '../pages/setting/bind.vue';
import About from   '../pages/about/about.vue';
import Message from '../pages/message/msg.vue';
import Planner from '../pages/planner/planner.vue';
import Guide from   '../pages/guide/guide.vue';
import InviteClient from  '../pages/invite/inviteClient.vue';
import InvitePlanner from  '../pages/invite/invitePlanner.vue';
import InvitePlannerRule from  '../pages/invite/invitePlannerRule.vue';
import Recommand from '../pages/recommand/recommand.vue';
import Download from '../pages/download/download.vue';
import Account from '../pages/account/account.vue';
import BindCardSuccess from '../pages/setting/bindCardSuccess.vue';
import Calculator from '../pages/product/calculator.vue';
import Strategy from '../pages/product/strategy.vue';
import Register from '../pages/register/register.vue';
import Register2 from '../pages/register/register2.vue';
import ServiceAgreement from '../pages/agreement/service.vue';
import Lvdun from '../pages/activities/lvdun.vue';
Vue.use(VueRouter)

const routes = [{
    path: '/', 
    component: Login,
    redirect: function(){
        if(service.getCookie("__token__")){
            return '/mine';
        }else{
            return '/login/login';
        }         
    }
  },{
    name:'login',
    path:'/login/login',
    component: Login
  },{
    name:'mine',
    path: '/mine', 
    component: Mine
  },{
    name: 'setting',
    path: '/setting/bind',
    component: Setting
  },{
    name : 'bindCardSuccess',
    path : '/setting/bindCardSuccess',
    component : BindCardSuccess
  },{
    name:'about',
    path : '/about/about',
    component: About
  },{
    name:'detail',
    path : '/product/detail',
    component : Detail
  },{
    name : 'calculator',
    path : '/product/calculator',
    component : Calculator
  },{
    name : 'strategy',
    path : '/product/strategy',
    component : Strategy   
  },{
    name:'message',
    path : '/message/msg',
    component : Message
  },{
    name:'widthdraw',
    path : '/widthdraw/widthdraw',
    component : Message
  },{
    name:'planner',
    path : '/planner/planner',
    component : Planner 
  },{
    name:'guide',
    path : '/guide/guide',
    component : Guide         
  },{
    name:'inviteClient',
    path : '/invite/inviteClient',
    component : InviteClient         
  },{
    name:'invitePlanner',
    path : '/invite/invitePlanner',
    component : InvitePlanner         
  },{
    name:'invitePlannerRule',
    path : '/invite/invitePlannerRule',
    component : InvitePlannerRule   
  },{
    name:'recommand',
    path : '/recommand/recommand',
    component : Recommand        
  },{
    name:'account',
    path : '/account/account',
    component : Account       
  },{
    name :'register',
    path : '/register/register',
    component : Register            
  },{
    name : 'register2',
    path : '/register/register2',
    component : Register2
  },{
    name : "serviceAgreement",
    path : '/agreement/service',
    component : ServiceAgreement            
  },{
    name : 'lvdun',
    path : '/activities/lvdun',
    component : Lvdun
  },
]

const router = new VueRouter({routes});

router.afterEach(route => {   

    if(titles[route.name]){
        title(titles[route.name]);
    }

    if(environment === 'produce'){
        statics();
    }
})

function title(str){
    document.title = str;
    var iframe = document.createElement("iframe");
    iframe.style.display="none";
    iframe.setAttribute("src", "../favicon.ico");
    document.body.appendChild(iframe);  
    iframe.onload = function(){
        setTimeout(function(){
            document.body.removeChild(iframe);
        }, 0);        
    }
}

function statics(){
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?c4003e7e22aa87aad1636556dc3bc76c";
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
}

export default router
