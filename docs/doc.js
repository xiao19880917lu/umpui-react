/**
 * @file 使用文档入口文件
 * */
import React from 'react';
import ReactDOM from 'react-dom';
import {createHashHistory, useBasename} from 'history';
import {Router, Route, IndexRoute} from 'react-router';
import {Header, HeaderApp, TreeView, NavData, InstallApp} from './index.js';
import {IntroductionApp, TableApp, FormSliderApp, TipModalApp} from './index.js';
import {FormModalApp, CkListModalApp, FormApp, TableFormApp} from './index.js';
import {CheckBoxApp, TreeViewApp, WidgetApp, ReactHighchartsApp} from './index.js';
import {ReactHighstockApp, MarkdownElement, TabApp, NavApp, ListApp} from './index.js';
import {ExportApp} from './index.js';
const history = useBasename(createHashHistory)({
    basename: '/umpui-react',
    queryKey: '_key'
});
require('!style!css!sass!./doc.css');

class UmpUiApp extends React.Component {
    render() {
        return (<section>
                    <Header navData={NavData.header.navData}
                    menuData={NavData.header.menuData} icon={NavData.header.icon}
                    operationData={NavData.header.operationData}/>
                    <div className="main">
                        <TreeView treeData={NavData.siderBar}/>
                        {this.props.children}
                    </div>
               </section>
        );
    }
}
let Routes = (
     <Router history={history}>
         <Route path="/" component={UmpUiApp}>
             <IndexRoute component={IntroductionApp} />
             <Route path='Introduction' component={IntroductionApp}/>
             <Route path='Install' component={InstallApp}/>
             <Route path='Component' component={TableApp}/>
             <Route path='Component/table' component={TableApp}/>
             <Route path='Component/formSlider' component={FormSliderApp}/>
             <Route path='Component/tipModal' component={TipModalApp}/>
             <Route path='Component/formModal' component={FormModalApp}/>
             <Route path='Component/ckListModal' component={CkListModalApp}/>
             <Route path='Component/form' component={FormApp}/>
             <Route path='Component/tableForm' component={TableFormApp}/>
             <Route path='Component/checkbox' component={CheckBoxApp}/>
             <Route path='Component/treeView' component={TreeViewApp}/>
             <Route path='Component/tab' component={TabApp}/>
             <Route path='Component/nav' component={NavApp}/>
             <Route path='Component/list' component={ListApp}/>
             <Route path='Component/header' component={HeaderApp}/>
             <Route path='Component/widget' component={WidgetApp}/>
             <Route path='Component/ReactHighcharts' component={ReactHighchartsApp}/>
             <Route path='Component/ReactHighstock' component={ReactHighstockApp}/>
             <Route path='Component/export' component={ExportApp}/>
         </Route>
     </Router>
);
ReactDOM.render(Routes, document.getElementById('container'));
