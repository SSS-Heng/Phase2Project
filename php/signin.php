<?php
  header("Content-type:text/html;charset=utf-8");
  //模拟官方的返回，生成对应的内容
  $responseData = array("code" => 0, "msg" => "");
  //将数据取出
  $username = $_POST['username'];
  $password = $_POST['password'];
   //初步的判断
  if(!$username){
    $responseData['code'] = 1;
    $responseData['msg'] = "用户名不能为空";
    echo json_encode($responseData);
    exit;
  }
  if(!$password){
    $responseData['code'] = 2;
    $responseData['msg'] = "密码不能为空";
    echo json_encode($responseData);
    exit;
  }
  //验证数据库是否有同名的用户
  //1、链接数据库
  $link = mysql_connect("127.0.0.1", "root", "123456");
  //2、判断数据库是否链接成功
  if(!$link){
    $responseData['code'] = 4;
    $responseData['msg'] = "服务器忙";
    echo json_encode($responseData);
    exit;
  }
  //3、设置访问字符集
  mysql_set_charset("utf8");
  //4、选择数据库
  mysql_select_db("smartisan");
  //5、准备sql username password 是否能够登陆成功
  $password = md5(md5(md5($password)."smartisan")."qingdao");
  $sql1 = "SELECT * FROM account WHERE tel='{$username}' OR email='{$username}'";
  $sql2 = "SELECT * FROM account WHERE (tel='{$username}' OR email='{$username}') AND password='{$password}'";
  //6、发送sql语句
  $res1 = mysql_query($sql1);
  $row1 = mysql_fetch_assoc($res1);
  if($row1){
    $res2 = mysql_query($sql2);
    $row2 = mysql_fetch_assoc($res2);
  }else{
    $responseData['code'] = 6;
    $responseData['msg'] = "手机号/邮箱未注册";
    echo json_encode($responseData);
    exit;
  }
  if($row2){
    $responseData['msg'] = "登陆成功";
    echo json_encode($responseData);
  }else{
    $responseData['code'] = 5;
    $responseData['msg'] = "密码错误";
    echo json_encode($responseData);
    exit;
  }
  mysql_close($link);
?>