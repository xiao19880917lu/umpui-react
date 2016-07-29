### 表单组件(ReactForm)
    通过配置展示基础的表单

### 参数说明:

    title: form标题
    removeIcon：是否配置右上角X号
    config: form表单配置
### 使用方式:

```
import React from 'react';
import ReactDOM from 'react-dom';
import {ReactForm, ReactTransverForm} from 'umpui-react';
let formConfig = {
    title: '执行工具接口说明', // 表单的title
    removeIcon: true, //是否配置右上角X号
    formConfig: [
        {
            type: 'select', // 表单的类型
            label: '接口类型', // 表单展示的label
            ref: 'api_type', // 必须-获取字段值时需要
            inputType: 'select',
            placeholder: 'tool name',
            fill: true, // 是否是必须字段,必须字段会在后面加上红色的*号
            opMap: {  // select类型需要opMap
                all: '请选择',
                rmsOpen: '开放平台',
                phpRpc: 'RPC调用方式',
                httpRestful: 'restfull接口',
                hprose: 'Hprose方式'
            },
            defaultValue: 'rmsOpen'
        }, {
            type: 'input',
            label: '调用方法',
            inputType: 'text',
            ref: 'api_method',
            fill: true,
            defaultValue: 'Test Test',
            placeholder: '工具执行方法或url, 视api类型而定, http形式即为合法url, rms开放平台或rpc即为方法名称(方法名称不需要携带括号)'
        }, {
            type: 'list',
            ref: 'dashboards',
            list: ['dashboard1', 'dashboard2', 'dashboard3'],
            trashIcon: true, //是否配置list表删除操作
        }]
    ]
};
// 点击右上角叉号回调函数
onCancel()  {
}
// list单中删除图表回调函数
onDelete(item) {
console.log(item);
}
// 纵向form表单
<ReactForm ref="apiForm" config={formConfig} onCancel={this.onCancel.bind(this) onDelete={this.onDelete.bind(this)}/>
// 横向Form表单
<ReactTransverForm ref="apiForm" config={formConfig}/>
// 获取表单值的方式,返回对象{k:v,k1:v1} k为formConfig中的ref
   this.refs.apiForm.getFormValues();
```
