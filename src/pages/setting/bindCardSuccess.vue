<template>
  <div class="bind">
    <div class="bind-top">
      <img src="../../../static/images/bind/bind_success.png">
      <p>您已成功绑定银行卡</p>
    </div>
    <ul>
      <li class="clearfix">
        <span>姓名</span><span>{{bindCardMsg.userName}}</span>
      </li>
      <li class="clearfix">
        <span>身份证</span><span>{{bindCardMsg.idCard | numFilter}}</span>
      </li>
      <li class="clearfix">
        <span>银行</span><span>{{bindCardMsg.bankName}}</span>
      </li>
      <li class="clearfix">
        <span>卡号</span><span>{{bindCardMsg.bankCard | numFilter}}</span>
      </li>
    </ul>

    <div class="reminder">
      <h2>温馨提示</h2>
      <p>为保障资金安全，每位用户仅可添加一张银行卡，资金进出将都通过该银行卡进行，绑定成功后不支持修改。如需更换，请联系客服<a href="tel:400-888-6987">400-888-6987</a></p>
    </div>    
  </div>
</template>
<script>
import service from '../../resource/service';
import Vue from 'vue'
Vue.filter('numFilter',(num)=>{
  if(num) {
    var str = '';
    var len = num.length;
    if( num.length > 8 ){
      str = num.substring(0,4);
      for(let i = 4; i < len - 4; i++){
        if(i != 4 && i%4 === 0){
          str +=' *';
        }else{
          str +='*';
        }
      }
      str += num.substring(len-4,len);
    }else{
      str = num;
    }
    return str;
  } 
});
export default {
  data () {
    return {
      bindCardMsg:{},
    }
  },
  created (){
    var self = this;
    service.serverRequest('getUserBindCard',(result)=>{
      self.bindCardMsg = result;
    })
  }
}
</script>
<style scoped>
.bind{
  text-align: center;
}
.bind-top{
  padding: 0 .5rem;
  background-color: #fff;
  margin-bottom: .25rem;
}
.bind img{
  width: 1.56rem;
  padding-top: .5rem;
}
.bind p{
  padding-top: .34rem;
  font-size: .33rem;
  color: #323232;
  padding-bottom: .5rem;
  margin-bottom: .25rem;
}
ul{
  padding-left: .25rem;
  box-sizing: border-box;
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #dcdcdc;
}
li{
  height: .9rem;
  border-bottom: 1px solid #dcdcdc;
  line-height: .9rem;
  text-align:left;
}
li:last-child{
  border-bottom: 0;
}
li span{
  float: left;
  font-size: .33rem;
}
li span:first-child{
  width: 1.84rem;
  color: #323232;
}
li span:last-child{
  color: #646464;
}
.reminder{
  margin:1rem 0 .2rem .25rem;
  color:#646464;
  text-align: left;
}
.reminder h2{
  font-size:.28rem;
  line-height:1.5em;
}
.reminder p{
  padding:0;
  font-size:.28rem;
  line-height:1.5em;
}
.reminder a{
  color:#007aff;
}
</style>
