<?php
$filename =$title .'导出数据.xls';
header("Cache-Control: must-revalidate,post-check=0,pre-check=0");
header("Content-Type:application/force-download");
header('Content-type:application/vnd.ms-excel');
header("Content-Disposition: attachment;filename=\"$filename\"");
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>issssssw</title>
</head>
<body>
<?php
$tbody = '';
$dataArray = explode('{|}',$data);
foreach($dataArray as $key=>$tr){
	$trArray = explode('{*}',$tr);
	$tbody .= '<tr>';
	foreach($trArray as $k=>$td){
		//如果单元格内容长度大于11，则将number类型的数字强制转换成文本
		$tdStyle = strlen($td) >11 ? 'style="vnd.ms-excel.numberformat:@";' : '';
		$tbody .= '<td '. $tdStyle . '>' .  $td .'</td>';
	}
	$tbody .= '</tr>';
}
echo '<table>' . $tbody . '</table>';
?>
</body>
</html>
