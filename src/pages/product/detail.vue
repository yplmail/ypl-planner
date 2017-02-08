<template>
    <div v-show="totalShow" class="detail-wrapper">
            <span class="newer" v-if="detail.newer"></span>
            <span class="repeat-buy" v-if="detail.buyIcon === 'repeat-buy'"></span>
            <span class="first-buy" v-if="detail.buyIcon === 'first-buy'" ></span>
            <div class="saleInfo-box clearfix">
                <ul class="saleInfo-top clearfix">
                    <li>
                        <p>年化收益</p>
                        <p class="rate-color">{{detail.yearRate}}<span>%</span></p>
                    </li>
                    <li>
                        <p>年化佣金</p>
                        <p>{{detail.feeRatio}}<span>%</span></p>                    
                    </li>
                </ul>
                <div class="saleInfo-middle" v-show="detail.isHaveProgress == '0'">
                    <div class="saleInfo-percent"><p class="percentagePro"></p></div>
                    <span class="pos">已售{{detail.percentage}}%</span>            
                </div>
                <div class="saleInfo-bottom" v-html="detail.tagListText"></div>
            </div>

            <div class="product-buy flex">
                <div class="oneFlex">
                    <p>产品期限</p>
                    <p v-html="detail.deadLineText"></p>
                </div>
                <div class="oneFlex">
                    <p>剩余额度（元）</p>
                    <p>{{detail.residualAmount}}</p>
                </div>
                <div class="oneFlex">
                    <p>购买人数</p>
                    <p>{{detail.buyedTotalPeople}}</p>
                </div>
            </div>
            <div class="incomeEvaluate">
              {{detail.incomeEvaluate}}
            </div>
            <div id="lvdun" class="lvdun clearfix">
              <router-link :to="{name : 'lvdun'}" class="lvdunSkip">
                <img src="../../../static/images/ProductDetail/lvdun.png">
                <p>律盾让投资更放心</p>
                <span>了解更多</span>
              </router-link>
            </div>

            <div class="product-info">
                <ul>
                    <li class="clearfix">
                        <p>产品总额</p>
                        <p>{{detail.buyTotalMoney}}元</p>
                    </li>
                    <li class="clearfix">
                        <p>还款方式</p>
                        <p>{{detail.repaymentWayText}}</p>
                    </li>
                    <li class="clearfix">
                        <p>起投金额</p>
                        <p>{{detail.buyMinMoney}}元</p>
                    </li>
                    <li class="clearfix">
                        <p>购买递增金额</p>
                        <p>{{detail.buyIncreaseMoney}}元</p>
                    </li>
                </ul>
            </div>

            <div class="product-detail" style="margin-top:.25rem;">
                <h2 v-on:click="detailIsShow" :class="detailArrow">产品详情</h2>
                <div class="intro-detail" v-show="detailShow" v-html="detail.productDesc"></div>
            </div>

            <div class="product-rule">
                <h2 :class="rulesArrow" @click="rulesIsShow">佣金计算规则</h2>
                <div class="commission-calculation-rules" v-show="rulesShow">
                    <div v-if="detail.buyIcon === 'first-buy'" >
                        <h2>首投标（右上角带“首投标”标签）</h2>
                        <p>只有用户首次投资该机构的产品时，才会产生佣金。佣金计算公式如下：</p>
                        <h3>佣金=投资金额×年化佣金率×投资期限／360</h3>
                        <p>投资金额大于佣金计算金额上限时，按佣金计算金额上限进行计算，否则按实际投资金额计算；投资期限大于佣金计算期限上限时，按佣金计算期限上限计算，否则按实际投资期限计算。</p>
                        <p>示例：某合作机构佣金计算金额上限为20000元，佣金计算期限上限为90天，首投年化佣金为2%。若客户购买50000元期限为6个月的产品，则佣金＝20000×2%×90/360＝100元</p>
                        <p>若产品可提前赎回或转让（带“可赎回”或“可转让”标签）则先计算锁定期佣金到理财师账户，锁定期后若用户继续持有该产品，则每天计算一次佣金到理财师账户，次月15日发放到理财师银行卡）。佣金计算公式如下：</p>
                        <h3>总佣金＝锁定期佣金＋N＊锁定期后每天佣金(N为锁定期后持有天数)</h3>
                        <p>示例：假设客户购买50000元期限12为个月，锁定期为90天，30天后可自由赎回，年化佣金为2%的产品，则锁定期佣金＝50000×2%×90/360=250元</p>
                        <p>90天后，用户每多持有该产品一天，理财师佣金增加量即锁定期后每天佣金＝50000×2%×1/360=2.78元</p>
                    </div>
                    <div v-if="detail.buyIcon === 'repeat-buy'">
                        <h2>复投标（右上角带“复投标”标签）</h2>
                        <p>用户每次购买，都会产生佣金。佣金计算公式如下</p>
                        <h3>佣金=销售金额×年化佣金率×产品期限／360</h3>
                        <p>示例：客户购买50000元期限为6个月(180天)、佣金为2%的产品，则佣金＝50000×2%×180/360＝500元</p>
                        <p>若产品可提前赎回或转让（带“可赎回”或“可转让”标签）则先计算锁定期佣金到理财师账户，锁定期后若用户继续持有该产品，则每天计算一次佣金到理财师账户，次月15日发放到理财师银行卡）。佣金计算公式如下：</p>
                        <h3>总佣金＝锁定期佣金＋N＊锁定期后每天佣金(N为锁定期后持有天数)</h3>
                        <p>示例：假设客户购买50000元期限12为个月，锁定期为90天，30天后可自由赎回，年化佣金为2%的产品，则锁定期佣金＝50000×2%×90/360=250元</p>
                        <p>90天后，用户每多持有该产品一天，理财师佣金增加量即锁定期后每天佣金＝50000×2%×1/360=2.78元</p>
                    </div>
                </div>  
            </div>

            <div id="orgInfo" class="org-info">
                <div id="forwardNativePage">
                    <img  id="platformLogo" :src="detail.orgIcon" :alt="detail.orgName">
                    <span id="orgName">{{detail.orgName}}</span>
                    <span id="orgAdvantage">{{detail.orgAdvantage}}</span>
                </div>
                <div class="details">
                    <ul>
                        <li class="flex">
                            <p class="oneFlex"><span>安全评级：</span><span id="orgLevel">{{detail.orgLevel}}</span></p>
                            <p class="oneFlex"><span>平台背景：</span><span id="orgBack">{{detail.orgBack}}</span></p>
                        </li>
                        <li class="flex">
                            <p class="oneFlex"><span>注册资本：</span><span id="capital">{{detail.capital}}</span></p>
                            <p class="oneFlex"><span>资金托管：</span><span id="trusteeship">{{detail.trusteeship}}</span></p>
                        </li>
                        <li class="flex">
                            <p class="oneFlex"><span>所在城市：</span><span id="city">{{detail.city}}</span></p>
                            <p class="oneFlex"><span>上线时间：</span><span id="upTime">{{detail.upTime}}</span></p>
                        </li>        
                        <li class="flex">
                            <p class="oneFlex"><span>ICP 备案：</span><span id="icp">{{detail.icp}}</span></p>
                        </li>        
                    </ul>           
                </div>
            </div>
            <div style="width:100%;height:1.29rem;"></div>
            <div class="footer clearfix">
                <div id="calculatorBox">
                  <router-link :to="{name : 'calculator',query:{productId:productId,feeRatio:detail.feeRatio}}">
                    <img src="../../../static/images/ProductDetail/calculator_icon.png">
                  </router-link> 
                </div>
                <div>
                  <router-link :to="{name : 'strategy',query:{orgNumber : orgInfoResponse.orgNo}}">
                      <img src="../../../static/images/ProductDetail/guide_icon.png">
                  </router-link>
                </div>
                <div id="buySelf" class="buySelf" @click="buySelf"><a>自己购买</a></div>      
                <div>
                  <router-link :to="{name:'recommand',query: { productId:productId }}">
                    {{detail.buttonText}}
                  </router-link>
                </div>
            </div>
    </div>
</template>
<script>
import service from '../../resource/service';
import Env from '../../resource/env';
import {environment,serverHost,imgHost} from '../../resource/config';
export default{
  name:"detail",
  data (){
    return {
      totalShow:false,
      rulesShow:false,
      detailShow:false,
      detailArrow:"arrow-down",
      rulesArrow:"arrow-down",
      productId:this.$route.query.productId,
      token: service.getCookie("__token__"),
      detail:{},
      buyUrl:"",
      orgInfoResponse:{},
    }
  },
  created (){
    var self = this;
    service.serverRequest('productDetail',{
      productId : self.productId,
    },(result)=>{
      self.detail = self.detailFilter(result);
      self.orgInfoResponse = self.detail.orgInfoResponse;
      self.totalShow = true;
    })
  },
  methods:{
    detailFilter (result){
      var self = this;
      result.feeRatio = result.feeRatio.toFixed(2);
      result.buttonText = '推荐给客户';
      //年化收益
      result.yearRate = result.isFlow == "1" ? result.flowMinRate.toFixed(2) : result.flowMinRate.toFixed(2) + '~' + result.flowMaxRate.toFixed(2);
      //产品期限
      var arr = result.deadLineValueText.split(',');
      //固定期限
      if(arr.length == 2){
          result.deadLineText = arr[0] + '<span class="unit">'+arr[1]+'</span>';
      }
      //浮动期限
      if(arr.length == 4){
         if(arr[1] == arr[3]) arr[1] = "";
         result.deadLineText = arr[0] + '<span class="unit">'+arr[1]+'</span>~'+ arr[2] +'<span class="unit">'+arr[3]+'</span>';
      }
      //是否显示产品销售进度
      if(result.isHaveProgress == "0"){
        result.residualAmount = (result.buyTotalMoney - result.buyedTotalMoney).toFixed(2);
        //产品购买占比
        if(result.residualAmount < 0){
          //如果为负数,就使用最大最小化处理，避免数据错误
          result.residualAmount  =  0;
          result.percentage      =  100;
        }else{
          result.buyedTotalMoney = result.buyedTotalMoney || 0;
          result.buyTotalMoney   = result.buyTotalMoney   || 1;
          result.percentage      = parseInt(result.buyedTotalMoney/result.buyTotalMoney * 100);
        }
      }else{
        //虚拟标，隐藏 剩余额度 、购买人数、产品总额
        result.virtualProduct = 'hidden';
      }
      result.buyTotalMoney = result.buyTotalMoney.toFixed(2);//產品購買總額
      result.orgIcon = Env.imgUrl +"/"+ result.orgInfoResponse.platformIco + "?f=png";
      //新手专享
      result.isNewer = "hidden";
      if(result.tagListRightNewer.length > 0){
          result.newText = result.tagListRightNewer[0];
          result.isNewer = "block";
      }
      var income = "";//收益
      if(result.orgInfoResponse && result.orgInfoResponse.orgFeeType == "1"){
        result.firstbuyClass  = "block";
        result.buyIcon   = "first-buy";       
        result.firstCommRules = "block";
        result.orgAmountLimit = result.orgInfoResponse.orgAmountLimit;
        result.orgInvestdeadlineLimit = result.orgInfoResponse.orgInvestdeadlineLimit;
        income = (result.orgInfoResponse.orgAmountLimit * result.deadLineMinValue * result.flowMinRate/100/360).toFixed(2);
        result.incomeEvaluate = "现在投资"+parseInt(result.orgInfoResponse.orgAmountLimit/10000)+"万元,"+result.deadLineMinValue+"天后收益"+income+"元";
      }else{
        result.firstbuyClass   = "hidden";
        result.buyIcon    = "repeat-buy";      
        result.repeatCommRules = "block";
        income = (100000 * result.deadLineMinValue * result.flowMinRate/100/360).toFixed(2);
        result.incomeEvaluate = "现在投资10万元,"+result.deadLineMinValue+"天后收益"+income+"元";
      }
      var tagArr = [];
      for(let tag in result.tagList){
        if(tag < 3){
          tagArr.push('<span class="item">'+result.tagList[tag].substr(0,8)+'</span>');
        }
      }
      result.tagListText = tagArr.join('');
      if(environment === "produce"){
        self.buyUrl = "https://www.toobei.com/app/pages/financing/product_detail.html?productId="+result.productId+"&productName="+result.productName + "&token=" + self.token
      }else{
        self.buyUrl = "https://pre.toobei.com/app/pages/financing/product_detail.html?productId="+result.productId+"&productName="+result.productName + "&token=" + self.token
      }
      if(result.cfpRecommend != '0'){
         result.buttonText = '推荐给客户';
      }
      if(result.tagListRightNewer && result.tagListRightNewer.length){
        result.newer = true;
      }
      //产品售罄
      if(result.status == '2'){
        result.percentage        = 100;
        result.buttonText        = '已售罄'
      }
      this.$el.getElementsByClassName('percentagePro')[0].style.width=result.percentage+"%";//百分比寬度
      for(let key in result.orgInfoResponse){
        result[key] = result.orgInfoResponse[key];
      }
      return result;
    },
    detailIsShow (){
      this.detailArrow= this.detailArrow === "arrow-down"?"arrow-up":"arrow-down";
      this.detailShow = !this.detailShow;
    },
    rulesIsShow (){
      this.rulesArrow= this.rulesArrow === "arrow-down"?"arrow-up":"arrow-down";
      this.rulesShow = !this.rulesShow;
    },
    buySelf (){
      var self =  this;
      const count = parseInt(localStorage.getItem('__gotoWebCount__') == null ? '0' : localStorage.getItem('__gotoWebCount__'));
      if(count >=3){
        location.href= self.buyUrl;
      }else{
        Vue.popup.confirm({
          msg: '猎财大师是理财师端，T呗是投资人端，购买产品需要跳转到T呗进行。是否确定跳转到T呗进行购买？',
          cancelText: '取消', // 默认取消
          okText: '确认', // 默认确认
          okCb: function(){
            localStorage.setItem('__gotoWebCount__',count + 1);
            location.href= self.buyUrl;
          }
        });
      }
    },

  }
}
</script>
<style scoped>
  .detail-wrapper{
    position: relative;
    height: 100%;
  }
  .redemption-box{
    text-align:center;
    background-color: #fff;
  }
  .newer{
    position: absolute;
    right: 1.23rem;
    top: 0;
    background: url('../../../static/images/mine/mine_user_logo.png') no-repeat center;
    background-size: 100% auto;
    width: .98rem;
    height: .46rem;
  }
  .first-buy{
    position: absolute;
    right:.12rem;
    top:0;
    z-index: 2;
    width:.98rem;
    height:.46rem;
    background:url('../../../static/images/mine/mine_user_first.png') no-repeat center;
    background-size: 100% auto;
  }
  .repeat-buy{
    position: absolute;
    background-color: #fec047;
    right:.12rem;
    top:0;
    z-index: 2;
    width:.98rem;
    height:.46rem;
    background:url('../../../static/images/mine/mine_user_agin.png') no-repeat center;
    background-size: 100% auto;
  }
  .redemption-box span{
    height:.28rem;
    display: inline-block;
    margin-bottom: .38rem;
    line-height: .28rem;
    padding: 0 .2rem;
    color:#fff;
    background-color: #fe4747;
    border-radius: .2rem;
    min-width: 1rem;
  }
  .saleInfo-box{
    padding:.25rem;
    background-color: #fff;
    overflow: hidden;
  }
  .saleInfo-top li:first-child{
    float: left;
    width: 3.75rem;
  }
  .saleInfo-top li:last-child{
    float: left;
    width: 3.25rem;
  }
  .saleInfo-box .saleInfo-top li{
      padding-bottom: .25rem;
  }
  .saleInfo-box .saleInfo-top li p{
    margin:.12rem 0;
    color:#969696;
    font-size: .25rem;
  }
  .saleInfo-box .saleInfo-top li p:last-child{
    color:#12b7f5;
    font-size: .5rem;
  }
  .saleInfo-box .saleInfo-top li p.rate-color {
      color:#646464;
      font-size: .5rem;
  }
  .saleInfo-box .saleInfo-top li p span{
    font-size: .25rem;
  }
  .saleInfo-box .saleInfo-middle{
    position: relative;
    height: .15rem;
  }
  .saleInfo-box .saleInfo-percent{
    position: relative;
    background-color: #dcdcdc;
    height:.06rem;
    width:85%;
    border-radius: 3px;
  }
  .saleInfo-box .saleInfo-percent > p{
    background-color: #12b7f5;
    border-radius: 3px;
    height:100%;
  }
  .saleInfo-box .saleInfo-middle .pos{
    position: absolute;
    right:0;
    top:-.09rem;
    font-size: .25rem;
    line-height: .25rem;
    color:#969696;
  }
  .saleInfo-box .saleInfo-bottom{
    margin:0.2rem 0 .1rem 0;
  }
  .product-buy{
    background-color: #fff;
    border-top:1px dashed #f1f1f1;
    border-bottom: 1px solid #dcdcdc;
    height:1.35rem;
    padding:.3rem 0;
    justify-content: space-around;
    align-items: center;
    text-align: center;
  }
  .product-buy > div{
    border-right: 1px solid #f1f1f1;
  }
  .product-buy > div > p:first-child{
      font-size: .25rem;
      margin-top: -.08rem;
      color:#969696;
  }
  .product-buy > div > p:last-child{
    font-size:.33rem;
    color: #39383c;
    padding-top:.1rem;
    line-height: .52rem;
  }
  .incomeEvaluate{
    width: 100%;
    height: .5rem;
    text-align: center;
    line-height: .5rem;
    background-color: #fff;
    color: #fd5353;
    font-size: .25rem;
  }
  .lvdun{
    height: .74rem;
    margin: .25rem 0;
    background-image: url("./../../../static/images/normal/arrow-more.png");
    background-repeat: no-repeat;
    background-color: #fff;
    background-position: 96% center;
    background-size:auto .16rem;
  }
  .lvdun a{
    display: block;
    height: 100%;
  }
  .lvdun img,
  .lvdun p{
    float: left;
  }
  .lvdun img{
    margin-left: .25rem;
    width: .5rem;
    padding-top: .12rem;
  }
  .lvdun p{
    padding-left: .2rem;
    line-height: .74rem;
    font-size: .29rem;
    color: #646464;
  }
  .lvdun span{
    float: right;
    padding-right:.62rem;
    line-height: .74rem;
    font-size: .27rem;
    color: #969696;
  }
  .product-info {
      margin-top: .15rem;
  }
  .product-info ul{
    background-color: #fff;
    padding:0 .25rem
  }
  .product-info ul li{
     height:.75rem;
     line-height: .75rem;
     border-bottom: 1px solid #f1f1f1;
  }
  .product-info ul li > p:first-child{
    float:left;
    font-size: .27rem;
    color:#969696;
  }
  .product-info ul li > p:last-child{
     float:right;
     padding-right:.14rem;
     color: #323232;
  }
  .product-detail,.product-org,.product-rule{
    position: relative;
    background-color: #fff;
  }
  .product-detail > h2,.product-org > h2,.product-rule > h2{
    height: .74rem;
    line-height: .74rem;
    font-size: .27rem;
    padding:0 .25rem;
    border-bottom: 1px solid #f1f1f1;
  }
  .intro-detail{
      padding:.25rem;
      color: #969696;
      font-size: .25rem;
      word-wrap: break-word;
      line-height: 1.8em;
      background-color: #fff;
  }
  .product-org li {
     line-height: .45rem;
     height: .45rem;
     padding:0 .14rem;
  }
  .product-org > ul{
     display: none;
  }

  .product-org li > p:first-child{
     float:left;
     width:1rem;
     color:#969696;
     text-align: left;
  }
  /*
  * 佣金計算規則
  */
  .product-rule .commission-calculation-rules{
    padding:.25rem;
  }
  .product-rule .commission-calculation-rules h2{
    line-height:1.8em;
    color:#646464;
    font-size: 0.31rem;
  }
  .product-rule .commission-calculation-rules h3{
    color:#646464;
    text-indent: .35rem;
    padding: 28px 0;
    font-size: 0.25rem;
  }
  .product-rule .commission-calculation-rules p{
    color:#969696;
    line-height:1.8em;
    font-size: 0.25rem;
  }
  /*
    * 底部
  */
  .footer{
    position: fixed;
    bottom:0;
    max-width: 10rem;
    margin: 0 auto;
     height:1.04rem;
     line-height: 1.04rem;
     color:#fff;
     text-align: center;
     font-size: .35rem;
     overflow: hidden;
     width:100%;
  }
  .footer > div{
    float:left;
    text-align: center;
  }
  .footer > div:first-child{
    width:20%;
    min-width:.7rem;
    height: 100%;
    background-color: #fff;
    border-right: solid #f1f1f1 1px;
  }
  .footer img{
    width:65%;
    vertical-align: middle;
  }
  .footer > div:nth-child(2){
    width:20%;
    height: 100%;
    min-width:.7rem;
    background-color: #fff;
  }
  .footer > div:nth-child(2) a{
    display: block;
    height:100%;
    width:100%;
  }
  .footer > div:nth-child(3){
    width: 30%;
    height: 100%;
    background-color: #49c7f7;
  }
  .footer > div:nth-child(3) a{
    display: block;
    color: #fff;
  }
  .footer > div:last-child{
    position: relative;
    float: left;
    background-color: #12b7f5;
    width:30%;
    height: 100%;
  }
  .footer > div:last-child a{
    display: block;
    color: #fff;
  }
  .footer .pos{
    position: absolute;
      width: 100%;
    font-size: .12rem;
    bottom: -5px;
  }
  .org-info{
    background-color: #fff;
    margin-top:.25rem;
    cursor: pointer;
  }
  .org-info > div:first-child{
    position: relative;
    padding:.3rem .25rem .25rem;
  }
  .org-info > div:first-child span{
    position: absolute;
  }
  .org-info #orgName{
    font-size: .25rem;
    padding-left:.25rem;
  }
  #platformLogo {
      width: .71rem;
  }
  .org-info #orgAdvantage{
    top:.77rem;
    margin-left:.25rem;
    border-radius: .5rem;
    color:#646464;
    font-size: .22rem;
  }
  .org-info .details ul{
    width: 100%;
    padding: 0 .25rem;
  }
  .org-info .details li {
    padding-top: .2rem;
  }
  .org-info .details li p{
    width: 0;
    font-size: .25rem;
  }
  .org-info .details li p > span:last-child{
    color: #323232;
  }
  .org-info .details li p > span:first-child{
    color:#969696;
  }
</style>
<style>
.saleInfo-bottom .item{
   display: inline-block;
   border:1px solid #fe4747;
   font-size: .2rem;
   color:#fe4747;
   height: .34rem;
   border-radius: 100px;
   line-height: .34rem;
   padding: 0 .15rem;
   margin-right: .15rem;
}
.product-buy .unit{
  display: inline-block;
  font-size:.24rem;
  color: #39383c;
  padding-left: .05rem;
  padding-bottom: .05rem;
 } 
</style>