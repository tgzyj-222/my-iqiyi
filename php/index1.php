<?php
header('content-type:text/html;charset=utf-8');
//引入php文件
include "conn.php";

// $conn->query('SET NAMES UTF-8');




$result=$conn->query("SELECT * FROM iqiyi");


$arrdata=array();
for($i=0;$i<$result->num_rows;$i++){
    $arrdata[$i]=$result->fetch_assoc();//将取出的数组，当做另外一个数组的数组项。形成二维数组。
}
echo json_encode($arrdata);


?>