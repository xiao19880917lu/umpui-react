<?php
/***************************************************************************
 * 
 * Copyright (c) 2016 Baidu.com, Inc. All Rights Reserved
 * 
 **************************************************************************/

/**
 * @file 文件上传组件后台测试文件
 * @author wujie08@baidu.com
 * @date 2016/03/28 14:12:27
 * @brief 
 *  
 **/
//获取上传成功的文件的临时存储地址
var_dump($_FILES['files']['tmp_name'][0]);
//获取上传成功的文件内容
var_dump(file_get_contents($_FILES['files']['tmp_name'][0]));
//将上传成功的文件信息存入'/tmp/test.txt'中
file_put_contents('/tmp/test.txt', json_encode($_FILES['files']), FILE_APPEND);
file_put_contents('/tmp/test.txt', '\r\n', FILE_APPEND);
?>
