<?php
  header("Content-type:text/html;charset=utf-8");
  //模拟官方的返回，生成对应的内容
  $responseData = array("code" => 0, "msg" => "");
  //将数据取出
  $username = $_POST['username'];
  $password = $_POST['password'];
  $createtime = $_POST['createTime'];
  $email = $_POST['email'] || null;
  $tel = $_POST['tel'] || null;
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
  if(!$email && !$tel){
    $responseData['code'] = 3;
    $responseData['msg'] = "手机号和邮箱至少一个不能为空";
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
  //5、准备sql语句
  $sql = "SELECT * FROM account WHERE username='{$username}'";
  //6、发送sql语句
  $res = mysql_query($sql);
  //7、取出一行
  $row = mysqli_fetch_assoc($res);
  if($row){
    $responseData['code'] = 5;
    $responseData['msg'] = "用户名已存在";
    echo json_encode($responseData);
    exit;
  }
  //8、验证数据库是否已有邮箱
  if($email){
    $sql = "SELECT * FROM account WHERE email='{$email}'";
    $res = mysql_query($sql);
    $row = mysqli_fetch_assoc($res);
    if($row){
      $responseData['code'] = 6;
      $responseData['msg'] = "邮箱已注册";
      echo json_encode($responseData);
      exit;
    }
  }
  //9、验证数据库是否已有手机号
  if($tel){
    $sql = "SELECT * FROM account WHERE tel='{$tel}'";
    $res = mysql_query($sql);
    $row = mysqli_fetch_assoc($res);
    if($row){
      $responseData['code'] = 7;
      $responseData['msg'] = "手机号已注册";
      echo json_encode($responseData);
      exit;
    }
  }
  $password = md5(md5(md5($password)."smartisan")."qingdao");
  //10、注册
  $sql2 = "INSERT INTO users(username,email,tel,password,createtime) VALUES('{$username}','{$email}','{$tel}','{$password}',{$createtime})";
  $res = mysql_query($sql2);
  if(!$res){
    $responseData['code'] = 8;
    $responseData['msg'] = "注册失败";
    echo json_encode($responseData);
    exit;
  }
  $responseData['msg'] = "注册成功";
  echo json_encode($responseData);
  //11、关闭数据库
  mysqli_close($link);
?>
