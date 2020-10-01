define(function(){
  //手机号的验证
  //邮箱的验证
  //用户名的验证
  //密码的验证
  //接受数据并按要求验证
  function verification(type,data){
    let reult = "";
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