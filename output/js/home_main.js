"use strict";

console.log("home.js加载执行成功！");
require.config({
  paths: {
    "jquery": "jquery-1.11.3.min.js",
    "jquery_cookie": "jquery.cookie.js"
  },
  shim: {
    "jquery_cookie": { deps: ["jquery"] },
    "home": { deps: ["home_insert", "jquery", "home_behavior"] },
    "home_insert": { deps: ["jquery"] },
    "home_behavior": { deps: ["jquery"] }
  }
});
require(["jquery", "home"], function ($, H) {
  H.ins();
  H.beh();
});