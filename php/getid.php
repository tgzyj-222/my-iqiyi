<?php

include "conn.php";

if(isset($_GET['id'])){
    $id=$_GET['id'];
    $result=$conn->query("select * from iqiyi where id=$id");
    echo json_encode($result->fetch_assoc());
}else{
    exit('非法操作');
}
?>