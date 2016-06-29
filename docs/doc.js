/**
 * @file 使用文档入口文件
 * */
import React from 'react';
import ReactDOM from 'react-dom';
import {createHistory, createHashHistory, useBasename} from 'history';
import {Router, Route, IndexRoute} from 'react-router';
import {Header, HeaderApp, TreeView, NavData, InstallApp,
    IntroductionApp, TableApp, FormSliderApp, TipModalApp,
    FormModalApp, CkListModalApp, FormApp, TableFormApp,
    CheckBoxApp, TreeViewApp, MarkdownElement} from './index.js';
const history = useBasename(createHashHistory)({
    basename: '/umpui-react',
    queryKey: '_key'
});
require('!style!css!sass!./doc.css');

class UmpUiApp extends React.Component {
        render() {
            return (<section>
                        <Header navData={NavData.header.navData}
                        menuData={NavData.header.menuData} icon={NavData.header.icon}/>
                        <div className="main">
                            <TreeView data={NavData.siderBar}/>
                            {this.props.children}
                        </div>
                   </section>
                   );
        }
    };
let Routes = (
     <Router history={history}>
         <Route path="/" component={UmpUiApp}>
             <IndexRoute component={IntroductionApp} />
             <Route path='Introduction/:id' component={IntroductionApp}/>
             <Route path='Install/:id' component={InstallApp}/>
             <Route path='/Component/table/:id' component={TableApp}/>
             <Route path='/Component/formSlider/:id' component={FormSliderApp}/>
             <Route path='Component/tipModal/:id' component={TipModalApp}/>
             <Route path='Component/formModal/:id' component={FormModalApp}/>
             <Route path='Component/ckListModal/:id' component={CkListModalApp}/>
             <Route path='Component/form/:id' component={FormApp}/>
             <Route path='Component/tableForm/:id' component={TableFormApp}/>
             <Route path='Component/checkbox/:id' component={CheckBoxApp}/>
             <Route path='Component/treeView/:id' component={TreeViewApp}/>
             <Route path='Component/header/:id' component={HeaderApp}/>
         </Route>
     </Router>
);
ReactDOM.render(Routes, document.getElementById('container'));
