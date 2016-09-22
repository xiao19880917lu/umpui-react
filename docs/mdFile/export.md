### 参数说明
    异步导出方式：
    实例化组件时传入config参数
    必要参数：
        headers: {} 表格中要显示的字段，以及字段对应的表头（key=>value形式）
        url: String 导出数据接口的url（一般可直接使用分页接口return {status:0, data:[{…},…]}）
        params: {}  需要传递给后台的参数，如一些搜索及高级查询的过滤条件等（同Table组件的params参数）
        total: Number 当前表格所有数据的总条数 (当前这个数据因为在导出前就会使用，所以要求传入，后面可能会考虑去掉)
    可选参数：
        message:  如上面示例的'提示导出'组件，可自定义下面的提示信息
        {
            page1: []   page1为第一页即导出之前设置页面的提示信息
            page2: []   page2为导出过程中的提示信息，可以传入多条
        }

    同步导出方式：
    实例化组件时传入数据，config参数
    必要参数：
        headers: {}     表格中要显示的字段，以及字段对应的表头（key=>value形式），同上面的headers
        data: [{},...]  要导出的全部数据列表
        total: Number 当前表格所有数据的总条数   

### 源代码  
 
```
import React from 'react';
import ReactDOM from 'react-dom';
import Export from 'umpui-react';

// 异步方式
let config2 = {
    headers: {id: 'ID', hostname: '主机名', sn: 'SN', status: '状态', model_id: '型号', rack: '机架位'},
    url: "php/download.php",   
    params: {
        isExport: true,
        container_id: 484,
        zone: 'china',
        type:'server'
    },
    total: 720,
    message: {
        page1: ["请注意，程序会自动根据分页大小依次向服务端请求数据，全部请求完毕后生成Excel下载。不要将分页大小设置的过大，以免查询数据超时。"],
        page2: ["如果下载的文件用Excel打开提示文件格式与扩展名不一致，请选 择“是”，直接用Excel打开即可。","为防止常规单元格式下excel的自动转化，所有字段均转化为文本！"]
    }
}
// 同步方式
let config3 = {
    headers: {'id': 'ID', 'hostname': '主机名', 'sn': 'SN', 'status': '状态', 'model_id': '型号', 'rack': '机架位'},
    data: [{"id":"1925","hostname":"tc-click-log1-off.tc","sn":"686N32X",
            "status":"14","model_id":"15","rack":"TC706-03-11-4",
            "container_id":"488","rms_product_id":"174"},
        ]
}
    
<Export config={config2}>
    <Button key='2' type = "primary">提示导出</Button>
</Export>
<Export config={config3}>
    <Button key='3' type = "primary">同步导出</Button>
</Export>
```
