import React from "react";
import "./Schedule.css";
export default React.createClass({
  displayName: "Schedule",

  render() {

    var array = Array.apply(null, {length: 50}).map(Number.call, Number)

    var fakeItems = array.map((value,i)=>{
    	return (
    		<div className="Schedule-item" key={i}>SOME AWESOME TALK</div>
    	)
    });
    return (
        <div className="Schedule">
        	{fakeItems}
        </div>
    );
  }
});