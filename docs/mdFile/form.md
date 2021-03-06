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
            type: 'multiSelect',
            label: '类型',
            inputType: 'select',
            ref: 'widget_type',
            fill: true,
            isMulti: true,  //二级类型为多选
            FirstMap: {
                125: '业务/网络视图',
                126: '告警和事件'
            },
            SecondMap: {
                125: {
                    127: '业务视图',
                    128: '网络视图'
                },
                126: {
                    130: '消息中心'
                }
            }
        }, {
            type: 'multiSelect',
            label: '类型',
            inputType: 'select',
            ref: 'edit_widget_type',
            fill: true,
            isMulti: false,  //二级类型为单选
            FirstMap: {
                125: '业务/网络视图',
                126: '告警和事件'
            },
            SecondMap: {
                125: {
                    127: '业务视图',
                    128: '网络视图'
                },
                126: {
                    130: '消息中心'
                }
            }
        }, {
            type: 'list',
            ref: 'dashboards',
            list: ['dashboard1', 'dashboard2', 'dashboard3'],
            trashIcon: true, //是否配置list表删除操作
        }]
    ],
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
};
// 点击右上角叉号回调函数
onCancel()  {
}
// list单中删除图表回调函数
onDelete(item) {
console.log(item);
}
// 纵向form表单
<ReactForm ref="apiForm" config={formConfig} onCancel={this.onCancel.bind(this) onDelete={this.onDelete.bind(this)} activeList={1}/>
// activeList为list类型中当前默认显示的list id
// 横向Form表单
<ReactTransverForm ref="apiForm" config={formConfig} onSubmit={} onClear={}/>
// 获取表单值的方式,返回对象{k:v,k1:v1} k为formConfig中的ref
   this.refs.apiForm.getFormValues();
```
