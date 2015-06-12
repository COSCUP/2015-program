import React from "react";
import "./AppBar.css";

export default React.createClass({
  displayName: "AppBar",

  render() {
  	
    var logo = require("./images/logo.png");

    return (
        <div className="AppBar">
            <div className="AppBar-wrap">
                <a href="http://coscup.org/"><img className="AppBar-logo" src={logo}/></a>
                <div className="AppBar-items">
                    <a className="AppBar-item is-active">議程</a> 
                    <a className="AppBar-item" href="http://coscup.org/2015/zh-tw/about/">簡介</a> 
                    <a className="AppBar-item" href="http://coscup.org/2015/zh-tw/sponsors/">贊助</a> 
                    <a className="AppBar-item" href="http://blog.coscup.org/">部落格</a> 
                </div>
            </div>
        </div>
    );
  }
});