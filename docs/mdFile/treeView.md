### 使用演示  

    本页面左侧的侧边栏就是使用本组件进行展示的

### 源代码展示 

    适用于单页面应用,如果整个项目比较复杂，可以分为多个php文件，每个文件可以使一个单页面的APP-引入对应的bundle.js 
```
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, Link, useRouterHistory} from 'react-router';
import {createHashHistory} from 'history';
import {Spin} from 'antd';
import TreeView from './TreeView';
import 'antd/dist/antd.css';

/**
 * 侧边栏默认数据
 */
const treeData = [
    {
        'text': '百度',
        'href': 'baidu',
        'icon': 'mif-home',
        'key': 'BAIDU',
        'isLeaf': false,
        'state': {
            'expanded': true
        },
        'nodes': [
            {
                'text': 'YQ01',
                'href': 'idc',
                'icon': 'mif-location-city mif-2x',
                'key': 'YQ01',
                'isLeaf': false
            },
            {
                'text': 'M1',
                'href': 'module',
                'icon': 'mif-library',
                'key': 'M1',
                'isLeaf': true
            }
        ]
    }
];

/**
 * 异步加载节点数据
 */
function getNodeData(params) {
    // $.getJSON(url, params, function () {});
    return [
        {
            'text': 'YQ01',
            'href': 'idc',
            'icon': 'mif-location-city mif-2x',
            'key': 'YQ01',
            'isLeaf': false
        },
        {
            'text': 'M1',
            'href': 'module',
            'icon': 'mif-library',
            'key': 'M1',
            'isLeaf': true
        }
    ];

}

/**
 * Base 组件
 */
class Base extends React.Component {
    render() {
        return (
            <div>
                <TreeView async={true} emptyIcon='' treeData={treeData} getNodeData={getNodeData}/>
                {this.props.children}
            </div>
        );
    }

}

const historyConfig = useRouterHistory(createHashHistory)({
    basename: '/'
});

class NotMatchComponent extends React.Component {
    render() {
        return (
            <div>404: No Match for route</div>
        );
    }
}

/**
 * 渲染整个应用
 */
ReactDOM.render(
    <Router history={historyConfig} >
        <Route path='/' component={Base}  name='umpui-react' />
        <Route name='404: No Match for route' path='*' component={NotMatchComponent}/>
    </Router>,
    document.getElementById('content')
);

```
