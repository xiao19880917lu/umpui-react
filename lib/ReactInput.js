/**
 * @file Input组件
 * @author luyongfang
 */
import React from 'react';
import ReactDOM from 'react-dom';
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
    handleChange(event) {
        event.stopPropagation();
        let  iVal =  this.refs[this.props.name].value;
        this.setState({val: iVal});
        this.props.handleChange && this.props.handleChange(iVal);
    }
    render() {
        let val = this.props.defaultValue ? this.props.defaultValue : '';
        let className = 'form-control input-sm datatable_input_col_search';
        return <input name={this.props.name} defaultValue={val}
            ref={this.props.name} onChange={this.handleChange.bind(this)}
            placeholder={this.props.placeholder} className={className}/>;
    }
}
