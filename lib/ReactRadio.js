var React = require('react');
var ReactDOM = require('react-dom');

class ReactRadio extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            val: this.props.checked,
            type: 'radio'
        };
    }
    componentDidMount() {
    
    }
    getVal() {
        return this.state.val;
    }
    handleClick() {
        this.setState({val: !this.state.val});
    }
    render() {
        var label = this.props.label;
        return(<div className="checkbox c-checkbox needsclick" onClick={this.handleClick.bind(this)}>
                <label className="needsclick">
                <input standalone ref={this.props.name} type="checkbox"
                    defaultChecked={this.state.val} className="needsclick" />
                <em className="fa fa-check"/>{label}</label>
        </div>);
    }

}
export default ReactRadio;
