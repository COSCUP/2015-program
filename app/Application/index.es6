import React from "react";
import Router, {RouteHandler, State} from "react-router";
import "./normalize.css";
import "./index.css";
export default React.createClass({
  displayName: "Application",

  render() {
    
    return (
      <div>
        <RouteHandler {...this.props} {...this.state} />
      </div>
    );
  }
});