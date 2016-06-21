### 功能   
    通过配置可以自定义表格的一些功能。目前已经完成如下功能: 分页(前端or后端)，是否显示分页，筛选，配置展示字段，渲染字段自定义，提供两种调用方式  
### 配置参数: 即props  
    tableCfg: 必须, 对象
    content: 调用方式一必须， 调用方式二部需要
### 源代码 
 
```
import React from 'react';
import ReactDOM from 'react-dom';
import Table from 'umpui-react';
let props = {
    tableCfg: {
        title: 'table title test', // table表头
        tags: { // 要展示哪些字段
            id: 'ID',
            username: '用户名',
            passwd: {
                title: '密码',
                // 自己定义如何渲染，row是当前行的数据
                render: function (v, row) {
                    var style = {
                        color: 'red'
                    }; 
                    return <span style={style}>{v}</span>;
                }
            },
            error: {
                title: 'errorMsg',
                type: 'html' // 这里是展示的html片段
            },
            desc: {
                title: '描述',
                display: false,
                type: 'edit' // 该字段可编辑，同时提供下面的editCfg
            },
            json: {
                type: 'JSON', // 改字段展示的是json
                title: 'json test'      
            }
        },
        editCfg: {
            url: '/business/modifyTitle', // 编辑请求的url
            label: '标题',
            isEmpty: false,
            validate: 'string'
        },
        cfg: { // 其他相关配置
            pager: true, // 是否分页
            size: 2,  // 分页大小
            pageType: 'server' // 后端分页还是前端分页，默认是前端分页,后端接收参数pageNum/page 代表当前页,从1开始;pageSize 每页的数量
            checkBox: true // 是否在每行前面展示checkBox
        },
        display: {
            expand: true, // 是否有额外信息展示，单独占一行，可以是任何的html片段, 返回行数据中包含expand字段
            filter: true, // table是否展示筛选，后端分页只能对当前页进行筛选，前端分页对所有数据进行筛选
            switchTags: true, // 展示字段是否可配置，用于当字段很多时，可以自己配置展示哪些字段
            tips: true, // 鼠标放在当前行前问号上要显示的信息,返回行数据中包含tips字段
            export: true //数据是否可以导出，当前页和分页
        } 
    }
};
```
### 调用方式一: props配置:  
```
let props = {
    tableCfg: {}, // 如上tableCfg
    content: [ // 已经有数据直接赋值在这里
    {id: 1, username: 'luyongfang', passwd: 'xiaolu', expand: 'sss', desc: 'ABC'},
    {id: 2, username: 'liuxiaoyu', passwd: 'xiaoyu', expand: '333',desc: 'EFG'}
};
class demo extends React.component {
    render() {
        return(
           <Table {...props}/> 
        )
    }
}
```
### 调用方式二: props配置
```
let props1 = {
    tableCfg: {
        title: 'table Title example',
        url: 'http://www.baidu.com/demo/data.json', // 请求的url地址
        tags: {
            id: 'ID',
            username: '用户名',
            passwd: '密码'
        },
        ...... // 如上配置
    }
};
```
### 获取已经选择的数据
```
    let selectedData = this.refs.table.selectedData
    返回数据格式： 对象数组，对象的key为行数据的id, value为当前行的数据
```
