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
    var isYes = [false, false]; //按钮是否可用
    //手机号/邮箱的验证
    $("input.username").blur(function () {
      var value = $("input.username").val();
      var span_node = $("input.username").nextAll("span");
      var input_parent = $("input.username").parents('div.input');
      var result = null;
      if (span_node.length == 0) {
        console.log("提示信息节点获取错误");
      }
      if (input_parent.length != 1) {
        console.log("输入框的父节点获取错误");
      }
      //先隐藏所有的错误信息
      for (var i = 0; i < span_node.length; i++) {
        span_node[i].removeClass("input_error");
      }
      input_parent.removeClass("invalid");
      //调用函数验证IV.verify(type,data);
      result = IV.verify("telAndEmail", value);
      if (result == "false") {
        isYes[0] = false;
      } else if (result == "u_format_error") {
        isYes[0] = false;
        $("." + result).addClass("input_error");
        input_parent.addClass("invalid");
      } else if (result == "u_format_ok") {
        isYes[0] = true;
      } else {
        isYes[0] = false;
        console.log("$(\"input.username\").blur() is error,result : " + result);
      }
      if (isYes[0] && isYes[1]) {
        $(".btn.btn_primary").removeClass("disabled");
      } else {
        $(".btn.btn_primary").addClass("disabled");
      }
    });
    //密码的验证
    $("input.password").blur(function () {
      var value = $("input.password").val();
      isYes[1] = value ? true : false;
      if (isYes[0] && isYes[1]) {
        $(".btn.btn_primary").removeClass("disabled");
      } else {
        $(".btn.btn_primary").addClass("disabled");
      }
    });
  }
  //登录页面登录验证
  function signin_verification() {
    $(".submit").click(function (e) {
      e.preventDefault();
      var value_username = $("input.username").val();
      var value_pwd = $("input.password").val();
      //用ajax请求验证
    });
  }
  return {
    check: check,
    s_i_v: signin_input_verification,
    s_v: signin_verification,
    end: end
  };
});