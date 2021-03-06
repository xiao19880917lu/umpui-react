/**
 * @file 使用文档入口文件
 * */
import React from 'react';
import ReactDOM from 'react-dom';
import {createHashHistory, useBasename} from 'history';
import {Router, Route, IndexRoute} from 'react-router';
import {Header, HeaderApp, TreeView, NavData, InstallApp, ChangeLogApp} from './index.js';
import {IntroductionApp, TableApp, FormSliderApp, TipModalApp} from './index.js';
import {FormModalApp, CkListModalApp, FormApp, TableFormApp, PaginationApp} from './index.js';
import {CheckBoxApp, TreeViewApp, WidgetApp, ReactHighchartsApp} from './index.js';
import {ReactHighstockApp, MarkdownElement, TabApp, NavApp, ListApp} from './index.js';
import {ExportApp, RangeDatepickerApp, LoadingApp, BusinessApp} from './index.js';
const history = useBasename(createHashHistory)({
    basename: '/umpui-react',
    queryKey: '_key'
});
require('!style!css!sass!./doc.css');

class UmpUiApp extends React.Component {
    render() {
        return (<section>
                    <Header {...NavData.header}/>
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
             <Route path='ChangeLog' component={ChangeLogApp}/>
             <Route path='Component' component={TableApp}/>
             <Route path='Component/table' component={TableApp}/>
             <Route path='Component/pagination' component={PaginationApp}/>
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
             <Route path='Component/rangeDatepicker' component={RangeDatepickerApp}/>
             <Route path='Component/loading' component={LoadingApp}/>
             <Route path='Component/business' component={BusinessApp}/>
         </Route>
     </Router>
);
ReactDOM.render(Routes, document.getElementById('container'));
