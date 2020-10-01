define(function(){
  //手机号的验证
  function tel_check(data){
    let tel_reg = /^\d{11}$/;
    return tel_reg.test(data);
  }
  //邮箱的验证
  function email_check(data){
    let email_reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email_reg.test(data);
  }
  //用户名的验证
  function username_check(data){
    let username_reg = /^[_a-zA-Z0-9\u4e00-\u9fa5]{1,10}$/;
    return username_reg.test(data);
  }
  //密码的验证
  function password_check(data){
    let strength_high_reg = /^\S*(?=\S{6,18})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*?_])\S*$/;
    let strength_low_reg = /^(\d|[a-zA-Z]){6,18}$/;
    let format_error_reg = /[^0-9a-zA-Z!@#$%^&*?_]+/;
    if(format_error_reg.test(data)){
      return 0;
    }else if(strength_high_reg.test(data)){
      return 3;
    }else if(strength_low_reg.test(data)){
      return 1;
    }else{
      return 2;
    }
  }
  //接受数据并按要求验证
  function verification(type,data){
    let result = "";
    let mark = null;
    if(!data){
      result = "false";
      return result;
    }
    if(type == "tel"){
      console.log("input_verification.js正在验证手机号");
      mark = tel_check(data);
      result = mark? "t_format_ok":"t_format_error";
    }else if(type = "email"){
      console.log("input_verification.js正在验证邮箱");
      mark = email_check(data);
      result = mark? "e_format_ok":"e_format_error";
    }else if(type = "username"){
      console.log("input_verification.js正在验证用户名");
      mark = username_check(data);
      result = mark? "u_format_ok":"u_format_error";
    }else if(type = "telAndEmail"){
      console.log("input_verification.js正在验证手机号/邮箱");
      mark = tel_check(data)||email_check(data);
      result = mark? "u_format_ok":"u_format_error";
    }else if(type = "password"){
      console.log("input_verification.js正在验证密码");
      mark = password_check(data);
      result = [
        "p_format_error",
        "p_strength_low",
        "p_strength_middle",
        "p_strength_high"
      ][mark];
    }else{
      result = "false";
      console.log(`input_verification.js : The type(${type}) does not exist`);
    }
    return result;
  }
  return {
    verify:verification
  };
});