### 参数说明
    url: String 导出数据接口的url（一般可直接使用分页接口）
    search: {} 存放搜索内容的对象 
    {   
        'keys': String 需要后端返回的字段
        'conditions': {} 其他的各种搜索条件
    }  
    headers: {} 表格中要显示的字段，以及字段对应的表头（key=>value形式）
    total: Number 当前表格所有数据的总条数   
    otherparms: {} 其它用户自定义传给后台的参数
### 源代码  
 
```
import React from 'react';
import ReactDOM from 'react-dom';
import Export from 'umpui-react';

let config = {
    url: "php/download.php",   
    search: {
        keys: 'id,hostname,sn,status,model_id,rack,container_id,rms_product_id', 
        conditions: {     
            'container_id': 484,
            'zone': 'china',
            'type':'server'
        }
    },
    headers: {'id': 'ID', 'hostname': '主机名', 'sn': 'SN', 'status': '状态', 'model_id': '型号', 'rack': '机架位'},
    total: 1320,
    otherparms: {
        isExport: true,
        pageType: 'server'
    }
}
    
<Export config={config} />

```
