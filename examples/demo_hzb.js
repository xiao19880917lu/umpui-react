import React from "react";
import ReactDOM from "react-dom";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
//var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import Immutable from "immutable";

import Sidebar from '../lib/Sidebar';



const itemsData = [
    {
        'label': '操作中心',
        'id': '778',
        'icon': 'icon-grid'
    },
    {
        'label': '我的Case',
        'id': '97',
        'icon': 'icon-speedometer',
        'children': [
            {
                'label': 'Son',
                'id': '12',
                'icon': 'icon-grid'
            },
            {
                'label': 'Doctor',
                'id': '13',
                'icon': 'icon-grid'
            },
        ]
    },
    {
        'label': '全部Case',
        'id': '1',
        'icon': 'icon-speedometer',
        'children': [
            {
                'label': 'Dashboardv1',
                'id': '1-1',
                'icon': 'icon-speedometer',
                'children': [
                    {
                        'label': 'Dashboardv1-1',
                        'id': '1-1-1',
                        'icon': 'icon-grid'
                    },
                    {
                        'label': 'Dashboardv1-2',
                        'id': '1-1-2',
                        'icon': 'icon-grid'
                    }
                ]
            },
            {
                'label': 'Dashboardv2',
                'id': '1-2',
                'icon': 'icon-grid'
            },
            {
                'label': 'Dashboard v3',
                'id': '1-3',
                'icon': 'icon-grid'
            },
        ]
    },
];

const userInfo = {
    'username': 'huzaibin',
    'picture': './img/huzaibin.jpg',
    'role': '员工'
};

var Base = React.createClass({
    render: function(){
        return (
            <div>
                <Sidebar itemsData={itemsData} userInfo={userInfo}/>
               {React.cloneElement(this.props.children, {
                    key: Math.random()
                })}
            </div>
        );
    }
});


var Section1 = React.createClass({
    render: function() {
        return (<div style={{'position': 'absolute', 'top': '0', 'zIndex': '111', 'marginLeft': '220px', 'backgroundColor': 'red'}}>huzaibin</div>);
    }
});

var Section2 = React.createClass({
    render: function() {
        return (<div style={{'position': 'absolute', 'top': '0', 'zIndex': '111', 'marginLeft': '220px', 'backgroundColor': 'green'}}>huzaibin</div>);
    }
});

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Base}>
           <IndexRoute component={Section1} />   //这是需要自定义的组件
           <Route path="操作中心/:name" component={Section1}/> 
           <Route path="我的Case/:name" component={Section2}/> 
        </Route>
    </Router>, document.getElementById("container")
);
                /*<ReactCSSTransitionGroup component="section" 
                    transitionName={animationName}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    {React.cloneElement(this.props.children, {
                        key: Math.random()
                    })}
                </ReactCSSTransitionGroup>*/
