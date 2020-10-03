"use strict";

define(["jquery", "input_ver"], function ($, IV) {
  function check() {
    console.log("signup.js开始执行");
  }
  function end() {
    console.log("signup.js执行结束");
  }
  function button_abled(isYes) {
    if (isYes[0] && isYes[1] && (isYes[2] || isYes[3])) {
      $(".btn.btn_primary").removeClass("disabled");
    } else {
      $(".btn.btn_primary").addClass("disabled");
    }
  }
  //页面注册输入验证
  function signup_input_verification() {
    var isYes = [false, false, false, false]; //按钮是否可用
    //用户名的验证
    $("input.username").blur(function () {
      var value = $("input.username").val();
      var span_node = $("input.username").nextAll("span");
      var input_parent = $("input.username").parents('div.input');
      var result = null;
      if (span_node.length == 0) {
        console.log("用户名提示信息节点获取错误");
      }
      if (input_parent.length != 1) {
        console.log("用户名输入框的父节点获取错误");
      }
      //先隐藏所有的错误信息
      for (var i = 0; i < span_node.length; i++) {
        span_node.eq(i).removeClass("input_error");
      }
      $(".u_format_ok").removeClass("input_ok");
      input_parent.removeClass("invalid");
      //调用函数验证IV.verify(type,data);
      result = IV.verify("username", value);
      if (result == "false") {
        isYes[0] = false;
      } else if (result == "u_format_error") {
        isYes[0] = false;
        $("." + result).addClass("input_error");
        input_parent.addClass("invalid");
      } else if (result == "u_format_ok") {
        isYes[0] = true;
        $("." + result).addClass("input_ok");
      } else {
        isYes[0] = false;
        console.log("$(\"input.username\").blur() is error,result : " + result);
      }
      button_abled(isYes);
    });
    //邮箱的验证
    $("input.email").blur(function () {
      var value = $("input.email").val();
      var span_node = $("input.email").nextAll("span");
      var input_parent = $("input.email").parents('div.input');
      var result = null;
      if (span_node.length == 0) {
        console.log("邮箱提示信息节点获取错误");
      }
      if (input_parent.length != 1) {
        console.log("邮箱输入框的父节点获取错误");
      }
      //先隐藏所有的错误信息
      for (var i = 0; i < span_node.length; i++) {
        span_node.eq(i).removeClass("input_error");
      }
      $(".e_format_ok").removeClass("input_ok");
      input_parent.removeClass("invalid");
      //调用函数验证IV.verify(type,data);
      result = IV.verify("email", value);
      if (result == "false") {
        isYes[2] = false;
      } else if (result == "e_format_error") {
        isYes[2] = false;
        $("." + result).addClass("input_error");
        input_parent.addClass("invalid");
      } else if (result == "e_format_ok") {
        isYes[2] = true;
        $("." + result).addClass("input_ok");
      } else {
        isYes[2] = false;
        console.log("$(\"input.email\").blur() is error,result : " + result);
      }
      button_abled(isYes);
    });
    //手机号的验证
    $("input.tel").blur(function () {
      var value = $("input.tel").val();
      var span_node = $("input.tel").nextAll("span");
      var input_parent = $("input.tel").parents('div.input');
      var result = null;
      if (span_node.length == 0) {
        console.log("手机号提示信息节点获取错误");
      }
      if (input_parent.length != 1) {
        console.log("手机号输入框的父节点获取错误");
      }
      //先隐藏所有的错误信息
      for (var i = 0; i < span_node.length; i++) {
        span_node.eq(i).removeClass("input_error");
      }
      $(".t_format_ok").removeClass("input_ok");
      input_parent.removeClass("invalid");
      //调用函数验证IV.verify(type,data);
      result = IV.verify("tel", value);
      if (result == "false") {
        isYes[3] = false;
      } else if (result == "t_format_error") {
        isYes[3] = false;
        $("." + result).addClass("input_error");
        input_parent.addClass("invalid");
      } else if (result == "t_format_ok") {
        isYes[3] = true;
        $("." + result).addClass("input_ok");
      } else {
        isYes[3] = false;
        console.log("$(\"input.tel\").blur() is error,result : " + result);
      }
      button_abled(isYes);
    });
    //密码的验证
    $("input.password").blur(function () {
      var value = $("input.password").val();
      var span_node = $("input.password").nextAll("span");
      var input_parent = $("input.password").parents('div.input');
      var result = null;
      if (span_node.length == 0) {
        console.log("密码提示信息节点获取错误");
      }
      if (input_parent.length != 1) {
        console.log("密码输入框的父节点获取错误");
      }
      //先隐藏所有的错误信息
      for (var i = 0; i < span_node.length; i++) {
        span_node.eq(i).removeClass("input_error").removeClass("input_ok");
      }
      input_parent.removeClass("invalid");
      //调用函数验证IV.verify(type,data);
      result = IV.verify("password", value);
      if (result == "false") {
        isYes[1] = false;
      } else if (result == "p_format_error") {
        isYes[1] = false;
        $("." + result).addClass("input_error");
        input_parent.addClass("invalid");
      } else if (result == "p_strength_low") {
        isYes[1] = true;
        $("." + result).addClass("input_ok");
      } else if (result == "p_strength_middle") {
        isYes[1] = true;
        $("." + result).addClass("input_ok");
      } else if (result == "p_strength_high") {
        isYes[1] = true;
        $("." + result).addClass("input_ok");
      } else {
        isYes[1] = false;
        console.log("$(\"input.password\").blur() is error,result : " + result);
      }
      button_abled(isYes);
    });
  }
  //注册页面登录验证
  function signup_verification() {
    $(".submit").click(function (e) {
      e.preventDefault();
      var value_username = $("input.username").val();
      var value_email = $("input.email").val();
      var value_tel = $("input.tel").val();
      var value_pwd = $("input.password").val();
      if (!value_username) {
        $(".btn.btn_primary").addClass("disabled");
        $(".u_required").addClass("input_error").parents('div.input').addClass("invalid");
      }
      if (!value_email && !value_tel) {
        $(".btn.btn_primary").addClass("disabled");
        $(".t_required").addClass("input_error").parents('div.input').addClass("invalid");
        $(".e_required").addClass("input_error").parents('div.input').addClass("invalid");
      }
      if (!value_pwd) {
        $(".btn.btn_primary").addClass("disabled");
        $(".p_required").addClass("input_error").parents('div.input').addClass("invalid");
      }
      //用ajax请求验证
      if (value_pwd && value_username && (value_email || value_tel)) {
        var time = new Date();
        var createTime = "" + time.getFullYear() + "-" + double_num(time.getMonth() + 1) + "-" + double_num(time.getDate()) + " " + double_num(time.getHours()) + ":" + double_num(time.getMinutes()) + ":" + double_num(time.getSeconds());
        $.ajax({
          type: "POST",
          url: "http://127.0.0.1:80/smartisan/signup.php",
          data: {
            username: value_username,
            email: value_email,
            tel: value_tel,
            password: value_pwd,
            createTime: createTime
          },
          success: function success(msg) {
            var obj = $.parseJSON(msg);
            console.log(obj.msg);
            if (obj.code == 5) {
              //用户名已存在
              $(".u_already_exist").addClass("input_error");
            } else if (obj.code == 6) {
              //邮箱已注册
              $(".e_already_exist").addClass("input_error");
            } else if (obj.code == 7) {
              //手机号已注册
              $(".t_already_exist").addClass("input_error");
            } else if (obj.code == 8) {
              //注册失败
              alert("网络异常，注册失败！请稍后重试。");
            } else {
              alert("注册成功！");
            }
          },
          error: function error(msg) {
            console.log(msg);
          }
        });
      } else {
        console.log("存在空的input，无法联网注册");
      }
    });
  }
  function double_num(num) {
    if (num <= 9) {
      return "0" + num;
    } else {
      return "" + num;
    }
  }
  return {
    check: check,
    s_i_v: signup_input_verification,
    s_v: signup_verification,
    end: end
  };
});