/**
 * @file Input组件
 * @author luyongfang
 */
var React = require('react');
var ReactDOM = require('react-dom');
var ReactInput = React.createClass({
        getInitialState: function () {
            return {
                val: 0
            };
        },
        setVal: function (val) {
            this.setState({val: val});
        },
        getValue: function () {
            return this.state.val;
        },
        handleChange: function (event) {
            event.stopPropagation();
            this.setState({val: $.trim($(event.target).val())});
            this.state.val = $.trim($(event.target).val());
            this.props.handleChange && this.props.handleChange();
        },
        render: function () {
            var val = this.props.value ? this.props.value : '';
            var className = "form-control input-sm datatable_input_col_search";
            return <input name={this.props.name} defaultValue={val} onChange={this.handleChange}
            placeholder={this.props.placeholder} className={className}/>;
        }
    });

module.exports = ReactInput;
