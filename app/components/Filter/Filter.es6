import React from "react";
import classNames from "classnames";
import "./Filter.css";
export default React.createClass({
  displayName: "Filter",

  render() {
    var {showSession} = this.props;

    var array = Array.apply(null, {length: 10}).map(Number.call, Number)

    var fakeItems = array.map((value,i)=>{
      return (
        <li className="Filter-category" key={i}>CATEGORY</li>
      )
    });

    var shadowClass = classNames({
      "Fitler-shadow" : true,
      "is-show" : showSession
    });

    return (
      <div className="Fitler">
          <div className={shadowClass}></div>
          <div className="Fitler-title">議程主題</div>
          <ul className="Filter-categories">{fakeItems}</ul>
      </div>
    );
  }
});