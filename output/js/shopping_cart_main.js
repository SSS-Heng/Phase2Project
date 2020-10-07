"use strict";

console.log("shopping_cart_main.js加载成功！");
require.config({
  waitSeconds: 100,
  paths: {
    "jquery": "jquery-1.11.3.min",
    "jquery_cookie": "jquery.cookie",
    "shopping_cart": "shopping_cart"
  },
  shim: {
    "jquery_cookie": { deps: ["jquery"] },
    "shopping_cart": { deps: ["jquery", "jquery_cookie"] }
  }
});
console.log("shopping_cart_main.js准备执行");
require(["jquery", "shopping_cart"], function ($, Shop) {
  console.log("shopping_cart_main.js开始执行");
  Shop.check();
  Shop.c_m();
  Shop.c_o();
  Shop.end();
  console.log("shopping_cart_main.js执行结束");
});