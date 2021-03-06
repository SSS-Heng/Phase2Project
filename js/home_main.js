console.log("home_main.js加载成功！");
require.config({
  waitSeconds: 100,
  paths:{
    "jquery":"jquery-1.11.3.min",
    "jquery_cookie":"jquery.cookie",
    "home":"home",
    "home_insert":"home_insert",
    "home_behavior":"home_behavior",
    "small_cart":"small_cart"
  },
  shim:{
    "jquery_cookie":{deps:["jquery"]},
    "home":{deps:["home_insert","jquery","home_behavior"]},
    "home_insert":{deps:["jquery"]},
    "home_behavior":{deps:["jquery"]},
    "small_cart":{deps:["jquery","jquery_cookie"]}
  }
})
console.log("home_main.js准备执行");
require(["jquery","home","small_cart"],function($,H,SC){
  console.log("home_main.js开始执行");
  H.check();
  H.ins();
  H.beh();
  SC.s_c();
  SC.d_g();
  H.end();
  console.log("home_main.js执行结束");
})