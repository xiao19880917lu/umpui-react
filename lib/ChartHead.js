/**
 * @file Input组件
 * @author luyongfang
 */
var React = require('react');
var ReactDOM = require('react-dom');
var ChartHead = React.createClass({
        getInitialState: function () {
            return {
                val: 0
            };
        },
handleClick: function () {

},
generateHead: function () {
   var liList [];
   if (this.props.headConf.export) {
    liList.push('<li key='' data-action='export'></li>');
   }
  return <ul>{liList}</ul>;
},
        render: function () {
            return (<div className="chart-head" onClick={this.handleClick}>
                {this.generateHead}
                </div>);
        }
    });

module.exports = ChartHead;
