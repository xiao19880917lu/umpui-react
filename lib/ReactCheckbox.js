/**
 * @file checkbox-label展示: window的样式太丑了
 * @author luyongfang
 * */
import React from 'react';
import ReactDOM from 'react-dom';

export default class ReactCheckbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            val: this.props.checked,
            type: 'checkbox'
        };
    }
    componentWillReceiveProps(nextProps) {
        /*if (nextProps.checked !== this.props.val) {
            this.setState({val: nextProps.checked});
        }*/
    }
    getVal() {
        return this.state.val;
    }
    getValue() {
        return this.state.val;
    }
    handleClick(event) {
        event.stopPropagation();
        this.state.val = !this.state.val;
        this.props.handleChange && this.props.handleChange(this.state.val);
        console.log(this.state.val + 'check');
    }
    render() {
        let label = this.props.label;
        return (<div className="checkbox c-checkbox needsclick" >
                <label className="needsclick">
                <input standalone ref={this.props.name} type="checkbox" onClick={this.handleClick.bind(this)}
                    defaultChecked={this.state.val} className="needsclick" />
                <em className="fa fa-check"/>{label}</label>
        </div>);
    }

}
