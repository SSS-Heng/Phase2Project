"use strict";

console.log("signin_main.js加载成功！");
require.config({
  waitSeconds: 100,
  paths: {
    "jquery": "jquery-1.11.3.min",
    "jquery_cookie": "jquery.cookie",
    "signin": "signin",
    "input_ver": "input_verification"
  },
  shim: {
    "jquery_cookie": { deps: ["jquery"] },
    "signin": { deps: ["jquery", "input_ver"] }
  }
});
console.log("signin_main.js准备执行");
require(["jquery", "signin"], function ($, SI) {
  console.log("signin_main.js开始执行");
  SI.check();
  SI.s_i_v(); //signin_input_verification
  SI.s_v(); //signin_verification
  SI.end();
  console.log("signin_main.js执行结束");
});