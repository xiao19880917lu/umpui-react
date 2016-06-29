### 使用演示  

    本页面左侧的侧边栏就是使用本组件进行展示的

### 源代码展示 

    适用于单页面应用,如果整个项目比较复杂，可以分为多个php文件，每个文件可以使一个单页面的APP-引入对应的bundle.js 
```
import React from 'react';
import ReactDOM from 'react-dom';
import {createHistory, createHashHistory, useBasename} from 'history';
import {Router, Route, IndexRoute} from 'react-router';
import TreeView from 'umpui-react';
const history = useBasename(createHashHistory)({
    basename: '/umpui-react',
    queryKey: '_key'
});
// require('!style!css!sass!./doc.css'); 引入样式
let siderBar: [{
    text: '简要介绍',
    href: "Introduction",
    icon: 'mif-home',
    id: 1
}, {
    text: '安装及快速使用',
    href: "Install",
    icon: 'mif-home',
    id: 2
}, {
    text: '组件',
    href: "Component",
    icon: 'mif-home',
    nodes: [{
        text: 'table',
        href: "table",
        icon: 'mif-home',
        id: 3
    }, {
        text: 'FormSlider',
        href: "formSlider",
        icon: 'mif-home',
        id: 4
    }
    ]
}];
class UmpUiApp extends React.Component {
    render() {
        return (<div className="main">
                        <TreeView data={NavData.siderBar}/>
                        {this.props.children}
               </div>
        );
    }
};
let Routes = (
     <Router history={history}>
         <Route path="/" component={UmpUiApp}>
             <IndexRoute component={IntroductionApp} />
             <Route path='Introduction/:id' component={IntroductionApp}/>
         </Route>
     </Router>
);
ReactDOM.render(Routes, document.getElementById('container'));

```
