/*WidgetBody组件
 * @author renxintao@baidu.com
 *  * */
var React = require('react');
var ReactDOM = require('react-dom');
//require('!style!css!sass!../sass/app/_widgetBody.scss');
var WidgetBody = React.createClass({
    getInitialState: function () {
        return {
            val: 0
         };  
    },  
    handleClick: function () {

    },
    generateBody: function () {
        var bodyType = this.props.body.widgetType;   
        if(bodyType=="text"){
        var widgetBody = this.props.body.widgetContent;
            return widgetBody;
        }

    },

    render: function () {
        return (<div className="panel-body" onClick={this.handleClick}>
                    {this.generateBody()}
                    </div>);
        }   
});

module.exports = WidgetBody;   
