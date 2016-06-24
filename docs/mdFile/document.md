前端统一框架
=====

框架介绍(Introduction)
---------

<a href="index_old.php" style="cursor: pointer">返回旧版</a><br />

### 概述(Description)

为实现前端页面的统一化，提高前端开发效率，现提供一套统一的前端标准，希望大家共同遵守，实现前端的高效开发，前端统一主要分为以下两方面：


- 前端页面样式统一标准：由于目前各个平台样式种类较多，需要进行许多重复的UI设计工作，所以提供一套统一UI标准，所有平台都可采用，实现UI样式的复用性。

- 统一前端组件：根据UI标准提供一套前端组件，实现前端代码的可复用性，方便后续的前端代码的维护和兼容，提高前端开发效率。

### 框架预览(Preview)
<a href="http://cp01-sys-idp-dev-2.epc.baidu.com:8081/" target="_blank">点击预览</a>

### 标准规范(Rule)
- 技术标准: ES6编码标准，React+Webpack技术

- 样式标准: <a href="#-global-style">全局样式</a>

- 代码开发规范: <a href="#-get-start-code">代码框架搭建</a>


安装(Installation)
---------

### 工具安装(Tool)
- 安装nodejs: jumbo install nodejs
- git：npm install git –g  --registry http://registry.npm.baidu.com
  (注：registry为百度镜像，若开发机可访问外网，无需添加镜像)

### 依赖包安装(Dependencies)
- 配置package.json：将git+ssh://luyongfang@icode.baidu.com:8235/baidu/atm/umpui-react 中的package.tmp.json复制即可
- 执行安装命令：npm install --registry http://registry.npm.baidu.com
- 命令成功执行后，会在当前目录新增node_modules文件夹，里面包含所有依赖包。


开始使用(Get Start)
---------

### 代码框架搭建(Code)
- 根据以下代码框架搭建前端代码：
```
|——webpack.config.js
|——package.json
|——src 
     |——sass
     |——jsx
          |——Hello.js(页面组件)
          |——Upload.js(页面组件)
          |——utils (通用组件)
          |——Router.js (使用React Router对页面组件进行路由管理)
|——node_modules (执行npm install命令后自动创建，详见依赖包安装)
     |——依赖包
     |——umpui-react (统一框架组件代码)
|——dist 
     |——index.html (入口文件)
     |——css
     |——js
           |——bundle.js
           |——hello.bundle.js
```

- 代码结构详解：

  1) `webpack.config.js/package.json`: 属于webpack和npm配置文件

  2) `src`: RD编写的源文件存放处；sass用于存放scss文件，jsx用于存放jsx文件，由于百度代码规范检查工具无法检验jsx文件，可将jsx命名为js文件
  
  3) `node_modules`: 依赖包存放处，配置好package.json后执行npm install，即会自动生成node_modules文件夹
  
  4) `dist`: 执行webpack命令进行编译后，会将src中的sass和jsx中的源文件分别编译到css和js文件夹中


### 调用(Invoke)
- 全局样式调用: (完成全局样式的引入后即可使用<a href="#-global-style">全局样式</a>中的样式了)

  在入口文件中引入全局css
```
<!DOCTYPE html>
<html>
    <head>
        <title>UMP-Upload</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <!--UMPUI全局样式引入-->
        <link rel="stylesheet" href="../dist/css/umpui.css">
    </head>
    <body>
        <div id="container"> </div>
        <script src="../dist/upload.bundle.js"></script>
    </body>
</html>
```
- 组件调用：
  
  在页面组件中import组件后，即可使用组件，例如引入Upload组件：
```
import React from 'react'; 
import ReactDOM from 'react-dom'; 
import {Upload} from 'umpui-react'; //引入Upload组件
var App = React.createClass({
        render: function () {
            return <div className="main">
                <Upload url="upload_test.php" name="files" />
            </div>;
        }
    });
ReactDOM.render(<App />, document.getElementById('container'));
```

全局样式(Global Style)
---------

### 背景色(Color)

- 颜色预览：
<div class="table-grid">
   <div class="col">
      <div class="box-placeholder b0 bg-purple-light">.bg-purple-light</div>
   </div>
   <div class="col">
      <div class="box-placeholder b0 bg-purple">.bg-purple</div>
   </div>
   <div class="col">
      <div class="box-placeholder b0 bg-purple-dark">.bg-purple-dark</div>
   </div>
</div>
<div class="table-grid">
   <div class="col">
      <div class="box-placeholder b0 bg-primary-light">.bg-primary-light</div>
   </div>
   <div class="col">
      <div class="box-placeholder b0 bg-primary">.bg-primary</div>
   </div>
   <div class="col">
      <div class="box-placeholder b0 bg-primary-dark">.bg-primary-dark</div>
   </div>
</div>
<div class="table-grid">
   <div class="col">
      <div class="box-placeholder b0 bg-info-light">.bg-info-light</div>
   </div>
   <div class="col">
      <div class="box-placeholder b0 bg-info">.bg-info</div>
   </div>
   <div class="col">
      <div class="box-placeholder b0 bg-info-dark">.bg-info-dark</div>
   </div>
</div>
<div class="table-grid">
   <div class="col">
      <div class="box-placeholder b0 bg-green-light">.bg-green-light</div>
   </div>
   <div class="col">
      <div class="box-placeholder b0 bg-green">.bg-green</div>
   </div>
   <div class="col">
      <div class="box-placeholder b0 bg-green-dark">.bg-green-dark</div>
   </div>
</div>
<div class="table-grid">
   <div class="col">
      <div class="box-placeholder b0 bg-danger-light">.bg-danger-light</div>
   </div>
   <div class="col">
      <div class="box-placeholder b0 bg-danger">.bg-danger</div>
   </div>
   <div class="col">
      <div class="box-placeholder b0 bg-danger-dark">.bg-danger-dark</div>
   </div>
</div>

- 使用方式：
```
<div class="table-grid">
   <div class="col">
      <div class="box-placeholder b0 bg-purple-light">.bg-purple-light</div>
   </div>
   <div class="col">
      <div class="box-placeholder b0 bg-purple">.bg-purple</div>
   </div>
   <div class="col">
      <div class="box-placeholder b0 bg-purple-dark">.bg-purple-dark</div>
   </div>
</div>
```



### 字体(Font)

- 字体预览：
<div class="table-grid">
   <div class="col">
      <div class="box-placeholder b0 title-l" style="">标题1(.title-l)</div>
   </div>
</div>
<div class="table-grid">
   <div class="col">
      <div class="box-placeholder b0 title-m" style="">标题2(.title-m)</div>
   </div>
</div>
<div class="table-grid">
   <div class="col">
      <div class="box-placeholder b0 title-s" style="">标题3(.title-s)</div>
   </div>
</div>
<div class="table-grid">
   <div class="col">
      <div class="box-placeholder b0" style="">正文(默认)</div>
   </div>
</div>


- 使用方式：
```
<div class="box-placeholder b0 title-l">标题1(.title-l)</div>
<div class="box-placeholder b0 title-m">标题2(.title-m)</div>
<div class="box-placeholder b0 title-s">标题3(.title-s)</div>
<div class="box-placeholder b0">正文(默认)</div>
```

### 字体图标(Font Icons)

- 图标预览：
<div class="row list-icon">
   <div class="col-md-3 col-sm-4">
      <em class="icon-home"></em>.icon-home</div>
   <div class="col-md-3 col-sm-4">
      <em class="icon-user"></em>.icon-user</div>
   <div class="col-md-3 col-sm-4">
      <em class="icon-note"></em>.icon-note</div>
   <div class="col-md-3 col-sm-4">
      <em class="icon-logout"></em>.icon-logout</div>
</div>

- 使用方式：
```
<div class="row list-icon">
   <div class="col-md-3 col-sm-4">
    <em class="icon-home"></em>.icon-home</div>
 <div class="col-md-3 col-sm-4">
    <em class="icon-user"></em>.icon-user</div>
 <div class="col-md-3 col-sm-4">
    <em class="icon-note"></em>.icon-note</div>
 <div class="col-md-3 col-sm-4">
    <em class="icon-logout"></em>.icon-logout</div>
</div>
```

### 按钮(Buttons)

- 按钮预览：
<button type="button" class="btn btn-default">.btn-default</button>
<button type="button" class="btn btn-primary">.btn-primary</button>
<button type="button" class="btn btn-info">.btn-info</button>
<button type="button" class="btn btn-danger">.btn-danger</button>

- 使用方式：
```
<button type="button" class="btn btn-default">.btn-default</button>
<button type="button" class="btn btn-primary">.btn-primary</button>
<button type="button" class="btn btn-info">.btn-info</button>
<button type="button" class="btn btn-danger">.btn-danger</button>
```


组件介绍(Components)
---------
### 文件上传组件(Upload)


- 功能：用于进行文件上传的组件，可批量上传文件；

- 配置参数：
  - url: 文件上传地址
  - name: 文件传输后端的文件名, php后台可通过$_FILES['files']获取所有上传文件

- 组件展示：<a href="http://cp01-rdqa04-dev133.cp01.baidu.com:8093/umpdemo/examples/upload.html" target="_blank">点击预览</a>

### Table组件(Table)
- 组件展示: <a href="http://cp01-sys-ump-ur-dev01.epc.baidu.com:8000/frontend/umpui-react/examples/demo.php">点击预览</a>
- 功能: 通过配置可以自定义表格的展示, 分页，筛选，配置展示字段等，可配置是否分页，数据是通过URL获取还是直接展示数据
- 配置参数: 即props
  - tableCfg: 表格的配置
- 调用方式:
```
// 第一种方式: 已经有数据展示Table
let props = {
    tableCfg: {
        title: 'table title test', // table表头
        tags: { // 要展示哪些字段
            id: 'ID',
            username: '用户名',
            passwd: '密码',
            desc: {
                title: '描述',
                display: false // false代表不展示此字段
            }
        },
        cfg: { // 其他相关配置
            pager: true, // 是否分页
            size: 2,  // 分页大小
            pageType: 'server' // 后端分页还是前端分页，默认是前端分页
            checkBox: true // 是否在每行前面展示checkBox
        },
        display: {
            expand: true, // 是否有额外信息展示，单独占一行，可以是任何的html片段
            filter: true, // table是否展示筛选，后端分页只能对当前页进行筛选，前端分页对所有数据进行筛选
            switchTags: true // 展示字段是否可配置，用于当字段很多时，可以自己配置展示哪些字段       
        } 
    },
    // 已经有数据了,可以放在content中
    content: [
    {id: 1, username: 'luyongfang', passwd: 'xiaolu', expand: 'sss', desc: 'ABC'},
    {id: 2, username: 'liuxiaoyu', passwd: 'xiaoyu', expand: '333',desc: 'EFG'},
    {id: 3, username: 'wangyang21', passwd: 'wangyang21', expand: 'ssdd', desc: 'ERT'},
    {id: 4,  username: 'zhangchunyu', passwd: 'xiaoyu', expand: 'ddff',desc:'QWE'}]
};
// 第二种方式:通过URL展示数据,访问JSON文件返回
let props1 = {
    tableCfg: {
        title: 'table Title example',
        url: 'http://www.baidu.com/demo/data.json', // 请求的url地址
        tags: {
            id: 'ID',
            username: '用户名',
            passwd: '密码'
        },
        cfg: {
            pager: true,
            size: 15 
        },
        display: {
            expand: true
        } 
    }
};
```

### 多选框组件(ReactCheckbox)
- 功能: 展示基础的checkbox-label的样式
- 配置参数:
        checked: true/false 是否选中当前的checkbox框
        label: checkbox后面要展示的label是什么  
- 使用方式：
```
let checkboxProps = {
    checked: true,
    label: 'checkbox-label'
};
 <ReactCheckbox {...checkboxProps} ref="checkbox"/>
```
- 获取checkbox值
```
    this.refs['ref'].getVal();
```
 
### 弹出层组件(ReactModal)
- 组件展示: 可参考Table中的组件展示列表中最下方的三个Modal弹出层
- 功能: Modal层展示可配置
- 配置参数:
        type: tip/warning/form/checkbox
        msg: 要显示的信息// 只有type为tip/warning下有，
        item: 配置数据，用于form/checkbox形式,可参见下面的说明
        handleModalClick: 父组件提供，比如modal层确定后会做一些额外的处理,如请求后台等，传给父组件的参数为：
            参数1：item,即调用ReactModal组件的item
            参数2：params, 是获取Modal层表单的值{k:v,k1:v1}
- 使用方式:
1. 第一种调用方式
```
let modalCon1 = {
    type: 'tip',
    msg: '提示信息'
};
<ReactModal modalCon={modalCon1} handleModalClick={this.handleModalClick}/>
```
2. 第二种调用方式
```
let modalCon2 = {
    type: 'form'
};
let modalData2 = {
    config: [  // 配置要展示的form列表
        {
            type: 'input',
            label: '转交给:',
            name: 'take_person', // 必须,用来获取表单值上传给父组件的值
            isEmpty: false,
            validate: 'string',
            desc: '请输入邮箱前缀'
        },
        {
            type: 'select',
            label: '转交原因',
            name: 'reason',
            isEmpty: false,
            validate: 'string',
            map: {
                '请选择': '请选择',
                '休假': '休假',
                '非本人值班': '非本人值班',
                '技术困难': '技术困难',
                '专业不匹配': '专业不匹配',
                '职责不匹配': '职责不匹配',
                '临时有事': '临时有事'
            }
        }
    ]
};
<ReactModal modalCon={modalCon2} item={modalData2} handleModalClick={this.handleModalClick}/>
// 上传给父组件的参数值为
let params = {
    'take_person': 'luyongfang', // 这里对应的就是name
    'reason': 'XXXXX'
}
```
3. 第三种调用方式
```
let modalCon3 ={
    type: 'checkbox' // 可以为
};
let modalData3 = {
    id: 'ID',
    name: '姓名',
    desc: '描述'
};
 <ReactModal modalCon={modalCon3} item={modalData3} handleModalClick={this.handleModalClick}/>
// 上传给父组件的参数值为
let params = {
    'id': true, // true代表选中,false代表木有选中
    'name': false,
    'desc': true
}
```

### 表单组件(ReactForm)
- 功能:
    通过配置展示基础的表单    
- 参数说明:
    config: form表单配置
- 使用方式：
```
let formConfig = {
    title: '执行工具接口说明', // 表单的title
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
            }
        }, {
            type: 'input',
            label: '调用方法',
            inputType: 'text',
            ref: 'api_method',
            fill: true,
            placeholder: '工具执行方法或url, 视api类型而定, http形式即为合法url, rms开放平台或rpc即为方法名称(方法名称不需要携带括号)'
        }
    ]
};
    <ReactForm ref="apiForm" config={formConfig}/>
// 获取表单值的方式,返回对象{k:v,k1:v1} k为formConfig中的ref
   this.refs.apiForm.getFormValues();
```

### table表单组件(ReactTableForm)
- 功能
  通过配置生成配置表单 
- 配置参数
    title: '表单的标题'
    tableFormConfig: {
        config: config,
        defaultParams: defaultParams
        // 其他如果config中有select，需要提供对应的map列表，具体参考调用方式
    }
- 调用方式

    ```
let tableFormConfig = (function () {
    var config = {
        'label': {
            name: 'label标签名',
            type: 'input'
        },
        'type': {
            name: '参数类型',
            type: 'select',
            typeMap: {
                input: 'input输入框',
                date: '日期输入框',
                noc: 'noc资源', // 如果为自定义的noc，且还有二级select列表需要提供如下方return中的noc字段
                textarea: '文本区域输入框'
            }
        },
        'name': {
            name: '参数字段名',
            type: 'input'
        },
        'default': {
            name: '默认参数值',
            type: 'input'
        },
        'buttons': { // 按钮删除增加样式配置
            add: 'fa fa-plus',
            del: 'fa fa-minus'
        }
    };
    var defaultParams = [{ // 默认一行的参数配置
        'label': 'TEST_TEST',
        'type': 'input',
        'name': 'username',
        'default': '',
        'defaultValueType': 'input'
    }];
    return {
        config: config,
        defaultParams: defaultParams,
        noc: {
            key1: 'KEY1',
            key2: 'KEY2'
        }
    };
})();
// 调用example
 <ReactTableForm ref="tableForm" tableFormConfig={tableFormConfig} title="执行工具接口参数配置"/>
// 获取表单结果,同样返回对象数组,k为config中的k
this.refs.tableForm.getFormValues(); 
    ``` 

### FormSlider表单组件(FormSlider)

- 功能:
    比如有些表单的填写需要通过好几个步骤完成,带有上一步、下一步、提交等的表单    
- 参数说明:
    - formConfig: 对象
```
    {
        title: '执行工具接口说明', // 可有可无
        preBtn: true, // 是否显示上一步，即用户可以返回修改
        sliderStepsConfig: [  // 表单填写分为几个步骤,key必须是sliderStepsConfig，是一个对象数组
            {
                formConfig: [  // formConfig是当前步骤所需要展示的表单数组
                    {
                        type: 'input', // type可以使input,select,datetime
                        label: 'widget名字',
                        inputType: 'text',
                        ref: 'widget_name',
                        fill: true, // 改字段是否必须填写
                        placeholder: 'widget_name的方法',
                        validate: {   // 这个可以写正则校验规则，如果不符合则会给出提示
                            preg: '^s',
                            errMsg: '以s开头' 
                        }
                    }, {
                        type: 'input',
                        label: 'widget接入的url',
                        inputType: 'text',
                        ref: 'widget_url',
                        fill: true,
                        placeholder: 'widget-url'
                    }, {
                        type: 'select',
                        label: '接口类型',
                        ref: 'widget_base1',
                        inputType: 'select',
                        placeholder: 'tool name',
                        fill: true,
                        opMap: { // 如果是select，则需要提供opMap字段，生成下拉框
                            all: '请选择',
                            rmsOpen: '开放平台',
                            phpRpc: 'RPC调用方式',
                            httpRestful: 'restfull接口',
                            hprose: 'Hprose方式'
                        }
                    }
                                
                ]
            }
        ]
    }
```
    - formData: 初始化的表单数据
        初始化的表单数据和下面的storeData的格式一样
    - submit: function(storeData){} 当点击提交按钮时需要执行的函数

```
    回传的storeData的数据格式如下: 每一个对象是每一个步骤中的数据,其中key对应formConfig中的ref
    [{
        widget_name: '',
        widget_url: ''
    },{
        start_time: '',
        widget_base1: ''
    }]
```     
- 使用方式：

```
    <FormSlider formConfig={mockData.sliderConfig} formData={mockData.formData} submit={this.handleFormSliderSubmit}/>
```

版本介绍(version)
---------

### 基本信息(Info)
- 创建时间：2016-03-22
- 创建人：伍婕(wujie08@baidu.com)
- 最近更新时间：2016-04-21
- 最新版本号：v1.2

### 版本更新(Update)

<div class="table-responsive">
  <table id="table-ext-2" class="table table-striped table-bordered table-hover">
     <thead>
        <tr>
           <th>版本号</th>
           <th>更新内容</th>
           <th>更新时间</th>
        </tr>
     </thead>
     <tbody>
        <tr>
           <td><label>v1.1</label></td>
           <td>
              <div class="media">
                 <div class="media-body">
                    <h4 class="media-heading">新增模块</h4>
                    <p>1. 新增<a href="#-introduction-preview">框架介绍-框架预览/标准规范</a></p>
                    <p>2. 新增<a href="#-installation-tool">安装-工具安装/依赖包安装</a></p>
                    <p>3. 新增<a href="#-get-start-code">开始使用-代码框架搭建/调用</a></p>
                    <p>4. 新增<a href="#-components-upload">组件介绍-文件上传组件</a></p>
                  </div>
              </div>
           </td>
           <td class="text-center">2016-04-21</td>
        </tr>
        <tr>
           <td><label>v1.2</label></td>
           <td>
              <div class="media">
                 <div class="media-body">
                    <h4 class="media-heading">组件列表</h4>
                    <p>1. 新增<a href="#-components-table">Table组件</a></p>
                    <p>2. 新增<a href="#-components-ReactModal">ReactModal组件</a></p>
                    <p>3. 新增<a href="#-get-start-ReactCheckbox">ReactCheckbox组件</a></p>
                    <p>4. 新增<a href="#-get-start-ReactForm">ReactForm组件</a></p>
                    <p>5. 新增<a href="#-get-start-ReactTableForm">ReactTableForm组件</a></p>
                  </div>
              </div>
           </td>
           <td class="text-center">2016-04-22</td>
        </tr>
        <tr>
            <td><label>v1.3</label></td>
            <td>
                <div class="media">
                    <div class="media-body">
                        <p>1. 新增<a href="#-components-FormSlider">Form表单分步骤提交</a></p>
                    </div>
                </div>
            </td>
        </tr>
     </tbody>
  </table>
</div>
