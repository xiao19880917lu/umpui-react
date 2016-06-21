/**
 * @file Input组件
 * @author luyongfang
 */
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
export default class ReactInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            val: this.props.value ? this.props.value : ''
        };
    }
    setVal(val) {
        this.setState({val: val});
    }
    getValue() {
        return this.state.val;
    }
    handleChange(event) {
        event.stopPropagation();
        this.setState({val: $.trim($(event.target).val())});
        this.state.val = $.trim($(event.target).val());
        this.props.handleChange && this.props.handleChange();
    }
    render() {
        let val = this.props.value ? this.props.value : '';
        let className = 'form-control input-sm datatable_input_col_search';
        return <input name={this.props.name} defaultValue={val} onChange={this.handleChange.bind(this)}
        placeholder={this.props.placeholder} className={className}/>;
    }
}
