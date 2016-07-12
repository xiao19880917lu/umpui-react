### 参数说明  

    navConfig: Array 导航列表的配置
    background: '#ddd' 导航的背景色
    width: 100 导航的宽度
    iconList: false/ true 是否是只展示图标
### navConfig 详细说明
    对象数组-每个对象的参数如下  
```
    {
        text: '要展示的文字',
        frontIcon: 'front-awesome的图标如fa fa-wrench',
        link: '用react-router的话，需要link  如baidu'，
        url: '可直接连接到其他页面 www.baidu.com',
        children: [ // 可选
            {
                text: '展示文字',
                fontIcon: '图标'
            }
        ]
    }
    // 如果子节点是用react-router路由，则路由为 baidu/0 baidu/1  后面为children的索引
```  
 

### 源代码  
```
import React from 'react';
import ReactDOM from 'react-dom';
import Nav from 'umpui-react';
const navConfig = [];
class demo extends React.component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <Nav navConfig={navConfig} background={'#ffeeee'} width={180}>
        )
    }
}
```
