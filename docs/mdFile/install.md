### 工具安装-node
    1. node安装
        方式一: jumbo install nodejs
        方式二: 参考[文档](http://idoc.baidu.com/fe/node_react)
    2. git安装
       npm install git –g  --registry http://registry.npm.baidu.com
    (注：registry为百度镜像，若开发机可访问外网，无需添加镜像)

### 依赖包安装(Dependencies)
    推荐使用npm安装, 享受整个生态圈和工具链带来的好处. 可以通过 npm 直接安装到项目中，使用 import 或 require 进行引用。  
    1. 在项目根目录下执行
       npm install git+ssh://luyongfang@icode.baidu.com:8235/baidu/atm/umpui-react
    备注: 目前代码放在icode上，需要再icode上-个人设定设置ssh-key,安装完后会在根目录下生成node_modules目录
    2. 从umpui-react下复制package.tmp.json到项目根目录下
       copy node_modules/umpui-react/package.tmp.json ./package.json
    
### 前端框架搭建  

    1. 自动生成目录
        执行命令 npm run init-project 会自动生成相应的目录、demo和webpack.config.js,如下:
    2. demo访问
       项目目录/resources/views/demo.php 可查看demo效果
    3. 安装其它依赖包
        执行命令 npm install(会自动查package.json中的依赖，如果由于不能访问外网,node-sass等相关没安装成功，可以联系luyongfang@baidu.com)

```
|——webpack.config.js
|——package.json
|——resources 
     |——views(php or html文件,通过url访问)
          |——hello.php
          |——upload.php
     |——sass (项目的sass文件)
     |——jsx (可以根据自己实际情况，子文件夹根据模块再细分)
          |——Hello.js(页面组件)
          |——Upload.js(页面组件)
          |——utils (通用组件)
          |——Router.js (使用React Router对页面组件进行路由管理)
|——node_modules (执行npm install命令后自动创建，详见依赖包安装)
     |——依赖包
     |——umpui-react (统一框架组件代码)
|——dist 
     |——css
           |——common.min.css
           |——antd.css
           |——your.css
     |——js
           |——hello.bundle.js
           |——upload.bundle.js
```

  代码结构详解:  


  1) `webpack.config.js/package.json`: 属于webpack和npm配置文件

  2) `resources`: RD编写的源文件存放处；sass用于存放scss文件，jsx用于存放js/jsx文件，由于百度代码规范检查工具无法检验jsx文件，可将jsx命名为js文件
  
  3) `node_modules`: 依赖包存放处，配置好package.json后执行npm install，即会自动生成node_modules文件夹
  
  4) `dist`: 执行webpack命令进行编译后，会讲对应的bundle.js和css文件放在此处  

### 代码基础开发介绍  

  1) 使用import 引入组件  
  2) sass,css 使用require引入require('!style!css!sass!../../sass/your.scss');  
  3) ES6 定义class  
 
```
    export default class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                // state init
            };
            // propery init after super, you can get this object
            this.classProperty = {}
        }
    }
```
    备注: 
    a) 类最后不需要加分号;
    b) ES6-class定义属性，在constructor中调用super(props)之后，参考demo.js
  4) 避免使用jquery类库，样式通过state控制
  5) 使用let,const定义变量常量，不使用var
  6) 使用外部开源组件，建议只适用ant-design，减少引用css,js同时有些开源的像react-bootstrap有些已经废弃，难维护
  6) 建议利用react+redux搭建fp  

### 使用antd的一些坑    
