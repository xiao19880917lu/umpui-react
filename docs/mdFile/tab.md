### 配置参数  
    tabMap: array 每个Tab展示的文字内容
    tabcMap: array 每个Tab内容框的id
    isCusOperation: boolean true/false 是否显示自定义操作的按钮
    className: string 'fa fa-flag' 自定义操作按钮的样式font-awesome
    activeId: int 1 当前活跃的tab，默认是0
    handleOperation: function(tabId) 自定义操作的回调函数
    tabcGenerator: function(tabMap, tabcMap, currentTab) 自定义渲染内容的函数

### 源代码  
```
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTab from 'umpui-react';
export default class TabApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    handleOperation(tabId) {
        console.log('当前activetab:' + tabId);
    }
    tabcGenerator(tabMap, tabcMap, currentTab) {
        let divList = [];
        tabcMap.forEach(function (v, k) {
            let className = (k * 1 === currentTab) ? 'am-active' : '';
            className += ' am-tab-panel';
            let attr = 'data-tab-panel-' + k;
            // 如果有复杂的逻辑展示-请修改这里的代码,这里有一个缺点是如何通过map去获取渲染哪个组件
            divList.push(<div attr data-key={attr} className={className} key={v}>
                <div id={v}>{'自定义tabcGenerator,当前是第' + k + '个Tab'}</div>
                </div>);
        });
        return divList;
    }
    render() {
        let tabData = {
            tabMap: ['tab1-name', 'tab2-name', 'tab3-name'],
            tabcMap: ['tab1-con', 'tab2-con','tab3-con'],
            isCusOperation: true,
            className: 'fa fa-flag',
            activeId: 1        
        };
        return (
            <div className="umpui-component">
                <div className="umpui-block">
                    <ReactTab ref="tab" {tabData} handleOperation={this.handleOperation.bind(this)}
                    tabcGenerator={this.tabcGenerator.bind(this)}/>
                </div>
            </div>
        );
    }

}

```
