

> 2016.10.09 升级横向表单（纵向表单暂时不支持，后面考虑在升级大版本时把两种表单合并）

```
1.新增可配置表单底部按钮，支持获取数据全部表单数据功能和清除表单功能，以及自定义按钮
2.ReactTransverForm组件上增加了onSubmit事件和onClear事件
具体变更如下：
配置中增加了button字段
let formConfig = {
    ...
    button: [
        {
            action: 'submit',   // 提交按钮，在Form组件上提供 onSubmit 接口
            type: 'primary',    // 这里的属性可以参照antd/button中的属性设置
            value: '提交',
            icon: 'search'      // 这里的属性可以参照antd/button中的属性设置
        }, {
            action: 'clear',    // 清除按钮，在Form组件上提供 onClear 接口
            type: '',
            value: '清除',
            icon: 'delete',
            disabled: 'disabled'
        }, {
            action: 'test',
            type: '',
            value: '自定义',
            icon: 'copy',
            onClick: ()=>{
                console.log('自定义按钮');
            }
        }
    ]
}
<ReactTransverForm ref="apiForm" config={formConfig} onSubmit={} onClear={}/>
```

> 2016.09.28 升级RangeDatepicker组件

```
1.修复获取数据时，月份比真实情况小一个月bug (getMonth函数返回值为 0-11)
2.新增getValue和setValue两个对外接口，以方便用户对组件值的控制，防止通过refs直接操作state
3.调整onChange函数回调函数的接收值，由原来的两个值改为一个对象(可以使用es6的解构再把对象拆分，如组件示例所示)
```

> 2016.09.27 修复Table组件部分bug

```
修复Table中的两个bug：
1.Table中使用导出组件时，导出组件的配置没有随Table.params参数变化，导致Table查询条件改变后，导出数据依然是原来的数据
2.Table全选按钮，在下面所有行勾选后，全选按钮依然没有选中。还有点击全选按钮时，没有触发勾选事件，没有把已勾选数据传出

3.对ReactForm做了微调，添加了Textarea支持和default默认显示输入框
```

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

> 2016.09.18 之前的一些修改

```

```