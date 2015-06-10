import React from "react";
import classNames from "classnames";
import "./Session.css";
export default React.createClass({
  displayName: "Session",

  render() {
    var {sessionHandler} = this.props;
    return (
        <div className="Session">
             <div className="Session-close"
                  onClick={sessionHandler}></div>
        </div>
    );
  }
});