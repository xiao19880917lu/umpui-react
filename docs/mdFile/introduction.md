### 前端统一框架概述(Description)  

    为实现前端页面的统一化，提高前端开发效率，现提供一套统一的前端标准，希望大家共同遵守，实现前端的高效开发，前端统一主要分为以下两方面:  

    1. 前端页面样式统一标准：由于目前各个平台样式种类较多，需要进行许多重复的UI设计工作，所以提供一套统一UI标准，所有平台都可采用，实现UI样式的复用性。  

    2. 统一前端组件：根据UI标准提供一套前端组件，实现前端代码的可复用性，方便后续的前端代码的维护和兼容，提高前端开发效率。  


### 标准开发(Rule)  

    > 技术标准: ES6编码标准，React+npm+Webpack技术  
        在实际项目开发中，你会需要对ES2015|ES2016|JSX代码进行构建，调试，代理，打包部署等一系列工程化的需求,这里提供npm+webpack的工具链来辅助开发

    > 样式标准: [样式案例](http://cp01-sys-idp-dev-2.epc.baidu.com:8081)
        为了提升开发效率,集成了bootstrap的样式 
    > 前端框架搭建: 参见安装及使用模块-前端框架搭建

### 代码维护
    [代码维护地址](http://icode.baidu.com/files/view/baidu/atm/umpui-react/@tree/master)

### 加入组件开发
    联系luyongfang@baidu.com or wujie08@baidu.com or huzaibin@baidu.com

### 开发组件后如何提交
    1) git add file
    2) git commit -a -m " commets"  只会提交trace的文件
    3) git fetch origin master 和master进行合并前钱fetch一份
    4) git merge FETCH_HEAD 并解决冲突
    5) git push origin HEAD:refs/for/master 提交代码进行审核入库
    欢迎各位大神贡献自己的组件，组件开发请联系luyongfang 
    

