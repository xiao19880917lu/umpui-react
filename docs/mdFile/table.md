### 功能   
    通过配置可以自定义表格的一些功能。目前已经完成如下功能: 分页(前端or后端)，是否显示分页，筛选，配置展示字段，渲染字段自定义，提供两种调用方式  
### 配置参数: 即props  
    tableCfg: 必须, 对象
    content: 调用方式一必须， 调用方式二部需要
    params: 通过url向后端请求时传的参数（一般用于外部搜索）

### 源代码 
```
import React from 'react';
import ReactDOM from 'react-dom';
import Table from 'umpui-react';
let props = {
    tableCfg: {
        // table表头
        title: 'table title test',
        // 果要设置每个table展示的页数则此字必须有 
        name: 'testtable',
        // 要展示哪些字段
        tags: {
            // 每行必须有id数据
            id: 'ID',
            /**
             * sort: 改字段是否可以进行排序
             * editCfg: 可编辑情况下的配置，类似于Excel的编辑,需要开启下方display中editTable字段
             * edit: true/false 可编辑，不可编辑
             * elemType: 编辑的时候展示的是input框
             */
            username: {
                title: '用户名',
                sort: true, 
                editCfg: {
                    edit: true,
                    elemType: 'text'
                }
            },
            /**
             * sort: 可以进行自定义
             * render: 单个字段可以自定义如何渲染
             */
            passwd: {
                title: '密码',
                sort(row1, row2) {
                    if (row1['passwd'] < row2['passwd']) {
                        return 1;
                    } else if (row1['passwd'] > row2['passwd']) {
                        return -1;
                    } else {
                        return 0;
                    }
                },
                render: function render(v, row) {
                    let style = {
                        color: 'red'
                    };
                    return React.createElement(
                        'span',
                        {style: style},
                        v
                    );
                }
            },
            /**
             * elemType为radioGroup时需要提供options选择
             */
            sex: {
                title: '性别',
                editCfg: {
                    edit: true,
                    elemType: 'radioGroup',
                    options: [
                        {label: '女', value: 'femal'},
                        {label: '男', value: 'male'}
                    ]
                }       
            },
            /**
             * elemType为checkbox多选时需要提供options选择
             */
            like: {
                title: '爱好',
                editCfg: {
                    edit: true,
                    elemType: 'checkbox',
                    options: [
                        {label: '苹果', value: 'apple'},
                        {label: '香蕉', value: 'banana'},
                        {label: '梨子', value: 'pear'}
                    ]
                }      
            },
            /**
             * elemType为radio时说明值只可能是对立面的如
             * marry: 只能取 是/否  true/false 1/0
             */
            marry: {
                title: '是否结婚',
                editCfg: {
                    edit: true,
                    elemType: 'radio'
                }        
            },
            /**
             * 展示一段html 如<a href="#">百度</a>
             */
            html: {
                title: '展示html',
                type: 'html'
            },
            /**
             * 单字段可编辑，同时需要提供下方的detailCfg配置
             */
            desc: {
                title: '描述',
                display: false,
                type: 'edit'
            },
            json: {
                type: 'JSON',
                title: 'json test',
                display: false
            },
            cusOperation: {
                title: '自定义操作',
                actions: [
                    {
                        title: '编辑',
                        color: '',
                        onClick: operaClick.editClick
                    },
                    {
                        title: '删除',
                        color: '',
                        onClick: operaClick.delClick
                    }
                ]
            }
        },
        cfg: { // 其他相关配置
            pager: true, // 是否分页
            pagerCfg: {
                pager: true,
                totalPage: 20,
                totalData: 40,
                jump: true,
                showPageNum: 3,
                showFirstLast: true,
                type: 'text',
                showCount: true        
            }, 
            size: 2,  // 分页大小
            pageType: 'server', // 后端分页还是前端分页，默认是前端分页,后端接收参数pageNum/page 代表当前页,从1开始;pageSize 每页的数量
            checkBox: true // 是否在每行前面展示checkBox
        },
        display: {
            // 一下为字段说明
            // expand 是否有额外信息展示，单独占一行，可以是任何的html片段, 返回行数据中包含expand字段
            // filter table是否展示筛选，后端分页只能对当前页进行筛选，前端分页对所有数据进行筛选
            // switchTags 展示字段是否可配置，用于当字段很多时，可以自己配置展示哪些字段
            // tips 鼠标放在当前行前问号上要显示的信息,返回行数据中包含tips字段
            // export 数据是否可以导出，当前页和分页，
            // setPageSize  设置table每页展示多少条数据// 需要结合tableCfg.name 使用,如testtable
            // fullScreen 是否显示全屏处理按钮
            // editTable 是否可以编辑表格，类似Excel
            // refresh 是否显示刷新按钮
            // retract 表格是否默认收起
            'basic': ['filter', 'export', 'refresh', 'editTable', 'fullScreen', 'switchTags'],
            'menus': ['filter', 'export', 'refresh', 'fullScreen', 'switchTags', 'setPageSize'],
            'tips': true,
            'expand': true,
            'retract': false
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
### 设置字段不可选，同时鼠标放上去可以提示
```
    1. response 返回的data数据中，这只disabled字段 true /false
    2. props种的display配置 tips: true就可以展示data种的tips字段
```

### 获取已经选择的数据
```
    let selectedData = this.refs.table.getSelectedData()
    返回数据格式： 对象数组，对象的key为行数据的id, value为当前行的数据
```

### 通过外界更新Table  
    1) 调用方式1
       refresh: 
       saveEdit: 编辑表格点击确定回传的saveEdit函数，参数已经编辑行的数据，是对象数组
       <Table refresh={this.refresh} {...props} saveEdit={this.saveEdit(arrData)}/>  
    2) 调用方式2
       this.refs.table.getData(pageNum, params) 参数可以不填写

### 可以自定义Header
```
    // 传入children即可
    <Table ref="table" {...PageData.table} trDoubleClick={this.trDoubleClick.bind(this)}>
        {/* pos值为basic的会视为基础组件，直接展示在表头 */}
        <div pos="basic" className="umpui-header-extra" onClick={this.cusHeader.bind(this)}>
            <i className="fa fa-book"></i>
            <span>自定义基础</span>
        </div>
        {/* pos值为menu的会视为不常用组件，放在菜单的列表中 */}
        <div pos="menu" onClick={this.cusHeader.bind(this)}>
            <i className="fa fa-book"></i>
            <span>自定列表</span>
        </div>
    </Table>
```
