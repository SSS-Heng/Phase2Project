"use strict";

define(["jquery", "input_ver"], function ($, IV) {
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
        span_node.eq(i).removeClass("input_error");
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
    $(".checkbox").click(function () {
      if ($(".checkbox.checked").size()) {
        $(".checkbox.checked").removeClass("checked");
      } else {
        $(".checkbox").addClass("checked");
      }
    });
    $(".submit").click(function (e) {
      e.preventDefault();
      var value_username = $("input.username").val();
      var value_pwd = $("input.password").val();
      if (!value_username) {
        $(".btn.btn_primary").addClass("disabled");
        $(".u_required").addClass("input_error").parents('div.input').addClass("invalid");
      }
      if (!value_pwd) {
        $(".btn.btn_primary").addClass("disabled");
        $(".p_required").addClass("input_error").parents('div.input').addClass("invalid");
      }
      //用ajax请求验证
      if (value_pwd && value_username) {
        $.ajax({
          type: "POST",
          url: "http://127.0.0.1:80/smartisan/signin.php",
          data: {
            username: value_username,
            password: value_pwd
          },
          success: function success(msg) {
            var obj = $.parseJSON(msg);
            console.log(obj.msg);
            if (obj.code == 5) {
              $(".p_error").addClass("input_error");
            } else if (obj.code == 6) {
              $(".u_not_exist").addClass("input_error");
            } else {
              alert("登录成功！");
            }
          },
          error: function error(msg) {
            console.log(msg);
          }
        });
      } else {
        console.log("存在空的input，无法联网验证登录");
      }
    });
  }
  return {
    check: check,
    s_i_v: signin_input_verification,
    s_v: signin_verification,
    end: end
  };
});