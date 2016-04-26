/**
 * @file 进度条组件
 * @author luyongfang
 * */
var React = require('react');
var ReactDOM = require('react-dom');

class ReactProgress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            val: 0,
            show: false
        };
    }
    render() {
        /*if (!this.state.show) {
            return null;
        }*/
        var label = this.state.val + '%';
        var style = {
            width: label
        };
        return(<div id="processbar" className="progress" >
            <div className="progress-bar" role="progressbar" aria-valuenow={this.state.val}
                aria-valuemin="0" aria-valuemax="100" style={style}>
                {label}
            </div>
        </div>);
    }

}
export default ReactProgress;
