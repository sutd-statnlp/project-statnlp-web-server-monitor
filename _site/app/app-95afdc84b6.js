!function(){"use strict";function t(t){t.initialize()}angular.module("statnlpApp",["ngResource","ngAria","ui.router","oc.lazyLoad","angular.filter"]).run(t),t.$inject=["stateHandler"]}(),function(){"use strict";function t(t,e){function a(){var a=t("",{},{get:{method:"GET",url:e.getEndpoint()+"/api/mem/virtual"}});return a}function n(){var a=t("",{},{get:{method:"GET",url:e.getEndpoint()+"/api/mem/swap"}});return a}var r={getVirtual:a,getSwap:n};return r}angular.module("statnlpApp").factory("MemoryService",t),t.$inject=["$resource","DataService"]}(),function(){"use strict";function t(t,e){function a(){var a=t("",{},{get:{method:"GET",url:e.getEndpoint()+"/api/load/average"}});return a}function n(){var a=t("",{},{get:{method:"GET",url:e.getEndpoint()+"/api/load/misc"}});return a}var r={getAverage:a,getMisc:n};return r}angular.module("statnlpApp").factory("LoadService",t),t.$inject=["$resource","DataService"]}(),function(){"use strict";function t(t,e){function a(){return l}function n(){return l[0]}function r(){for(var t=0;t<l.length;t++){var e=l[t];i(e)}}function i(t){var a=o+t.ip+s+"/api/runtime/goos";e.get(a,{}).then(function(e){t.status=!0},function(e){t.status=!1})}var o="http://",s=":8210",l=[{name:"StatNLP 0",ip:"172.18.240.110",status:!1},{name:"StatNLP 1",ip:"192.168.30.238",status:!1},{name:"StatNLP 3",ip:"192.168.30.231",status:!1},{name:"MLCluster 1",ip:"192.168.30.247",status:!1}];r();var c={httpSchema:o,port:s,getDefault:n,getAll:a};return c}angular.module("statnlpApp").factory("IpService",t),t.$inject=["$resource","$http"]}(),function(){"use strict";function t(t,e){function a(){var a=t("",{},{get:{method:"GET",isArray:!0,url:e.getEndpoint()+"/api/disk/usage"}});return a}var n={getUsage:a};return n}angular.module("statnlpApp").factory("DiskService",t),t.$inject=["$resource","DataService"]}(),function(){"use strict";function t(t,e,a){function n(){var t=l+c.ip+u;return t}function r(t){c=t,s()}function i(){return c}function o(t,a){var n=e.$on("notifying-service-event",a);t.$on("$destroy",n)}function s(){e.$emit("notifying-service-event")}var l=a.httpSchema,c=a.getDefault(),u=a.port,d={getEndpoint:n,setEndpointByIpOrDomain:r,subscribe:o,notify:s,getIpItem:i};return d}angular.module("statnlpApp").factory("DataService",t),t.$inject=["$resource","$rootScope","IpService"]}(),function(){"use strict";function t(t,e){function a(){var a=t("",{},{get:{method:"GET",isArray:!0,url:e.getEndpoint()+"/api/cpu/sum/percent"}});return a}function n(a){var n=t("",{},{get:{method:"GET",isArray:!0,url:e.getEndpoint()+"/api/cpu/sum/time"}});return n}var r={getSumPercent:a,getSumTime:n};return r}angular.module("statnlpApp").factory("CpuService",t),t.$inject=["$resource","DataService"]}(),function(){"use strict";function t(t,e,a){}angular.module("statnlpApp").controller("SidenavController",t),t.$inject=["$scope","$state","$ocLazyLoad"]}(),function(){"use strict";function t(t,e,a){}angular.module("statnlpApp").controller("PageLoadController",t),t.$inject=["$scope","$state","$ocLazyLoad"]}(),function(){"use strict";function t(t,e,a,n,r){function i(t,e){$(".m-menu-item").removeClass("m-item-active");var a=angular.element(t.currentTarget);a.addClass("m-item-active"),n.setEndpointByIpOrDomain(e)}a.load("js/admin.js");var o=this;o.pickServer=i,o.ips=r.getAll()}angular.module("statnlpApp").controller("NavbarController",t),t.$inject=["$scope","$state","$ocLazyLoad","DataService","IpService"]}(),function(){"use strict";function t(t){t.state("home",{parent:"app",url:"/",data:{authorities:[]},views:{"content@":{templateUrl:"app/home/home.html",controller:"HomeController",controllerAs:"vm"}}})}angular.module("statnlpApp").config(t),t.$inject=["$stateProvider"]}(),function(){"use strict";function t(t,e,a,n,r,i,o,s,l){function c(t){S.cpu={percent:0},S.memory={virtual:{used:0,usedPercent:0}},S.load={average:0,misc:{procsRunning:0}},S.isAutoRefresh=!1,E=null,x={plot:null,data:[]},C={plot:null,data:[]},!p()&&t&&$("#btn-noti-error").click(),A(),y()}function u(){p()||$("#btn-noti-error").click()}function d(){S.isAutoRefresh?E=s(function(){p()},800):s.cancel(E)}function p(){return!!l.getIpItem().status&&(v(),f(),m(),g(),!0)}function v(){function t(t){S.cpu.percent=t[0],b(t[0],x)}n.getSumPercent().get(t,h)}function f(){function t(t){S.memory.virtual.used=t.used,S.memory.virtual.usedPercent=t.usedPercent,b(t.usedPercent,C)}r.getVirtual().get(t,h)}function m(){function t(t){S.load.average=t.load1}o.getAverage().get(t,h)}function g(){function t(t){S.load.misc.procsRunning=t.procsRunning}o.getMisc().get(t,h)}function h(t){console.log(t)}function b(t,e){e.data.push(t);var a=e.data.length;a>100&&(e.data=e.data.slice(1));for(var n=[],r=0;r<a;++r)n.push([r,e.data[r]]);e.plot.setData([n]),e.plot.draw()}function A(){x.plot=$.plot("#cpu-chart",[x.data],{series:{shadowSize:0,color:"#03A9F4"},grid:{borderColor:"#81D4FA",borderWidth:1,tickColor:"#81D4FA"},lines:{fill:!0},yaxis:{min:0,max:100},xaxis:{min:0,max:100}})}function y(){C.plot=$.plot("#memory-chart",[C.data],{series:{shadowSize:0,color:"#03A9F4"},grid:{borderColor:"#81D4FA",borderWidth:1,tickColor:"#81D4FA"},lines:{fill:!0},yaxis:{min:0,max:100},xaxis:{min:0,max:100}})}a.load("js/pages/index.js");var S=this;S.cpu={percent:0},S.memory={virtual:{used:0,usedPercent:0}},S.load={average:0,misc:{procsRunning:0}},S.refresh=u,S.isAutoRefresh=!1,S.autoRefresh=d;var E=null,x={plot:null,data:[]},C={plot:null,data:[]};c(!1),l.subscribe(t,function(){c(!0)})}angular.module("statnlpApp").controller("HomeController",t),t.$inject=["$scope","$state","$ocLazyLoad","CpuService","MemoryService","DiskService","LoadService","$interval","DataService"]}(),function(){"use strict";function t(){function t(t,e){if(isNaN(e))return t;if(e<=0)return"";if(t){var a=t.split(/\s+/);a.length>e&&(t=a.slice(0,e).join(" ")+"...")}return t}return t}angular.module("statnlpApp").filter("words",t)}(),function(){"use strict";function t(){function t(t,e,a){if(isNaN(e))return t;if(e<=0)return"";if(t&&t.length>e){if(t=t.substring(0,e),a)for(;" "===t.charAt(t.length-1);)t=t.substr(0,t.length-1);else{var n=t.lastIndexOf(" ");n!==-1&&(t=t.substr(0,n))}return t+"..."}return t}return t}angular.module("statnlpApp").filter("characters",t)}(),function(){"use strict";function t(){function t(t,e,a,n){e.bind("click",function(){n.sort(a.jhSortBy)})}var e={restrict:"A",scope:!1,require:"^jhSort",link:t};return e}angular.module("statnlpApp").directive("jhSortBy",t)}(),function(){"use strict";function t(){var t={restrict:"A",scope:{predicate:"=jhSort",ascending:"=",callback:"&"},controller:e,controllerAs:"vm",bindToController:!0};return t}function e(t,e){function a(t){var e=t.find("span.glyphicon"),a="glyphicon-sort",n="glyphicon-sort-by-attributes",r="glyphicon-sort-by-attributes-alt",i=a+" "+r,s=n;o.ascending||(i=a+" "+n,s=r),o.resetClasses(),e.removeClass(i),e.addClass(s)}function n(){var t=e.find("span.glyphicon"),a="glyphicon-sort",n="glyphicon-sort-by-attributes",r="glyphicon-sort-by-attributes-alt";t.removeClass(n+" "+r),t.addClass(a)}function r(e){e!==o.predicate?o.ascending=!0:o.ascending=!o.ascending,o.predicate=e,t.$apply(),o.callback()}function i(t){o.resetClasses(),t&&"_score"!==t[0]&&o.applyClass(e.find("th[jh-sort-by='"+t[0]+"']"))}var o=this;o.applyClass=a,o.resetClasses=n,o.sort=r,o.triggerApply=i,t.$watchGroup(["vm.predicate","vm.ascending"],o.triggerApply),o.triggerApply()}angular.module("statnlpApp").directive("jhSort",t),e.$inject=["$scope","$element"]}(),function(){"use strict";function t(){function t(t){if(0===t.length)throw new Error("input must not be of zero length");var e=t.split(","),a={};return angular.forEach(e,function(t){var e=t.split(">;");if(2!==e.length)throw new Error('section could not be split on ">;"');var n=e[0].replace(/<(.*)/,"$1").trim(),r={};n.replace(new RegExp("([^?=&]+)(=([^&]*))?","g"),function(t,e,a,n){r[e]=n});var i=r.page;angular.isString(i)&&(i=parseInt(i));var o=e[1].replace(/rel="(.*)"/,"$1").trim();a[o]=i}),a}var e={parse:t};return e}angular.module("statnlpApp").factory("ParseLinks",t)}(),function(){"use strict";angular.module("statnlpApp").constant("errorConstants",function(){var t="http://www.jhipster.tech/problem";return{EMAIL_ALREADY_USED_TYPE:t+"/email-already-used",LOGIN_ALREADY_USED_TYPE:t+"/login-already-used",EMAIL_NOT_FOUND_TYPE:t+"/email-not-found"}}())}(),function(){"use strict";function t(t){function e(t){return t?new Date(t):null}function a(t){if(t){var e=t.split("-");return new Date(e[0],e[1]-1,e[2])}return null}function n(e){return e?t("date")(e,"yyyy-MM-dd"):null}function r(){return"yyyy-MM-dd"}var i={convertDateTimeFromServer:e,convertLocalDateFromServer:a,convertLocalDateToServer:n,dateformat:r};return i}angular.module("statnlpApp").factory("DateUtils",t),t.$inject=["$filter"]}(),function(){"use strict";function t(t){function e(t){return angular.isString(t)?t.length<30?t:t?t.substring(0,15)+"..."+t.slice(-10):"":""}function a(t){function e(t,e){return e.indexOf(t,e.length-t.length)!==-1}function a(t){return e("==",t)?2:e("=",t)?1:0}function n(t){return t.length/4*3-a(t)}function r(t){return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g," ")+" bytes"}return angular.isString(t)?r(n(t)):""}function n(e,a){t.open("data:"+e+";base64,"+a,"_blank","height=300,width=400")}function r(t,e){var a=new FileReader;a.readAsDataURL(t),a.onload=function(t){var a=t.target.result.substr(t.target.result.indexOf("base64,")+"base64,".length);e(a)}}var i={abbreviate:e,byteSize:a,openFile:n,toBase64:r};return i}angular.module("statnlpApp").factory("DataUtils",t),t.$inject=["$window"]}(),function(){"use strict";function t(){function t(t){return null!==t&&(t=t.toLowerCase(),t=t.substring(0,1).toUpperCase()+t.substring(1)),t}return t}angular.module("statnlpApp").filter("capitalize",t)}(),function(){"use strict";function t(){function t(t){for(var e,n,r,i,o,s,l,c="",u=0;u<t.length;)e=t.charCodeAt(u++),n=t.charCodeAt(u++),r=t.charCodeAt(u++),i=e>>2,o=(3&e)<<4|n>>4,s=(15&n)<<2|r>>6,l=63&r,isNaN(n)?s=l=64:isNaN(r)&&(l=64),c=c+a.charAt(i)+a.charAt(o)+a.charAt(s)+a.charAt(l);return c}function e(t){var e,n,r,i,o,s,l,c="",u=0;for(t=t.replace(/[^A-Za-z0-9\+\/\=]/g,"");u<t.length;)i=a.indexOf(t.charAt(u++)),o=a.indexOf(t.charAt(u++)),s=a.indexOf(t.charAt(u++)),l=a.indexOf(t.charAt(u++)),e=i<<2|o>>4,n=(15&o)<<4|s>>2,r=(3&s)<<6|l,c+=String.fromCharCode(e),64!==s&&(c+=String.fromCharCode(n)),64!==l&&(c+=String.fromCharCode(r));return c}var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",n={decode:e,encode:t};return n}angular.module("statnlpApp").factory("Base64",t)}(),function(){"use strict";function t(t,e,a,n){function r(){t.VERSION=n;var e=t.$on("$stateChangeStart",function(e,n,r,i){t.toState=n,t.toStateParams=r,t.fromState=i,n.external&&(e.preventDefault(),a.open(n.url,"_self"))}),r=t.$on("$stateChangeSuccess",function(t,e,n,r,i){var o="StatNLP Monitor";e.data.pageTitle&&(o=e.data.pageTitle),a.document.title=o});t.$on("$destroy",function(){angular.isDefined(e)&&null!==e&&e(),angular.isDefined(r)&&null!==r&&r()})}return{initialize:r}}angular.module("statnlpApp").factory("stateHandler",t),t.$inject=["$rootScope","$state","$window","VERSION"]}(),function(){"use strict";function t(t,e){t.otherwise("/"),e.type("boolean",{name:"boolean",decode:function(t){return t===!0||"true"===t},encode:function(t){return t?1:0},equals:function(t,e){return this.is(t)&&t===e},is:function(t){return[!0,!1,0,1].indexOf(t)>=0},pattern:/bool|true|0|1/})}angular.module("statnlpApp").config(t),t.$inject=["$urlRouterProvider","$urlMatcherFactoryProvider"]}(),function(){"use strict";function t(t,e){t.debugInfoEnabled(e)}angular.module("statnlpApp").config(t),t.$inject=["$compileProvider","DEBUG_INFO_ENABLED"]}(),function(){"use strict";function t(t){t.state("app",{abstract:!0,views:{navbar:{templateUrl:"app/layouts/navbar/navbar.html",controller:"NavbarController",controllerAs:"vm"},pageload:{templateUrl:"app/layouts/pageload/pageload.html",controller:"PageLoadController",controllerAs:"vm"},sidenav:{templateUrl:"app/layouts/sidenav/sidenav.html",controller:"SidenavController",controllerAs:"vm"}}})}angular.module("statnlpApp").config(t),t.$inject=["$stateProvider"]}(),function(){"use strict";angular.module("statnlpApp").constant("VERSION","0.0.1-SNAPSHOT").constant("DEBUG_INFO_ENABLED",!1).constant("BUILD_TIMESTAMP",1517994228021)}(),function(){angular.module("statnlpApp").run(["$templateCache",function(t){t.put("app/home/home.html",'<div class="container-fluid"><div class="block-header row"><div class="col-lg-6 col-md-6 col-sm-3 col-xs-6"><button ng-disabled="vm.isAutoRefresh" ng-click="vm.refresh()" type="button" class="btn btn-primary btn-circle-lg waves-effect waves-circle waves-float"><i class="material-icons">refresh</i></button></div><div class="col-lg-6 col-md-6 col-sm-3 col-xs-6 text-right"><div class="demo-switch-title">AUTO REFRESH</div><div class="switch"><label><input type="checkbox" ng-model="vm.isAutoRefresh" ng-change="vm.autoRefresh()"> <span class="lever switch-col-blue"></span></label></div></div></div><!-- Widgets --><div class="row clearfix"><div class="col-lg-3 col-md-3 col-sm-6 col-xs-12"><div class="info-box hover-zoom-effect"><div class="icon bg-blue"><i class="material-icons">developer_board</i></div><div class="content"><div class="text">CPU USAGE</div><div class="number">{{vm.cpu.percent | number: 0}} %</div></div></div></div><div class="col-lg-3 col-md-3 col-sm-6 col-xs-12"><div class="info-box hover-zoom-effect"><div class="icon bg-blue"><i class="material-icons">memory</i></div><div class="content"><div class="text">MEMORY USAGE</div><div class="number">{{vm.memory.virtual.usedPercent | number : 4}}</div></div></div></div><div class="col-lg-3 col-md-3 col-sm-6 col-xs-12"><div class="info-box hover-zoom-effect"><div class="icon bg-blue"><i class="material-icons">power_input</i></div><div class="content"><div class="text">LOAD ONE</div><div class="number">{{vm.load.average}}</div></div></div></div><div class="col-lg-3 col-md-3 col-sm-6 col-xs-12"><div class="info-box hover-zoom-effect"><div class="icon bg-blue"><i class="material-icons">graphic_eq</i></div><div class="content"><div class="text">MISC RUNNING</div><div class="number">{{vm.load.misc.procsRunning}}</div></div></div></div></div><!-- CPU Usage --><div class="row clearfix"><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"><div class="card"><div class="header"><div class="row clearfix"><div class="col-xs-12 col-sm-6"><h2>CPU USAGE (%)</h2></div></div></div><div class="body"><div id="cpu-chart" class="dashboard-flot-chart"></div></div></div></div></div><!-- Memory Usage --><div class="row clearfix"><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"><div class="card"><div class="header"><div class="row clearfix"><div class="col-xs-12 col-sm-6"><h2>Memory USAGE (%)</h2></div></div></div><div class="body"><div id="memory-chart" class="dashboard-flot-chart"></div></div></div></div></div></div>'),t.put("app/layouts/navbar/navbar.html",'<nav class="navbar m-navbar"><div class="container-fluid"><div class="navbar-header"><a href="javascript:void(0);" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false"></a> <a href="javascript:void(0);" class="bars"></a> <a class="navbar-brand" href="index.html"><strong>STATNLP MONITOR</strong></a></div><div class="collapse navbar-collapse" id="navbar-collapse"><ul class="nav navbar-nav navbar-right"><!-- Call Search --><!-- #END# Call Search --><!-- Notifications --><li class="dropdown"><a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button"><i class="material-icons">poll</i></a><ul class="dropdown-menu"><li class="header">STATNLP SERVERS</li><li class="body"><ul class="menu"><li ng-repeat="item in vm.ips" class="m-menu-item" ng-click="vm.pickServer($event,item)"><a href="javascript:void(0);"><div class="icon-circle {{item.status ? \'bg-light-green\' : \'bg-danger\'}}"><i class="material-icons">dns</i></div><div class="menu-info"><h4>{{item.name}} - {{item.ip}}</h4><p><i class="material-icons">{{item.status ? \'done\' : \'close\'}}</i> {{item.status ? \'Available\' : \'Not Available\'}}</p></div></a></li></ul></li></ul></li><!-- #END# Notifications --><!-- Tasks --></ul></div></div></nav>'),t.put("app/layouts/pageload/pageload.html",'<div class="page-loader-wrapper"><div class="loader"><div class="preloader"><div class="spinner-layer pl-blue"><div class="circle-clipper left"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div><p>Please wait...</p></div></div>'),t.put("app/layouts/sidenav/sidenav.html",'<aside id="leftsidebar" class="sidebar"><!-- Menu --><div class="menu"><ul class="list"><li class="active"><a href="/"><i class="material-icons">dashboard</i> <span>Dashboard</span></a></li></ul></div><!-- #Menu --></aside>')}])}();