"use strict";

define(["jquery", "input_verification"], function ($, IV) {
  function check() {
    console.log("signin.js开始执行");
  }
  function end() {
    console.log("signin.js执行结束");
  }
  //登录页面输入验证
  function signin_input_verification() {
    var isYes = false; //按钮是否可用
    //手机号/邮箱的验证
    $("input.username").blur(function () {
      var value = $("input.username").val();
      var span_node = $("input.username").nextAll("span");
      //先隐藏所有的错误信息
      for (var i = 0; i < span_node.length; i++) {
        span_node[i].removeClass("input_error");
      }
      //调用函数验证IV.verify(type,data);
    });
  }
  //登录页面登录验证
  function signin_verification() {}
  return {
    check: check,
    s_i_v: signin_input_verification,
    s_v: signin_verification,
    end: end
  };
});