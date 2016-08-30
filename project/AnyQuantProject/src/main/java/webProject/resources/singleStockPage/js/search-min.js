var app=angular.module("myApp",[]);app.controller("SearchCtrl",function(k,h,i){k.url="http://115.159.97.98/php/serviceController.php";var e=new Date();e.getFullYear();e.getMonth();e.getDate();var a=""+e.getFullYear()+"-0"+(e.getMonth()+1)+"-"+e.getDate();var g=new Date();g.setDate(g.getDate()-60);var f=g.getMonth()+1;var j=g.getDate();if(f<10){f="0"+f}if(j<10){j="0"+j}var b=g.getFullYear()+"-"+f+"-"+j;h.post(k.url,{name:localStorage.singleStockID,startdate:b,enddate:a,method:"getStockAmongDateService"}).success(function(n){k.error=false;k.data=n;k.tableData=n;var q=new Array();var p=0;var d=[];for(var r in k.tableData){p++}var l=[];for(var r in k.tableData){if(r<p-1){q[r]=new Array;q[r][0]=k.tableData[r].date;q[r][1]=k.tableData[r].open;q[r][2]=k.tableData[r].high;q[r][3]=k.tableData[r].low;q[r][4]=k.tableData[r].close;q[r][5]=k.tableData[r].volumn;q[r][6]=k.tableData[r].adj_price;q[r][7]=k.tableData[r].pb;l[r]=k.tableData[r].color}}var o=q;var s=l;var m=0;$(document).ready(function(){var t=[];$("#mytable").DataTable({data:o,createdRow:function(u){$("td",u).eq(3).css("color","green");$("td",u).eq(2).css("color","red");$("td",u).eq(1).css("color",s[m]);m++},columns:[{title:"日期"},{title:"开盘价"},{title:"最高价"},{title:"最低价"},{title:"收盘价"},{title:"成交量"},{title:"后复权价"},{title:"市净率"}]})})});h.post(k.url,{startdate:b,enddate:a,name:localStorage.singleStockID,method:"getDayLineService"}).success(function(o,l){k.status=l;k.data=o;k.dayKLineResult=o;var n=o;var d=0;for(var m in n){d++}d=d-2;k.result=n[d];k.stockName=k.result.stock_name;k.showResult="日期: "+k.result.date+"   股票名: "+k.result.stock_name+"   开盘价: "+k.result.open+"   收盘价: "+k.result.close+"   最高价: "+k.result.high+"   最低价: "+k.result.low+"   成交量: "+k.result.volumn+"   市盈率: "+k.result.adj_price+"   市净率: "+k.result.pb+"   行业名: "+k.result.industry;h.post(k.url,{username:localStorage.userName,name:localStorage.singleStockID,date:k.result.date,method:"getStockByNameService"}).success(function(r,p){var q=r;if(localStorage.userName==""){k.favorStateContent="关注"}else{if(q[0].favor){k.favorStateContent="取消关注"}else{k.favorStateContent="关注"}}if(q.state=="open"){k.openState=""}else{k.openState="(已停盘)"}}).error(function(q,p){k.data=q||"Request failed";k.status=p})}).error(function(l,d){k.data=l||"Request failed";k.status=d});g=new Date();g.setDate(g.getDate()-100);f=g.getMonth()+1;j=g.getDate();if(f<10){f="0"+f}if(j<10){j="0"+j}b=g.getFullYear()+"-"+f+"-"+j;h.post(k.url,{startdate:b,enddate:a,name:localStorage.singleStockID,method:"getWeekLineService"}).success(function(l,d){k.weekKLineResult=l}).error(function(l,d){k.data=l||"Request failed";k.status=d});var c={headers:{Authorization:"Bearer e3943f512c19291ea5b9f45971a5f9861b2d0e33874f420d639a39da1f35bcea","Access-Control-Allow-Origin":"*"},data:{field:"",publishBeginTime:"20160509100000",publishEndTime:"20160520000000"}};h.get("https://api.wmcloud.com/data/v1/api/subject/getThemesByNewsTimeLF.json",c).success(function(l,d){k.news=l;console.log(k.news)}).error(function(l,d){k.data=l||"Request failed";k.status=d});h.post(k.url,{name:localStorage.singleStockID,method:"getFavorNumByStockService"}).success(function(d){k.favorNum=d;document.getElementById("hotNum").innerText=k.favorNum[0].favornum}).error(function(l,d){k.data=l||"Request failed";k.status=d});g=new Date();g.setDate(g.getDate()-200);f=g.getMonth()+1;j=g.getDate();if(f<10){f="0"+f}if(j<10){j="0"+j}b=g.getFullYear()+"-"+f+"-"+j;h.post(k.url,{startdate:b,enddate:a,name:localStorage.singleStockID,method:"getMonthLineService"}).success(function(l,d){k.monthKLineResult=l}).error(function(l,d){k.data=l||"Request failed";k.status=d});k.favorStateContent="关注";k.favorButtonHandle=function(){if(k.favorStateContent=="关注"){if(localStorage.userName==""){$.extend($.gritter.options,{time:4000});$("#gritter-notice-wrapper").attr("class","");$.extend($.gritter.options,{position:""+$(this).attr("id")+""});$.gritter.options.position="bottom-right";$.gritter.add({title:$(this).find("span.title").text(),text:"您好！</br>请先返回主页登录"})}else{document.getElementById("favorState").innerText="取消关注";k.favorStateContent="取消关注";h.post(k.url,{username:localStorage.userName,name:localStorage.singleStockID,method:"addMyFavorService"}).success(function(l,d){k.status=d;k.data=l}).error(function(l,d){k.data=l||"Request failed";k.status=d})}}else{document.getElementById("favorState").innerText="关注";k.favorStateContent="关注";h.post(k.url,{username:localStorage.userName,name:localStorage.singleStockID,method:"cancelMyFavorService"}).success(function(l,d){k.status=d;k.data=l}).error(function(l,d){k.data=l||"Request failed";k.status=d})}};k.filterDateHandle=function(){b=document.getElementById("startfilter").value;var m=document.getElementById("endfilter").value;console.log(b);var l=new Date(b);var d=new Date(m);if(Date.parse(l)<=Date.parse(d)){h.post(k.url,{startdate:b,enddate:m,name:localStorage.singleStockID,method:"getDayLineService"}).success(function(o,n){k.status=n;k.data=o;k.dayKLineResult=o;tabChanged(tabFlag)}).error(function(o,n){k.data=o||"Request failed";k.status=n});h.post(k.url,{startdate:b,enddate:m,name:localStorage.singleStockID,method:"getWeekLineService"}).success(function(o,n){k.weekKLineResult=o}).error(function(o,n){k.data=o||"Request failed";k.status=n});h.post(k.url,{startdate:b,enddate:m,name:localStorage.singleStockID,method:"getMonthLineService"}).success(function(o,n){k.monthKLineResult=o}).error(function(o,n){k.data=o||"Request failed";k.status=n})}else{alert("日期区间错误:筛选的起始日期应该早于或等于结束日期")}};k.test={"0":{date:"2015-01-01",stock_name:"浦发银行",open:"15.69",high:"15.69",low:"15.69",close:"15.69",volumn:"0",adj_price:"14.9942",turnover:"0",pe_ttm:"0",pb:"0",industry:"银行"},"1":{date:"2015-01-04",stock_name:"浦发银行",open:"15.94",high:"16.25",low:"15.56",close:"16.07",volumn:"513568700",adj_price:"15.35735",turnover:"0",pe_ttm:"6.530156",pb:"1.295751",industry:"银行"},"2":{date:"2015-01-05",stock_name:"浦发银行",open:"16",high:"16.68",low:"15.82",close:"16.13",volumn:"511684500",adj_price:"15.41469",turnover:"0",pe_ttm:"6.55454",pb:"1.300589",industry:"银行"},"3":{date:"2015-01-06",stock_name:"浦发银行",open:"15.9",high:"16.17",low:"15.53",close:"15.81",volumn:"385716800",adj_price:"15.10888",turnover:"0",pe_ttm:"6.424504",pb:"1.274787",industry:"银行"},"4":{date:"2015-01-07",stock_name:"浦发银行",open:"15.87",high:"15.88",low:"15.2",close:"15.25",volumn:"330627100",adj_price:"14.57371",turnover:"0",pe_ttm:"6.196942",pb:"1.229632",industry:"银行"},"5":{date:"2015-01-08",stock_name:"浦发银行",open:"15.2",high:"16.25",low:"15.11",close:"15.43",volumn:"491999900",adj_price:"14.74573",turnover:"0",pe_ttm:"6.270084",pb:"1.244146",industry:"银行"},retmsg:"success"}});app.factory("MyCache",function(a){return a("myCache")});