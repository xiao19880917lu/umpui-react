/**
 * @file Input组件
 * @author luyongfang
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Input} from 'antd';
export default class ReactInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            val: this.props.defaultValue ? this.props.defaultValue : ''
        };
    }
    setVal(val) {
        this.setState({val: val});
    }
    getValue() {
        return this.state.val;
    }
    handleChange(e) {
        e.stopPropagation();
        let  iVal =  e.target.value;
        this.setState({val: iVal});
        this.props.handleChange && this.props.handleChange(iVal);
    }
    render() {
        let val = this.props.defaultValue !== undefined ? this.props.defaultValue : '';
        let className = 'form-control input-sm datatable_input_col_search';
        return <Input className={className} name={this.props.name} type={this.props.type}
            ref={this.props.name} maxLength={this.props.maxlength}
            value={this.state.val} onChange={this.handleChange.bind(this)}
            placeholder={this.props.placeholder}/>;
    }
}
