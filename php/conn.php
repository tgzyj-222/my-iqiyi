<?php

//头文件设置中文编码
header('content-type:text/html;charset=utf-8');
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');

// 连接数据库
define('HOST','localhost'); //主机名  或 127.0.0.1
define('USERNAME','root'); // 用户名
define('PASSWORD','');   //密码
define('DBNAME','product'); //数据库名称

$conn=@new mysqli(HOST,USERNAME,PASSWORD,DBNAME);  //连接数据库
//@：容错处理，错误信息不显示。
if($conn->connect_error){  //如果村咋错误，输出错误
    die('数据库来连接错误,错误信息：'.$conn->connect_error);
}

$conn->query('SET NAMES UTF8');



?>