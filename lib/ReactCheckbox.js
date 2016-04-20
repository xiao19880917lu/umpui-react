var React = require('react');
var ReactDOM = require('react-dom');

class ReactCheckbox extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            val: this.props.checked,
            type: 'checkbox'
        };
    }
    getVal() {
        return this.state.val;
    }
    handleClick(event) {
        event.stopPropagation();
        this.state.val = !this.state.val;
        console.log(this.state.val + 'check');
    }
    render() {
        var label = this.props.label;
        return(<div className="checkbox c-checkbox needsclick" >
                <label className="needsclick">
                <input standalone ref={this.props.name} type="checkbox" onClick={this.handleClick.bind(this)}
                    defaultChecked={this.state.val} className="needsclick" />
                <em className="fa fa-check"/>{label}</label>
        </div>);
    }

}
export default ReactCheckbox;
