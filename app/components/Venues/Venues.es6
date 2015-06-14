import React from "react";
import classNames from "classnames";
import "./Venues.css";

export default React.createClass({
  displayName: "Venues",

  render() {
    var {data} = this.props;
    var items = Object.keys(data).map((key,index)=>{

      return (
        <div className="Venues-item">
          <div className="Venues-key">{key}</div>
          <div className="Venues-text">
            {data[key].building}・
            {data[key].venue}
          </div>
        </div>

      )
      
    });
    return (
      <div className="Venues">
          <div className="Venues-title">場地對照</div>
          <div className="Venues-items">{items}</div>
      </div>
    );
  }
});