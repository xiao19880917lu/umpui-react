/**
 * @file NOC顶部
 * @author luyongfang@baidu.com
 * */
var React = require('react');
var ReactDOM = require('react-dom');
require("!style!css!sass!../sass/app/_topContainer.scss");
var TopContainer = React.createClass({
  getInitialState: function () {
    return {
      user: window.globalUser ? window.globalUser : 'luyongfang',
      status: 1,
      slidedown: false
    };
  },
  _onUsernameClick: function() {
    this.setState({slidedown: this.state.slidedown === false});
  },
  _onLogout: function() {
    window.location = 'http://uuap.baidu.com/logout';
  },
  render: function () {
    var liList = [];
    var className = this.state.slidedown ? 'show' : 'hidden';
    if (this.state.status) {
      liList.push(<li key="top-user" data-action="user"><span className="fa fa-user" onClick={this._onUsernameClick}> {this.state.user}</span></li>);
      liList.push(<li key="top-singout" data-action="singout" className={className}><a href="/logout" className="fa fa-sign-out" onClick={this._onLogout}> 退出</a></li>);
    }
    return (<div className="topContainer">
      <div className="logo"><img src={this.props.logo}/></div>
      <ul className="singinout">{liList}</ul>
    </div>);
  }
});

module.exports = TopContainer;
