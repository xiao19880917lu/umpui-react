/*WidgetHead组件
 * @author renxintao@baidu.com
 *  * */
var React = require('react');
var ReactDOM = require('react-dom');
require('!style!css!sass!../sass/app/_widgetHead.scss');
var WidgetHead = React.createClass({
getInitialState: function () {
return {
val: 0
};  
},  
handleClick: function () {

},
generateHead: function () {
    var headName = this.props.head.widgetName;   
    var operationData = this.props.head.operationConf;
    var operationList = [];
    for (var key in operationData){
        if(operationData.hasOwnProperty(key)){
            operationList.unshift(<li key={key} className="widget-operation"><em className={operationData[key]}></em></li>);
    }}
    var head = <div className="panel-heading widget-head"><div>{headName}</div><div><ul>{operationList}</ul></div></div>;
  return head;    
     },

    render: function () {
       var head = this.generateHead();    
       return head;
        }   
});

module.exports = WidgetHead;   
