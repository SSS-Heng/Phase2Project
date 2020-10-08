"use strict";

console.log("goods_main.js加载成功！");
require.config({
  waitSeconds: 100,
  paths: {
    "jquery": "jquery-1.11.3.min",
    "jquery_cookie": "jquery.cookie",
    "goods": "goods",
    "small_cart": "small_cart"
  },
  shim: {
    "jquery_cookie": { deps: ["jquery"] },
    "goods": { deps: ["small_cart", "jquery", "jquery_cookie"] },
    "small_cart": { deps: ["jquery", "jquery_cookie"] }
  }
});
console.log("goods_main.js准备执行");
require(["jquery", "goods", "small_cart"], function ($, G, SC) {
  console.log("goods_main.js开始执行");
  G.check();
  G.n_i();
  G.n_s();
  G.g_i();
  G.a_g();
  G.m_g();
  G.behavior();
  SC.s_c();
  SC.d_g();
  G.end();
  console.log("goods_main.js执行结束");
});