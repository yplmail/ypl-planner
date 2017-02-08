<template>
  <div class="personal-content">
        <div class="personal-header clearfix">
          <div class="header-left">
                <div class="head-portrait">
                    <img src="../../static/images/mine/mine_header_icon.png" @click="download()">
                </div>
                <div class="personal-detail">
                  <p class="mobile">{{data.mobile | desensitization}}</p>
                  <p>
                      <span v-if="data.isBindBankCard">                      
                          <router-link :to="{name:'bindCardSuccess'}" class="idenfity">已认证</router-link>
                      </span>
                      <span v-else>
                        <router-link :to="{name:'setting'}" class="noIdenfity">未认证</router-link>
                      </span>
                  </p>
                </div>
                <div class="personal-msg">
                    <router-link :to="{name:'message'}">
                      <img src="static/images/mine/mine_msg_icon.png">
                      <span class="msg-count" :class="{'msg-beyond':data.personMsgCount > 99}" v-show="data.personMsgCount > 0 ">{{data.personMsgCount | beyond}}</span>
                    </router-link>    
                </div>         
          </div>

          <div class="header-right">
            <button class="button" @click="logout">退出</button>         
          </div>
        </div> 

        <div class="personal-account arrow">
            <router-link class="link-widthraw" :to="{name:'account'}">
                <p class="account-text">
                    <span>账户余额(元)</span>                
                    <i class="eye" :class="data.eyeClass" @click="operation()"></i>
                </p>

                <p class="account-money">
                    <span v-if='data.eyeClass=="open"'>
                    <span>{{data.accountBalance}}</span>
                    <img src="../../static/images/normal/question_icon.png" @click="download()">
                    </span>
                    <span v-else>
                    <span>******</span>
                    <img class="mask-q-icon" src="../../static/images/normal/question_icon.png" @click="download()">
                    </span>       
                </p>
            </router-link>
            <router-link class="widthdraw" :to="{name:'account'}">明细 / 提现</router-link>    
        </div> 

        <div class="customer-planner">
          <router-link class="arrow" :to="{name:'planner'}">
              我的客户/理财师团队 
          </router-link>
        </div> 

        <div class="router-nav">
            <ul>
                <li>
                  <router-link :to="{name: 'about'}">
                  <img src="../../static/images/mine/mine_about_icon.png" alt="">
                  <p>了解我们</p>
                </router-link>
                </li>

                <li>
                    <router-link :to="{name: 'guide'}">
                    <img src="../../static/images/mine/mine_user_icon.png" alt="">
                    <p>新手攻略</p>
                    </router-link>             
                </li>

                <li>
                    <router-link :to="{name: 'inviteClient'}">
                    <img src="../../static/images/mine/mine_rec_icon.png" alt="">
                    <p>邀请客户</p>
                    </router-link>
                </li>

                <li>
                  <router-link :to="{name: 'invitePlanner'}">
                      <img src="../../static/images/mine/mine_planner_icon.png" alt="">
                      <p>推荐理财师</p>
                   </router-link>
                </li>                        
            </ul>
        </div>  

        <div class="planner-product">
        <h1>理财师特供标</h1>
        <ul>
            <li class="product-info">
                <router-link :to="{name: 'detail', query:{productId:product.productId}}">
                    <div class="product-name clearfix">
                        <h2>{{product.orgName +'-'+product.productName}}</h2> 
                        <img v-if="product.tagListRightLength > 0 && product.tagListRight[0] == '复投'" src="../../static/images/mine/mine_user_agin.png">
                        <img v-else src="../../static/images/mine/mine_user_first.png">
                        <img v-show="product.tagListRightNewerLength > 0" src="../../static/images/mine/mine_user_logo.png"> 
                    </div>
                    <div class="product-detail">
                        <div class="detail-top clearfix">
                            <div>
                                <h3>年化佣金率</h3>
                                <p>{{product.feeRatio.toFixed(2)}}<span class="unit">%<span></p>
                            </div>

                            <div>
                                <h3>预期年化</h3>
                                <p>{{product.yearRate}}<span class="unit">%<span></p>
                            </div>
                            <div>
                                <h3>期限</h3>
                                <p>
                                  <span v-for="(text,index) in product.deadLineText" :class="index % 2 ? 'unit' : '' ">{{text | linksymbol}}</span>
                                </p>
                            </div>
                            <div>
                                <router-link :to="{name:'recommand',query: { productId: product.productId }}">
                                  <i v-if="product.cfpRecommend==0" class="recommand"></i>
                                  <i v-else class="recommand-agin"></i>
                                </router-link> 
                            </div>                                    
                        </div>

                        <div class="detail-bottom" v-show="product.isHaveProgress == 0">
                            <span class="progress">
                                <i class="percentage" :style="{width:product.percentage}"></i>
                            </span>
                            <span class="percentageText">
                                <span>已售{{product.percentage}}</span>
                            </span>
                        </div>
                    </div>

                    <div class="product-footer clearfix" v-show="product.tagListLength > 0">
                        <span v-for="item in product.tagList">{{item}}</span>
                    </div>
                </router-link> 
            </li>
        </ul>
        </div>
        <div style="width:100%;height:1.3rem;"></div>
        <div class="download">
            <!-- <router-link :to="{name:'download'}"> -->
                <a href="http://liecai.tophlc.com/pages/download/download.html">
                    <img src="../../static/images/mine/download.png" alt="去下载">
                </a>
            <!-- </router-link> -->
        </div>
  </div>
  </template>
<script>
  import Vue from 'vue';
  import service from "../resource/service";
  import Util from "../common/util";
  export default {
    data(){
      return {
         data : {
            'eyeClass'  : 'close'
         },
         product:{
          feeRatio: 0.00,
          yearRate : 0.00,
          orgName : '',
          productName : '',
          cfpRecommend : 0,
          deadLineText : []
         }
      };
    },
    created(){
        if(this.$route.query.tk){
            service.setCookie("__token__",this.$route.query.tk,2); 
        }

        service.serverRequest('minePage',(result)=>{
            service.setCookie("__mobile__",result.mobile,2);
            result['msgshow']  = result.personMsgCount * 1 > 0;
            result['eyeClass'] = sessionStorage.getItem('eyestatus') || 'open';
            this.data = result;
        })
        
        service.serverRequest('productClassifyPreference',{
            cateIdList : 2
            },(result)=>{
            this.product = this._filter(result.datas[0].productPageListResponse);
        }) 

        if(this.$route.query.code && this.$route.query.isPush){
            if(sessionStorage.getItem('__ISPUSHAPPID__') == null){
                sessionStorage.setItem('__ISPUSHAPPID__',true);        
                service.serverRequest('saveWeiXinOpenId',{
                    code  : this.$route.query.code,
                    isPush: this.$route.query.isPush            
                })
            }
        }

        service.serverRequest('activeToken',{
            token : service.getCookie("__token__")
        });   
    },
    methods:{
      download(){
        event.preventDefault();        
        Vue.popup.show({
          title: '温馨提示',
          msg  : '进入提现、收益明细、个人中心等更多操作，请下载APP体验完整版',
          btn : [{
            name: '取消',cb : function(){this.close()}
          },{
            name: '去下载',cb : function(){
               this.close();
               //location.hash = '#/download/download';
               location = "http://liecai.tophlc.com/pages/download/download.html";
               //window.open(location.protocol + '//'+location.hostname+'/#/download/download');
            }
          }]
        })         
      },
      operation(){
         event.preventDefault();
         if(this.data.eyeClass == 'open'){
            this.data.eyeClass = 'close';
            sessionStorage.setItem('eyestatus','close');
         }else{
            this.data.eyeClass = 'open';
            sessionStorage.setItem('eyestatus','open');
         }
      },
      logout(){
        Vue.popup.confirm({
            title: '',
            msg: '确定要退出登录吗?',
            cancelText: '取消', // 默认取消
            cancelCb: function(){
            },
            okText: '确认', // 默认确认
            okCb: function(){
                service.setCookie("__mobile__",'',-1);
                service.setCookie("__token__",'',-1); 
                location.hash = "#/login/login";    
            }
        });
      },
      _filter(data){
        if(data.isFlow == "1"){
            data.yearRate = data.flowMinRate.toFixed(2)
        }else{
            data.yearRate = data.flowMinRate.toFixed(2) + '~' + data.flowMaxRate.toFixed(2);
        }
        data.deadLineText = data.deadLineValueText.split(',');
        //是否显示产品进度
        if(data.isHaveProgress == "0"){
            if(data.buyTotalMoney - data.buyedTotalMoney < 0 ){
                data.percentage = 100 + '%';
            }else{
                data.buyedTotalMoney = data.buyedTotalMoney || 0;
                data.buyTotalMoney   = data.buyTotalMoney || 1;
                data.percentage      = parseInt(data.buyedTotalMoney/data.buyTotalMoney * 100) + "%";
            }
        }else{
            data.isHaveProgressClass  = '';
            data.percentage           = '';
        }


        if(data.tagList && data.tagList.length > 0){           
            data.tagListLength = data.tagList.length;
        }else{
            data.tagListLength = 0;
        }
        if(data.tagListRight && data.tagListRight.length > 0){
           data.tagListRightLength = data.tagListRight.length;
        }else{
           data.tagListRightLength = 0;
        }
  
        if(data.tagListRightNewer && data.tagListRightNewer.length > 0){
          data.tagListRightNewerLength  = data.tagListRightNewer.length;
        }else{
          data.tagListRightNewerLength = 0;
        }

        return data;
      }
    },
    filters :{
        beyond (value){
            if(value){
                if(value*1 > 99){
                    return "99+"
                }else{
                    return value;
                }
            }
        }
    }
  }
</script>

<style scoped>
    .personal-content{
        position: relative;
        height: 100%;
    }
    .personal-header {
        position: relative;
        height: 1.46rem;
        background-color: #fff;
        border-bottom: 1px solid #eee;
    }

    .personal-header .header-left{
        float: left;
        height:1.04rem;
        margin:.22rem 0 .22rem .24rem;
        display: flex;
    }

    .personal-header .head-portrait{
        flex: 1;        
    }

    .personal-header .head-portrait img{
        width: 1.04rem;      
    }

    .personal-header .personal-detail{
        margin-left:.25rem;
    }
    .personal-header .personal-msg{
        position: relative;
        padding-left: .24rem;
        padding-top: .1rem;
    }
    .personal-msg img{
        width: .37rem;
        height: .29rem;
    }
    .personal-msg a{
        display: block;
        position: relative;
        line-height: 0;
    }
    .personal-header .mobile{
        color: #646464;
        font-size: .33rem;
    }

    .personal-header .idenfity{
        display: inline-block;
        font-size: 0.22rem;
        color: #fff;
        background-color: #12b7f5;
        border-radius: 10px;
        padding: 0 8px;
    }

    .personal-header .noIdenfity{
        display: inline-block;
        font-size: 0.22rem;
        color: #fff;
        background-color: #dcdcdc;
        border-radius: 10px;
        padding: 0 8px;  
        cursor: pointer;    
    }

    .personal-header .header-right{
        position: relative;
        float: right;
        padding-right: .24rem;
        line-height: 1.46rem;
    }
    .personal-header .header-right button{
        border:1px solid #12b7f5;
        background-color: #fff;
        color:#12b7f5;
        font-size: .24rem;
        border-radius: 5px;
        padding:3px 10px;
    }

    .personal-header .header-right img{
        width:.48rem;
    }

    .personal-header .msg-count {
        position: absolute;
        top: -.15rem;
        left: .2rem;
        background-color: #fa3e3e;
        border-radius:50%;
        display: inline-block;
        width: .33rem;
        height: .33rem;
        line-height: .33rem;
        color: #fff;
        font-size: .2rem;
        text-align: center;
    }
    .personal-header .msg-beyond{
        font-size: .15rem;
    }

    .personal-account{
        position: relative;
        height: 1.98rem;
        background-color: #fff;
        margin-bottom:.25rem;
    }

    .personal-account .link-widthraw{
        width:100%;
    }

    .personal-account .account-text {
        padding:.4rem 0 0 .26rem;
        font-size: .27rem;
        color: #969696;
    }

    .personal-account .eye{
        display: inline-block;
        width: .38rem;
        height: .22rem;
        margin-left: .2rem;
        background-image : url(../../static/images/mine/mine_eye_open.png);
        background-repeat: no-repeat;
        background-size: contain;
        font-size: .27rem;
    }

    .personal-account .close {
        background-image: url(../../static/images/mine/mine_eye_close.png);
    }

    .personal-account .account-money {
        position: relative;
        padding-left: .26rem;
        color: #12b7f5;
        font-size: .7rem;
    }

    .personal-account .account-money a{
        position: absolute;
        display: inline;
    }

    .personal-account .account-money img{
        width: .33rem;
    }

    .personal-account .account-money img.mask-q-icon{
        vertical-align: .15rem;
    }

    .personal-account .widthdraw{
        position: absolute;
        top:.8rem;
        right:.6rem;
        font-size: .25rem;
        color:#969696;
    }    

    .customer-planner{
        background: #fff;
        height: .9rem;
        line-height: .9rem;
        margin: .26rem 0;
        color: #323232;
        font-size: .3rem;
        padding-left: .26rem;
    }

    .customer-planner a {
        display: block;
        padding-right: .4rem;
        color: #323232;
    }

    .router-nav {
        background-color: #fff;
        text-align: center;
        height: 1.55rem;
    }

    .router-nav ul {
        display: flex;
        height: 100%;
        width: 100%;
    }

    .router-nav ul li {
        flex: 1;
    }

    .router-nav ul li > a {
        display: block;
        height: 1.55rem;
        width: 100%;
    }

    .router-nav ul li a img {
        width: .4rem;
        margin-top: .4rem;
    }

    .router-nav ul li a p {
        color: #646464;
        margin-top: .1rem;
        font-size: .23rem
    }

    .planner-product{
        margin-top: .26rem;
        background-color: #fff;
    }

    .planner-product h1 {
        padding-left: .26rem;
        font-size: .32rem;
        color: #323232;
        line-height: .74rem;
        height: .74rem;
        border: 1px solid #eee;
    }

    .planner-product li {
        background-color: #fff;
    }

    .planner-product li > a {
        display: block;
    }

    .planner-product .product-name{
        margin: 0 .26rem;
    }

    .planner-product .product-name h2 {
        float: left;
        font-size: .28rem;
        height: .83rem;
        line-height: .83rem;
        width: 4.5rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color:#646464;
    }

    .planner-product .product-name img {
        float: right;
        width: .97rem;
        margin-left: .2rem;
        margin-top: -1px;
    }

    .planner-product .product-detail{
        position: relative;
        border-top: 1px dashed #eee;
        height: 2.08rem;
        overflow: hidden;
        margin: 0 .26rem;
    }

    .detail-top {
        margin: .3rem 0 .2rem 0;
    }

    .planner-product .detail-top > div {
        float: left;
    }

    .planner-product .detail-top > div:nth-child(1) {
        width: 25%;
    }

    .planner-product .detail-top > div:nth-child(2) {
        width: 35%;
    }

    .planner-product .detail-top > div:nth-child(3) {
        width: 25%;
        color: #323232;
    }

    .planner-product .detail-top > div:nth-child(4) {
        text-align: right;
        width: 15%;
    }

    .planner-product .detail-top .recommand {
        display: inline-block;
        width: .9rem;
        height: .9rem;
        background: url(../../static/images/mine/mine_recommand_icon.png) no-repeat;
        background-size: contain;
    }

    .planner-product .detail-top .recommand-agin {
        display: inline-block;
        width: .9rem;
        height: .9rem;
        background: url(../../static/images/mine/mine_recommand_agin.png) no-repeat;
        background-size: contain;
    }

    .planner-product .product-detail h3 {
        color: #969696;
        font-size: .24rem;
        line-height: 2em;
    }

    .planner-product .product-detail p {
        padding: .05rem 0;
        color: #12b7f5;
        font-size: .32rem;
        line-height: 1em;
    }
    .product-detail p >span :first-child{
        line-height: 1em;
    }
    .planner-product .product-detail p > span.unit{
        font-size: .2rem;
        line-height: 1.2em;
        vertical-align: bottom;
    }

    .planner-product .detail-top > div:nth-child(3) p {
        color: #323232;
    }

    .planner-product .detail-bottom {
        font-size: 0;
    }

    .planner-product .detail-bottom .progress {
        display: inline-block;
        width: 6.1rem;
        height: 5px;
        background-color: #dcdcdc;
        border-radius: 2.5px;
    }

    .planner-product .detail-bottom .percentage {
        display: inline-block;
        background-color: #10abe5;
        height: 5px;
        border-radius: 2.5px;
    }

    .planner-product .detail-bottom .percentageText {
        vertical-align: -2px;
        margin-left: .1rem;
        font-size: .16rem;
        color: #969696;
    }

    .planner-product .product-footer {
        height: .62rem;
        background-color: #fafafa;
        border-top: 1px dashed #eee;
        padding:.13rem .26rem 0;
    }

    .planner-product .product-footer span {
        float: left;
        box-sizing: content-box;
        color: #fe4747;
        font-size: .2rem;
        border: 1px solid #fe4747;
        border-radius: 100px;
        padding: 0 .1rem;
        height: .34rem;
        line-height: .34rem;
        margin-left: .1rem;
    }
    /* 底部下载 */
    .download{
        position:fixed;
        left: 0;
        right: 0;
        bottom: 0;
        max-width: 10rem;
        margin: 0 auto;
    }
</style>

