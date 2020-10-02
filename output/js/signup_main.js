"use strict";

console.log("signup_main.js加载成功！");
require.config({
  waitSeconds: 100,
  paths: {
    "jquery": "jquery-1.11.3.min",
    "jquery_cookie": "jquery.cookie",
    "signup": "signup",
    "input_ver": "input_verification"
  },
  shim: {
    "jquery_cookie": { deps: ["jquery"] },
    "signup": { deps: ["jquery", "input_ver"] }
  }
});
console.log("signup_main.js准备执行");
require(["jquery", "signup"], function ($, SU) {
  console.log("signup_main.js开始执行");
  SU.check();
  SU.s_i_v(); //signup_input_verification
  SU.s_v(); //signup_verification
  SU.end();
  console.log("signup_main.js执行结束");
});