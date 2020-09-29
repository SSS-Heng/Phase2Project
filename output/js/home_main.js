"use strict";

console.log("home_main.js加载成功！");
require.config({
  waitSeconds: 100,
  paths: {
    "jquery": "jquery-1.11.3.min",
    "jquery_cookie": "jquery.cookie",
    "home": "home",
    "home_insert": "home_insert",
    "home_behavior": "home_behavior"
  },
  shim: {
    "jquery_cookie": { deps: ["jquery"] },
    "home": { deps: ["home_insert", "jquery", "home_behavior"] },
    "home_insert": { deps: ["jquery"] },
    "home_behavior": { deps: ["jquery"] }
  }
});
console.log("home_main.js准备执行");
require(["jquery", "home"], function ($, H) {
  console.log("home_main.js开始执行");
  H.check();
  H.ins();
  H.beh();
  H.end();
  console.log("home_main.js执行结束");
});