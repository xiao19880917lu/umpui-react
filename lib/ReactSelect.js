/**
 * @file ReactSelect组件
 * @author luyongfang
 */
var React = require('react');
var ReactDOM = require('react-dom');
var ReactSelect = React.createClass({
        getInitialState: function () {
            return {
                val: undefined
            };
        },
        handleChange: function (event) {
            event.stopPropagation();
            this.setState({val: $.trim($(event.target).val())});
        },
        componentDidMount: function () {
            this.setState({
                val: this.props.data[0]
            });
        },
        render: function () {
            var optionList = [];
            $.each(this.props.data, function (k, v) {
                optionList.push(<option key={k} value={k}>{v}</option>);
            });
            return <select className="reactSel" name={this.props.name}
                onChange={this.handleChange}>{optionList}</select>;
        }
    });

module.exports = ReactSelect;
