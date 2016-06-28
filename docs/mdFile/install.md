### 工具安装-node
    安装nodejs: jumbo install nodejs
    git：npm install git –g  --registry http://registry.npm.baidu.com
  (注：registry为百度镜像，若开发机可访问外网，无需添加镜像)

### 依赖包安装(Dependencies)  

    配置package.json：将git+ssh://luyongfang@icode.baidu.com:8235/baidu/atm/umpui-react 中的package.tmp.json复制即可
    执行安装命令：npm install --registry http://registry.npm.baidu.com
    命令成功执行后，会在当前目录新增node_modules文件夹，里面包含所有依赖包。

    

### 代码框架搭建  

    可以参考下方目录结构进行搭建，of Course你可以根据自己项目的实际情况搭建

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
     |——index1.html (入口文件)
     |——index2.html (入口文件1)
     |——css
     |——js
           |——bundle1.js
           |——bundle2.js
           |——hello.bundle.js
```

  代码结构详解：

  1) `webpack.config.js/package.json`: 属于webpack和npm配置文件

  2) `src`: RD编写的源文件存放处；sass用于存放scss文件，jsx用于存放jsx文件，由于百度代码规范检查工具无法检验jsx文件，可将jsx命名为js文件
  
  3) `node_modules`: 依赖包存放处，配置好package.json后执行npm install，即会自动生成node_modules文件夹
  
  4) `dist`: 执行webpack命令进行编译后，会将src中的sass和jsx中的源文件分别编译到css和js文件夹中


### 独立安装umpui-react  
 
    推荐使用npm安装, 享受整个生态圈和工具链带来的好处. 
    可以通过 npm 直接安装到项目中，使用 import 或 require 进行引用。  
    1. npm install git+ssh://luyongfang@icode.baidu.com:8235/baidu/atm/umpui-react
    2. copy dist/css/common3.min.css 到自己的项目目录下
    3. copy dist/css/antd.css 到自己项目目录下(引用的ant.design部分组件)
### 快速搭建框架  

    npm install umpui-react-init[待补充] 
    会床架代码结构及安装相关的package到node_modules下  

### 开发组件后如何提交  

    1) git add file
    2) git commit -a -m " commets"  只会提交trace的文件
    3) git fetch origin master 和master进行合并前钱fetch一份
    4) git merge FETCH_HEAD 并解决冲突
    5) git push origin HEAD:refs/for/master 提交代码进行审核入库
    
