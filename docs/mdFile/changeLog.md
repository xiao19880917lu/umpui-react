### 更新日志

> 2016.09.22 修改Export导出组件

```
此次变更主要是对传入参数的变更，解决了之前导出时，导出的数据与Table传入params参数时查询出来的数据不相同bug
添加了params参数，去掉了之前的search参数以及otherparms参数
增强了Export组件独立使用的实用性，可以通过params参数对不同的接口做兼容，params里面的参数会直接传递给url
内部实现上也做了微调，如果是依附在Table组件上使用时，Table的params参数直接传递给了Export组件
具体变更如下：
let config2 = {
    headers: {id: 'ID', hostname: '主机名', sn: 'SN', status: '状态', model_id: '型号', rack: '机架位'},
    url: "php/download.php",   
    search: {
        keys: 'id,hostname,sn,status,model_id,rack,container_id,rms_product_id', 
        conditions: {     
            container_id: 484,
            zone: 'china',
            type:'server'
        }
    },
    otherparms: {
        isExport: true,
    }
    total: 720,
}
变更成了：
let config2 = {
    headers: {id: 'ID', hostname: '主机名', sn: 'SN', status: '状态', model_id: '型号', rack: '机架位'},
    url: "php/download.php",   
    params: {
        container_id: 484,
        zone: 'china',
        type:'server'
        isExport: true,
    }
    total: 720,
}
```


> 2016.09.18 修改Table组件的表头

```
变更1：
display参数由原来的：
display: {
    'filter': true,
    'tips': true,
    'expand': true,
    'export': true,
    'switchTags': true,
    'setPageSize': true,
    'refresh': true,
    'editTable': true,
    'fullScreen': true
    retract: false // retract 表格是否默认收起
}
变更成了
display: {
    basic: ['filter', 'export', 'refresh', 'editTable', 'fullScreen', 'switchTags'],
    menus: ['filter', 'export', 'refresh', 'fullScreen', 'switchTags', 'setPageSize'],
    tips: true,  // 是否展示tips，行相关
    expand: true, // 是否展示额外信息，行相关
    retract: false // retract 表格是否默认收起
}
其中：
basic 数组中存放的视为基础控件，直接展示在表头
menus 数组中存放的视为不常用控件，放在名为菜单的按钮下，以下拉框的形式展示
上面示例包含了所有可用控件，如不需要，可省略不写

变更2：
Table中的自定义控件的传递方式变更：
支持传递 自定义基础组件 和 不常用组件
具体详见Table组件示例的 "可以自定义Header"示例
```
