import React from "react";
import "./Filter.css";
export default React.createClass({
  displayName: "Filter",

  render() {
    var array = Array.apply(null, {length: 10}).map(Number.call, Number)

    var fakeItems = array.map((value,i)=>{
      return (
        <li className="Filter-category" key={i}>CATEGORY</li>
      )
    });

    return (
      <div className="Fitler">
          <ul className="Filter-categories">{fakeItems}</ul>
        
      </div>
    );
  }
});